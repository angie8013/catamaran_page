// contacto.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // evita el envío por defecto

        const formData = new FormData(form);
        const data = {};

        // Convertimos FormData a un objeto plano
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch("https://n8n.magnificapec.com/webhook/2700c999-c71d-431c-86a9-597c5ad21675", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
                }
                return response.json();
            })
            .then(result => {
                console.log("Webhook response:", result);
                alert("Mensaje enviado con éxito.");
                form.reset();
            })
            .catch(async (error) => {
                console.error("Error al enviar el formulario:", error);
                alert("Hubo un error al enviar el mensaje. Revisa la consola para más detalles.");
            });
    });
});
