const credentials = sessionStorage.getItem("credentials");
let enrolledSubjects = [];

// Obtener las materias existentes desde el backend y mostrarlas en la tabla

document.addEventListener("DOMContentLoaded", () => {
    const apiSubjects = "http://localhost:8080/v1/api/subject";
    const apiCourseConsultation = "http://localhost:8080/v1/api/courses";

    // Materias inscritas
    fetch(apiCourseConsultation, {
        headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(inscribed => {
            console.log("Materias inscriptas:", inscribed);

            enrolledSubjects = inscribed.map(course => course.name);

            // Todas las materias existentes (no inscriptas)
            return fetch(apiSubjects, {
                headers: {
                    "Authorization": `Basic ${credentials}`,
                    "Content-Type": "application/json"
                }
            });
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }
            return res.json();
        })
        .then(subjects => {
            // console.log("Materias cargadas:", subjects);
            const availableSubjects = subjects.filter(
                subject => !enrolledSubjects.includes(subject.name)
            );
            const tbody = document.getElementById("subjectsTableBody");
            availableSubjects.forEach(subject => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
            <td>${subject.code}</td>
            <td>${subject.year}</td>
            <td>${subject.period}</td>
            <td>${subject.name}</td>
            <td>${subject.professorName} ${subject.professorLastname}</td>
            <td><input type="checkbox" name="subject" value="${subject.code}"></td>
        `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => console.error("Error al cargar materias:", err));
});

// Metodo para enviar las materias seleccionadas al backend
function enviarMaterias() {
    const apiSubjectInscribed = "http://localhost:8080/v1/api/courses";

    const selectedSubjects = Array.from(document.querySelectorAll('input[name="subject"]:checked'))
        .map(input => parseInt(input.value));

    if (selectedSubjects.length === 0) {
        alert("Por favor selecciona al menos una materia.");
        return;
    }

    fetch(apiSubjectInscribed, {
        method: 'POST',
        headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ subjectCode: selectedSubjects })
    })
        .then(res => {
            if (res.ok) {
                alert("¡Inscripción exitosa!");
                location.reload();
            } else {
                alert("Error al inscribirse.");
            }
        });
}