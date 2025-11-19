import sql from "../config/db.js";

export const createUserScheama = async () => {
  try {
    await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(20) UNIQUE NOT NULL,
                avatar VARCHAR(255) DEFAULT 'https://lthzisgkdarraifglrnu.supabase.co/storage/v1/object/public/static/avatar.png',
                role VARCHAR(255) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
    console.log("users table created successfully");
  } catch (error) {
    console.error("Error creating users table:", error);
  } finally {
    await sql.end();
  }
};
