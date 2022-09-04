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

async function getMediaByPhotographerId(id){
    const data = await fetch("../data/photographers.json").then(response => {
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

async function addLike(idMedia,idPhotographer){
    const media = await getMediaByPhotographerIdAndMediaId(idMedia,idPhotographer);
    media.likes +=1;
    media.myLikes = true;
    console.log(media.likes)
}

async function removeLike(idMedia,idPhotographer){
    const media = await getMediaByPhotographerIdAndMediaId(idMedia,idPhotographer);
    media.likes -=1;
    media.myLikes = false;
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