<?php


class Database{
    public $servername = "localhost";
    public $username = "adm";
    public $password = "1234";
    public $dbname = "finance";
    public $conn;

    public function __construct(){
        $this->servername = "localhost";
        $this->username = "adm";
        $this->password = "1234";
        $this->dbname = "finance";
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
}
}
// $servername = "localhost";
// $username = "adm";
// $password = "1234";

// // Create connection
// $conn = new mysqli($servername, $username, $password);

// // Check connection
// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }
// echo "Connected successfully";
// ?>