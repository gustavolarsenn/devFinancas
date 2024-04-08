<?php
require_once $_SERVER['DOCUMENT_ROOT'].'../utils/Database.php';
class User{
    private $user_id;
    private $user_name;
    private $email;
    private $password;
    
    // public function __construct($user_id, $user_name, $email, $password){
    //     $this->user_id = $user_id;
    //     $this->user_name = $user_name;
    //     $this->email = $email;
    //     $this->password = $password;
    // }
    public function __construct(){
        $this->user_id = 0;
        $this->user_name = "";
        $this->email = "";
        $this->password = "";
    }

    public function listAllUsers(){
        $db = new Database();
        $conn = $db->conn;
        $sql = "SELECT * FROM user";
        $result = $conn->query($sql);
        return $result;
    }
}
//     public function getUserId(){
//         return $this->user_id;
//     }

//     public function setUserId($user_id){
//         $this->user_id = $user_id;
//     }

//     public function getUsername(){
//         return $this->user_name;
//     }

//     public function setUsername($user_name){
//         $this->user_name = $user_name;
//     }

//     public function getEmail(){
//         return $this->email;
//     }

//     public function setEmail($email){
//         $this->email = $email;
//     }

//     public function getPassword(){
//         return $this->password;
//     }

//     public function setPassword($password){
//         $this->password = $password;
//     }
// }