import dotenv from "dotenv";

dotenv.config();

const _config = {
  clientUrl: process.env.CLIENT_BASE_URL,
  port: process.env.PORT,
  database: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  authCookie: process.env.AUTH_COOKIE,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_ANON_KEY,
  emailHost: process.env.EMAIL_HOST,
  emailPort: Number(process.env.EMAIL_PORT),
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
};

export const config = Object.freeze(_config);
