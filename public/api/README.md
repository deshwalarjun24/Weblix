# Weblix Contact Form Backend

This directory contains the PHP and MySQL backend for the Weblix contact form.

## Setup Instructions

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache, Nginx, etc.)

### Database Setup
1. Create a MySQL database for the application:
   ```sql
   CREATE DATABASE weblix;
   ```

2. Create a database user (optional but recommended):
   ```sql
   CREATE USER 'weblix_user'@'localhost' IDENTIFIED BY 'your_secure_password';
   GRANT SELECT, INSERT, UPDATE ON weblix.* TO 'weblix_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. Run the database setup script:
   ```
   mysql -u root -p < setup_database.sql
   ```
   Or import the `setup_database.sql` file using a tool like phpMyAdmin.

### PHP Configuration
1. Open `contact.php` and update the database connection parameters:
   ```php
   $host = "localhost";
   $username = "weblix_user"; // Your database username
   $password = "your_secure_password"; // Your database password
   $database = "weblix";
   ```

2. Do the same for the admin panel in `admin/index.php`.

3. For the admin panel, you may want to change the default login credentials:
   ```php
   if ($_POST['username'] === 'admin' && $_POST['password'] === 'weblix123') {
   ```
   Change 'admin' and 'weblix123' to your preferred username and password.

### Web Server Configuration
1. Make sure your web server is configured to serve PHP files.
2. Ensure the `api` directory is accessible from your React application.

## Usage
- The contact form in your React application will send POST requests to `/api/contact.php`.
- The admin panel is accessible at `/api/admin/index.php`.

## Security Considerations
- This is a basic implementation. For production use, consider:
  - Using HTTPS
  - Implementing CSRF protection
  - Adding rate limiting to prevent spam
  - Using a more secure authentication system for the admin panel
  - Validating and sanitizing all user inputs
  - Setting up proper error logging

## Troubleshooting
- If you encounter CORS issues, make sure the headers in `contact.php` are correctly set.
- Check your web server error logs for PHP errors.
- Ensure your database connection parameters are correct.
- Verify that the MySQL user has the necessary permissions. 