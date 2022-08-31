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
        let count_likes=0;
        this.medias.forEach(media => {
            count_likes +=  media.likes;
            const mediaModel = mediaFactory(media);
            const userCardDOM = mediaModel.getMediaCardDOM();
            // userCardDOM.addEventListener("click",()=>{window.location.href=`photographer.html?id=${photographer.id}`})
            mediaContainer.appendChild(userCardDOM);
        });
        const counter_likes = document.querySelector(".count_likes");
        counter_likes.textContent = count_likes;
    }

    displayAll(){
        this.displayInfoPhotographer()
        this.displayMedia()
    }
}


async function init() {
    let photographerId = $_GET('id');
    const photographerInfo = await getPhotographerById(photographerId);
    const medias = await getMediaByPhotographerId(photographerId);
    const photographer = new Photographer(photographerInfo,medias)
    photographer.displayAll()
};

init();