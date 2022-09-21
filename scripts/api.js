async function getAllPhotographers () {
    const data = await fetch("../data/photographers.json").then(response => {
        return response.json();
    }).then(jsondata => { return jsondata.photographers });
    return data
}

async function getPhotographerById (id) {
    const data = await fetch("../data/photographers.json").then(response => {
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

async function getMediaByPhotographerIdSortByPopularity(id){
    const data = await fetch("../data/photographers.json").then(response => {
        return response.json();
    }).then(jsondata => { 
        let array_media = [];
        for(let i=0; i<jsondata.media.length; i++){
            if(jsondata.media[i].photographerId == id){
                array_media.push(jsondata.media[i])
            }
        }
        return array_media.sort(comparePopularity)
    });
    return data
}

async function getMediaByPhotographerIdSortByDate(id){
    const data = await fetch("../data/photographers.json").then(response => {
        return response.json();
    }).then(jsondata => { 
        let array_media = [];
        for(let i=0; i<jsondata.media.length; i++){
            if(jsondata.media[i].photographerId == id){
                array_media.push(jsondata.media[i])
            }
        }
        return array_media.sort(compareDate)
    });
    return data
}

async function getMediaByPhotographerIdSortByTitle(id){
    const data = await fetch("../data/photographers.json").then(response => {
        return response.json();
    }).then(jsondata => { 
        let array_media = [];
        for(let i=0; i<jsondata.media.length; i++){
            if(jsondata.media[i].photographerId == id){
                array_media.push(jsondata.media[i])
            }
        }
        return array_media.sort((media1,media2)=>media1.title.localeCompare(media2.title))
    });
    return data
}

async function getMediaByPhotographerIdAndMediaId(idMedia,idPhotographer){
    const data = await fetch("../data/photographers.json").then(response => {
        return response.json();
    }).then(jsondata => { 
        let i=0;
        let estTrouve = false;
        while ( i<jsondata.media.length && !estTrouve) {
            if(jsondata.media[i].id == idMedia && jsondata.media[i].photographerId == idPhotographer){
                estTrouve = true;
            }else{
                i++;
            }
        }
        return jsondata.media[i]
    });
    return data
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

function comparePopularity(media1,media2){
    if(media1.likes > media2.likes){
        return -1;
    }else if(media1.likes < media2.likes){
        return 1;
    }else{
        return 0;
    }
}

function compareDate(media1,media2){
    if(media1.date > media2.date){
        return -1;
    }else if(media1.date < media2.date){
        return 1;
    }else{
        return 0;
    }
}
