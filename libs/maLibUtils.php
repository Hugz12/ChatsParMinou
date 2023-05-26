<?php

//  E  N  T  E  T  E  S  //




/**
 * @file maLibUtils.php
 * Fichier contenant des fonctions pour prévenir des injections SQL et XSS, ou encore vérifier la présence et la validité de paramètres
 */



//  F  O  N  C  T  I  O  N  S  //


/**
 * Vérifie l'existence (isset) et la taille (non vide) d'un paramètre dans un des tableaux GET, POST, COOKIES, SESSION
 * Si le paramètre est présent et non vide, on le renvoie en l'ayant protégé contre les injections SQL et XSS
 * Renvoie false si le paramètre est vide ou absent
 * @param string $nom
 * @param string $type
 * @return string|boolean
 */
function valider($nom,$type="REQUEST"){	
	switch($type){
		case 'REQUEST': 
		if(isset($_REQUEST[$nom]) && !($_REQUEST[$nom] == "")) 	
			return proteger($_REQUEST[$nom]); 	
		break;
		case 'GET': 	
		if(isset($_GET[$nom]) && !($_GET[$nom] == "")) 			
			return proteger($_GET[$nom]); 
		break;
		case 'POST': 	
		if(isset($_POST[$nom]) && !($_POST[$nom] == "")) 	
			return proteger($_POST[$nom]); 		
		break;
		case 'COOKIE': 	
		if(isset($_COOKIE[$nom]) && !($_COOKIE[$nom] == "")) 	
			return proteger($_COOKIE[$nom]);	
		break;
		case 'SESSION': 
		if(isset($_SESSION[$nom]) && !($_SESSION[$nom] == "")) 	
			return $_SESSION[$nom]; 		
		break;
		case 'SERVER': 
		if(isset($_SERVER[$nom]) && !($_SERVER[$nom] == "")) 	
			return $_SERVER[$nom]; 		
		break;
		case 'FILES':
		if(isset($_FILES[$nom]) && !($_FILES[$nom] == "") && is_uploaded_file($_FILES[$nom]['tmp_name']))
			return $_FILES[$nom];
		break;
	}
	return false; // Si pb pour récupérer la valeur 
}



function valider_fichiers($nom){
    if (isset($_FILES[$nom])) {
        $fichiers = $_FILES[$nom];

        // Vérifier si des fichiers ont été téléchargés
        if ($fichiers['error'][0] === UPLOAD_ERR_NO_FILE) {
            return false;
        }

        // Itérer sur chaque fichier et le valider
        $fichiers_valides = array();
        foreach ($fichiers['name'] as $index => $nom) {
            if ($fichiers['error'][$index] === UPLOAD_ERR_OK) {
                $fichier = array(
                    'nom' => proteger($nom),
                    'type' => proteger($fichiers['type'][$index]),
                    'tmp_name' => proteger($fichiers['tmp_name'][$index])
                );
                $fichiers_valides[] = $fichier;
            }
        }
        return $fichiers_valides;
    }
    return false;
}






/**
 * Fonction qui permet de protéger une chaîne de caractères contre les injections SQL et XSS en utilisant la fonction addslashes
 * A utiliser avant d'insérer une chaîne de caractères dans une requête SQL
 * @param string $str
 * @return string
 */
function proteger($str){
	if (is_array($str)){
		$nextTab = array();
		foreach($str as $cle => $val){ 
			$nextTab[$cle] = addslashes($val);
		}
		return $nextTab;
	}else 	
		return addslashes($str); 
}



/**
 * Fonction qui permet de récupérer une valeur dans un des tableaux GET, POST, COOKIES, SESSION
 * Si le paramètre est présent et non vide, on le renvoie en l'ayant protégé contre les injections SQL et XSS
 * Si le paramètre est absent ou vide, on renvoie la valeur par défaut
 * @param string $nom
 * @param string $defaut
 * @param string $type
 * @return string
 */
function getValue($nom,$defaut=false,$type="REQUEST"){
	// NB : cette commande affecte la variable resultat une ou deux fois
	if (($resultat = valider($nom,$type)) === false)
		$resultat = $defaut;

	return $resultat;
}



/**
 * Fonction qui permet de rediriger vers une autre page
 * @param string $url
 * @param string $qs
 */
function rediriger($url,$qs=""){
	if ($qs != "") $qs = "?$qs";
 
	header("Location:$url$qs"); // envoi par la méthode GET
	die(""); // interrompt l'interprétation du code 

}

?>
