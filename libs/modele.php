<?php

//  E  N  T  E  T  E  S  //

include_once("maLibSQL.pdo.php"); // To make requests to the database
include_once("maLibSecurisation.php"); // To use hashedPassword()

/**
 * @file modele.php
 * Fichier contenant des fonctions de gestion de la base de données
 */



//  F  O  N  C  T  I  O  N  S  //


/**
 * Fonction qui vérifie si un utilisateur existe dans la base de données en fonction de la clé primaire mail
 * @param $mail
 * @return bool
 */
function userExistsBDD($mail){
    $SQL = "SELECT * FROM utilisateur WHERE mail='$mail'";
    $mailBDD = SQLGetChamp($SQL);
    if ($mailBDD == false) 
        return false;
    else 
        return true;
}



/**
 * Fonction qui vérifie si un utilisateur est admin
 * @param $mail
 * @return bool
 */
function isAdmin($mail){
	$SQL ="SELECT role FROM utilisateur WHERE mail='$mail'";
	$isAdmin = SQLGetChamp($SQL); 
	if ($isAdmin == "admin") 
		return true;
	else 
		return false;
}



/**
 * Fonction qui ajoute un utilisateur dans la base de données en cryptant le mot de passe
 * @param $mail
 * @param $password
 * @param $name
 * @return bool
 */
function addUserBDD($mail,$password,$name){
    $hashedPassword = hashedPassword($password);
    $SQL = "INSERT INTO utilisateur (mail,password,name,role) VALUES ('$mail','$hashedPassword','$name','NULL')";
    return SQLInsert($SQL);
}

/**
 * Fonction qui retourne les informations du chat du mois
 * @return array
 */
function chatDuMois(){
    $SQL = "SELECT * FROM chat WHERE chatDuMois = 1";
    $chatDuMois = parcoursRS(SQLSelect($SQL));
    if ($chatDuMois == array()){
        return false;
    } else {
        return $chatDuMois;
    }
}



/**
 * Fonction qui retourne la liste des évènements
 * 
 */
function listeEvenements(){
    $SQL = "SELECT * FROM evenement";
    return parcoursRS(SQLSelect($SQL));
}



/**
 * Fonction qui gère l'ajout d'un évènement et retourne l'id de l'évènement
 * @param $nom
 * @param $description
 * @return int
 */
function addEvenement($titre,$description,$date,$couleur){
    $SQL = "INSERT INTO evenement (titre,description,date,couleur) VALUES ('$titre','$description','$date','$couleur')";
    return SQLInsert($SQL); // retourne l'id de l'évènement
}

function supprimerEvenement($id){
    $SQL = "DELETE FROM evenement WHERE id = $id";
    return SQLDelete($SQL);
}



/*
* fonction qui gère l'ajout d'une demande d'adoption
* @param $codeChat
* @param $nom
* @param $prenom
* @param $mail
* @param $tel
* @param $adresse
* @param $habitation
* @param $exterieur
* @param $sortie
* @param $situationFamiliale
* @param $animaux
* @param $commentaire
*/
function addDemandeAdoptionBDD($codeChat,$nom,$prenom,$mail,$tel,$adresse,$habitation,$exterieur,$sortie,$situationFamiliale,$animaux,$commentaire){
    date_default_timezone_set('Europe/Paris');
    $date = date('d-m-y h:i:s');
    $SQL = "INSERT INTO demandeadoption (date,codeChat,nom,prenom,mail,tel,adresse,habitation,exterieur,sortie,situationFamiliale,animaux,commentaire,statutDemande,memo,datePv,resultatPv,dateRencontre) VALUES ('$date','$codeChat','$nom','$prenom','$mail','$tel','$adresse','$habitation','$exterieur','$sortie','$situationFamiliale','$animaux','$commentaire',1,'','','','')";
    return SQLInsert($SQL);
}


/** 
 * Fonction qui retourne la liste des chats
 * @return array
 */
function listerChats(){
    $SQL = "SELECT * FROM chat";
    return parcoursRS(SQLSelect($SQL));
}



function setChatDuMois($code){
    // On cherche le chat du mois actuel
    $SQL = "SELECT code FROM chat WHERE chatDuMois = 1";
    $chatDuMois = SQLGetChamp($SQL);

    // On retire le chat du mois
    // On vérifie que un chat du mois existe
    if ($chatDuMois != false){
        $SQL = "UPDATE chat SET chatDuMois = 0 WHERE code = $chatDuMois";
        SQLUpdate($SQL);
    }

    // On désigne le nouveau chat du mois
    $SQL = "UPDATE chat SET chatDuMois = 1 WHERE code = $code";
    SQLUpdate($SQL);
}



/**
 * Fonction qui sauvegarde la photo dans le dossier choisit et la converti en jpg
 * @param $photo
 * @param $rep
 * @return bool
 */
function uploadPhoto($photo, $rep, $name){
    if($photo["type"] == "image/jpeg" OR $photo["type"] == "image/jpg"){
        $photoExport = imagecreatefromjpeg($photo["tmp_name"]);
    } else if($photo["type"] == "image/png"){
        $photoExport = imagecreatefrompng($photo["tmp_name"]);
    } else if($photo["type"] == "image/gif"){
        $photoExport = imagecreatefromgif($photo["tmp_name"]);
    } else if($photo["type"] == "image/webp"){
        $photoExport = imagecreatefromwebp($photo["tmp_name"]);
    } else {
        die("Le format de l'image n'est pas supporté");
        return false;
    }
    $pos = $rep . $name . ".jpg";
    imagejpeg($photoExport, $pos, 100);
    return true;
}

