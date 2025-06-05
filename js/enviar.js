document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    const responseDiv = document.getElementById("form-response");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const WEBHOOK_URL = "https://n8n.magnificapec.com/webhook/78eb8e66-d0eb-498b-86c8-4137f4f1e67b";

        const data = {
            Full_Name: document.getElementById("Full_Name").value.trim(),
            Email: document.getElementById("Email").value.trim(),
            Phone: document.getElementById("Phone").value.trim(),
            Subjet: document.getElementById("Subjet").value,
            Message: document.getElementById("Message").value.trim()
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
                responseDiv.textContent = "✅ Respuesta del servidor: " + responseText;
                responseDiv.style.color = "green";
                form.reset();
            } else {
                responseDiv.textContent = "❌ Error del servidor: " + responseText;
                responseDiv.style.color = "red";
            }
        } catch (error) {
            console.error("Error al enviar la petición:", error);
            responseDiv.textContent = "❌ Error al enviar el formulario: " + error.message;
            responseDiv.style.color = "red";
        }
    });
});