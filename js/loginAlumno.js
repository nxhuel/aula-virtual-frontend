const form = document.getElementById("loginForm");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dni = document.getElementById("dni").value;
    const password = document.getElementById("clave").value;
    const credentials = btoa(`${dni}:${password}`); 

    try {
        const response = await fetch("http://localhost:8080/v1/api/auth/user-logged", {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`
            }
        });

        if (!response.ok) {
            throw new Error("Usuario o Clave incorrecto");
        } 

        sessionStorage.setItem("credentials", credentials);
        window.location.href = "./panel/panel.html";
    } catch (err) {
        resultado.textContent = err.message;
    }
})