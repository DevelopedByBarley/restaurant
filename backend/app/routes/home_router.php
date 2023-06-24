<?php
require './app/controllers/Home_Controller.php';


$r->addRoute('GET', '/', [HomeHandler::class, 'render']);
