<?php
$host = 'localhost';
$dbname = 'ecommerce';
$username = 'root'; // default XAMPP username
$password = ''; // Updated with user provided password

try {
    // Create PDO connection securely
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Database Connection failed: ' . $e->getMessage()]);
    exit;
}
?>