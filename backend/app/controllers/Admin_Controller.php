<?php
require 'app/models/Admin_Model.php';
require 'app/services/AuthService.php';

class AdminController
{
  private $adminModel;
  private $authService;

  public function __construct()
  {
    $this->adminModel = new AdminModel();
    $this->authService = new AuthService();
  }

  public function register()
  {
    self::initializePOST();
    $this->authService->registerAdmin($_POST);

  }

  public function  login()
  {
    self::initializePOST();
    $this->authService->loginAdmin($_POST);
  }

  public function logout() {
    $this->authService->logoutAdmin();
  }

  public function getMe() {
    $this->adminModel->getAdminData();
  }


  private function initializePOST()
  {
    $_POST = json_decode(file_get_contents('php://input'), true);
  }
}
