<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Lógica de tu API aquí...

// El resto de tu código PHP...

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hotelbooking";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Fallo en la conexión: ' . $conn->connect_error]));
}



// Obtener el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Obtener todas las habitaciones
        $sql = "SELECT * FROM Habitaciones";
        $result = $conn->query($sql);
        $rooms = [];
        while ($row = $result->fetch_assoc()) {
            $rooms[] = $row;
        }
        // Devuelve los datos de las habitaciones
        echo json_encode($rooms);
        break;
    

        case 'POST':
            // Agregar una nueva habitación
            $data = json_decode(file_get_contents("php://input"), true);
            
            // Obtener los datos de la habitación
            $name = $data['name'];
            $description = $data['description'];
            $price = $data['price'];
            $imageUrl = $data['imageUrl'];
            $capacity = $data['capacidad'];
            
            // Se asume que created_at se maneja automáticamente por la base de datos
            $sql = "INSERT INTO Habitaciones (name, description, price, imageUrl, capacidad, is_available) VALUES ('$name', '$description', '$price', '$imageUrl', '$capacity', false)";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(['success' => 'Habitación agregada correctamente']);
            } else {
                echo json_encode(['error' => 'Error al agregar la habitación: ' . $conn->error]);
            }
            break;
        
        
            case 'PUT':
                // Editar una habitación existente
                $data = json_decode(file_get_contents("php://input"), true);
                $id = $data['id'];
            
                // Obtener los nuevos datos
                $name = $data['name'];
                $description = $data['description'];
                $price = $data['price'];
                $imageUrl = $data['imageUrl'];
                $capacity = $data['capacidad'];
                $isAvailable = $data['is_available'];
            
                // Se asume que updated_at se maneja automáticamente por la base de datos
                $sql = "UPDATE Habitaciones SET name='$name', description='$description', price='$price', imageUrl='$imageUrl', capacidad='$capacity', is_available='$isAvailable' WHERE id=$id";
                if ($conn->query($sql) === TRUE) {
                    echo json_encode(['success' => 'Habitación actualizada correctamente']);
                } else {
                    echo json_encode(['error' => 'Error al actualizar la habitación: ' . $conn->error]);
                }
                break;
            
        

    case 'DELETE':
        // Eliminar una habitación
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];

        $sql = "DELETE FROM Habitaciones WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => 'Habitación eliminada correctamente']);
        } else {
            echo json_encode(['error' => 'Error al eliminar la habitación: ' . $conn->error]);
        }
        break;

    default:
        echo json_encode(['error' => 'Método no soportado']);
        break;
}

$conn->close();
?>
