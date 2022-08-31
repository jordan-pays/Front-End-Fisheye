function mediaFactory(data) {
    const { id,title, image,video,likes,photographerId } = data;
    const url = `assets/medias/${photographerId}/`
    function getMediaCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("id", id)
        const container_media = document.createElement( 'div' );
        container_media.setAttribute("class", "container_media");
        
        let media;
        if(image!=undefined){
            media=getImageCardDOM();
        }else if (video !=undefined){
            media=getVideoCardDOM();
        }
        container_media.appendChild(media)
        const container_media_info = document.createElement( 'div' );
        container_media_info.setAttribute("class", "container_media_info");
        const h3 = document.createElement( 'h3' );
        h3.textContent = title;
        const h4 = document.createElement( 'h4' );
        h4.textContent = likes;
        container_media_info.appendChild(h3);
        container_media_info.appendChild(h4);
        article.appendChild(container_media);
        article.appendChild(container_media_info)
        return (article);
    }

    function getImageCardDOM(){
        const img = document.createElement( 'img' );
        img.setAttribute("src", url+image)
        img.setAttribute("alt", `image s'intitulant ${title}`)
        return img
    }

    function getVideoCardDOM(){
        const vid =document.createElement('video');
        vid.setAttribute("controls",true);
        const src = document.createElement('source');
        src.setAttribute("src", url+video)
        src.setAttribute("alt", `video s'intitulant ${title}`)
        src.setAttribute("type","video/mp4")
        vid.appendChild(src)
        return (vid)
    }
    return { getMediaCardDOM }
}