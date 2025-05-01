// Cargar materias
document.getElementById("subjectForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const credentials = sessionStorage.getItem("credentials");
    const apiSubject = "http://localhost:8080/v1/api/subject";

    const subject = {
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
        const response = await fetch(apiSubject, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${credentials}`
            },
            body: JSON.stringify(subject)
        });

        if (!response.ok) throw new Error("Error al agregar la materia");

        document.getElementById("resultado").textContent = "Materia agregada correctamente";
        document.getElementById("subjectForm").reset();
    } catch (err) {
        document.getElementById("resultado").textContent = err.message;
    }
});

// Cargar notas
document.getElementById("notaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const credentials = sessionStorage.getItem("credentials");
    const api = "http://localhost:8080/v1/api/notes/upload";

    const nota = {
      subjectInscribedId: parseInt(document.getElementById("subjectInscribedId").value),
      finalCourseGrade: parseInt(document.getElementById("finalCourseGrade").value),
      finalExamGrade: parseInt(document.getElementById("finalExamGrade").value)
    };

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${credentials}`
        },
        body: JSON.stringify(nota)
      });

      if (!response.ok) throw new Error("Error al cargar la nota");

      document.getElementById("resultadoNota").textContent = "Nota cargada correctamente";
      document.getElementById("notaForm").reset();
    } catch (err) {
      document.getElementById("resultadoNota").textContent = err.message;
    }
  });