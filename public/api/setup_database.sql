-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS weblix;

-- Use the weblix database
USE weblix;

-- Create table for contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submission_date DATETIME NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on email for faster searches
CREATE INDEX idx_email ON contact_messages(email);

-- Optional: Create a user for the application with limited permissions
-- GRANT SELECT, INSERT ON weblix.contact_messages TO 'weblix_user'@'localhost' IDENTIFIED BY 'secure_password';
-- FLUSH PRIVILEGES; 