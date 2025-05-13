document.addEventListener("DOMContentLoaded", async () => {
    const credentials = sessionStorage.getItem("credentials");
    // const apiMyExamFinal = "http://localhost:8080/v1/api/final-exam-registrations/my-registrations";
    const apiMyExamFinalDeploy = "https://ifts21.up.railway.app/v1/api/final-exam-registrations/my-registrations";
    const tableBody = document.getElementById("examsTableBody");

    try {
        const response = await fetch(apiMyExamFinalDeploy, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`
            }
        });

        if (!response.ok) throw new Error("Error al obtener las inscripciones a finales");

        const inscripciones = await response.json();

        if (inscripciones.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5">No hay inscripciones a finales.</td></tr>`;
            return;
        }

        inscripciones.forEach((insc) => {
            const row = document.createElement("tr");

            row.innerHTML = `
        <td>${insc.registrationNumber}</td>
        <td>${insc.finalExam}</td>
        <td>${insc.subjectInscribed}</td>
        <td>${insc.professorName} ${insc.professorLastname}</td>
        <td>${insc.registrationDate}</td>
      `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
    }
});


function imprimirComprobante() {
    const tabla = document.querySelector(".banner").innerHTML;
    const ventana = window.open("", "_blank");

    ventana.document.write(`
    <html>
      <head>
        <title>Comprobante de Inscripción</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Comprobante de Inscripción a Exámenes Finales</h2>
        ${tabla}
      </body>
    </html>
  `);

    ventana.document.close();
    ventana.print();
}
