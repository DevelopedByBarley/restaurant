<?php
require 'app/helpers/GenerateToken.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService
{
  protected $pdo;

  public function __construct()
  {
    $db = new Database();
    $this->pdo = $db->getConnect();
  }

  public function registerAdmin($body)
  {
    $adminId = uniqid();
    $name = $body["name"] ??  '';
    $password = password_hash(filter_var($body["password"] ?? '', FILTER_SANITIZE_SPECIAL_CHARS), PASSWORD_DEFAULT);
    $createdAt = time();

    $stmt =  $this->pdo->prepare("SELECT * FROM `admins` WHERE `name` = :name");
    $stmt->bindParam(":name", $name);
    $stmt->execute();
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin) {
      echo json_encode([
        "message" => "Admin register problem!!"
      ]);
      exit;
    }


    $stmt = $this->pdo->prepare("INSERT INTO `admins` VALUES (NULL, :adminId, :name, :password, :createdAt);");
    $stmt->bindParam(":adminId", $adminId);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":password", $password);
    $stmt->bindParam(":createdAt", $createdAt);
    $stmt->execute();

    if ($this->pdo->lastInsertId()) {
      echo json_encode([
        "message" => "Admin registered successfully!"
      ]);
    }
  }

  public function loginAdmin($body)
  {
    $name = filter_var($body["name"] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
    $password =  filter_var($body["password"] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);

    $stmt =  $this->pdo->prepare("SELECT * FROM `admins` WHERE `name` = :name");
    $stmt->bindParam(":name", $name);
    $stmt->execute();
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$admin) {
      echo "Admin name or password error!";
      exit;
    }

    $isVerified = password_verify($password, $admin["password"]);

    if (!$isVerified) {
      echo "Admin name or password error!";
      exit;
    }

    $accessToken = GenerateToken::generateAccessToken($admin);
    $refreshToken = GenerateToken::generateRefreshToken($admin);



    setcookie('restaurantRefreshToken', $refreshToken, [
      'expires' => time() + 60 * 60 * 24 * 30,
      'path' => "/",
      'httponly' => true,
      'secure' => true,
      'samesite' => 'None', // csak fejlesztési célokkal 'None', amúgy 'Lax'
    ]);


    echo json_encode([
      "accessToken" => $accessToken
    ]);
  }

  public function logoutAdmin()
  {
    setcookie('restaurantRefreshToken', false, [
      'expires' => 1,
      'path' => "/",
      'httponly' => true,
      'secure' => true,
      'samesite' => 'None', // csak fejlesztési célokkal 'None', amúgy 'Lax'
    ]);

    echo json_encode([
      "message" => "Kijelentkezés sikeres!"
    ]);
  }


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
