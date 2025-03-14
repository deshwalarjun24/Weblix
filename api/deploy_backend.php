<?php
/**
 * WEBLIX Backend Deployment Verification Script
 * 
 * This script helps verify that the backend is properly set up and working.
 * It checks database connection, table structure, and performs a test submission.
 */

// Set content type to JSON
header('Content-Type: application/json');

// Database connection parameters - update these with your actual values
$host = "localhost"; // Change to your production host if needed
$username = "root";  // Change to your production username
$password = "";      // Change to your production password
$database = "weblix";// Change to your production database name

// Results array
$results = [
    'status' => 'checking',
    'database_connection' => false,
    'database_exists' => false,
    'tables_exist' => false,
    'test_submission' => false,
    'errors' => [],
    'messages' => []
];

// Step 1: Check PHP version
$phpVersion = phpversion();
$results['php_version'] = $phpVersion;
if (version_compare($phpVersion, '7.0.0', '<')) {
    $results['errors'][] = "PHP version is $phpVersion. Version 7.0.0 or higher is recommended.";
} else {
    $results['messages'][] = "PHP version $phpVersion is acceptable.";
}

// Step 2: Check database connection
try {
    $conn = new mysqli($host, $username, $password);
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    $results['database_connection'] = true;
    $results['messages'][] = "Database connection successful.";
    
    // Step 3: Check if database exists
    $dbCheck = $conn->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$database'");
    if ($dbCheck && $dbCheck->num_rows > 0) {
        $results['database_exists'] = true;
        $results['messages'][] = "Database '$database' exists.";
        
        // Select the database
        $conn->select_db($database);
        
        // Step 4: Check if tables exist
        $tableCheck = $conn->query("SHOW TABLES LIKE 'contact_messages'");
        if ($tableCheck && $tableCheck->num_rows > 0) {
            $results['tables_exist'] = true;
            $results['messages'][] = "Required tables exist.";
            
            // Step 5: Perform a test submission
            $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message, submission_date) VALUES (?, ?, ?, NOW())");
            $testName = "Test User";
            $testEmail = "test@example.com";
            $testMessage = "This is a test message from the deployment verification script.";
            
            $stmt->bind_param("sss", $testName, $testEmail, $testMessage);
            
            if ($stmt->execute()) {
                $results['test_submission'] = true;
                $results['messages'][] = "Test submission successful.";
                
                // Clean up the test submission
                $testId = $stmt->insert_id;
                $conn->query("DELETE FROM contact_messages WHERE id = $testId");
                $results['messages'][] = "Test submission cleaned up.";
            } else {
                $results['errors'][] = "Test submission failed: " . $stmt->error;
            }
            
            $stmt->close();
        } else {
            $results['errors'][] = "Required tables do not exist. Please import setup_database.sql.";
        }
    } else {
        $results['errors'][] = "Database '$database' does not exist. Please create it and import setup_database.sql.";
    }
    
    $conn->close();
} catch (Exception $e) {
    $results['errors'][] = $e->getMessage();
}

// Step 6: Check for CORS headers
$corsHeaders = [
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Headers'
];

$contactPhpFile = file_get_contents('contact.php');
$corsHeadersFound = 0;

foreach ($corsHeaders as $header) {
    if (strpos($contactPhpFile, $header) !== false) {
        $corsHeadersFound++;
    }
}

if ($corsHeadersFound === count($corsHeaders)) {
    $results['cors_headers'] = true;
    $results['messages'][] = "CORS headers are properly set in contact.php.";
} else {
    $results['cors_headers'] = false;
    $results['errors'][] = "Some CORS headers are missing in contact.php. This may cause issues with cross-origin requests.";
}

// Final status
if (empty($results['errors'])) {
    $results['status'] = 'success';
    $results['messages'][] = "All checks passed! The backend is properly set up.";
} else {
    $results['status'] = 'error';
    $results['messages'][] = "Some checks failed. Please fix the errors and try again.";
}

// Output results
echo json_encode($results, JSON_PRETTY_PRINT);
?> 