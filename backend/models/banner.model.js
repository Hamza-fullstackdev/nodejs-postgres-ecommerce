import sql from "../config/db.js";

export const createBannerSchema = async () => {
  try {
    await sql`
            CREATE TABLE IF NOT EXISTS banners (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(id),
                image VARCHAR(255),
                tagline VARCHAR(255) NOT NULL,
                heading VARCHAR(255) NOT NULL,
                description TEXT,
                url VARCHAR(255),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
    console.log("Banner table created successfully");
  } catch (error) {
    console.error("Error creating banner table:", error);
  } finally {
    await sql.end();
  }
};
