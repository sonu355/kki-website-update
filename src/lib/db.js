import mysql from "mysql2/promise";

/**
 * MySQL connection pool.
 * All credentials are read from environment variables — never hardcode them.
 * Create a `.env.local` file (see `.env.example`) with:
 *
 *   DB_HOST=your-db-host
 *   DB_USER=your-db-user
 *   DB_PASSWORD=your-db-password
 *   DB_NAME=your-db-name
 */
export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "kki",
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
});
