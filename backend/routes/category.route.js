import express from "express";
import upload from "../utils/multer.js";
import {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import verifyJwt from "../utils/verifyJWT.js";

const router = express.Router();

router.post("/add-category", upload.single("image"), verifyJwt, addCategory);
router.get("/get-all", verifyJwt, getAllCategories);
router.get("/get-category/:id", verifyJwt, getCategoryById);
router.patch(
  "/update-category/:id",
  verifyJwt,
  upload.single("image"),
  updateCategory
);
router.delete("/delete-category/:id", verifyJwt, deleteCategory);

export default router;
