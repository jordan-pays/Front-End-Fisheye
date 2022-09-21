//Mettre le code JavaScript lié à la page photographer.html
class Photographer {
    constructor (photographer,medias){
        this.photographer = photographer;
        this.medias =medias;
    }
    
    displayInfoPhotographer() {
        const photographerInfo = document.querySelector(".container_info");
        const photographerPhoto = document.querySelector(".container_photo");
        const h2 = document.createElement( 'h2' );
        h2.textContent = this.photographer.name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = this.photographer.city + ", " + this.photographer.country;
        const h4 = document.createElement( 'h4' );
        h4.textContent = this.photographer.tagline;
        photographerInfo.appendChild(h2);
        photographerInfo.appendChild(h3);
        photographerInfo.appendChild(h4);
        const img = document.createElement( 'img' );
        const picture = `assets/photographers/${this.photographer.portrait}`;
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo de profile de ${this.photographer.name}`)
        photographerPhoto.appendChild(img);
        const prices = document.querySelector(".prices");
        prices.textContent = this.photographer.price + "€/jour"
    };
    
    displayMedia(){
        const mediaContainer = document.querySelector(".container_all_medias");
        mediaContainer.textContent = "";
        this.medias.forEach((media, i )=> {
            media.index = i;
            const mediaModel = new mediaFactory(media);
            const userCardDOM = mediaModel.getMediaCardDOM();
            mediaContainer.appendChild(userCardDOM);
            document.getElementById(`media_${i}`)?.addEventListener("click", () => {
                displayMediaModal()
                this.displayMediaModal(i)
            })
        });
    }

    displayMediaModal(index){
       const container_media = document.querySelector(".container_media_modal");
        const mediaModal = new mediaFactory(this.medias[index]);
        const userCardDOM = mediaModal.getModalCard()
        console.log(userCardDOM)
        if(container_media.childElementCount == 0){
            container_media.appendChild(userCardDOM)
        }else {
            container_media.replaceChildren(container_media.firstChild,userCardDOM)
        }
        document.getElementById("previous").addEventListener("click",()=>{
            if(index==0){
                this.displayMediaModal(this.medias.length - 1)
            }else {
                this.displayMediaModal(index -1)
            }
        })
        document.getElementById("next").addEventListener("click",()=>{
            if(index==this.medias.length - 1){
                this.displayMediaModal(0)
            }else {
                this.displayMediaModal(index +1)
            }
        })
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
};

init();