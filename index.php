<?php

// phpInfo();
// Include the UserController file
require_once 'controllers/UserController.php';

// Create an instance of UserController
$userController = new UserController();

// Call the method in UserController to get the data from UserModel
$userData = $userController->getUserData();

// Check if the data was retrieved successfully
if ($userData instanceof mysqli_result) {
    // Fetch the data from the result object
    $row = $userData->fetch_assoc();

    // Display the data on the screen
    echo "ID: " . $row['user_id'] . "<br>";
    echo "Nome: " . $row['user_name'] . "<br>";
    echo "Email: " . $row['email'] . "<br>";
    echo "Senha: " . $row['password'] . "<br>";
} else {
    // Display an error message if no data is available
    echo "Não foi possível obter os dados do usuário.";
}