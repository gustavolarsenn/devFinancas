<?php
class Transaction{
    private $transaction_id;
    private $category_id;
    private $user_id;
    private $type;
    private $date;
    private $insertion_date;
    private $value;

    public function __construct($transaction_id, $category_id, $user_id, $type, $date, $insertion_date, $value){
        $this->transaction_id = $transaction_id;
        $this->category_id = $category_id;
        $this->user_id = $user_id;
        $this->type = $type;
        $this->date = $date;
        $this->insertion_date = $insertion_date;
        $this->value = $value;
    }

    public function getTransactionId(){
        return $this->transaction_id;
    }

    public function getCategoryId(){
        return $this->category_id;
    }

    public function getUserId(){
        return $this->user_id;
    }


    public function getType(){
        return $this->type;
    }
    public function setType($type){
        $this->type = $type;
    }


    public function getDate(){
        return $this->date;
    }
    public function setDate($date){
        $this->date = $date;
    }


    public function getInsertionDate(){
        return $this->insertion_date;
    }
    public function setInsertionDate($insertion_date){
        $this->insertion_date = $insertion_date;
    }


    public function getValue(){
        return $this->value;
    } 
    public function setValue($value){
        $this->value = $value;
    }
}