/** 
 * Fonction qui recupere les informations des demandes d'adoption
 * @return array
 */
function getDemandes(){
    $SQL = "SELECT * FROM demandeAdoption JOIN chat ON demandeAdoption.codeChat = chat.code ORDER BY date DESC";
    $demandes = parcoursRS(SQLSelect($SQL));
    if ($demandes == array()){
        return false;
    } else {
        return $demandes;
    }
}

/** 
 * Fonction qui supprime une demande d'adoption
 */
function supprimerDemande($id){
    $SQL = "DELETE FROM demandeAdoption WHERE id=$id";
    SQLDelete($SQL);
}

/** 
 * Fonction qui met le statut d'une demande d'adoption à la bonne valeur
 */
function setStatutDemande($id, $statut){
    if ($statut == 1 || $statut == 3) $aux = 2;
    else $aux = 3;
    $SQL = "UPDATE demandeAdoption SET statutDemande=$aux WHERE id=$id";
    SQLUpdate($SQL);
}

/** 
 * Fonction qui met à jour le contenu d'un memo
 */
function setMemo($id, $memo, $datePv, $resultatPv, $dateRencontre, $commentaire){
    $SQL = "UPDATE demandeAdoption SET memo='$memo', datePv='$datePv', resultatPv='$resultatPv', dateRencontre='$dateRencontre', commentaire='$commentaire' WHERE id=$id";
    SQLUpdate($SQL);
}

function existChat($code){
    $SQL = "SELECT code FROM chat WHERE code = $code";
    $chat = SQLGetChamp($SQL);
    if ($chat == false) 
        return false;
    else 
        return true;
}

function addChat($nom,$code,$date,$sexe,$race,$statut,$description,$familleAccueil,$couleur,$nbPhotos){
    $sexe--;
    $familleAccueil--;
    $SQL = "INSERT INTO chat (code, name, dateDeNaissance, race, sexe, statut, description, familleAccueil, nbPhoto, couleur) VALUES ('$code','$nom','$date','$race','$sexe','$statut','$description','$familleAccueil','$nbPhotos','$couleur')";
    return SQLInsert($SQL);
}

function getChat($code){
    $SQL = "SELECT * FROM chat WHERE code = $code";
    return parcoursRS(SQLSelect($SQL));
}

function getEvent($id){
    $SQL = "SELECT * FROM evenement WHERE id = $id";
    return parcoursRS(SQLSelect($SQL));
}

function getPhotos($code){
    // retourne un tableau de photos du chat stocké dans le dossier ressources/chats/$code qui contient toutes les informations sur les photos pour pouvoir les afficher
    $photos = array();
    $dir = "ressources/chats/$code";
    $files = scandir($dir);
    foreach ($files as $file){
        if ($file != "." && $file != ".."){
            $photo = array();
            $photo["name"] = $file;
            $photo["url"] = "$dir/$file";
            $photos[] = $photo;
        }
    }
    return $photos;
}

function editChat($statut,$description,$familleAccueil,$couleur,$nbPhotos,$code){

    if ($statut != false){
        $SQL = "UPDATE chat SET statut = '$statut' WHERE code = $code";
        SQLUpdate($SQL);
    }
    if ($description != false){
        $SQL = "UPDATE chat SET description = '$description' WHERE code = $code";
        SQLUpdate($SQL);
    }
    if ($familleAccueil != false){
        $familleAccueil--;
        $SQL = "UPDATE chat SET familleAccueil = '$familleAccueil' WHERE code = $code";
        SQLUpdate($SQL);
    }
    if ($couleur != false){
        $SQL = "UPDATE chat SET couleur = '$couleur' WHERE code = $code";
        SQLUpdate($SQL);
    }
    if ($nbPhotos != false){
        $SQL = "SELECT nbPhoto FROM chat WHERE code = $code";
        $nbPhotosActuel = SQLGetChamp($SQL);
        $nbPhotosActuel += $nbPhotos;
        $SQL = "UPDATE chat SET nbPhoto = '$nbPhotosActuel' WHERE code = $code";
        SQLUpdate($SQL);
    }
}

function editEvent($id,$titre,$description,$date,$couleur){
    $SQL = "UPDATE evenement SET titre = '$titre', description = '$description', date = '$date', couleur = '$couleur' WHERE id = $id";
    SQLUpdate($SQL);
}


function supprimerChat($code){
    $SQL = "DELETE FROM chat WHERE code = $code";
    SQLDelete($SQL);
}

function ajouterPassage($date,$heureDebut,$heureFin,$description,$mail){
    // si il y a un passage à la même date et heure meme personne
    $SQL = "SELECT mailBenevole FROM passagerefuge WHERE date = '$date' AND heureDebut = '$heureDebut' AND heureFin = '$heureFin' AND mailBenevole = '$mail'";
    $passage = SQLGetChamp($SQL);
    if ($passage != false){
        return "alreadyExist";
    }
    $SQL = "INSERT INTO passagerefuge (date, heureDebut, heureFin, description, mailBenevole) VALUES ('$date','$heureDebut','$heureFin','$description','$mail')";
    SQLInsert($SQL);
    return "success";
}



function supprimerDossier($dir){
    rmdir($dir);
}

function getPassages($mois){
    $SQL = "SELECT * FROM passagerefuge WHERE MONTH(date) = $mois";
    return parcoursRS(SQLSelect($SQL));
}

?>




