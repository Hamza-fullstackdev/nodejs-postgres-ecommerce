import dotenv from "dotenv";

dotenv.config();

const _config = {
  port: process.env.PORT,
  database: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_ANON_KEY,
};

export const config = Object.freeze(_config);
