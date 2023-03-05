<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

echo "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
?>

<!DOCTYPE html> 
<html>

<!--  H E A D  -->
<head>	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <!-- encodage des caractères -->
	<title>ChatsParMinou</title>
	<link rel="stylesheet" href="css/style.css"> <!-- inclure la fiche style : stylesheet.css -->
	<link rel="stylesheet" href="css/header.css"> 
	<link rel="stylesheet" href="css/form.css">

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="./js/utils.js"></script>
	<script src="./js/header.js"></script>
	<!-- inclure la fiche script : script.js -->

	<!-- police -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
	

</head>
<!-- F I N   H E A D -->


<!-- BODY -->
<body onload="initHeader();">
	<div id="allHeader">
		<header id="header">
			<a class="logo policeTitre" href="index.php?view=accueil">
				<img class="logo" src="ressources/logo.png" alt="logo">
				<div>Chats Par Minou</div>
			</a>
			<img id="menuDeroulant" src="ressources/menu_deroulant.png" onclick="displayNav2();"alt="logo">

			
		
			<div id="nav">

				<a class="navLink policeTexte" href="index.php?view=chatsAdoption">Chats à l'adoption</a>
				<?php
					// si l'utilisateur est connecté, on affiche un lien vers le planning
					if (valider("Connecte","SESSION")){
						echo "<a class=\"navLink policeTexte\" href=\"index.php?view=planning\">Planning</a>";
					}
				?>
				<a class="navLink policeTexte" href="index.php?view=quiSommesNous">Qui sommes-nous ?</a>
				<a class="navLink policeTexte" href="index.php?view=conseilsEtViePratique">Conseils et vie pratique</a>
				<a class="navLink policeTexte" href="index.php?view=nousAider">Nous aider</a>
				<?php
					// si l'utilisateur est admin, on affiche un lien vers les pages d'administration
					if (valider("Admin","SESSION"))
						echo "<a class=\"navLink policeTexte\" href=\"index.php?view=demandesAdoption\">Demandes d'adoption</a>";
				?>
				
			</div>

			<div>
				<?php
					// si l'utilisateur est connecté, on affiche son nom et un lien de déconnexion
					if (valider("Connecte","SESSION")){
							if(valider("photoDeProfil", "SESSION")){
								echo "<img id=\"photoDeProfil\" class=\"clickable\" src=\"".valider("photoDeProfil", "SESSION")."\"  onclick=\"displayProfil();\" alt=\"photo de profil\"/>";
								
							} else {
								echo "<img id=\"photoDeProfil\" class=\"clickable\" src=\"ressources/users/default.png\"  onclick=\"displayProfil();\" alt=\"photo de profil\"/>";
							}
					}else{
						echo "<a id=\"connexion\" class=\"ombreDrop policeTexte clickable\" href=\"index.php?view=connexion\">Connexion</a>";
					}
				?>
				
			</div>
		</header>
	


			
		<div id="nav2">
			<a href="index.php?view=chatsAdoption">Chats à l'adoption</a>
			<?php
				// si l'utilisateur est connecté, on affiche un lien vers le planning
				if (valider("Connecte","SESSION")){
					echo "<a class=\"policeTexte\" href=\"index.php?view=planning\">Planning</a>";
				}
			?>
			<a href="index.php?view=quiSommesNous">Qui sommes-nous ?</a>
			<a href="index.php?view=conseilsEtViePratique">Conseils et vie pratique</a>
			<a href="index.php?view=nousAider">Nous aider</a>
			<?php
				// si l'utilisateur est admin, on affiche un lien vers les pages d'administration
				if (valider("Admin","SESSION"))
					echo "<a href=\"index.php?view=demandesAdoption\">Demandes d'adoption</a>";
			?>
		</div>

	</div>

	
	<div id="profil" class="policeTexte">
		<div id="triangleUp"></div>
		<a class="profileSection" href="index.php?view=profil" onmouseenter="rotateLogo(this);" onmouseleave="rotateLogoBack(this);">
			<div>Profil</div>
			<img src="./ressources/person.png" alt="">
		</a>
		<hr>
		<a class="profileSection" href="index.php?view=profil" onmouseenter="rotateLogo(this);" onmouseleave="rotateLogoBack(this);">
			<div>Changer mon email</div>
			<img src="./ressources/mail.png" alt="">
		</a>
		<hr>
		<a class="profileSection" href="index.php?view=profil" onmouseenter="rotateLogo(this);" onmouseleave="rotateLogoBack(this);">
			<div>Changer mon mot de passe</div>
			<img src="./ressources/lock.png" alt="">
		</a>
		<hr>
		<a class="profileSection" href="controleur.php?action=Deconnexion" onmouseenter="rotateLogo(this);" onmouseleave="rotateLogoBack(this);">
			<div>Déconnexion</div>
			<img src="./ressources/logout.png" alt="">
		</a>
</div>

	
	



