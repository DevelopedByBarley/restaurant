<?php
require 'app/models/Admin_Model.php';

class AdminController
{

  private $adminModel;

  public function __construct()
  {
    $this->adminModel = new AdminModel();
  }



  public function register()
  {
    self::initializePOST();
    $this->adminModel->registerAdmin($_POST);
  }

  public function  login()
  {
    self::initializePOST();
    $this->adminModel->loginAdmin($_POST);
  }

  public function logout() {
    $this->adminModel->logoutAdmin();
  }

  public function getMe() {
    $this->adminModel->getAdminData();
  }


  private function initializePOST()
  {
    $_POST = json_decode(file_get_contents('php://input'), true);
  }
}
