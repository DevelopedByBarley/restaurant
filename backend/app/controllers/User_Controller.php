<?php
  require 'app/models/User_Model.php';

  class UserController {
    private $userModel;

    public function __construct()
    {
      $this->userModel = new UserModel();
    }


    public function sendNewReservation() {
      self::initializePOST();
      $this->userModel->newReservation($_POST);
    }

    private function initializePOST()
    {
      $_POST = json_decode(file_get_contents('php://input'), true);
    }
  }
?>