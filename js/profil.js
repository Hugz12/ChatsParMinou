function changerPhotoProfil(contexte){
    console.log(contexte);
    var form = contexte.parentNode;
    form.submit();
}

// script.js


  



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

function changerMail() {
    var inputValue2 = document.getElementById("mail-input").value;
    $.ajax({
        url: "./controleur.php",
        type: "POST",
        dataType: "json",
        data: {
            "action" : "changerMail",
            "mail" : inputValue2,
        },
        success: function(retour) {
            console.log("Votre mail a bien été changé");
            alert ("Votre mail a bien été changé");
        },
        error: function(retour) {
            console.log("erreur");
            alert ("Erreur lors du changement de mail");
        }
    }) 
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
            },
            error: function(retour) {
                console.log("Erreur lors du changement de rôle de l'utilisateur");
                alert("Erreur lors du changement de rôle de l'utilisateur");
                console.log(retour);
            }
        });
}

$(function() {

    $('#i').hover(function() {
        $('#popupInfos').toggle();
    });

    $('#i').mousemove(function(e) {
        $("#popupInfos").css('top', e.pageY).css('left', e.pageX);
    });
});
  

function rechercheUser() {
	var nbUserShow = 0;
	var input = document.getElementById("rechercheUser");
	var recherche = input.value.toUpperCase();
	console.log(recherche);

	var listeUser = allSlider.getElementsByClassName('utilisateur');
	for (var i = 0; i < listeUser.length; i++) {

		if (listeUser[i].innerHTML.toUpperCase().includes(recherche)) {
			listeUser[i].parentElement.parentElement.parentElement.style.display = "block";
			nbUserShow++;
		}
		else {
			listeUser[i].parentElement.parentElement.parentElement.style.display = "none";
		}

		if (recherche == "") {
			listeUser[i].parentElement.parentElement.parentElement.style.display = "block";
			listePoints[i].style.display = "block";
		}

	}
	allSlider.style.setProperty("--transform", 0);
}

const rechercher = debounce(() => rechercheUser(), 500);