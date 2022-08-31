class mediaFactory {
    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
        this.likes = data.likes;
        this.photographerId = data.photographerId;
        this.url = `assets/medias/${data.photographerId}/`
    }

    getMediaCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("id", this.id)
        const container_media = document.createElement( 'div' );
        container_media.setAttribute("class", "container_media");
        let media;
        if(this.image!=undefined){
            media= this.getImageCardDOM();
        }else if (this.video !=undefined){
            media= this.getVideoCardDOM();
        }
        container_media.appendChild(media)
        const container_media_info = document.createElement( 'div' );
        container_media_info.setAttribute("class", "container_media_info");
        const h3 = document.createElement( 'h3' );
        h3.textContent = this.title;
        const h4 = document.createElement( 'h4' );
        h4.textContent = this.likes;
        const heart = document.createElement( 'span' );
        heart.setAttribute("class", "heart fa-stack");
        const black_heart =  document.createElement( 'i' );
        black_heart.setAttribute("class", "fa-regular fa-heart fa-stack-1x");
        const heart_active = document.createElement( 'span' );
        heart_active.setAttribute("class","heart--active");
        const red_heart = document.createElement( 'i' );
        red_heart.setAttribute("class", "fa-solid fa-heart fa-stack-1x");
        heart.appendChild(black_heart)
        heart_active.appendChild(red_heart)
        heart.appendChild(heart_active)
        const div_heart = document.createElement( 'div' );
        div_heart.setAttribute("class", "container_heart");
        div_heart.appendChild(h4)
        div_heart.appendChild(heart)
        container_media_info.appendChild(h3);
        container_media_info.appendChild(div_heart);
        article.appendChild(container_media);
        article.appendChild(container_media_info)
        return (article);
    }

    getImageCardDOM() {
        const img = document.createElement( 'img' );
        img.setAttribute("src", this.url + this.image)
        img.setAttribute("alt", `image s'intitulant ${this.title}`)
        return img
    }

    getVideoCardDOM() {
        const vid =document.createElement('video');
        vid.setAttribute("controls",true);
        const src = document.createElement('source');
        src.setAttribute("src", this.url + this.video)
        src.setAttribute("alt", `video s'intitulant ${this.title}`)
        src.setAttribute("type","video/mp4")
        vid.appendChild(src)
        return (vid)
    }

}