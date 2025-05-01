const form = document.getElementById("loginForm");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dni = document.getElementById("dni").value;
    const password = document.getElementById("clave").value;
    const credentials = btoa(`${dni}:${password}`);

    // const apiDeploy = "https://ifts21.up.railway.app/v1/api/auth/user-logged";
    const api = "http://localhost:8080/v1/api/auth/user-logged";

    try {
        const response = await fetch(api, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`
            }
        });

        if (!response.ok) {
            throw new Error("Usuario o Clave incorrecto");
        }

        const user = await response.json();
        sessionStorage.setItem("credentials", credentials);
        sessionStorage.setItem("roles", user.roles);

        if(user.roles.includes("ADMIN") && user.roles.includes("PROFESSOR")) {
            window.location.href = "./administracion/dashboard.html";
        } else if(user.roles.includes("STUDENT")) {
            window.location.href = "./panel/panel.html";
        } else {
            throw new Error("Rol no autorizado");
        }
    } catch (err) {
        resultado.textContent = err.message;
    }
})