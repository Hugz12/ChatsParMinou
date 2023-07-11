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



window.addEventListener("resize", responsive);

window.addEventListener("load", responsive);