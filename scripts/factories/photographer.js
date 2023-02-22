class photographerFactory {
    constructor(data){
        this.name = data.name;
        this.portrait = data.portrait;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.id = data.id;
        this.picture = `assets/photographers/${data.portrait}`
    }

    getUserCardDOM(){
        const article = document.createElement( 'article' );
        article.setAttribute("id", this.id);
        const img = document.createElement( 'img' );
        img.tabIndex = 0;
        img.setAttribute("src", this.picture);
        img.setAttribute("alt", `photo de profile de ${this.name}`)

        const h2 = document.createElement( 'h2' );
        h2.setAttribute("tabindex", 0)
        h2.textContent = this.name;

        const h3 = document.createElement( 'h3' );
        h3.setAttribute("tabindex", 0)
        h3.textContent = this.city + ", " + this.country;

        const h4 = document.createElement( 'h4' );
        h4.setAttribute("tabindex", 0)
        h4.textContent = this.tagline;

        const h5 = document.createElement( 'h5' );
        h5.setAttribute("tabindex", 0)
        h5.textContent = this.price + "€/jour";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);
    }
}