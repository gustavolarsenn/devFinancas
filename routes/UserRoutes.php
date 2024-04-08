<?php

require_once '../controllers/UserController.php';
 
class UserRoutes {
    
    public $controller;
    
    public function __construct() {
        $this->controller = new UserController();
    }
    
    // public function findUserAction($conn, $id) {
    //     return $this->controller->findUserDb($conn, $id);
    // }
}
