const routes = {
    "": "index.html",
    "carreras": "carreras.html",
};

function loadContent(route) {
    const path = routes[route] || "404.html"; 
    fetch(path)
        .then(response => response.text())
        .then(html => {
            document.getElementById("app").innerHTML = html;
        })
        .catch(() => {
            document.getElementById("app").innerHTML = "<h1>Error al cargar la página</h1>";
        });
}

// Manejar los cambios de "ruta"
document.addEventListener("DOMContentLoaded", () => {
    loadContent(location.pathname.substring(1));

    document.querySelectorAll("a[data-route]").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const path = event.target.getAttribute("href");
            history.pushState({}, "", path);
            loadContent(path);
        });
    });
});

// Detectar cambios en el historial
window.onpopstate = () => {
    loadContent(location.pathname.substring(1));
};

