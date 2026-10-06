<?php
// 1. Database connection include karein
require_once 'db.php'; 

header('Content-Type: application/json');

// 2. JavaScript (fetch) se aa raha JSON data pakadne ke liye
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// 3. Check karein ki data sahi format mein mila ya nahi
if (!$data || !isset($data['address']) || !isset($data['cart'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid data: Cart or Address missing.']);
    exit;
}

try {
    // Transaction shuru karein taaki data dono tables mein sahi se jaye
    $pdo->beginTransaction(); 

    // 4. 'orders' table mein customer details aur total insert karein
    // Column names according to your DB: full_name, phone_number, pincode, house_no, locality_address, city, total
    $stmt = $pdo->prepare("INSERT INTO orders (full_name, phone_number, pincode, house_no, locality_address, city, total) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->execute([
        $data['address']['name'],    // JS key 'name' -> DB column 'full_name'
        $data['address']['phone'],   // JS key 'phone' -> DB column 'phone_number'
        $data['address']['pincode'],
        $data['address']['flat'],    // JS key 'flat' -> DB column 'house_no'
        $data['address']['area'],    // JS key 'area' -> DB column 'locality_address'
        $data['address']['city'],
        $data['total']
    ]);
    
    // Naya Order ID lein
    $orderId = $pdo->lastInsertId(); 

    // 5. 'order_items' table mein cart ke saare products insert karein
    $stmtItem = $pdo->prepare("INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)");
    
    foreach ($data['cart'] as $item) {
        $stmtItem->execute([
            $orderId,
            $item['id'],
            $item['name'],
            $item['quantity'],
            $item['price']
        ]);
    }

    // Sab kuch sahi raha toh commit (save) karein
    $pdo->commit(); 
    
    echo json_encode([
        'success' => true, 
        'message' => 'Order placed successfully!', 
        'order_id' => $orderId
    ]);

} catch (Exception $e) {
    // Agar koi bhi galti ho toh changes undo (rollback) karein
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode(['success' => false, 'message' => 'Database Error: ' . $e->getMessage()]);
}
?>