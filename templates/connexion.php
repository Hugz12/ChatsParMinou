<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

if (isset($_SESSION['error'])){ // Si mauvais login ou mot de passe
    echo "<script>window.alert('" . $_SESSION['error'] . "');</script>";
    unset($_SESSION['error']);
}

?>

<link rel="stylesheet" href="./css/connexion.css">
<script src="./js/connexion.js"></script>

<div class="conteneurDeConteneurDePattes">
    <div id="1" class="patteContainer"></div>
    <div id="2" class="patteContainer"></div>
</div>


<script>
    var direction = 0; // angle de rotation
    var state = 0; // 5 steps avant de changer de direction
    var sens = 0; // -1 = gauche, 1 = droite
    var sens3 = 1;
    var Pastop = 100;
    var Pasleft = 0;
    var patteContainer = document.getElementById("1");
    console.log(patteContainer);


    var direction2 = 180; // angle de rotation
    var state2 = 0; // 5 steps avant de changer de direction
    var sens2 = 0; // -1 = gauche, 1 = droite
    var sens4 = 1;
    var Pastop2 = 200;
    var Pasleft2 = 0;
    
    var patteContainer2 = document.getElementById("2");


    move(patteContainer, direction, state, sens, Pasleft, Pastop, 1);
    move(patteContainer2, direction2, state2, sens2, Pasleft2, Pastop2, 1);
</script>

<div id="allConnexion" class="policeTexte" >
    
    <div id="login">
        <div id="titreLogin" class="policeTitre">Connexion</div>
        <form action="controleur.php" method="get"> 
            <div class="group">
                <input type="text" name="mail" required/>
                <label for="mail">Adresse mail</label>
            </div>
            <div class="group">
                <input type="password" name="password" required/>
                <label for="password">Mot de passe</label>
            </div>
            <input type="submit" class="buttonType" name="action" value="Connexion"/>
        </form>
    </div>



    <div id="register">
        <div id="titreRegister" class="policeTitre">Inscription</div>
        <form action="controleur.php" method="post" enctype="multipart/form-data"> 
        <div class="group">
                <input type="text" name="mail" required/>
                <label for="mail">Adresse mail</label>
            </div>

            <div class="group">
                <input type="password" name="password" required/>
                <label for="password">Mot de passe</label>
            </div>

            <div class="group">
                <input type="password" name="password2" required/>
                <label for="password2">Confirmer votre mot de passe</label>
            </div>

            <div class="group">
                <input type="text" name="name" required/>
                <label for="name">Nom et Prénom</label>
            </div>

            <div id="previewPhotoDeProfil" class='file'>
                <input type='file' name='photo' id='photo' accept='image/*' onchange="previewFile(this);" style='display:none'>
                <label for='photo' class='photo-upload-label'></label>
                <div class='fileText'>Choisir une photo</div>
                <img class="addImage" src="./ressources/add.svg" alt="add.svg">
            </div>

            <input type="hidden" name="action" value="Ajouter Utilisateur"/>
            
            <input type="submit" class="buttonType" value="S'inscrire"/>
        </form>
    </div>

    <div id="switchLoginRegister">
        <div id="textSwitchLoginRegister" class="policeTexte">Vous avez envie de devenir un fidèle bénévole de notre association, inscrivez vous en cliquant ici</div>
        <div id="buttonSwitchLoginRegister" class="policeTexte buttonType" onclick="switchLoginRegister();">
            <div id="textButtonSwitchLoginRegister">S'inscrire</div>
        </div>
    </div>


</div>


