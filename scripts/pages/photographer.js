//Mettre le code JavaScript lié à la page photographer.html
async function getInfoPhotographerById(id) {
    const data = await fetch("../../data/photographers.json").then(response => {
        return response.json();
    }).then(jsondata => { 
        let i=0;
        let estTrouve = false;
        while ( i<jsondata.photographers.length && !estTrouve) {
            if(jsondata.photographers[i].id == id){
                estTrouve = true;
            }else{
                i++;
            }
        }
        return jsondata.photographers[i]
    });
    return data
}


async function getMediaByPhotographerId(id){
    const data = await fetch("../../data/photographers.json").then(response => {
        return response.json();
    }).then(jsondata => { 
        let array_media = [];
        for(let i=0; i<jsondata.media.length; i++){
            if(jsondata.media[i].photographerId == id){
                array_media.push(jsondata.media[i])
            }
        }
        return array_media
    });
    return data
}

async function displayInfoPhotographer(info) {
    const photographerInfo = document.querySelector(".container_info");
    const photographerPhoto = document.querySelector(".container_photo");
    const h2 = document.createElement( 'h2' );
    h2.textContent = info.name;
    const h3 = document.createElement( 'h3' );
    h3.textContent = info.city + ", " + info.country;
    const h4 = document.createElement( 'h4' );
    h4.textContent = info.tagline;
    photographerInfo.appendChild(h2);
    photographerInfo.appendChild(h3);
    photographerInfo.appendChild(h4);
    const img = document.createElement( 'img' );
    const picture = `assets/photographers/${info.portrait}`;
    img.setAttribute("src", picture)
    img.setAttribute("alt", `photo de profile de ${info.name}`)
    photographerPhoto.appendChild(img);
    const prices = document.querySelector(".prices");
    prices.textContent = info.price + "€/jour"
};


async function displayMedia(array_media){
    const mediaContainer = document.querySelector(".container_all_medias");
    let count_likes=0;
    array_media.forEach(media => {
        count_likes +=  media.likes;
        const mediaModel = mediaFactory(media);
        const userCardDOM = mediaModel.getMediaCardDOM();
        // userCardDOM.addEventListener("click",()=>{window.location.href=`photographer.html?id=${photographer.id}`})
        mediaContainer.appendChild(userCardDOM);
    });
    const counter_likes = document.querySelector(".count_likes");
    counter_likes.textContent = count_likes;
}

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

async function init() {
    let photographerId = $_GET('id');
     const info = await getInfoPhotographerById(photographerId);
     displayInfoPhotographer(info);
     const medias = await getMediaByPhotographerId(photographerId);
     displayMedia(medias)
};

init();