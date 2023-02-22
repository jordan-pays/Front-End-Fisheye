// let lastFocus;
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    lastFocus = document.activeElement
    close_contact.focus()
}
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    lastFocus.focus()
}

const close_contact =document.getElementById("close_contact")

close_contact.tabIndex = 0

close_contact.addEventListener("keypress",(e)=>{
    if(e.key == "Enter"){
        closeModal()
    }
})

close_contact;addEventListener("keydown",(e)=>{
    if(e.key == "Escape"){
        closeModal()
    }
})

document.getElementById("submit").addEventListener("click",function(e){
    e.preventDefault()
    //Cette ligne permet de récuperer les nodes element qui ont pour query input et textarea contenu dans l'élément parent contact_form
    let arrInput = document.getElementById("contact_form").querySelectorAll("input, textarea")
   arrInput.forEach(input=>{
    console.log(`${input.name} : ${input.value}`)
   })
})