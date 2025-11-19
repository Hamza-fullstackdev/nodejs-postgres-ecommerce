import sql from "../config/db.js";

export const createCategorySchema = async () => {
  try {
    await sql`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(id),
                image VARCHAR(255),
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL UNIQUE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
    console.log("Categories table created successfully");
  } catch (error) {
    console.error("Error creating categories table:", error);
  } finally {
    await sql.end();
  }
};
