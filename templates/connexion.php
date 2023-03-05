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
            <input type="text" class="champDeTexte" name="mail" placeholder="Mail"/>
            <input type="password" class="champDeTexte"name="password" placeholder="Mot de passe"/>
            <input type="submit" class="button" name="action" value="Connexion"/>
        </form>
    </div>



    <div id="register">
    <div id="titreRegister" class="policeTitre">Inscription</div>
        <form action="controleur.php" method="post" enctype="multipart/form-data"> 
            <input type="text" class="champDeTexte" name="mail" placeholder="Mail"/>

            <input type="password" class="champDeTexte" name="password" placeholder="Mot de passe"/>

            <input type="password" class="champDeTexte" name="password2" placeholder="Confirmation du mot de passe"/>

            <input type="text" class="champDeTexte" name="name" placeholder="Nom"/>

            <input type="file" class="custom-button" name="photo"/>

            <input type="hidden" name="action" value="Ajouter Utilisateur"/>
            
            <input type="submit" class="button" value="S'inscrire"/>
        </form>
    </div>

    <div id="switchLoginRegister">
        <div id="textSwitchLoginRegister" class="policeTexte">Vous avez envie de devenir un fidèle bénévole de notre association, inscrivez vous en cliquant ici</div>
        <div id="buttonSwitchLoginRegister" class="policeTexte" onclick="switchLoginRegister();">
            <div id="textButtonSwitchLoginRegister">S'inscrire</div>
        </div>
    </div>


</div>


