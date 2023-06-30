window.addEventListener("load", createConseils);

async function createConseils () {
    
    var conseils;

    await fetch("./controleur.php?" +  new URLSearchParams({
        action: "getConseils"
    }),
    {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    })
    .then(response => response.json()) // Le premier .then permet de résoudre la promesse de la fonction fetch
    .then(data => conseils = data)
    .catch(error => console.log(error));
    



    if(conseils != null) {
        console.log(conseils);
        var container = document.querySelector("#container");
        var div = document.createElement("div");
        conseils.forEach(conseil => {
            var div = document.createElement("div");
            div.classList.add("conseil");
            div.innerHTML = `
            <div class="titreConseil titre">${conseil.name}</div>
            <div class="descriptionConseil">${conseil.description}</div>`
            // ajoute le pdf quand on clique sur la div
            div.addEventListener("click", () => {
                window.open("./ressources/conseils/" + conseil.name);
            });
            container.appendChild(div);
        });
    }
    
}