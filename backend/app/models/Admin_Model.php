<?php

class AdminModel
{


  public  function getAdminData()
  {
    $token = AuthService::getTokenFromHeaderOrSendErrorResponse();
    $decoded = AuthService::decodeJwtOrSendErrorResponse($token);

    echo json_encode([
      "admin" => $decoded
    ]);
  }

}
