function changerPhotoProfil(contexte){
    console.log("contexte");
    console.log(contexte);
    var form = contexte.parentNode;
    console.log(form);
    form.submit();
    console.log("submit");
}



  



function changerNom() {
    var inputValue = document.getElementById("nom-input").value;
    $.ajax({
        url: "./controleur.php",
        type: "POST",
        dataType: "json",
        data: {
            "action" : "changerNom",
            "nom" : inputValue,
        },
        success: function(retour) {
            console.log("Votre nom a bien été changé");
            alert ("Votre nom a bien été changé");
        },
        error: function(retour) {
            console.log("erreur");
            alert ("Erreur lors du changement de nom");
        }
    }) 
}



function sendMail(){
    var mailn = document.getElementById("mail-input").value;
    console.log(mailn);
    $.ajax({
      url: './controleur.php', // Le nom du fichier PHP qui contient la fonction sendmail() et le code de l'envoi d'e-mail.
      type: "POST",
      dataType: "json",
      data: {
        "action" : "sendMail",
        "mailn" : mailn,
      },
      success: function(retour) {
        console.log("Un mail vient d'être envoyé à la nouvelle adresse");
        alert("Un mail vient d'être envoyé à la nouvelle adresse"); // Affichez le message de confirmation renvoyé par PHP.
      },
      error: function(retour) {
        console.error("erreur"); // Affichez les erreurs éventuelles dans la console.
        alert("Ce mail n'est pas disponible"); // Affichez le message de confirmation renvoyé par PHP.
      }
    });
}

function changerMdp(){
    var inputValue3 = document.getElementById("mdpV").value;
    var inputValue4 = document.getElementById("mdpN").value;
    var inputValue5 = document.getElementById("mdpN2").value;
    console.log(inputValue3);
    console.log(inputValue4);
    console.log(inputValue5);
    $.ajax({
        url: "./controleur.php",
        type: "POST",
        dataType: "json",
        data: {
            "action" : "changerMdp",
            "mdpN2" : inputValue5,
            "mdpN" : inputValue4,
            "mdpV" : inputValue3,
        },
        success: function(retour) {
            console.log("Votre mot de passe a bien été changé");
            alert ("Votre mot de passe a bien été changé");
        },
        error: function(retour) {
            console.log("erreur");
            alert ("Erreur lors du changement de mot de passe");
        }
    }) 
}

function changerRole(){
        var element = event.target;
        var id = element.id;
        console.log(id);
        var nRole;
        if (id.startsWith('upRole')) {
            nRole = parseInt(element.getAttribute('data-role'), 10) - 1;
        } else {
            nRole = parseInt(element.getAttribute('data-role'), 10) + 1;
        }
        console.log(nRole);
        var nom = element.getAttribute('data-nom'); // Récupère le nom de l'utilisateur à partir de l'attribut data-nom
        console.log(nom);
        var mail = element.getAttribute('data-mail'); // Récupère le mail de l'utilisateur à partir de l'attribut data-mail
        console.log(mail);
        // Mettez à jour votre requête AJAX en utilisant les valeurs appropriées
        $.ajax({
            url: "./controleur.php",
            type: "POST",
            dataType: "json",
            data: {
                "action" : "changerRole",
                "nom" : nom, 
                "mail" : mail,
                "role" : nRole,// Envoyer le nom de l'utilisateur sélectionné
            },
            success: function(retour) {
                console.log("Le rôle de l'utilisateur a été changé avec succès");
                alert("Le rôle de l'utilisateur a été changé avec succès");
                location.reload();
            },
            error: function(retour) {
                console.log("Erreur lors du changement de rôle de l'utilisateur");
                alert("Erreur lors du changement de rôle de l'utilisateur");
                console.log(retour);
            }
        });
}

$(function() {

    $('#i').click(function() {
        $('#popupInfos').toggle();
        $("#popupInfos").css('top', $("#i").offset().top + 60).css('left', ($(window).width() - $("#popupInfos").width() - 20) / 2);
    });


});
  

function rechercheUser() {
	var input = document.getElementById("rechercheUser");
	var recherche = input.value.toUpperCase();
	console.log(recherche);
	var listeUsers = document.getElementsByClassName('nomUser');
	for (var i = 0; i < listeUsers.length; i++) {
		if (listeUsers[i].innerHTML.toUpperCase().includes(recherche)) {
			listeUsers[i].parentElement.parentElement.style.display = "flex";
		}
		else {
			listeUsers[i].parentElement.parentElement.style.display = "none";
		}

		if (recherche == "") {
			listeUsers[i].parentElement.parentElement.style.display = "flex";
		}

	}
}

const rechercher = debounce(() => rechercheUser(), 500);