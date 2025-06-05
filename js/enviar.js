const response = await fetch("https://n8n.magnificapec.com/webhook/2700c999-c71d-431c-86a9-597c5ad21675", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        "Email": "gutierrezangietatiana@gmail.com",
        "Full_Name": "Angie Tatiana",
        "Message": "Hola mundo",
        "Subjet": "Esto e   s sijeto"
        

    })
});
