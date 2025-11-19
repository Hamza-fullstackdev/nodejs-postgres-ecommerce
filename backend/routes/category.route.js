import express from "express";
import upload from "../utils/multer.js";
import { addCategory } from "../controllers/category.controller.js";
import verifyJwt from "../utils/verifyJWT.js";

const router = express.Router();

router.post("/add-category", upload.single("image"), verifyJwt, addCategory);

export default router;
