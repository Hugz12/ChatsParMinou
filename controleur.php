<?php
session_start();

include_once "libs/maLibUtils.php"; 
include_once "libs/modele.php"; 
include_once "libs/maLibSecurisation.php";  

$url = ($_SERVER["HTTP_REFERER"]); // On récupère l'url de la page précédente
$urlBase = "index.php"; 


if ($action = valider("action")){ // action = valeur de l'attribut name du bouton submit d'1 form
	ob_start (); // On démarre le tampon de sortie
	echo "Action = '$action' <br />";
	switch($action){
		
		
		case 'Connexion' :
			// On verifie la presence des champs mail et password
			if ($mail = valider("mail"))
			if ($password = valider("password")){

				if (verifUser($mail,$password)) { // On verifie l'utilisateur, et on crée des variables de session si tout est OK
					// tout s'est bien passé, doit-on se souvenir de la personne ? 
					if (valider("remember")) { // 
						setcookie("mail",$mail , time()+60*60*24*30);
						setcookie("password",$password, time()+60*60*24*30);
						setcookie("remember",true, time()+60*60*24*30);
						$_SESSION['mail'] = $mail;
					} else {
						setcookie("Pseudo","", time());
						setcookie("Mdp","", time());
						setcookie("remember",false, time());
					}
					$qs = "?view=accueil";
					
				} else {
					$qs = "?view=connexion";
					$_SESSION['error'] = "Mauvais login ou mot de passe";
				}
			}
			
		break;




		case 'Deconnexion' :
			session_destroy(); // On détruit la session
			$qs = "?view=accueil";



		
		case 'Ajouter Utilisateur' :
			// On vérifie la présence des champs
			if ($mail = valider("mail", "POST"))
			if ($password = valider("password", "POST"))
			if ($password2 = valider("password2", "POST"))
			if ($name = valider("name", "POST")){

				
				if ($password == $password2) {// On vérifie que les mots de passe sont identiques
					if (!userExistsBDD($mail)) { // Si l'utilisateur n'existe pas déjà

						addUserBDD($mail,$password,$name); // On ajoute l'utilisateur à la BDD
						
						// on véririfie si une photo a été envoyé et on l'upload si c'est le cas
						if($photo = valider("photo","FILES")){
							if (!uploadPhoto($photo, "./ressources/users/", $mail)) { // on convertit l'image en jpg
								$_SESSION['error'] = "Extension non autorisée, vous pourrez changer votre photo depuis la page profil";
							}
						}

						// on connecte l'utilisateur
						if (verifUser($mail,$password)) { // On verifie l'utilisateur, et on crée des variables de session si tout est OK
							if (valider("remember")) { 
								setcookie("mail",$mail , time()+60*60*24*30);
								setcookie("password",$password, time()+60*60*24*30);
								setcookie("remember",true, time()+60*60*24*30);
							} else {
								setcookie("Pseudo","", time());
								setcookie("Mdp","", time());
								setcookie("remember",false, time());
							}
						}

						$qs = "?view=accueil";
						
					} else {
						$_SESSION['error'] = "Ce mail est déjà utilisé"; // Sinon on affiche un message d'erreur
						$qs = "?view=connexion";
					}
				} else {
					$qs = "?view=connexion";
					$_SESSION['error'] = "Les mots de passe ne sont pas identiques"; // Sinon on affiche un message d'erreur
				}
			}
		break;




		case 'Demande adoption' :
			// On vérifie la présence des champs
			// TODO Ajouter des vérifications spplémentaires
			if ($nomChat = valider("nomChat"))
			if ($nom = valider("nom"))
			if ($prenom = valider("prenom"))
			if ($mail = valider("mail"))
			if ($tel = valider("tel"))
			if ($adresse = valider("adresse"))
			if ($habitation = valider("habitation"))
			if (valider("exterieur") == 'on')
				$exterieur = 1;
			else
				$exterieur = 0;
			if (valider("sortie") == 'on')
				$sortie = 1;
			else
				$sortie = 0;
			if ($situationFamiliale = valider("situationFamiliale"))
			if ($animaux = valider("animaux"))
			if ($commentaire = valider("commentaire")){

				addDemandeAdoptionBDD($nomChat,$nom,$prenom,$mail,$tel,$adresse,$habitation,$exterieur,$sortie,$situationFamiliale,$animaux,$commentaire); // On ajoute la demande à la BDD
				$qs = "?view=accueil";
				$_SESSION['message'] = "Votre demande a bien été envoyée";
			}	else {
				$qs = "?view=adoption";
				$_SESSION['error'] = "Veuillez remplir tous les champs"; // Sinon on affiche un message d'erreur
			}
		break;



		case 'Ajouter Evenement' :
			// On vérifie la présence des champs
			if ($titre = valider("titre","POST"))
			if ($description = valider("description","POST"))
			if ($date = valider("date","POST"))
			if ($heure = valider("heure","POST"))
			if ($couleur = valider("couleur","POST"))
			if ($image = valider("image","FILES")){
				$date = $date." ".$heure.":00"; // On concatène la date et l'heure
				// On ajoute l'événement à la BDD
				$id = addEvenement($titre,$description,$date,$couleur);
				if (!uploadPhoto($image, "./ressources/evenements/", $id)) { // on convertit l'image en jpg
					$_SESSION['error'] = "Extension non autorisée, vous pourrez ajouter une photo en modifiant l'évenement";
					break;
				}
				
				
				$qs = "?view=accueil";

			}

		break;



		case 'Changer Chat Du Mois' :
			// On vérifie la présence des champs
			if ($code = valider("code")){
				// On ajoute l'événement à la BDD
				setChatDuMois($code);
				$qs = "?view=accueil";
			}
		break;



		case 'Changer Statut Demande' :
			// On vérifie la présence des champs
			if ($id = valider("id"))
			if ($statut = valider("statut")){
				setStatutDemande($id, $statut);
			}
		break;



		case 'Supprimer Demande' :
			// On vérifie la présence des champs
			if ($id = valider("id"))
			if ($code = valider("code")){
				supprimerDemande($id, $code);
			}
		break;



		case 'Changer Memo' :
			// On vérifie la présence des champs
			if ($id = valider("id"))
			if ($memo = valider("memo"))
			if ($datePv = valider("datePv"))
			if ($resultatPv = valider("resultatPv"))
			if ($dateRencontre = valider("dateRencontre")){
				setMemo($id, $memo, $datePv, $resultatPv, $dateRencontre);
			}
		break;

		case 'Ajouter un chat' : 

			echo "sexe " . $sexe = valider("sexe","POST");
			echo "familleAccueil " . $familleAccueil = valider("familleAccueil","POST");
			die();
			// On vérifie la présence des champs
			if (($nom = valider("nom","POST"))
			&& ($code = valider("code","POST"))
			&& ($date = valider("dateNaissance","POST"))
			&& ($sexe = valider("sexe","POST"))
			&& ($race = valider("race","POST"))
			&& ($statut = valider("statut","POST"))
			&& ($description = valider("description","POST"))
			&& ($familleAccueil = valider("familleAccueil","POST"))
			&& ($couleur = valider("couleur","POST"))
			&& ($photos = valider_fichiers("photos")))
			{
				echo $sexe;
				echo $familleAccueil;
				die();
				if(existChat($code)){ // On vérifie que le code n'est pas déjà utilisé
					$_SESSION['error'] = "Ce code est déjà utilisé";
					$qs = "?view=chatsAdoption";
					break;
				} else {
					
					// On ajoute le chat à la BDD
					$nbPhotos = count($photos);
					addChat($nom,$code,$date,$sexe,$race,$statut,$description,$familleAccueil,$couleur,$nbPhotos);					

					// On crée le dossier du chat
					mkdir("./ressources/chats/$code", 0777, true);
					
					// On ajoute les photos
					$i = 0;
					foreach ($photos as $fichier) {
						uploadPhoto($fichier, "./ressources/chats/$code/", $i);
						$i++;
					}
					$qs = "?view=chatsAdoption";
				}
			}
		break;

		case "Modifier Evenement" :
			// On vérifie la présence des champs
			if ($id = valider("id","POST"))
			if ($titre = valider("titre","POST"))
			if ($description = valider("description","POST"))
			if ($date = valider("date","POST"))
			if ($heure = valider("heure","POST"))
			if ($couleur = valider("couleur","POST")){
				$date = $date." ".$heure.":00";
				// On ajoute l'événement à la BDD
				editEvent($id,$titre,$description,$date,$couleur);
				// on verifie si un fichier a été uploadé
				$image = valider("image","FILES");
				if ($image["name"] !== ""){
					// on supprime l'ancienne image
					unlink("./ressources/evenements/$id.jpg");
					// on upload la nouvelle
					if (!uploadPhoto($image, "./ressources/evenements/", $id)) { // on convertit l'image en jpg
						$_SESSION['error'] = "Extension non autorisée, vous pourrez ajouter une photo en modifiant l'évenement";
						break;
					}
				}
				$qs = "?view=accueil";
			}
		break;


		case "Supprimer Evenement" :
			// On vérifie la présence des champs
			if ($id = valider("id")){
				// On supprime l'événement de la BDD
				supprimerEvenement($id);
				// on supprime l'image
				unlink("./ressources/evenements/$id.jpg");
				$qs = "?view=accueil";
			}



		case "Supprimer Chat" : 
			// On vérifie la présence des champs
			if ($code = valider("code")){
				// On supprime le chat de la BDD
				supprimerChat($code);
				// On supprime le dossier du chat
				supprimerDossier("./ressources/chats/$code");
				$qs = "?view=chatsAdoption";
			}
		break;


		case 'Modifier le chat' : 
			// si il y a au moins un champ non vide
			
			if  ($statut = valider("statut","POST"))
			if  ($nom = valider("nom", "POST")) 
			if 	($familleAccueil = valider("familleAccueil","POST")) 
			if	($couleur = valider("couleur","POST")) 
			if 	($code = valider("code","POST"))
			if	($description = valider("description","POST")){
				
				// On ajoute le chat à la BDD
				if($existentFiles = valider("existentFiles", "POST")) {
					$tabExistentFiles = (explode(" ", $existentFiles));
					array_pop($tabExistentFiles);
					$nbPhotos = count(scandir("./ressources/chats/$code")) - 2;
					for($i = 0; $i < $nbPhotos; $i++) {
						if (!in_array($i, $tabExistentFiles)) {
							//echo "unlink ./ressources/chats/$code/$i.jpg <br/>";
							unlink("./ressources/chats/$code/$i.jpg");
						}
					}
				}
				else {
					$tabExistentFiles = array();
					for($i = 0; $i < count($tabExistentFiles); $i++) {
						//echo "unlink ./ressources/chats/$code/$i <br/>";
						unlink("./ressources/chats/$code/$i");
					}
				}
				
				
				$i = 0;
				
				$fichiers = scandir("./ressources/chats/$code");
				foreach ($fichiers as $fichier) {
					if ($fichier != "." && $fichier != "..") {
						//echo "rename ./ressources/chats/$code/$fichier as ./ressources/chats/$code/$i.jpg <br/>";
						rename("./ressources/chats/$code/$fichier", "./ressources/chats/$code/$i.jpg");
						$i++;
					}
				}
				
				if($photos = valider_fichiers("photos")) {
					$i = count($tabExistentFiles);
					foreach ($photos as $fichier) {
						//echo "upload " . $fichier['nom'] . " as ./ressources/chats/$code/$i.jpg <br/>";
						uploadPhoto($fichier, "./ressources/chats/$code/", $i);
						$i++;
					}
				}
				else {
					$photos = array();
				}
				$nbPhotos = count($photos) + count($tabExistentFiles);
				//echo $nbPhotos;
				editChat($nom,$statut,$description,$familleAccueil,$couleur,$nbPhotos,$code);					
				// On ajoute les photos
				$qs = "?view=chatsAdoption";
			}
		break;

		case 'Changer la photo de profil' :
			// On vérifie la présence des champs
			if ($image = valider("image","FILES")){
				// on supprime l'ancienne image
				unlink("./ressources/users/".$_SESSION["mail"].".jpg");
				// on upload la nouvelle
				if (!uploadPhoto($image, "./ressources/users/", $_SESSION["mail"])) { // on convertit l'image en jpg
					$_SESSION['error'] = "Extension non autorisée, vous pourrez ajouter une photo en modifiant votre profil";
					break;
				}
				$qs = "?view=profil";
			
			}
		break;


		case 'addPassage' : 
			// vérifier la présence des champs 
			if ($date = valider("date"))
			if ($heureDebut = valider("debut"))
			if ($heureFin = valider("fin"))
			if ($description = valider("description"))
			if (isset($_SESSION["mail"]))
			if ($heureDebut < $heureFin){

				$retour = ajouterPassage($date,$heureDebut,$heureFin,$description,$_SESSION["mail"]);

				if($retour == "alreadyExist"){ // Si le passage existe déjà
					ob_clean(); 
					header('Content-Type: application/json'); // On indique que le contenu est du json
					echo json_encode("alreadyExist"); // On renvoie le message d'erreur

				} else {
					ob_clean(); // On vide le tampon de sortie
					header('Content-Type: application/json'); 
					echo json_encode("added"); // On renvoie le message de succès
				}
			} else if ($heureDebut > $heureFin){
				ob_clean(); // On vide le tampon de sortie
				header('Content-Type: application/json');
				echo json_encode("erreur"); // On renvoie le message d'erreur
			}
			die();
		break;

		// Action qui ne sont pas afficher sur la page, 
		// c'est a dire qui vont etre appeler via des requetes ajax ou autre

		case 'getChatDuMois' :
			// On vérifie la présence des champs
			// On ajoute l'événement à la BDD
			$chat = chatDuMois();
			ob_clean(); // On vide le tampon de sortie
			header('Content-Type: application/json');
			echo json_encode($chat);
			die(); 

		break;

		case 'getChat' : 
			// qui renvoi les infos du chat en json
			if ($code = valider("code")){
				$chat = getChat($code);
				ob_clean(); // On vide le tampon de sortie
				header('Content-Type: application/json');
				echo json_encode($chat);
				die(); 
			}
		break;


		case 'getNbPhotos' : 
			// qui renvoi le nombre photos du chat stocké dans un dossier
			if ($code = valider("code")){
				$nbPhotos = getNbPhotos($code);
				ob_clean(); // On vide le tampon de sortie
				header('Content-Type: application/json');
				echo json_encode($nbPhotos);
				die(); 
			}
		break;

		case 'getEvent' : 
			// qui renvoi les infos de l'événement en json
			if ($id = valider("id")){
				$event = getEvent($id);
				ob_clean(); // On vide le tampon de sortie
				header('Content-Type: application/json');
				echo json_encode($event);
				die(); 
			}
		break;

		case 'getPassages' : 
			// qui renvoi les infos de l'événement en json
			if ($mois = valider("mois")){
				$passages = getPassages($mois);
				ob_clean(); // On vide le tampon de sortie
				header('Content-Type: application/json');
				echo json_encode($passages);
				die(); 
			}
		break; 


		

	}


	

}


// On redirige vers la page index avec les bons arguments
if ($qs) {
	header("Location:" .  $urlBase . $qs);
} else {
	header("Location:" . $url);
}

//header("Location:" . $urlBase . $qs);

// On écrit seulement après cette entête
ob_end_flush(); // On vide le tampon de sortie
	
?>










