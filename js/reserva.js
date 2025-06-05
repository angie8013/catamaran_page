// reserva.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reservationForm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const WEBHOOK_URL = "https://n8n.magnificapec.com/webhook/fcc8285d-14a0-48b0-81ae-ac9cfd9641d9";

        const data = {
            nombre: document.getElementById("nombre").value.trim(),
            email: document.getElementById("email").value.trim(),
            telefono: document.getElementById("telefono").value.trim(),
            pais: document.getElementById("pais").value.trim(),
            experiencia: document.getElementById("experiencia").value,
            embarcacion: document.getElementById("embarcacion").value,
            fecha: document.getElementById("fecha").value,
            fecha_salida: document.getElementById("fecha-salida").value,
            personas: document.getElementById("personas").value,
            mensaje: document.getElementById("mensaje").value.trim(),
            terminos: document.getElementById("terminos").checked
        };

        const headers = {
            "Content-Type": "application/json"
        };

        const startTime = performance.now();

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            });

            const endTime = performance.now();
            const duration = ((endTime - startTime) / 1000).toFixed(3);

            const responseText = await response.text();

            console.log("Status Code:", response.status);
            console.log("Response:", responseText);
            console.log("Tiempo de la petición:", duration, "segundos");

            if (response.ok) {
                alert("✅ Tu solicitud fue enviada con éxito.\n" + responseText);
                form.reset();
            } else {
                alert("❌ Error del servidor:\n" + responseText);
            }
        } catch (error) {
            console.error("Error al enviar la petición:", error);
            alert("❌ Error al enviar el formulario: " + error.message);
        }
    });
});
