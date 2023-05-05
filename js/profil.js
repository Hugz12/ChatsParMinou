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
    var inputValue5 = document.getElementById("mdpN2").value;
    $.ajax({
        url: "./controleur.php",
        type: "POST",
        dataType: "json",
        data: {
            "action" : "changerMdp",
            "mdp" : inputValue5,
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
// Path: js\profil.js
