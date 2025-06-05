<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $asunto = $_POST['asunto'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'mail.catamaran-360.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'system@catamaran-360.com';
        $mail->Password = '2mu}ugE-+Kk&';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('system@catamaran-360.com', 'Web Catamarán 360');
        $mail->addAddress('reservas@catamaran-360.com');

        $mail->Subject = "Nuevo mensaje de contacto - $asunto";
        $mail->Body = "Nombre: $nombre\nCorreo: $email\nTeléfono: $telefono\n\nMensaje:\n$mensaje";

        $mail->send();
        echo "Mensaje enviado con éxito.";
    } catch (Exception $e) {
        echo "Error al enviar el mensaje: {$mail->ErrorInfo}";
    }
}
?>
