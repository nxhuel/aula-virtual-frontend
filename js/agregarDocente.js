document.getElementById("formProfesor").addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        dni: this.dni.value,
        legajo: this.legajo.value,
        username: this.username.value,
        lastname: this.lastname.value,
        password: this.password.value,
        roleId: [3],
        professorTitle: this.professorTitle.value,
        contract: this.contract.value,
        contractPdf: this.contractPdf.value
    };

    const apiCreateProfessorDeploy = "https://ifts21.up.railway.app/v1/api/user/professor";
    // const apiCreateProfessor = "http://localhost:8080/v1/api/user/professor";

    try {
        const response = await fetch(apiCreateProfessorDeploy, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${credentials}`
            },
            body: JSON.stringify(data)
        });

        // const result = await response.json();
        // alert("Profesor creado: " + JSON.stringify(result));

        if (!response.ok) throw new Error("Error al agregar al profesor/a");

        document.getElementById("resultadoProfesorCreado").textContent = "Profesor/a agregado correctamente ✅";
        document.getElementById("formProfesor").reset();
    } catch (err) {
        document.getElementById("resultadoProfesorCreado").textContent = err.message;
    }
});