import express from "express";
const router = express.Router();
import {
  addBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "../controllers/banner.controller.js";
import verifyJwt from "../utils/verifyJWT.js";
import upload from "../utils/multer.js";

router.post("/add-banner", verifyJwt, upload.single("image"), addBanner);
router.get("/get-all", verifyJwt, getAllBanners);
router.get("/get-banner/:id", verifyJwt, getBannerById);
router.patch(
  "/update-banner/:id",
  verifyJwt,
  upload.single("image"),
  updateBanner
);
router.delete("/delete-banner/:id", verifyJwt, deleteBanner);

export default router;
