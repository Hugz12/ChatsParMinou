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
                <input type="password" name="password" required/>
                <label for="password">Confirmer votre mot de passe</label>
            </div>

            <div class="group">
                <input type="text" name="name" required/>
                <label for="name">Nom et Prénom</label>
            </div>

            <div id="previewPhotoDeProfil" class='file'>
                <input type='file' name='image' id='img' accept='image/*' onchange="previewFile(this);" style='display:none'>
                <label for='img' class='photo-upload-label'></label>
                <div id='fileText'>Choisir une photo</div>
                <svg width='180' height='180' viewBox='0 0 180 180' style='border-radius: 25px; background-color: rgba(255, 255, 255, 0.7); opacity: 0;' onmouseover='opacitySwitch(this);'>
                    <rect x='77.5' y='40' width='25' height='100' fill='rgba(200, 200, 200, 0.8)'/>
                    <rect x='40' y='77.5' width='100' height='25' fill='rgba(200, 200, 200, 0.8)'/>
                </svg>
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


