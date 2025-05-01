const credentials = sessionStorage.getItem("credentials");

document.addEventListener("DOMContentLoaded", () => {
    const apiNotesConsultation = "http://localhost:8080/v1/api/notes";

    fetch(apiNotesConsultation, {
        method: 'GET',
        headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/json"
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }
            return res.json();
        })
        .then(notes => {
            // console.log("Notas cargadas:", notes);
            const tbody = document.getElementById("notesTableBody");
            notes.forEach(note => {
                if (note.finalCourseGrade !== null && note.finalExamGrade !== null) {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                    <td>${note.year}</td>
                    <td>${note.subject}</td>
                    <td>${note.startDateCourse}</td>
                    <td>${note.finalCourseGrade}</td>
                    <td>${note.finalDateCourse}</td> 
                    <td>${note.finalExamGrade}</td>`;
                    tbody.appendChild(tr);
                }
            });
        })
        .catch(err => console.error("Error al cargar notas:", err));
});