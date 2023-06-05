<?php

//  E  N  T  E  T  E  S  //

include_once "maLibUtils.php";	// To use valider()
include_once "modele.php";	// To use isAdmin()

/**
 * @file maLibSecurisation.php
 * Fichier contenant des fonctions de sécurité concernant l'utilisateur, vérification de son authentification, hashage de mot de passe, etc.
 */


 
//  F  O  N  C  T  I  O  N  S  //


/**
 * Fonction qui vérifie l'authentification d'un utilisateur
 * Si l'utilisateur est authentifié, on met à jour différentes variables de session
 * On vérifie aussi si l'utilisateur est admin
 * @param string $mail
 * @param string $password
 * @return bool
 */
function verifUser($mail,$password){


	// On vérifie si le mail existe dans la base de données
	$SQL = "SELECT password FROM utilisateur WHERE mail='$mail'";
	$hashed_password = SQLGetChamp($SQL);
	if ($hashed_password == false) return false; // utilisateur innexistant 
	
	// On vérifie si le mot de passe est correct en comparant le hash
	if (password_verify($password, $hashed_password)) {
		
		$_SESSION["Connecte"] = true;
		$_SESSION["mail"] = $mail;
		$_SESSION["password"] = $password;
		$_SESSION["Admin"] = isAdmin($mail);
		$_SESSION["heureConnexion"] = date("H:i:s");
		
		$extensions = array();
		array_push($extensions, "jpg", "jpeg", "png", "gif");
		
		foreach ($extensions as $extension) {
			if (file_exists("./ressources/users/".$mail.".".$extension)) { // si le fichier existe
				$_SESSION["photoDeProfil"] = "./ressources/users/".$mail.".".$extension;
				break;
			}
		}
		return true;
	} else {
		return false;
	}
}



/**
 * Fonction qui hache un mot de passe
 * @param string $password
 * @return string
 */
function hashedPassword($password){
	// Hashage du mot de passe
	$hashed_password = password_hash($password, PASSWORD_DEFAULT);
	return $hashed_password;
}



/**
 * Fonction qui vérifie si l'utilisateur est authentifié
 * @return bool
 */
function securiser($urlBad,$urlGood=false){
	if (! valider("connecte","SESSION")) {
		rediriger($urlBad);
		die("");
	}
	else {
		if ($urlGood)
			rediriger($urlGood);
	}
}

?>
