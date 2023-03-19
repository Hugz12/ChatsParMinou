<script>
  // Récupérez le bouton et le conteneur de divs
  const boutonAjouter = document.getElementById("ajouter-div");
  const conteneurDivs = document.getElementById("conteneur-divs");

  // Définissez une fonction qui ajoute une nouvelle div avec un texte et un lien hypertexte
  function ajouterDiv() {
    //Crée la nouvelle div et l'ajoute au conteneur
    const nouvelleDiv = document.createElement("div");
    nouvelleDiv.id = "conseilText";
    nouvelleDiv.classList.add("policeTexte");
    conteneurDivs.appendChild(nouvelleDiv);

    // Crée un texte et un lien hypertexte et l'ajoute à la div
    const texteDiv = document.createTextNode("Nouvelle div ");
    const lienDiv = document.createElement("a");
    lienDiv.setAttribute("href", "https://www.google.com");
    lienDiv.appendChild(document.createTextNode("avec un lien"));
    nouvelleDiv.appendChild(texteDiv);
    nouvelleDiv.appendChild(lienDiv);
  }

  // Ajoutez un écouteur d'événement pour le clic sur le bouton
  boutonAjouter.addEventListener("click", ajouterDiv);
</script>