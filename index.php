<?php
	session_start(); // On démarre la session

	// On inclut les fichiers nécessaires
	include_once("libs/maLibUtils.php");
	include_once("libs/modele.php");
	include_once("libs/maLibUtils.php"); 

	
	
	// paramètre view éventuel passé dans l'URL
	$view = valider("view"); 

	// S'il est vide, on charge la vue accueil par défaut
	if (!$view) $view = "accueil"; 

	// On inclut le header
	include("templates/header.php");

	// En fonction de la vue à afficher, on appelle tel ou tel template
	switch($view)
	{		

		case "accueil" : 
			include("templates/accueil.php");
		break;
		default : // si le template correspondant à l'argument existe, on l'affiche
			if (file_exists("templates/$view.php"))
				include("templates/$view.php");

	}

	// On inclut le footer
	include("templates/footer.php");




	
?>








