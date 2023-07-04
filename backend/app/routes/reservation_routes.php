<?php


require 'app/controllers/Reservation_Controller.php';


$r->addRoute('POST', '/reservations', [ReservationController::class, 'getReservationsByDate']);
