// card links

function changeImage(imageSrc, cardTitle, cardText, linkHref) {
    document.getElementById("displayImage").src = imageSrc;
    document.getElementById("cardTitle").textContent = cardTitle;
    document.getElementById("cardText").textContent = cardText;
    document.getElementById("cardLink").href = linkHref;
}