$date = strtotime('2023-06-26');
$day_of_week = date('l', $date);
$capacity = 10;
$interval = 2 * 60 * 60;





$reservations = [
  [
    "date" => strtotime('2023-06-26'),
    "from"  => strtotime('10:00'),
    "to" => strtotime('12:00'),
    "numOfGuests" => 5
  ],
  [
    "date" => strtotime('2023-06-26'),
    "from"  => strtotime('10:00'),
    "to" => strtotime('12:00'),
    "numOfGuests" => 2
  ]
];


$newReservation = [
  "date" => strtotime('2023-06-26'),
  "from"  => strtotime('10:00'),
  "to" => strtotime('12:00'),
  "numOfGuests" => 3
];


$opening_hours = [
  'Monday' => ['10:00', '22:00'],
  'Tuesday' => ['10:00', '22:00'],
  'Wednesday' => ['10:00', '22:00'],
  'Thursday' => ['10:00', '22:00'],
  'Friday' => ['10:00', '22:00'],
  'Saturday' => ['12:00', '18:00'],
  'Sunday' => ['closed', 'closed']
];

$time_intervals = [];
$free_intervals = [];

if (array_key_exists($day_of_week, $opening_hours)) {
  $start_time = $opening_hours[$day_of_week][0];
  $end_time = $opening_hours[$day_of_week][1];
  if ($start_time !== 'closed' && $end_time !== 'closed') {

    $start = strtotime($start_time);
    $end = strtotime($end_time);
    $current = $start;
    while ($current <  $end) {
      $time_intervals[] = [
        "date" => $date,
        "from" =>  $current,
        "to" => $current +  $interval,
        "capacity" =>  $capacity
      ];

      $current += 2 * 3600;
    }
  } else {
    echo "A mai nap zárva van.";
  }
}

foreach ($reservations as $reservation) {
  foreach ($time_intervals as $index => $interval) {
    if (
      $reservation["from"] >= $interval["from"] && $reservation["from"] <= $interval["to"] ||
      $reservation["to"] > $interval["from"] && $reservation["to"] <= $interval["to"]
    ) {
      $time_intervals[$index]["capacity"] -=  (int)$reservation["numOfGuests"];
    }
  }
}

foreach ($time_intervals as $interval) {
  if($interval["capacity"] >= $newReservation["numOfGuests"]) {
    $free_intervals[] = $interval;
  }
}


var_dump($free_intervals);




// LÉPÉSEK

1. Nyitvatartás  lekérdezése dátum alapján,
2. Foglalások lekérdezése dátum alapján
3. 