<?php
// Simple authentication (in a real application, use a more secure method)
session_start();

// Check if user is logged in
$is_logged_in = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;

// Handle login
if (isset($_POST['username']) && isset($_POST['password'])) {
    // In a real application, use a secure authentication method
    // This is just a simple example
    if ($_POST['username'] === 'admin' && $_POST['password'] === 'weblix123') {
        $_SESSION['admin_logged_in'] = true;
        $is_logged_in = true;
    } else {
        $login_error = "Invalid username or password";
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Database connection parameters
$host = "localhost";
$username = "root"; // Local development credentials
$password = ""; // Empty password for local development
$database = "weblix";

// Function to get messages
function getMessages($conn, $limit = 10, $offset = 0) {
    $messages = array();
    
    $sql = "SELECT * FROM contact_messages ORDER BY submission_date DESC LIMIT ? OFFSET ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $limit, $offset);
    $stmt->execute();
    $result = $stmt->get_result();
    
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    
    $stmt->close();
    return $messages;
}

// Function to get total message count
function getTotalMessages($conn) {
    $sql = "SELECT COUNT(*) as total FROM contact_messages";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row['total'];
}

// Function to mark message as read
function markAsRead($conn, $id) {
    $sql = "UPDATE contact_messages SET is_read = TRUE WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
}

// Connect to database if logged in
if ($is_logged_in) {
    try {
        $conn = new mysqli($host, $username, $password, $database);
        
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }
        
        // Handle mark as read
        if (isset($_GET['mark_read']) && is_numeric($_GET['mark_read'])) {
            markAsRead($conn, $_GET['mark_read']);
        }
        
        // Pagination
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = 10;
        $offset = ($page - 1) * $limit;
        
        // Get messages and total count
        $messages = getMessages($conn, $limit, $offset);
        $total_messages = getTotalMessages($conn);
        $total_pages = ceil($total_messages / $limit);
        
    } catch (Exception $e) {
        $db_error = $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weblix Admin - Contact Messages</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            padding: 20px;
            background-color: #f8f9fa;
        }
        .login-container {
            max-width: 400px;
            margin: 100px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .message-card {
            margin-bottom: 20px;
            border-left: 4px solid #4C3AE3;
        }
        .unread {
            background-color: #f0f7ff;
        }
        .pagination {
            margin-top: 30px;
        }
        .navbar {
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <?php if (!$is_logged_in): ?>
        <!-- Login Form -->
        <div class="login-container">
            <h2 class="text-center mb-4">Weblix Admin Login</h2>
            
            <?php if (isset($login_error)): ?>
                <div class="alert alert-danger"><?php echo $login_error; ?></div>
            <?php endif; ?>
            
            <form method="post" action="">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" name="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
        </div>
    <?php else: ?>
        <!-- Admin Dashboard -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Weblix Admin</a>
                <div class="d-flex">
                    <a href="?logout=1" class="btn btn-outline-light">Logout</a>
                </div>
            </div>
        </nav>
        
        <div class="container">
            <h2 class="mb-4">Contact Form Submissions</h2>
            
            <?php if (isset($db_error)): ?>
                <div class="alert alert-danger"><?php echo $db_error; ?></div>
            <?php endif; ?>
            
            <?php if (isset($messages) && count($messages) > 0): ?>
                <?php foreach ($messages as $message): ?>
                    <div class="card message-card <?php echo $message['is_read'] ? '' : 'unread'; ?>">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <div>
                                <strong><?php echo htmlspecialchars($message['name']); ?></strong>
                                <span class="text-muted ms-2">&lt;<?php echo htmlspecialchars($message['email']); ?>&gt;</span>
                            </div>
                            <div>
                                <?php if (!$message['is_read']): ?>
                                    <a href="?mark_read=<?php echo $message['id']; ?>&page=<?php echo $page; ?>" class="btn btn-sm btn-outline-primary">Mark as Read</a>
                                <?php endif; ?>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text"><?php echo nl2br(htmlspecialchars($message['message'])); ?></p>
                            <p class="card-text"><small class="text-muted">Submitted on: <?php echo date('F j, Y, g:i a', strtotime($message['submission_date'])); ?></small></p>
                        </div>
                    </div>
                <?php endforeach; ?>
                
                <!-- Pagination -->
                <?php if ($total_pages > 1): ?>
                    <nav aria-label="Page navigation">
                        <ul class="pagination justify-content-center">
                            <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                                <li class="page-item <?php echo $i === $page ? 'active' : ''; ?>">
                                    <a class="page-link" href="?page=<?php echo $i; ?>"><?php echo $i; ?></a>
                                </li>
                            <?php endfor; ?>
                        </ul>
                    </nav>
                <?php endif; ?>
                
            <?php else: ?>
                <div class="alert alert-info">No messages found.</div>
            <?php endif; ?>
        </div>
    <?php endif; ?>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 