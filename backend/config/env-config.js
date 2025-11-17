import dotenv from "dotenv";

dotenv.config();

const _config = {
  port: process.env.PORT,
  database: process.env.DATABASE_URL,
};

export const config = Object.freeze(_config);
