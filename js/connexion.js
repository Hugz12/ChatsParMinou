var sens = -1;


function switchLoginRegister(){
    // decalle la div id="switchLoginRegister" de 350px vers la droite avec une animation
    // si la div est deja a 50% + 350px, on la remet a 50%
    if(sens == 1){
        $("#switchLoginRegister").animate({left: "350px"}, 500);
        $("#textButtonSwitchLoginRegister").fadeOut(function() {
            $(this).html("S'inscrire").fadeIn();
        });
        $("#textSwitchLoginRegister").fadeOut(function() {
            $(this).html("Vous avez envie de devenir un fidèle bénévole de notre association, inscrivez vous en cliquant ici").fadeIn();
        });
    }else{
        // on retirer 350px a la position actuelle de la div
        $("#switchLoginRegister").animate({left: "-=350px"}, 500);
        $("#textButtonSwitchLoginRegister").fadeOut(function() {
            $(this).html("Se connecter").fadeIn();
        });
        $("#textSwitchLoginRegister").fadeOut(function() {
            $(this).html("Vous possédez déjà un compte en tant que bénévole, cliquez sur ce bouton").fadeIn();
        });
    }
    sens = -sens;


}