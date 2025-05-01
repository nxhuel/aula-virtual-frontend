document.getElementById("passwordForm").addEventListener("submit", (event) => {
    event.preventDefault(); 

    const oldPass = document.getElementById("oldPassword").value;
    const newPass = document.getElementById("newPassword").value;
    const repeatPass = document.getElementById("repeatPassword").value;

    if (newPass !== repeatPass) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const credentials = sessionStorage.getItem("credentials");

    fetch("http://localhost:8080/v1/api/auth/change-password", {
        method: "PUT",
        headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            oldPassword: oldPass,
            newPassword: newPass
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al cambiar la contraseña");
        return res.text();
    })
    .then(msg => {
        alert(msg);
        window.location.href = "/router/alumnos.html";
    })
    .catch(err => alert("No se pudo cambiar la clave: " + err.message));
});
