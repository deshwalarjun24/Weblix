<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection parameters
$host = "localhost";
$username = "root"; // Local development credentials
$password = ""; // Empty password for local development
$database = "weblix";

// Get the form data
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// Response array
$response = array(
    "status" => "error",
    "message" => "Something went wrong"
);

// Check if form data is received
if ($_POST) {
    // Sanitize and validate form data
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response["message"] = "Invalid email address";
        echo json_encode($response);
        exit;
    }
    
    // Check if all required fields are provided
    if (empty($name) || empty($email) || empty($message)) {
        $response["message"] = "Please fill in all required fields";
        echo json_encode($response);
        exit;
    }
    
    try {
        // Connect to database
        $conn = new mysqli($host, $username, $password, $database);
        
        // Check connection
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }
        
        // Prepare SQL statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message, submission_date) VALUES (?, ?, ?, NOW())");
        $stmt->bind_param("sss", $name, $email, $message);
        
        // Execute the statement
        if ($stmt->execute()) {
            $response["status"] = "success";
            $response["message"] = "Thank you for your message! We will get back to you soon.";
        } else {
            throw new Exception("Error: " . $stmt->error);
        }
        
        // Close statement and connection
        $stmt->close();
        $conn->close();
        
    } catch (Exception $e) {
        $response["message"] = $e->getMessage();
    }
}

// Return JSON response
echo json_encode($response);
?> 