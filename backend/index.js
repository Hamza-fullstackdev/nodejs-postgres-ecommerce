import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import cookieParser from "cookie-parser";
import { config } from "./config/env-config.js";
import "./config/db.js";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many requests, please try again later",
  },
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(helmet());
app.use(
  compression({
    level: 9,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`)
);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
  });
});
