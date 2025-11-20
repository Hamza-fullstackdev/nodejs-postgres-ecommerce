import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/login", loginUser);
router.post("/google-login", googleAuth);

export default router;
