class Index {
    constructor(photographers) {
        this.photographers = photographers
    }

    displayData() {
        const photographersSection = document.querySelector(".photographer_section");

        this.photographers.forEach((photographer) => {
            const photographerModel = new photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            userCardDOM.addEventListener("click", () => { window.location.href = `photographer.html?id=${photographer.id}` })
            userCardDOM.addEventListener("keypress", (e) => { if (e.key == "Enter") { window.location.href = `photographer.html?id=${photographer.id}` } })
            userCardDOM.setAttribute("tabindex", 0)
            photographersSection.appendChild(userCardDOM);
        });
    }
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getAllPhotographers();
    const main = new Index(photographers)
    main.displayData()
}

init()
