// Fonction qui permet d'afficher tous les chats dans la page d'adoption
function afficherChats(chats) {
  var conteneurChats = document.getElementById("conteneurChats");

  for (var j = 0; j < chats.length; j++) {
    var chatActuel = chats[j];

    var chatContainer = document.createElement('div');
    chatContainer.className = 'chatContainer';

    var chatImage = document.createElement('img');
    var codeChat = chatActuel['code'];
    var imageUrl = './ressources/chats/' + codeChat + '/0.jpg';
    chatImage.src = imageUrl;
    chatImage.className = 'chatImage';
    chatContainer.appendChild(chatImage);

    var chatTexte = document.createElement('div');
    chatTexte.className = 'chatTexte policeTexte';
    chatTexte.textContent = chatActuel['name'];
    chatContainer.appendChild(chatTexte);

    var checkboxContainer = document.createElement('label');
    checkboxContainer.className = 'container';

    var checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.className = 'chat';
    checkboxInput.dataset.codeChat = codeChat;
    checkboxInput.checked = retour && retour.includes(codeChat);

    var checkboxCheckmark = document.createElement('div');
    checkboxCheckmark.className = 'checkmark';
    checkboxCheckmark.innerHTML = '<svg viewBox="0 0 256 256"><rect fill="none" height="256" width="256"></rect><path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#666" fill="none"></path></svg>';

    checkboxContainer.appendChild(checkboxInput);
    checkboxContainer.appendChild(checkboxCheckmark);

    chatContainer.appendChild(checkboxContainer);

    conteneurChats.appendChild(chatContainer);
  }
}


function ajouterRetirerCodeChat(codeChat) {
  // Récupérer la classe de l'élément qui a été cliqué
  var className = event.target.className;
  var index = retour.indexOf(codeChat);
  if (className == 'chat') {
    if (index > -1) {
      // Le code du chat est déjà présent dans le tableau, on le retire
      retour.splice(index, 1);
    } else {
      // Le code du chat n'est pas présent dans le tableau, on l'ajoute
      retour.push(codeChat);
    }
  }
  else{ 
    return;
  }
  console.log("Retour :", retour);
  sauvegarderRetour(); // Sauvegarder le tableau retour dans le stockage local
}

function sauvegarderRetour() {
  localStorage.setItem('retour', JSON.stringify(retour));
}

function initialiserPage() {
  // Récupérer les paramètres d'URL
  var params = new URLSearchParams(window.location.search);

  if (retour === false) {
    retour = [];
  }
  // Récupérer tous les éléments checkbox dans la page
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  // Parcourir les checkboxes
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      var codeChat = this.dataset.codeChat;
      ajouterRetirerCodeChat(codeChat);
    });

    // Initialiser l'état de la checkbox en fonction des valeurs dans le tableau retour
    checkbox.checked = retour.includes(checkbox.dataset.codeChat);
  });
}


// Appeler la fonction d'initialisation au chargement de la page
window.addEventListener('load', initialiserPage);

function submitForm() {
  var nom = document.getElementById("nomForm").value;
  var prenom = document.getElementById("prenomForm").value;
  var mail = document.getElementById("mailForm").value;
  var tel = document.getElementById("telForm").value;
  var adresse = document.getElementById("adresseForm").value;
  var habitation = document.getElementById("habitationForm").value;
  var ext = document.getElementById("extForm").value;
  var sortir = document.getElementById("sortirForm").value;
  var animaux = document.getElementById("animauxForm").value;
  var sit = document.getElementById("sitForm").value;
  var com = document.getElementById("comForm").value;
  var retour = localStorage.getItem('retour');

  $.ajax({
    url: "./controleur.php",
    type: "POST",
    dataType: "json",
    data: {
      "action": "submitForm",
      "nom": nom,
      "prenom": prenom,
      "mail": mail,
      "tel": tel,
      "adresse": adresse,
      "habitation": habitation,
      "ext": ext,
      "sortir": sortir,
      "animaux": animaux,
      "sit": sit,
      "com": com,
      "retour": retour
    },
    success: function(retour) {
      console.log("Votre formulaire a bien été envoyé");
      alert("Votre formulaire a bien été envoyé");
    },
    error: function(retour) {
      console.log("erreur");
      alert("Votre formulaire n'a pas été envoyé");
    }
  });
}
