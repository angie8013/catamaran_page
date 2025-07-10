document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reservationForm");
    const responseDiv = document.getElementById("form-response");
    const idioma = document.documentElement.lang || 'es';
    const inputTelefono = document.getElementById("telefono");
    const iti = window.intlTelInputGlobals.getInstance(inputTelefono);


    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Recolectar datos del formulario
        const formData = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            telefono: iti.getNumber().replace(/\+/g, ''),
            pais: document.getElementById("pais").value,
            experiencia: document.getElementById("experiencia").value,
            embarcacion: document.getElementById("embarcacion").value,
            fecha_llegada: document.getElementById("fecha").value,
            fecha_salida: document.getElementById("fecha-salida").value,
            personas: document.getElementById("personas").value,
            mensaje: document.getElementById("mensaje").value,
            terminos: document.getElementById("terminos").checked,
            idioma: idioma
        };

        try {
            const res = await fetch("https://n8n.magnificapec.com/webhook/175f322f-e859-43c3-b24e-1cc312b260a1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                responseDiv.textContent = "✅ Reserva enviada correctamente. Recibirás en breve un mensaje de confirmación al WhatsApp: " + formData.telefono + ". ¡Gracias!";
                form.reset();
            } else {
                responseDiv.textContent = "❌ Hubo un error al enviar la reserva.";
            }
        } catch (error) {
            console.error("Error al enviar al webhook:", error);
            responseDiv.textContent = "⚠️ Error de conexión al enviar la reserva.";
        }
    });
});
