function waitForElement(selector, timeout = 3000) {
    return new Promise((resolve, reject) => {
        const intervalTime = 100;
        let timePassed = 0;

        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve(element);
            } else if ((timePassed += intervalTime) >= timeout) {
                clearInterval(interval);
                reject(new Error(`Elemento ${selector} no encontrado`));
            }
        }, intervalTime);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    // const userElement = document.getElementById("user-name");
    const credentials = sessionStorage.getItem("credentials");
    const apiDeploy = "https://ifts21.up.railway.app/v1/api/auth/user-logged";
    // const api = "http://localhost:8080/v1/api/auth/user-logged";

    if (!credentials) {
        console.warn("No hay credenciales. Redirigiendo al login...");
        window.location.replace("/router/alumnos.html");
        return;
    }

    try {
        const response = await fetch(apiDeploy, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`
            }
        });

        if (!response.ok) throw new Error("No se pudo obtener el usuario");

        const user = await response.json();

        const userElement = await waitForElement("#user-name");
        userElement.textContent = `${user.username} ${user.lastname}`;

    } catch (err) {
        console.log(err);
        const fallbackElement = document.querySelector("#user-name");
        if (fallbackElement) {
            fallbackElement.textContent = "Desconocido";
        }
    }
});