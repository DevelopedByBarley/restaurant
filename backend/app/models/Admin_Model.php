<?php
require 'app/helpers/GenerateToken.php';
require 'app/services/AuthService.php';

class AdminModel
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


  public  function getAdminData() {
    $token = AuthService::getTokenFromHeaderOrSendErrorResponse();
    $decoded = AuthService::decodeJwtOrSendErrorResponse($token);

    echo json_encode([
      "admin" => $decoded
    ]);
  }

}
