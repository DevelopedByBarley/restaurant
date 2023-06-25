<?php
require './app/controllers/Admin_Controller.php';


$r->addRoute('GET', '/admin/token', [AuthService::class, 'getNewAccessToken']);
$r->addRoute('GET', '/admin/getMe', [AdminController::class, 'getMe']);
$r->addRoute('GET', '/admin/logout', [AdminController::class, 'logout']);


$r->addRoute('POST', '/admin/login', [AdminController::class, 'login']);
$r->addRoute('POST', '/admin/register', [AdminController::class, 'register']);
