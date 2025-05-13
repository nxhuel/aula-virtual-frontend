const credentials = sessionStorage.getItem("credentials");

document.addEventListener("DOMContentLoaded", () => {
    // const apiCourseConsultation = "http://localhost:8080/v1/api/courses";
    const apiCourseConsultationDeploy = "https://ifts21.up.railway.app/v1/api/courses";

    fetch(apiCourseConsultationDeploy, {
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
        .then(courses => {
            // console.log("Materias Inscriptas cargadas:", courses);
            const tbody = document.getElementById("coursesTableBody");
            courses.forEach(course => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${course.registrationNumber}</td>
                <td>${course.period}</td>
                <td>${course.name}</td>
                <td>${course.professorName} ${course.professorLastname}</td>
            `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => console.error("Error al cargar materias:", err));
});