<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class AuthService
{
  public static  function getTokenFromHeaderOrSendErrorResponse()
  {
    $headers = getallheaders(); // Hozzá jutunk az összes header információhoz
    $isFound = preg_match(  // Ki vágjuk az Authorization kulcs alatt levő értéket és megnézzük hogy létezik-e a Bearer
      '/Bearer\s(\S+)/',
      $headers['authorization'] ?? '',
      $matches
    );

    // Ha nincs benne akkor hibával visszatérünk
    if (!$isFound) {
      http_response_code(401);
      echo json_encode(['error' => 'unauthorized']);
      exit;
    }

    // Más esetben a tokennel
    return $matches[1];
  }


  //DECODING ACCESS OR REFRESHTOKEN
  public static function decodeJwtOrSendErrorResponse($token)
  {
    try {
      $decoded = JWT::decode($token, new Key($_SERVER['JWT_TOKEN_SECRET'], 'HS256'));
      return (array)$decoded;
    } catch (\Firebase\JWT\ExpiredException $err) {
      http_response_code(403);
      header('Content-type: application/json');
      echo json_encode(['error' => 'token expired']);
      exit;
    } catch (Exception $exception) {
      http_response_code(403);
      echo json_encode(['error' => 'validation failed']);
      exit;
    }
  }


  //GENERATE NEW ACCESSTOKEN BY REFRESHTOKEN
  public static function getNewAccessToken()
  {
    $decoded = self::decodeJwtOrSendErrorResponse($_COOKIE['restaurantRefreshToken']);

    $accessToken =  JWT::encode([
      "sub" => $decoded['sub'],
      "name" => $decoded['name'],
      "iat" => time(),
      "exp" => time() + 15,
    ], $_SERVER['JWT_TOKEN_SECRET'], 'HS256');

    echo json_encode(["accessToken" => $accessToken]);
  }
}
