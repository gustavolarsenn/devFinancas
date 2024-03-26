<?php
$classe = $_GET['User'];
$metodo = $_GET['listAllUsers'];
 
$classe .= 'Controller';
 
require_once 'controller/'.$classe.'.php';
 
$obj = new $User();
$obj->$listAllUsers();
?>