<?php
class ReservationModel
{
  protected $pdo;

  public function __construct()
  {
    $db = new Database();
    $this->pdo = $db->getConnect();
  }
  
    
  public function  getFreeIntervals($body)
  {
    $date = $body["date"] ?? '';
    $numOfGuests = $body["numOfGuests"] ?? '';
    $interval = isset($body["interval"]) ? $body["interval"] * 60 * 60 : '';

    $isDateHoliday = self::getPublicHolidaysByDate($date);
    if ($isDateHoliday) {
      echo "Ez szabadnap az étterem zárva";
      exit;
    }

    $reservations = self::getReservations($date);

    // Nap kikérése  és nyitvatartási idő lekérése nap alapján.
    $day = date("l", strtotime($date));

    $dayOfTheWeek = self::getOpeningHoursByDay($day);
    $time_intervals = self::generateIntervalsByOpeningHours($date, $interval, $dayOfTheWeek);
    $free_intervals = self::generateFreeIntervalsByCapacity($reservations, $time_intervals, $numOfGuests);

    var_dump($free_intervals);
  }

  private function generateFreeIntervalsByCapacity($reservations, $time_intervals, $numOfGuests)
  {
    $free_intervals = [];

    foreach ($reservations as $reservation) {
      foreach ($time_intervals as $index => $interval) {
        if (
          $reservation["start"] >= $interval["from"] && $reservation["start"] <= $interval["to"] ||
          $reservation["end"] > $interval["from"] && $reservation["end"] <= $interval["to"]
        ) {
          $time_intervals[$index]["capacity"] -=  (int)$reservation["numOfGuests"];
        }
      }
    }

    foreach ($time_intervals as $interval) {
      if ($interval["capacity"] >= $numOfGuests) {
        $free_intervals[] = $interval;
      }
    }


    return $free_intervals;
  }


  private function generateIntervalsByOpeningHours($date, $interval, $dayOfTheWeek)
  {
    $capacity = 10;
    $time_intervals = [];
    $openTime = strtotime($date . " " . $dayOfTheWeek["start"]);
    $closeTime = strtotime($date .  " " . $dayOfTheWeek["end"]);
    $currentTime = $openTime;


    while ($currentTime <  $closeTime) {
      $time_intervals[] = [
        "date" => $date,
        "from" =>  $currentTime,
        "to" => $currentTime + $interval,
        "capacity" =>  $capacity
      ];

      $currentTime += $interval;
    }

    return $time_intervals;
  }


  private function getOpeningHoursByDay($day)
  {
    $stmt = $this->pdo->prepare("SELECT * FROM opening_hours WHERE day = :day");
    $stmt->bindParam(":day", $day);
    $stmt->execute();
    $dayOfTheWeek = $stmt->fetch(PDO::FETCH_ASSOC);

    return $dayOfTheWeek;
  }


  private function getReservations($date)
  {

    // nyitvatartás lekérése dátum alapján
    // megnézzük hogy van e foglalás arra a napra
    // Megnézzük a foglalás alapján a kapacitást,
    // Kapacitás és az új foglalás vendégszáma alapján ki küldjük az intervallumokat

    $stmt = $this->pdo->prepare("SELECT * FROM reservations WHERE date = :date");
    $stmt->bindParam(":date", $date);
    $stmt->execute();
    $reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $reservations;
  }


  private function getPublicHolidaysByDate($date)
  {
    $stmt = $this->pdo->prepare("SELECT * FROM public_holidays WHERE date = :date");
    $stmt->bindParam(":date", $date);
    $stmt->execute();
    $holiday = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!isset($holiday) && count($holiday) === 0) {
      return false;
    }
    return $holiday;
  }
}
