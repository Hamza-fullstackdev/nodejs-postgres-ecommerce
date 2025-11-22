import errorHandler from "../middlewares/error.middleware.js";
import sql from "../config/db.js";
import { config } from "../config/env-config.js";
import { createClient } from "@supabase/supabase-js";
import redis from "../config/redis.js";

const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

export const addBanner = async (req, res, next) => {
  console.log(req.body);
  const { heading, tagline, description, url } = req.body;
  const file = req.file;
  const fileExt = file.originalname.split(".").pop();
  const fileName = `banner_img_${Date.now()}.${fileExt}`;

  if (!heading || !tagline || !description || !url)
    return next(errorHandler(400, "All fields are required"));

  const { data, error } = await supabase.storage
    .from("banners")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return res.status(500).json({ message: "Upload failed", error });
  }

  const { data: publicUrlData } = supabase.storage
    .from("banners")
    .getPublicUrl(fileName);

  try {
    const banner = await sql`
      INSERT INTO banners (user_id, image, heading, tagline, description, url ) VALUES (${
        req.user[0].id
      }, ${publicUrlData.publicUrl}, ${heading}, ${tagline}, ${
      description || null
    }, ${url}) RETURNING *
    `;
    return res.status(201).json(banner[0]);
  } catch (error) {
    console.log(error);
    return next(errorHandler(500, "Error adding banner"));
  }
};

export const getAllBanners = async (req, res, next) => {
  try {
    const cacheKey = "get-banner";
    const cachedBanner = await redis.get(cacheKey);

    if (cachedBanner) {
      return res.status(200).json(JSON.parse(cachedBanner));
    }
    const banners = await sql`
      SELECT * FROM banners ORDER BY id DESC
    `;

    await redis.setEx(cacheKey, config.redisTTL, JSON.stringify(banners));
    return res.status(200).json(banners);
  } catch (error) {
    return next(errorHandler(500, "Error getting banners"));
  }
};

export const getBannerById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const banner = await sql`
      SELECT * FROM banners WHERE id = ${id}
    `;
    return res.status(200).json(banner[0]);
  } catch (error) {
    return next(errorHandler(500, "Error getting banner"));
  }
};

export const updateBanner = async (req, res, next) => {
  const { id } = req.params;
  const { heading, tagline, description, url } = req.body;
  const file = req.file;

  try {
    const existingBanner = await sql`
      SELECT * FROM banners WHERE id = ${id}
    `;

    if (existingBanner.length === 0) {
      return next(errorHandler(404, "Banner not found"));
    }

    let updatedImageUrl = existingBanner[0].image;

    if (file) {
      const oldImageUrl = existingBanner[0].image;
      const oldImageName = oldImageUrl.split("/").pop();

      await supabase.storage.from("banners").remove([oldImageName]);
      const fileExt = file.originalname.split(".").pop();
      const fileName = `img_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("banners")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        return next(errorHandler(500, "Failed to upload new image"));
      }

      const { data: publicUrlData } = supabase.storage
        .from("banners")
        .getPublicUrl(fileName);

      updatedImageUrl = publicUrlData.publicUrl;
    }

    const updatedBanner = await sql`
      UPDATE banners 
      SET image = ${updatedImageUrl}, heading = ${heading}, tagline = ${tagline}, description = ${description}, url = ${url}
      WHERE id = ${id}
      RETURNING *
    `;

    return res.status(200).json(updateBanner[0]);
  } catch (error) {
    console.log(error);
    return next(errorHandler(500, "Error updating banner"));
  }
};

export const deleteBanner = async (req, res, next) => {
  const { id } = req.params;

  try {
    const banner = await sql`
      SELECT * FROM banners WHERE id = ${id}
    `;

    if (banner.length === 0) {
      return next(errorHandler(404, "banner not found"));
    }

    const imageUrl = banner[0].image;
    const fileName = imageUrl.split("/").pop();

    const { error: removeError } = await supabase.storage
      .from("banners")
      .remove([fileName]);

    if (removeError) {
      console.log("Failed to delete image:", removeError);
    }

    await sql`DELETE FROM banners WHERE id = ${id}`;

    return res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    return next(errorHandler(500, "Error deleting banner"));
  }
};
