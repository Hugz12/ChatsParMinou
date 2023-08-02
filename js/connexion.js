var sens = -1;

/**
 * Fonction qui permet de faire un switch entre la page de connexion et la page d'inscription
 */
function switchLoginRegister(){
    // decalle la div id="switchLoginRegister" de 350px vers la droite avec une animation
    // si la div est deja a 50% + 350px, on la remet a 50%
    if(sens == 1){
        if(window.innerWidth < 750) {
            $("#switchLoginRegister").animate({top: "500px", left: "0px"}, 500);
            console.log("petit");
        }
        else {
            $("#switchLoginRegister").animate({left: "350px", top: "0px"}, 500);
            console.log("grand");
        }
        $("#textButtonSwitchLoginRegister").fadeOut(function() {
            $(this).html("S'inscrire").fadeIn();
        });
        $("#textSwitchLoginRegister").fadeOut(function() {
            $(this).html("Vous avez envie de devenir un fidèle bénévole de notre association, inscrivez vous en cliquant ici").fadeIn();
        });
    }else{
        // on retirer 350px a la position actuelle de la div
        if(window.innerWidth < 750) {
            $("#switchLoginRegister").animate({top: "0px", left: "0px"}, 500);
            console.log("petit");
        }
        else {
            $("#switchLoginRegister").animate({left: "0px", top: "0px"}, 500);
            console.log("grand");
        }
        $("#textButtonSwitchLoginRegister").fadeOut(function() {
            $(this).html("Se connecter").fadeIn();
        });
        $("#textSwitchLoginRegister").fadeOut(function() {
            $(this).html("Vous possédez déjà un compte en tant que bénévole, cliquez sur ce bouton").fadeIn();
        });
    }
    sens = -sens;
}

function responsive () {
    console.log(window.innerWidth);
    if(sens == -1){

        if(window.innerWidth <= 750) {
            $("#switchLoginRegister")[0].style.left = "0";
            $("#switchLoginRegister")[0].style.top = "500px";
            console.log("petit");
        }
        else {
            $("#switchLoginRegister")[0].style.left = "350px";
            $("#switchLoginRegister")[0].style.top = "0";
            console.log("grand");
        }
    }
}

$(function() {

    $('#mdpOublie').click(function() {
        $('#popupInfos').toggle();
        $("#popupInfos").css('top', $("#mdpOublie").offset().top-200).css('left', ($(window).width() - $("#popupInfos").width() - 20) / 2);
    });
    $('#x').click(function() {
        $('#popupInfos').toggle();
    });

});

function sendMailMdp(){
    var mailx = document.getElementById("mailOublie").value;
    var mdp = document.getElementById("mdp1Oublie").value;
    var mdp2 = document.getElementById("mdp2Oublie").value;
    console.log(mailx);
    console.log(mdp);
    console.log(mdp2);
    $.ajax({
      url: './controleur.php', // Le nom du fichier PHP qui contient la fonction sendmail() et le code de l'envoi d'e-mail.
      type: "POST",
      dataType: "json",
      data: {
        "action" : "sendMailMdp",
        "mailx" : mailx,
        "mdp" : mdp,
        "mdp2" : mdp2,
      },
      success: function(retour) {
        console.log("Un mail vient d'être envoyé à la nouvelle adresse");
        alert("Un mail vient d'être envoyé à la nouvelle adresse"); // Affichez le message de confirmation renvoyé par PHP.
      },
      error: function(retour) {
        console.error("erreur"); // Affichez les erreurs éventuelles dans la console.
        alert("Ce mail n'est pas disponible ou les codes ne correspondent pas"); // Affichez le message de confirmation renvoyé par PHP.
      }
    });
}

window.addEventListener("resize", responsive);

window.addEventListener("load", responsive);