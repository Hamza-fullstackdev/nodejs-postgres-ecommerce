import jwt from "jsonwebtoken";
import errorHandler from "../middlewares/error.middleware.js";
import { config } from "../config/env-config.js";
import sql from "../config/db.js";

const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await sql`
      SELECT * FROM users WHERE id = ${decoded.id}
    `;
    next();
  } catch (error) {
    next(errorHandler(401, "Unauthorized"));
  }
};

export default verifyJwt;
