function cerrarSesion() {
    localStorage.removeItem("credentials");

    sessionStorage.clear(); 

    document.cookie.split(";").forEach(function(cookie) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=" + new Date(0).toUTCString();
    });

    window.location.replace("/index.html"); 
}
