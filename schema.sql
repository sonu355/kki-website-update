-- ============================================================
-- Kitchen King Industries (KKI) — Database Schema
-- Run this once against an empty MySQL database (see .env.example)
-- ============================================================

CREATE TABLE IF NOT EXISTS category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL UNIQUE,
  image LONGTEXT,                  -- base64 or Cloudinary URL
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  categoryId INT,
  description TEXT,
  specifications TEXT,
  image LONGTEXT,
  gallery JSON,
  featured TINYINT(1) DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (categoryId) REFERENCES category(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS blog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content LONGTEXT,
  coverImage LONGTEXT,
  author VARCHAR(120) DEFAULT 'Kitchen King Industries',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS homepage_image (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section VARCHAR(100) NOT NULL,   -- e.g. 'hero', 'facility', 'gallery'
  image LONGTEXT NOT NULL,
  caption VARCHAR(255),
  sortOrder INT DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonial (
  id INT AUTO_INCREMENT PRIMARY KEY,
  clientName VARCHAR(150) NOT NULL,
  company VARCHAR(150),
  message TEXT NOT NULL,
  rating INT DEFAULT 5,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_message (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(30),
  subject VARCHAR(255),
  message TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS career_application (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(30),
  position VARCHAR(150),
  message TEXT,
  resumeUrl LONGTEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed a starter set of categories matching the brief
INSERT INTO category (name) VALUES
  ('Cooking Equipment'), ('Preparation Equipment'), ('Storage Equipment'),
  ('Serving Equipment'), ('Washing Equipment'), ('Bakery Equipment'),
  ('Galley Equipment'), ('Exhaust & Ventilation'), ('Custom Fabrication')
ON DUPLICATE KEY UPDATE name = VALUES(name);
