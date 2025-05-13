// Cargar materias
document.getElementById("subjectForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const credentials = sessionStorage.getItem("credentials");
  // const apiSubject = "http://localhost:8080/v1/api/subject";
  const apiSubjectDeploy = "https://ifts21.up.railway.app/v1/api/subject";

  const subject = {
    academicPlan: document.getElementById("academicPlan").value,
    name: document.getElementById("name").value,
    year: document.getElementById("year").value,
    period: document.getElementById("period").value,
    startDateCourse: document.getElementById("startDateCourse").value,
    finalDateCourse: document.getElementById("finalDateCourse").value,
    professor: {
      dni: parseInt(document.getElementById("dniProfessor").value)
    }
  };

  try {
    const response = await fetch(apiSubjectDeploy, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}`
      },
      body: JSON.stringify(subject)
    });

    if (!response.ok) throw new Error("Error al agregar la materia");

    document.getElementById("resultado").textContent = "Materia agregada correctamente ✅";
    document.getElementById("subjectForm").reset();
  } catch (err) {
    document.getElementById("resultado").textContent = err.message;
  }
});

// Cargar examen final
document.getElementById("finalExamForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const credentials = sessionStorage.getItem("credentials");
  // const api = "http://localhost:8080/v1/api/final-exams";
  const apiDeploy = "https://ifts21.up.railway.app/v1/api/final-exams";

  const academicPlan = document.getElementById("academicPlanEnum").value;
  const subject = document.getElementById("subject").value.trim();
  const finalDate = document.getElementById("finalDate").value;

  if (!academicPlan || !subject || !finalDate) {
    document.getElementById("resultadoExamenFinal").innerText = "Por favor, completá todos los campos.";
    return;
  }

  const finalExam = {
    academicPlanEnum: academicPlan, 
    subject,
    finalDate,
  };

  try {
    const response = await fetch(apiDeploy, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}`
      },
      body: JSON.stringify(finalExam)
    });

    if (!response.ok) throw new Error("Error al cargar el examen final");

    console.log("Examen Final cargado:", finalExam);

    document.getElementById("resultadoExamenFinal").innerText = "Examen Final agregado con éxito ✅";
    document.getElementById("finalExamForm").reset();
  } catch (err) {
    document.getElementById("resultadoExamenFinal").textContent = err.message;
  }
});


// Cargar notas
document.getElementById("notaForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const credentials = sessionStorage.getItem("credentials");
  // const api = "http://localhost:8080/v1/api/notes/upload";
  const apiDeploy = "https://ifts21.up.railway.app/v1/api/notes/upload";

  const nota = {
    dni: document.getElementById("dni").value,
    subjectInscribed: document.getElementById("subjectInscribed").value,
    finalCourseGrade: parseInt(document.getElementById("finalCourseGrade").value),
    finalExamGrade: parseInt(document.getElementById("finalExamGrade").value)
  };

  try {
    const response = await fetch(apiDeploy, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}`
      },
      body: JSON.stringify(nota)
    });

    if (!response.ok) throw new Error("Error al cargar la nota");

    document.getElementById("resultadoNota").textContent = "Nota cargada correctamente ✅";
    document.getElementById("notaForm").reset();
  } catch (err) {
    document.getElementById("resultadoNota").textContent = err.message;
  }
});