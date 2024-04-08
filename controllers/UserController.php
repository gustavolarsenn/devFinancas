<?php
require_once $_SERVER['DOCUMENT_ROOT'].'../models/User.php';
 
class UserController{
    
    public $model;
    public function __construct() {
        $this->model = new User();
    }

    // function findUserDb($conn, $id) {
    //     $id = mysqli_real_escape_string($conn, $id);
    //     $user = "";
    
    //     $sql = "SELECT * FROM users  WHERE user_name LIKE '%?%'";
    //     $stmt = mysqli_stmt_init($conn);
    
    //     if(!mysqli_stmt_prepare($stmt, $sql))
    //         exit('SQL error');
    
    //     mysqli_stmt_bind_param($stmt, 'i', $id);
    //     mysqli_stmt_execute($stmt);
    
    //     $user = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
    
    //     mysqli_close($conn);
    //     return $user;
    // }

    function getUserData(){
        // Crie uma instância do UserModel
        $userModel = new User();
        
        // Chame o método do UserModel para obter os dados do usuário
        $userData = $userModel->listAllUsers();
        
        // Retorne os dados do usuário
        return $userData;
    }
};