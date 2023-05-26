function changerPhotoProfil(contexte){
    console.log(contexte);
    var form = contexte.parentNode;
    form.submit();
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

function changerRole() {
    var role = [];
    var up = [];
    var down = [];
    var noms = [];
    $('input[type=checkbox]:checked').each(function() {

        if ($(this).attr('id').startsWith('upRole')) {
            up.push(1);
            role.push($(this).data('role')-1);
        } else {
            up.push(0);
        }

        if ($(this).attr('id').startsWith('downRole')) {
            down.push(1);
            role.push($(this).data('role')+1);
        } else {
            down.push(0);
        }

        // Récupérer le nom de l'utilisateur sélectionné à partir de l'attribut data-nom
        noms.push($(this).data('nom'));

    });
    console.log(role);
    console.log(noms);
    console.log(up);
    console.log(down);
    $.ajax({
        url: "./controleur.php",
        type: "POST",
        dataType: "json",
        data: {
            "action" : "changerRole",
            "up" : up,
            "down" : down,
            "noms" : noms, // Envoyer les noms des utilisateurs sélectionnés
            "role" : role // Envoyer les rôles des utilisateurs sélectionnés
        },
        success: function(retour) {
            console.log("Les rôles ont été changés avec succès");
            alert ("Les rôles ont été changés avec succès");
        },
        error: function(retour) {
            console.log("Erreur lors du changement de rôle");
            alert ("Erreur lors du changement de rôle");
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
  
