<?php
class UserModel
{
  protected $pdo;

  public function __construct()
  {
    $db = new Database();
    $this->pdo = $db->getConnect();
  }

  public function newReservation($body)
  {


    $date = $body["date"] ?? '';
    $start = $body["start"] ?? '';
    $end = $body["end"] ?? '';
    $numOfGuests = $body["numOfGuests"] ?? '';
    $intervalValue = $body["interval"] ?? '';
    $createdAt = time();
    $isAccepted = 0;

    $stmt = $this->pdo->prepare("INSERT INTO `reservations` VALUES 
      (NULL, :date, :start, :end, :numOfGuests, :intervalValue, :createdAt, :isAccepted)");

    $stmt->bindParam(":date", $date);
    $stmt->bindParam(":start", $start);
    $stmt->bindParam(":end", $end);
    $stmt->bindParam(":numOfGuests", $numOfGuests);
    $stmt->bindParam(":intervalValue", $intervalValue);
    $stmt->bindParam(":createdAt", $createdAt);
    $stmt->bindParam(":isAccepted", $isAccepted);
    $stmt->execute();

    if ($this->pdo->lastInsertId()) {
      echo "Foglalás sikeresen hozzáadva!";
    }
  }
}
