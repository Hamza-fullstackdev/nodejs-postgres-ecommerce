import jwt from "jsonwebtoken";
import { config } from "../config/env-config.js";

export const generateJWT = (id) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: "7d" });
};
