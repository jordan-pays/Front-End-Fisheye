//Mettre le code JavaScript lié à la page photographer.html
class Photographer {
    constructor (photographer,medias){
        this.photographer = photographer;
        this.medias =medias;
        this.index =0;
    }
    
    displayInfoPhotographer() {
        const photographerInfo = document.querySelector(".container_info");
        const photographerPhoto = document.querySelector(".container_photo");
        
        const h2 = document.createElement( 'h1' );
        h2.setAttribute("tabindex", 0)
        h2.textContent = this.photographer.name;

        const header_modal = document.getElementById("header_modal")
        header_modal.innerText = this.photographer.name;
        
        const h3 = document.createElement( 'h2' );
        h3.textContent = this.photographer.city + ", " + this.photographer.country;
        h3.setAttribute("tabindex", 0)

        const h4 = document.createElement( 'h3' );
        h4.textContent = this.photographer.tagline;
        h4.setAttribute("tabindex", 0)

        photographerInfo.appendChild(h2);
        photographerInfo.appendChild(h3);
        photographerInfo.appendChild(h4);

        const img = document.createElement( 'img' );
        const picture = `assets/photographers/${this.photographer.portrait}`;
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo de profile de ${this.photographer.name}`)
        img.setAttribute("tabindex", 0)

        photographerPhoto.appendChild(img);
        const prices = document.querySelector(".prices");
        prices.textContent = this.photographer.price + "€/jour";

        const container_fixed = document.querySelector(".container_fixed");
        container_fixed.setAttribute("tabindex", 0)
    }
    
    displayMedia(){
        const mediaContainer = document.querySelector(".container_all_medias");
        mediaContainer.textContent = "";
        this.medias.forEach((media, i )=> {
            media.index = i;
            const mediaModel = new mediaFactory(media);
            const userCardDOM = mediaModel.getMediaCardDOM();
            mediaContainer.appendChild(userCardDOM);
            document.getElementById(`media_${i}`)?.addEventListener("click", (e) => {
                e.preventDefault()
                displayModalMedia()
                this.displayMediaModal(i)
            })
            document.getElementById(`media_${i}`)?.setAttribute("tabindex", 0)
            document.getElementById(`media_${i}`)?.addEventListener("keypress",(e)=>{
                if(media.video != undefined){
                    document.getElementById(`media_${i}`).pause()
                    document.getElementById(`media_${i}`).currentTime = 0;
                }
                if(e.key == "Enter"){
                    displayModalMedia()
                    this.displayMediaModal(i)
                }
            })

        });
    }

    displayMediaModal(index){
       const container_media = document.querySelector(".container_media_modal");
        const mediaModal = new mediaFactory(this.medias[index]);
        const userCardDOM = mediaModal.getModalCard()
        if(container_media.childElementCount == 0){
            container_media.appendChild(userCardDOM)
        }else {
            container_media.replaceChildren(container_media.firstChild,userCardDOM)
        }
        this.index  = index;
    }

    displayAll(){
        this.displayInfoPhotographer()
        this.displayMedia()
    }

}


async function init() {
    let photographerId = $_GET('id');
    const photographerInfo = await getPhotographerById(photographerId);
    const medias = await getMediaByPhotographerIdSortByPopularity(photographerId);
    const photographer = new Photographer(photographerInfo,medias);
    photographer.displayAll();
    
    const close = document.getElementById("close");
    close.addEventListener("keypress",(e)=>{
        if(e.key == 'Enter'){
            closeMediaModal()
        }
    })

    document.addEventListener('keydown',(e)=>{
        if(e.key == 'ArrowRight'){
            if(photographer.index==photographer.medias.length - 1){
                photographer.displayMediaModal(0)
            }else {
                photographer.displayMediaModal(photographer.index +1)
            }
        }else if(e.key == 'ArrowLeft'){
            if(photographer.index==0){
                photographer.displayMediaModal(photographer.medias.length - 1)
            }else {
                photographer.displayMediaModal(photographer.index -1)
            }
        }else if(e.key == "Escape"){
            closeMediaModal()
        }
    })

    const previous =  document.getElementById("previous")
    previous.addEventListener("click",()=>{
        if(photographer.index==0){
            photographer.displayMediaModal(photographer.medias.length - 1)
        }else {
            photographer.displayMediaModal(photographer.index -1)
        }
    })
    previous.addEventListener("keypress",(e)=>{
        if(e.key == "Enter"){
            if(photographer.index==0){
                photographer.displayMediaModal(photographer.medias.length - 1)
            }else {
                photographer.displayMediaModal(photographer.index -1)
            }
        }
    })

    const next =  document.getElementById("next")
    next.addEventListener("click",()=>{
        if(photographer.index==photographer.medias.length - 1){
            photographer.displayMediaModal(0)
        }else {
            photographer.displayMediaModal(photographer.index +1)
        }
    })
    next.addEventListener("keypress",(e)=>{
        if(e.key == "Enter"){
            if(photographer.index==photographer.medias.length - 1){
                photographer.displayMediaModal(0)
            }else {
                photographer.displayMediaModal(photographer.index +1)
            }
        }
    })
}

init();