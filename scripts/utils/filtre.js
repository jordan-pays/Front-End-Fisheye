class Filtre {
    constructor(popularite, date, titre) {
        this.popularite = popularite;
        this.date = date;
        this.titre = titre;
    }

    construcFiltre(item) {
        const item_filtre = document.createElement("div");
        item_filtre.setAttribute("id", item.id);
        item_filtre.setAttribute("class", `item_filtre ${item.isActif ? "" : "trait"}`);
        const name_filtre = document.createElement("p");
        name_filtre.innerText = item.name;
        item_filtre.append(name_filtre);
        if (item.isActif) {
            const active_chevron = document.createElement("div");
            const chevron = document.createElement("i");
            active_chevron.setAttribute("id", "active_chevron");
            active_chevron.setAttribute("class", "chevron hide");
            chevron.setAttribute("id", "chevron");
            chevron.setAttribute("class", "fa-sharp fa-solid fa-chevron-down");
            active_chevron.append(chevron);
            active_chevron.addEventListener("click", () => this.changeChevron(active_chevron, chevron))
            item_filtre.append(active_chevron);
        } else {
            item_filtre.addEventListener("click", () => {
                this.date.isActif = false;
                this.titre.isActif = false;
                this.popularite.isActif = false;
                if (this.popularite.id == item.id) {
                    this.popularite.isActif = true;
                } else if (this.date.id == item.id) {
                    this.date.isActif = true;
                } else {
                    this.titre.isActif = true;
                }
                this.styleFiltre()
            })
        }
        return item_filtre;
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
        const arr = container_filtre.children;
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
            arr.item(i).remove()
        }
        console.log("--------------------------",arr)
        const popularite = this.construcFiltre(this.popularite)
        const date = this.construcFiltre(this.date)
        const titre = this.construcFiltre(this.titre)

        container_filtre.appendChild(popularite)
        container_filtre.appendChild(date)
        container_filtre.appendChild(titre)
    }
}

function init() {
    const filtre = new Filtre({ id: "popularite", name: "Popularité", isActif: true }, { id: "date", name: "Date", isActif: false }, { id: "titre", name: "Titre", isActif: false });
    filtre.styleFiltre();
}

init()

// const trait = document.getElementsByClassName("trait");
// const item_filtre = document.getElementsByClassName("item_filtre")
// const popularite = document.getElementById("popularite")
// const date = document.getElementById("date");
// const titre = document.getElementById("titre");
// let active_filtre = document.getElementsByClassName("active_filtre").item(0);
// const active_chevron =  document.createElement("div");
// const chevron = document.createElement("i");
// function init() {
//     active_filtre = document.getElementsByClassName("active_filtre").item(0);
//
// }


// popularite.addEventListener("click",()=>changeFiltre(popularite))
// date.addEventListener("click",()=>changeFiltre(date))
// titre.addEventListener("click",()=>changeFiltre(titre))

// init()