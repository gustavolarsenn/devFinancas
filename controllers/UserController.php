<?php
require_once 'model/User.php';
 
class ClienteController {

 public function listar() {
 $cliente = new User("","","", "");
 $clientes = $cliente->listAllUsers();

 $_REQUEST['users'] = $clientes;

 require_once 'view/UserView.php';
 }
}
?>