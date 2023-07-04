<?php
require 'app/models/Reservation_Model.php';

class ReservationController
{
  private $reservationModel;

  public function __construct()
  {
    $this->reservationModel = new ReservationModel();
  }


  public function getReservationsByDate()
  {
    self::initializePOST();
    $this->reservationModel->getFreeIntervals($_POST);
  }

  private function initializePOST()
  {
    $_POST = json_decode(file_get_contents('php://input'), true);
  }
}
