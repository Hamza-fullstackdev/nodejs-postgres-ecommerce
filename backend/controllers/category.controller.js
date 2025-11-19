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
