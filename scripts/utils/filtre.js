class Filtre {
    constructor(popularite, date, titre) {
        this.popularite = popularite;
        this.date = date;
        this.titre = titre;
    }

    construcFiltre(item) {
        const item_filtre = document.createElement("li");
        item_filtre.setAttribute("tabindex", 0);
        item_filtre.setAttribute("id", item.id);
        item_filtre.setAttribute("class", `item_filtre ${item.isActif ? "" : "trait"}`);

        const name_filtre = document.createElement("p");
        name_filtre.innerText = item.name;

        item_filtre.append(name_filtre);
        if (item.isActif) {
            const active_chevron = document.createElement("div");
            active_chevron.setAttribute("class", "chevron hide");

            const chevron = document.createElement("i");
            chevron.setAttribute("id", "chevron");
            chevron.setAttribute("class", "fa-sharp fa-solid fa-chevron-down");

            active_chevron.append(chevron);

            item_filtre.setAttribute("role","button")
            item_filtre.setAttribute("aria-haspopup","listbox")
            item_filtre.setAttribute("aria-expanded","false")

            item_filtre.addEventListener("click", () => {this.changeChevron(active_chevron, chevron); item_filtre.setAttribute("aria-expanded","true")})
            item_filtre.addEventListener("keypress", (e) => { if (e.key == "Enter") { this.changeChevron(active_chevron, chevron); }item_filtre.setAttribute("aria-expanded","true")})
            
            item_filtre.append(active_chevron);
        } else {
            item_filtre.addEventListener("click", async () => {
               await this.changeFilter(item)
            })

            item_filtre.addEventListener("keypress", async (e) => { 
                if (e.key == "Enter") { 
                    await this.changeFilter(item)
                } 
            })
        }
        return item_filtre;
    }

    async changeFilter(item){
        this.date.isActif = false;
        this.titre.isActif = false;
        this.popularite.isActif = false;
        let photographerId = $_GET('id');

        if (this.popularite.id == item.id) {
            const photographerInfo = await getPhotographerById(photographerId);
            const medias = await getMediaByPhotographerIdSortByPopularity(photographerId);
            const photographer = new Photographer(photographerInfo, medias);
            photographer.displayMedia();
            this.popularite.isActif = true;
        } else if (this.date.id == item.id) {
            const photographerInfo = await getPhotographerById(photographerId);
            const medias = await getMediaByPhotographerIdSortByDate(photographerId);
            const photographer = new Photographer(photographerInfo, medias);
            photographer.displayMedia();
            this.date.isActif = true;
        } else {
            const photographerInfo = await getPhotographerById(photographerId);
            const medias = await getMediaByPhotographerIdSortByTitle(photographerId);
            const photographer = new Photographer(photographerInfo, medias);
            photographer.displayMedia();
            this.titre.isActif = true;
        }
        this.styleFiltre()
    }

    changeChevron(active_chevron, chevron) {
        const trait = document.getElementsByClassName("trait")
        const container_filtre = document.getElementById("container_filtre");

        if (active_chevron.classList.contains("hide")) {
            chevron.setAttribute("class", "fa-sharp fa-solid fa-chevron-up")
            active_chevron.append(chevron)
            active_chevron.classList.remove("hide")

            for (let i = 0; i < trait.length; i++) {
                trait.item(i).setAttribute("style", "display:flex")
            }
            container_filtre.setAttribute("style", "height:170px;z-index:300")
        } else {
            active_chevron.classList.add("hide")
            chevron.setAttribute("class", "fa-sharp fa-solid fa-chevron-down")
            active_chevron.append(chevron)
            for (let i = 0; i < trait.length; i++) {
                trait.item(i).setAttribute("style", "display:none")
            }
            container_filtre.setAttribute("style", "height:55px")
        }
    }

    styleFiltre() {
        const container_filtre = document.getElementById("container_filtre");
        container_filtre.textContent = "";
        container_filtre.setAttribute("style", "height:55px")
        
        const popularite = this.construcFiltre(this.popularite)
        const date = this.construcFiltre(this.date)
        const titre = this.construcFiltre(this.titre)

        if (this.popularite.isActif) {
            container_filtre.appendChild(popularite)
            container_filtre.appendChild(date)
            container_filtre.appendChild(titre)
        } else if (this.date.isActif) {
            container_filtre.appendChild(date)
            container_filtre.appendChild(popularite)
            container_filtre.appendChild(titre)
        } else if (this.titre.isActif) {
            container_filtre.appendChild(titre)
            container_filtre.appendChild(date)
            container_filtre.appendChild(popularite)
        }

    }
}

function init() {
    const filtre = new Filtre({ id: "popularite", name: "Popularité", isActif: true }, { id: "date", name: "Date", isActif: false }, { id: "titre", name: "Titre", isActif: false });
    filtre.styleFiltre();
}

init()