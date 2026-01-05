import { pool } from "./db";
import { postgresConnect } from "@/utils/db";

const ensureExistDb = async () => {
  await pool.query(`CREATE SCHEMA IF NOT EXISTS akstore`);
};

const ensureProductListTable = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS akstore.productlist (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  actual_price NUMERIC(10,2),
  discount_price NUMERIC(10,2),
  rating NUMERIC(2,1) CHECK (rating >= 0 AND rating <= 5),
  review_customer_count INTEGER,
  favorite BOOLEAN DEFAULT FALSE,
  discount NUMERIC(5,2),
  category VARCHAR(255),
  best_seller BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);`);
}
// image TEXT[],

const ensureProductImages = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS akstore.productimagelist (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  product_id INTEGER NOT NULL REFERENCES akstore.productlist(id) ON DELETE CASCADE,
  images TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);`)
}

const ensureProductReviews = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS akstore.product_reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES akstore.productlist(id) ON DELETE CASCADE,
  reviewer_name VARCHAR(255),
  rating NUMERIC(2,1) CHECK (rating >= 0 AND rating <= 5),
  comment TEXT,
  images TEXT[],       -- multiple image URLs
  created_at TIMESTAMP DEFAULT NOW()
);`)
}

const ensureUserListTable = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS akstore.userlist (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);`);
}

const ensureDB = { ensureUserListTable, ensureExistDb, ensureProductImages, ensureProductListTable, ensureProductReviews, postgresConnect };
export default ensureDB;