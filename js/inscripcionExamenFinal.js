const credentials = sessionStorage.getItem("credentials");
let registeredSubjects = [];

document.addEventListener("DOMContentLoaded", () => {
  // const apiFinalExams = "http://localhost:8080/v1/api/final-exams";
  // const apiMyRegistrations = "http://localhost:8080/v1/api/final-exam-registrations/my-registrations";

  const apiFinalExamsDeploy = "https://ifts21.up.railway.app/v1/api/final-exams";
  const apiMyRegistrationsDeploy = "https://ifts21.up.railway.app/v1/api/final-exam-registrations/my-registrations";

  fetch(apiMyRegistrationsDeploy, {
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(myFinals => {
      registeredSubjects = myFinals.map(f => f.subjectInscribed);

      return fetch(apiFinalExamsDeploy, {
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/json"
        }
      });
    })
    .then(res => res.json())
    .then(allFinals => {
      const availableFinals = allFinals.filter(
        exam => !registeredSubjects.includes(exam.subject)
      );

      const tbody = document.getElementById("examsTableBody");
      availableFinals.forEach((exam, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${exam.academicPlanEnum ?? "-"}</td>
          <td>${exam.subject}</td>
          <td>${exam.finalDate ?? "-"}</td>
          <td>
            <input type="checkbox" name="finalExam" value="${index}">
            <input type="hidden" id="subject-${index}" value="${exam.subject}">
            <input type="hidden" id="date-${index}" value="${exam.finalDate}">
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => console.error("Error al cargar los exámenes:", err));
});

// Enviar inscripción
function enviarFinales() {
  // const apiFinalExamsRegistration = "http://localhost:8080/v1/api/final-exams-registrations";
  const apiFinalExamsRegistrationDeploy = "https://ifts21.up.railway.app/v1/api/final-exam-registrations";
  const checkboxes = Array.from(document.querySelectorAll('input[name="finalExam"]:checked'));

  if (checkboxes.length === 0) {
    alert("Por favor seleccioná al menos un examen final.");
    return;
  }

  const promises = checkboxes.map(checkbox => {
    const index = checkbox.value;
    const subject = document.getElementById(`subject-${index}`).value;
    const date = document.getElementById(`date-${index}`).value;

    return fetch(apiFinalExamsRegistrationDeploy, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        subjectInscribed: subject,
        finalExam: date
      })
    });
  });

  Promise.all(promises)
    .then(responses => {
      responses.forEach(async (res, i) => {
        if (!res.ok) {
          const text = await res.text(); // Mostrar detalle del error
          console.error(`❌ Error en la inscripción #${i + 1}:`, res.status, text);
        }
      });

      const allSuccessful = responses.every(res => res.ok);

      if (allSuccessful) {
        alert("¡Inscripción a todos los finales exitosa!");
        location.reload();
      } else {
        alert("Algunas inscripciones fallaron. Revisá los datos.");
      }
    })
    .catch(err => {
      console.error("Error durante la inscripción:", err);
      alert("Error al procesar la inscripción.");
    });
}
