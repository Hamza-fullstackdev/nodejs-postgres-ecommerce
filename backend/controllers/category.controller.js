import errorHandler from "../middlewares/error.middleware.js";
import sql from "../config/db.js";
import { config } from "../config/env-config.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

export const addCategory = async (req, res, next) => {
  const { name } = req.body;
  const file = req.file;
  const fileExt = file.originalname.split(".").pop();
  const fileName = `img_${Date.now()}.${fileExt}`;

  if (!name) return next(errorHandler(400, "All fields are required"));

  const slug = name.toLowerCase().replace(/ /g, "-");

  const { data, error } = await supabase.storage
    .from("categories")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return res.status(500).json({ message: "Upload failed", error });
  }

  const { data: publicUrlData } = supabase.storage
    .from("categories")
    .getPublicUrl(fileName);

  try {
    const category = await sql`
      INSERT INTO categories (user_id, image, name, slug) VALUES (${req.user[0].id}, ${publicUrlData.publicUrl}, ${name}, ${slug}) RETURNING *
    `;
    return res.status(201).json(category[0]);
  } catch (error) {
    return next(errorHandler(500, "Error adding category"));
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await sql`
      SELECT * FROM categories ORDER BY name DESC
    `;
    return res.status(200).json(categories.slice(0, 100));
  } catch (error) {
    return next(errorHandler(500, "Error getting categories"));
  }
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await sql`
      SELECT * FROM categories WHERE id = ${id}
    `;
    return res.status(200).json(category[0]);
  } catch (error) {
    return next(errorHandler(500, "Error getting category"));
  }
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const file = req.file;

  if (!name) return next(errorHandler(400, "All fields are required"));

  const slug = name.toLowerCase().replace(/ /g, "-");

  try {
    const existingCategory = await sql`
      SELECT * FROM categories WHERE id = ${id}
    `;

    if (existingCategory.length === 0) {
      return next(errorHandler(404, "Category not found"));
    }

    let updatedImageUrl = existingCategory[0].image;

    if (file) {
      const oldImageUrl = existingCategory[0].image;
      const oldImageName = oldImageUrl.split("/").pop();

      await supabase.storage.from("categories").remove([oldImageName]);
      const fileExt = file.originalname.split(".").pop();
      const fileName = `img_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("categories")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        return next(errorHandler(500, "Failed to upload new image"));
      }

      const { data: publicUrlData } = supabase.storage
        .from("categories")
        .getPublicUrl(fileName);

      updatedImageUrl = publicUrlData.publicUrl;
    }

    const updatedCategory = await sql`
      UPDATE categories 
      SET name = ${name}, slug = ${slug}, image = ${updatedImageUrl}
      WHERE id = ${id}
      RETURNING *
    `;

    return res.status(200).json(updatedCategory[0]);
  } catch (error) {
    console.log(error);
    return next(errorHandler(500, "Error updating category"));
  }
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await sql`
      SELECT * FROM categories WHERE id = ${id}
    `;

    if (category.length === 0) {
      return next(errorHandler(404, "Category not found"));
    }

    const imageUrl = category[0].image;
    const fileName = imageUrl.split("/").pop();

    const { error: removeError } = await supabase.storage
      .from("categories")
      .remove([fileName]);

    if (removeError) {
      console.log("Failed to delete image:", removeError);
    }

    await sql`DELETE FROM categories WHERE id = ${id}`;

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return next(errorHandler(500, "Error deleting category"));
  }
};
