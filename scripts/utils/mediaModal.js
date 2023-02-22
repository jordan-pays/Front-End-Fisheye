let lastFocus;

function displayMediaModal() {
    const modal = document.getElementById("media_modal");
	modal.style.display = "block";
    lastFocus= document.activeElement
}

function closeMediaModal() {
    const modal = document.getElementById("media_modal");
    modal.style.display = "none";
    lastFocus.focus()
}