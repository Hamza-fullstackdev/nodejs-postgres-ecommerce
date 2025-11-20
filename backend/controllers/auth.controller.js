import errorHandler from "../middlewares/error.middleware.js";
import sql from "../config/db.js";
import isValidEmail from "../helpers/check-email.js";
import containsOnlyNumbers from "../helpers/check-phone.js";
import { hashPassword } from "../helpers/hash-password.js";
import { comparePassword } from "../helpers/compare-password.js";
import { generateJWT } from "../utils/generateJWT.js";
import { sendEmail } from "../helpers/send-mail.js";
import { nanoid } from "nanoid";
import { config } from "../config/env-config.js";
import { cleanValue } from "../helpers/clean-value.js";
import crypto from "crypto";

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
    const verifyToken = nanoid();
    const verifyTokenExpiry = Date.now() + 3600000;
    const verifyUrl = `${config.clientUrl}/verify-email?token=${verifyToken}&email=${email}`;
    const user = await sql`
      INSERT INTO users (first_name, last_name, email, password, phone, verifytoken, verifytokenexpiry) VALUES (${first_name}, ${last_name}, ${email}, ${encryptedPassword}, ${phone}, ${verifyToken}, ${verifyTokenExpiry}) RETURNING *
    `;
    if (user.length > 0) {
      await sendEmail({
        to: email,
        subject: "Verify your email",
        text: `Hi ${first_name} ${last_name}, welcome to Exclusive \nPlease click the link below to verify your email address:\n${verifyUrl}\n\nIf you did not request this email, please ignore it.`,
      });
      return res.status(201).json({
        success: true,
        statusCode: 201,
        message:
          "Please check your email! We have sent you a verification link. Once you verify your email, you can log in to your account.",
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
        const isVerified = await sql`
          SELECT * FROM users WHERE email = ${email} AND isverified = true
        `;
        if (isVerified.length === 0)
          return next(errorHandler(401, "Please verify your email first"));
        const jwtToken = generateJWT(user[0].id);
        const { password, ...rest } = user[0];
        res.cookie(config.authCookie, jwtToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "User logged in successfully",
          data: rest,
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

export const verifyEmail = async (req, res, next) => {
  let { token, email } = req.query;

  token = cleanValue(token);
  email = cleanValue(email);

  if (!token || !email) {
    return next(errorHandler(400, "Token and email are required"));
  }

  try {
    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (!user[0] || user[0].verifytoken !== token) {
      return next(errorHandler(400, "Invalid token or token has expired"));
    }

    await sql`
      UPDATE users SET isverified = true, verifytoken = NULL, verifytokenexpiry = NULL WHERE email = ${email}
    `;

    return res
      .status(200)
      .json({ message: "Email verified successfully" }, { status: 200 });
  } catch (error) {
    return next(
      errorHandler(500, "Something went wrong, please try again later")
    );
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const genericMessage = {
    message:
      "If an account with this email exists, a reset link has been sent.",
  };

  const user = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (user.length === 0) return res.json({ message: genericMessage });

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  await sql`
    UPDATE users
    SET resetpasswordtoken = ${hashedToken},
        resetpasswordexpiry = NOW() + INTERVAL '15 minutes'
    WHERE email = ${email}
  `;

  const resetLink = `${config.clientUrl}/reset-password/${resetToken}`;

  await sendEmail({
    to: email,
    subject: "Password Reset",
    text: `Reset your password using this link: ${resetLink}`,
  });

  return res.json(genericMessage);
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await sql`
    SELECT * FROM users
    WHERE resetpasswordtoken = ${hashedToken}
      AND resetpasswordexpiry > NOW()
  `;

  if (user.length === 0) {
    return res
      .status(400)
      .json({ message: "Token is invalid or has expired." });
  }

  const hashedPassword = await hashPassword(password);

  await sql`
    UPDATE users
    SET password = ${hashedPassword},
        resetpasswordtoken = NULL,
        resetpasswordexpiry = NULL
    WHERE id = ${user[0].id}
  `;

  return res.status(200).json({ message: "Password reset successful." });
};

export const googleAuth = async (req, res, next) => {
  try {
    const { name, avatar, email, phone } = req.body;

    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      const token = generateJWT(existingUser[0].id);
      const { password, ...rest } = existingUser[0];
      return res.cookie(config.authCookie, token).status(200).json(rest);
    }

    const generatedPassword = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await hashPassword(generatedPassword);

    let first_name = null;
    let last_name = null;

    if (name) {
      const split = name.split(" ");
      first_name = split[0] ?? null;
      last_name = split.slice(1).join(" ") || null;
    }

    const newUser = await sql`
      INSERT INTO users (first_name, last_name, avatar, email, password, phone, isverified)
      VALUES (${first_name}, ${last_name}, ${avatar}, ${email}, ${hashedPassword}, ${
      phone || null
    }, true)
      RETURNING *
    `;

    const token = generateJWT(newUser[0].id);
    const { password, ...rest } = newUser[0];

    return res.cookie(config.authCookie, token).status(200).json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
