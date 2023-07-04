<?php
require 'app/controllers/User_Controller.php';


$r->addRoute('POST', '/reservation/new', [UserController::class, 'sendNewReservation']);
