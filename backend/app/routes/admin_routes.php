<?php
require './app/controllers/Admin_Controller.php';


$r->addRoute('GET', '/admin/new-token', [AuthService::class, 'getNewAccessToken']);


$r->addRoute('POST', '/admin/login', [AdminController::class, 'login']);
$r->addRoute('POST', '/admin/register', [AdminController::class, 'register']);
