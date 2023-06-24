<?php

use Firebase\JWT\JWT;

class GenerateToken
{


  public static function generateAccessToken($admin)
  {
    $accessToken = JWT::encode(
      [
        "iat" => time(),
        "exp" => time() + 15,
        "sub" => $admin["adminId"],
        "name" => $admin["name"],
      ],
      $_SERVER["JWT_TOKEN_SECRET"],
      'HS256'
    );

    return $accessToken;
  }

  public static function generateRefreshToken($admin)
  {
    $refreshToken = JWT::encode(
      [
        "iat" => time(),
        "exp" => time() + 60 * 60 * 24 * 30,
        "sub" => $admin["adminId"],
        "name" => $admin["name"],
      ],
      $_SERVER["JWT_TOKEN_SECRET"],
      'HS256'
    );

    return $refreshToken;
  }
}
