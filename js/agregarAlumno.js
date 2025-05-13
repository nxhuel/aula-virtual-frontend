const credentials = sessionStorage.getItem("credentials");

document.getElementById("formAlumno").addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        dni: this.dni.value,
        legajo: this.legajo.value,
        username: this.username.value,
        lastname: this.lastname.value,
        password: this.password.value,
        roleId: [1],
        academicPlan: this.academicPlan.value
    };

    // const apiCreateStudent = "http://localhost:8080/v1/api/user/student";
    const apiCreateStudentDeploy = "https://ifts21.up.railway.app/v1/api/user/student";

    try {
        const response = await fetch(apiCreateStudentDeploy, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${credentials}`
            },
            body: JSON.stringify(data)
        });

        // const result = await response.json();
        // alert("Alumno creado: " + JSON.stringify(result));

        if (!response.ok) throw new Error("Error al agregar estudiante");

        document.getElementById("resultadoEstudianteCreado").textContent = "Estudiante agregado correctamente ✅";
        document.getElementById("formAlumno").reset();
    } catch (err) {
        document.getElementById("resultadoEstudianteCreado").textContent = err.message;

    }
});