class mediaFactory {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
        this.likes = data.likes;
        this.photographerId = data.photographerId;
        this.url = `assets/medias/${data.photographerId}/`;
        this.myLikes = false;
        this.index = data.index;
    }

    getMediaCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("id", this.id)
        const container_media = document.createElement('div');
        container_media.setAttribute("class", "container_media");

        let media;
        if (this.image != undefined) {
            media = this.getImageCardDOM();
        } else if (this.video != undefined) {
            media = this.getVideoCardDOM();
        }

        const container_media_info = document.createElement('div');
        container_media_info.setAttribute("class", "container_media_info");
        const h3 = document.createElement('h3');
        h3.textContent = this.title;
        const h4 = document.createElement('h4');
        const heart = document.createElement('a');
        const icon_heart = document.createElement('i');

        heart.addEventListener("click", async () => {
            if (this.myLikes == undefined || this.myLikes == false) {
                this.likes += 1;
                this.myLikes = true;
                icon_heart.setAttribute("class", "fa-solid fa-heart");
                heart.setAttribute("class", "heart--active");
                h4.textContent = this.likes;
                counter_likes.textContent = parseInt(counter_likes.textContent, 10) + 1;
            } else {
                this.likes -= 1;
                this.myLikes = false;
                icon_heart.setAttribute("class", "fa-regular fa-heart");
                heart.setAttribute("class", "heart");
                h4.textContent = this.likes;
                counter_likes.textContent = parseInt(counter_likes.textContent, 10) - 1;
            }
        })

        const counter_likes = document.querySelector(".count_likes");
        if (counter_likes.textContent.length == 0) {
            counter_likes.textContent = this.likes;
        } else {
            counter_likes.textContent = parseInt(counter_likes.textContent, 10) + this.likes;
        }
            
        h4.textContent = this.likes;
        icon_heart.setAttribute("class", "fa-regular fa-heart");
        heart.setAttribute("class", "heart");
        const div_heart = document.createElement('div');
        div_heart.setAttribute("class", "container_heart");

        container_media.appendChild(media)
        heart.appendChild(icon_heart)
        div_heart.appendChild(h4)
        div_heart.appendChild(heart)
        container_media_info.appendChild(h3);
        container_media_info.appendChild(div_heart);
        article.appendChild(container_media);
        article.appendChild(container_media_info)
        return (article);
    }

    getImageCardDOM() {
        const img = document.createElement('img');
        img.setAttribute("src", this.url + this.image)
        img.setAttribute("alt", `image s'intitulant ${this.title}`)
        img.setAttribute("id", `media_${this.index}`)
        return img
    }

    getVideoCardDOM() {
        const vid = document.createElement('video');
        vid.setAttribute("muted",true);
        vid.setAttribute("autoplay",true);
        vid.setAttribute("loop",true);
        vid.setAttribute("id", `media_${this.index}`);
        vid.setAttribute("oncontextmenu", false)
        const src = document.createElement('source');
        src.setAttribute("src", this.url + this.video)
        src.setAttribute("alt", `video s'intitulant ${this.title}`)
        src.setAttribute("type", "video/mp4")
        vid.appendChild(src)
        return (vid)
    }

    getModalCard() {
       let media;
       if (this.image != undefined) {
           media = this.getImageCardDOM();
       } else if (this.video != undefined) {
           media = this.getVideoCardDOM();
       }
       return media
    }

}