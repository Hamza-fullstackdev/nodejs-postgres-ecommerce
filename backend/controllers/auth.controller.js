import errorHandler from "../middlewares/error.middleware.js";
import sql from "../config/db.js";
import isValidEmail from "../helpers/check-email.js";
import containsOnlyNumbers from "../helpers/check-phone.js";
import { hashPassword } from "../helpers/hash-password.js";
import { comparePassword } from "../helpers/compare-password.js";
import { generateJWT } from "../utils/generateJWT.js";

export const registerUser = async (req, res, next) => {
  const { first_name, last_name, email, password, phone } = req.body;

  if (!first_name || !last_name || !email || !password || !phone)
    return next(errorHandler(400, "All fields are required"));

  if (password.length < 8)
    return next(
      errorHandler(400, "Password must be at least 8 characters long")
    );

  const isEmail = isValidEmail(email);
  if (!isEmail) return next(errorHandler(400, "Invalid email format"));

  const isValidPhone = containsOnlyNumbers(phone);
  if (!isValidPhone) return next(errorHandler(400, "Invalid phone format"));

  const encryptedPassword = await hashPassword(password);
  if (!encryptedPassword)
    return next(errorHandler(400, "Password encryption failed"));

  try {
    const user = await sql`
      INSERT INTO users (first_name, last_name, email, password, phone) VALUES (${first_name}, ${last_name}, ${email}, ${encryptedPassword}, ${phone}) RETURNING *
    `;
    if (user.length > 0) {
      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: "User added successfully",
        data: user[0],
      });
    } else {
      return next(errorHandler(500, "User insert failed"));
    }
  } catch (error) {
    if (error.code === "23505")
      return next(errorHandler(400, "User already exists"));
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(errorHandler(400, "All fields are required"));

  try {
    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    if (user.length > 0) {
      const isPasswordMatch = await comparePassword(password, user[0].password);
      if (isPasswordMatch) {
        const jwtToken = generateJWT(user[0].id);
        res.cookie("token", jwtToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "User logged in successfully",
          data: user[0],
        });
      } else {
        return next(errorHandler(401, "Incorrect credentials"));
      }
    } else {
      return next(errorHandler(404, "User not found"));
    }
  } catch (error) {
    return next(errorHandler(500, "Internal Server Error"));
  }
};
