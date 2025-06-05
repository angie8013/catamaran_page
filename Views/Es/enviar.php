<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $asunto = htmlspecialchars($_POST['asunto']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    $para = ['gutierrezangietatiana@gmail.com']; // <-- Cambia tus correos aquí
    $asuntoCorreo = "Nuevo contacto: $asunto";
    $contenido = "Nombre: $nombre\nCorreo: $email\nTeléfono: $telefono\n\nMensaje:\n$mensaje";
    $cabeceras = "From: $email";

    $exito = true;
    foreach ($para as $destino) {
        if (!mail($destino, $asuntoCorreo, $contenido, $cabeceras)) {
            $exito = false;
        }
    }

    echo $exito ? "Mensaje enviado con éxito" : "Error al enviar";
} else {
    echo "Método no permitido";
}
?>
