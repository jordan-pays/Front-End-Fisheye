let lastFocus;
const closeCross = document.getElementById("close");

function displayModalMedia() {
    const modal = document.getElementById("media_modal");
	modal.style.display = "block";
    lastFocus= document.activeElement
    closeCross.focus()
}

function closeMediaModal() {
    const modal = document.getElementById("media_modal");
    modal.style.display = "none";
    lastFocus.focus()
}