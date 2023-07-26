var conseils = [];
var conseilsFiltres = [];

window.addEventListener("load", createConseils);
document.querySelector("#rechercheConseil").addEventListener("keyup", filterConseils);


async function createConseils () {

    // met une constante en attente de la réponse de la fonction fetch
    conseils = await fetch("./controleur.php?" +  new URLSearchParams({
        action: "getConseils"
    }),
    {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    })
    .then(response => response.json()) 
    .catch(error => console.log(error));


    if(conseils != null) {
        console.log(conseils);
        var container = document.querySelector("#container");
        var div = document.createElement("div");
        conseils.forEach(conseil => {
            var div = document.createElement("div");
            div.classList.add("conseil");
            // alterne le sens des divs 
            if(conseils.indexOf(conseil) % 2 != 0) {
                div.classList.add("conseilInverse");
            }
            div.innerHTML = `
            
                <div class="titreConseil policeTitre tailleTitre">${conseil.name.replaceAll('_', ' ')}</div>
                <div class="descriptionConseil tailleSousTitre">${conseil.description}</div>`
            div.addEventListener("click", () => {
                window.open("./ressources/conseils/" + conseil.name);
            });
            div.style.setProperty("--position", Math.random() * 80 + 10 + "%");
            container.appendChild(div);

        });
    }
    
}

var filterTimeout; // Variable pour stocker l'ID du délai, si pas de délai en cours, vaut undefined

function filterConseils() {
    clearTimeout(filterTimeout); // Efface le délai précédent (s'il existe)
  
    // Définit un nouveau délai pour exécuter la fonction de filtrage après 300 ms
    filterTimeout = setTimeout(function() {
        currentSearch = document.querySelector("#rechercheConseil").value;
        var container = document.querySelector("#container");
        Array.from(container.children).forEach(child => {
            if (child.children[0].innerHTML.toLowerCase().includes(currentSearch.toLowerCase()) || child.children[1].innerHTML.toLowerCase().includes(currentSearch.toLowerCase())){
                child.style.display = "flex";
            } else {
                child.style.display = "none";
            }
        });
    }, 300); 
}

