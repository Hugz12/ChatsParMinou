<?php

//  E  N  T  E  T  E  S  //

include_once("maLibSQL.pdo.php"); // To make requests to the database
include_once("maLibSecurisation.php"); // To use hashedPassword()
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
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
	if ($isAdmin == "1" || $isAdmin == "2") 
		return true;
	else 
		return false;
}

function isSuperAdmin($mail){
    $SQL ="SELECT role FROM utilisateur WHERE mail='$mail'";
    $isAdmin = SQLGetChamp($SQL); 
    if ($isAdmin == "1") 
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
    $SQL = "INSERT INTO utilisateur (mail,password,name,role) VALUES ('$mail','$hashedPassword','$name',3)";
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

function changerNom($name){
    $mail = $_SESSION['mail'];
    $SQL = "UPDATE utilisateur SET name = '$name' WHERE mail = '$mail'";
    return SQLUpdate($SQL);
}

function envoyeMail($mailn){
    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = 0;                          //Enable verbose debug output
        $mail->isSMTP();                               //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';          //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                      //Enable SMTP authentication
        $mail->Username   = 'testdeschats@gmail.com';  //SMTP username
        $mail->Password   = 'hcrtwpcdlezuydtm';        //SMTP password
        $mail->SMTPSecure = 'tls';                     //Enable implicit TLS encryption
        $mail->Port       = 587;                       //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('ne-pas-repondre@gmail.com','Administrateur ChatsparMinou');
        $mail->addAddress($mailn);
        $mail->addReplyTo('noreplychatsparminou@gmail.com');
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');
        $confirmationCode = generateConfirmationCode(); // Remplacez 'generateConfirmationCode' par votre fonction pour générer le code
        // Créer le lien de confirmation avec le code généré
        $confirmationLink = 'http://localhost/ChatsParMinou/controleur.php?action=changerMail&code=' . $confirmationCode;
        codeMail($confirmationCode,$mailn);
        //Attachments
        //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Reinitialisation mail ChatsparMinou';
        $mail->Body    = 'En cliquant sur le lien vous pourrez réinitialiser votre adresse mail : <a href="' . $confirmationLink . '">Réinitialiser</a>';
        $mail->AltBody = 'Réinitialisation du mail ChatsparMinou';


        $mail->send();
        echo 'Le mail à bien été envoyé';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
    $mail->smtpClose();
}

function envoyeMailMdp($mailx, $mdp){
    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = 0;                          //Enable verbose debug output
        $mail->isSMTP();                               //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';          //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                      //Enable SMTP authentication
        $mail->Username   = 'testdeschats@gmail.com';  //SMTP username
        $mail->Password   = 'hcrtwpcdlezuydtm';        //SMTP password
        $mail->SMTPSecure = 'tls';                     //Enable implicit TLS encryption
        $mail->Port       = 587;                       //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('ne-pas-repondre@gmail.com','Administrateur ChatsparMinou');
        $mail->addAddress($mailx);
        $mail->addReplyTo('noreplychatsparminou@gmail.com');
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');
        $confirmationCode = generateConfirmationCode(); // Remplacez 'generateConfirmationCode' par votre fonction pour générer le code
        // Créer le lien de confirmation avec le code généré
        $confirmationLink = 'http://localhost/ChatsParMinou/controleur.php?action=changerMdpCode&code=' . $confirmationCode;
        codeMdp($confirmationCode,$mailx,$mdp);
        //Attachments
        //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Reinitialisation mot de passe ChatsparMinou';
        $mail->Body    = 'En cliquant sur le lien vous pourrez réinitialiser votre mot de passe : <a href="' . $confirmationLink . '">Réinitialiser</a>';
        $mail->AltBody = 'Réinitialisation du mot de passe ChatsparMinou';


        $mail->send();
        echo 'Le mail à bien été envoyé';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
    $mail->smtpClose();
}
function generateConfirmationCode() {
    // Générer un code unique basé sur l'heure actuelle en microsecondes
    return uniqid();
}

function codeMail($confirmationCode, $mailn) {
    $mailv = $_SESSION['mail'];
    // Utilisez le code de confirmation généré pour l'insérer dans la BDD
    $SQL = "INSERT INTO codeMail (code, ancienMail, info) VALUES ('$confirmationCode', '$mailv', '$mailn')";
    SQLInsert($SQL);
}

function codeMdp($confirmationCode, $mailx , $mdp) {
    // Utilisez le code de confirmation généré pour l'insérer dans la BDD
    $SQL = "INSERT INTO codeMail (code, ancienMail, info) VALUES ('$confirmationCode', '$mailx', '$mdp')";
    SQLInsert($SQL);
}

function verifyConfirmationCode($confirmationCode) {
    // Requête SQL pour vérifier si le code de confirmation existe dans la base de données
    $SQL = "SELECT COUNT(*) AS count FROM codeMail WHERE code = '$confirmationCode'";
    $count = SQLGetChamp($SQL);

    // Si le nombre de lignes avec le code de confirmation est supérieur à 0, cela signifie que le code est valide
    return $count > 0 ? 1 : 0;
}

function changerMail($mailv,$mailn){
    $SQL = "UPDATE utilisateur SET mail = '$mailn' WHERE mail = '$mailv'";
    return SQLUpdate($SQL);
}

function getMailv($code){
    $SQL = "SELECT ancienMail FROM codeMail WHERE code = '$code'";
    return SQLGetChamp($SQL);
}

function getInfo($code){
    $SQL = "SELECT info FROM codeMail WHERE code = '$code'";
    return SQLGetChamp($SQL);
}
function supCode($code){
    $SQL = "DELETE FROM codeMail WHERE code = '$code'";
    return SQLDelete($SQL);
}
function changerMdp($password){
    $mail = $_SESSION['mail'];
    $hashedPassword = hashedPassword($password);
    $SQL = "UPDATE utilisateur SET password = '$hashedPassword' WHERE mail = '$mail'";
    return SQLUpdate($SQL);

}
function changerMdpOublie($mailx,$info){
    $SQL = "UPDATE utilisateur SET password = '$info' WHERE mail = '$mailx'";
    return SQLUpdate($SQL);

}
function getPassword($mail){
    $SQL = "SELECT password FROM utilisateur WHERE mail = '$mail'";
    return SQLGetChamp($SQL);
}

function getNom($mail){
    $SQL = "SELECT name FROM utilisateur WHERE mail = '$mail'";
    return SQLGetChamp($SQL);
}

function changerRole($nom,$role,$mail){
    $SQL = "UPDATE utilisateur SET role = '$role' WHERE name = '$nom' and mail='$mail'";
    return SQLUpdate($SQL);
}

function supprimerUtilisateur($nom,$mail){
    $SQL = "DELETE FROM passageRefuge WHERE mailBenevole = '$mail';
            DELETE FROM hebergement WHERE mailHebergeur = '$mail';
            DELETE FROM utilisateur WHERE name = '$nom' and mail='$mail';";
    return SQLDelete($SQL);
}
function countName($name){
    $SQL = "SELECT COUNT(*) FROM utilisateur WHERE name = '$name'";
    return SQLGetChamp($SQL);
}


function ajoutDemande($date,$nom, $prenom, $mail, $tel, $adresse, $habitation, $ext, $sortir, $animaux, $sit, $com){
    $SQL = "INSERT INTO demandeAdoption (date,nom, prenom, mail, tel, adresse, habitation, exterieur, sortie, animaux, situationFamiliale, commentaire, statutDemande) VALUES ('$date','$nom', '$prenom', '$mail', '$tel', '$adresse', '$habitation', '$ext', '$sortir', '$animaux', '$sit', '$com',1)";
    return SQLInsert($SQL);
}
function getIdConcerne($date,$nom, $prenom, $mail, $tel, $adresse, $habitation, $ext, $sortir, $animaux, $sit, $com){
    $SQL = "SELECT id FROM demandeAdoption WHERE date='$date' AND nom='$nom' AND prenom='$prenom' AND mail='$mail' AND tel='$tel' AND adresse='$adresse' AND habitation='$habitation' AND exterieur='$ext' AND sortie='$sortir' AND animaux='$animaux' AND situationFamiliale='$sit' AND commentaire='$com'";
    return SQLGetChamp($SQL);
}

function ajoutConcerne ($id,$value){
    $SQL = "INSERT INTO concerne (idDemande,codeChat) VALUES ('$id','$value')";
    return SQLInsert($SQL);
}
/**
 * Fonction qui gère l'ajout d'un évènement et retourne l'id de l'évènement
 * @param $nom
 * @param $description
 * @return int
 */
function addEvenement($titre,$description,$date,$heureDebut,$heureFin,$couleur){
    $SQL = "INSERT INTO evenement (titre,description,date,heureDebut,heureFin,couleur) VALUES ('$titre','$description','$date','$heureDebut','$heureFin','$couleur')";
    return SQLInsert($SQL); // retourne l'id de l'évènement
}

function supprimerEvenement($id){
    $SQL = "DELETE FROM evenement WHERE id = $id";
    return SQLDelete($SQL);
}

function addConseil($name, $description){
    $SQL = "INSERT INTO conseils (name, description) VALUES ('$name', '$description')";
    return SQLInsert($SQL);
}


function getConseils(){
    $SQL = "SELECT * FROM conseils";
    return parcoursRS(SQLSelect($SQL));
}

function delConseil($name){
    $SQL = "DELETE FROM conseils WHERE name = '$name'";
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
    $SQL = "INSERT INTO demandeAdoption (date,codeChat,nom,prenom,mail,tel,adresse,habitation,exterieur,sortie,situationFamiliale,animaux,commentaire,statutDemande) VALUES ('$date','$codeChat','$nom','$prenom','$mail','$tel','$adresse','$habitation','$exterieur','$sortie','$situationFamiliale','$animaux','$commentaire',1);
            INSERT INTO concerne (idDemandeAdoption,codeChat) VALUES (LAST_INSERT_ID(),'$codeChat');";
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



/**
 * 
 * Fonction qui retourne la liste des utilisateurs
 */
function listerUtilisateurs(){
    $SQL = "SELECT * FROM utilisateur";
    return parcoursRS(SQLSelect($SQL));
}

/**
 * fonction qui retourne le nom dse l'utilisateur courant
 */
function getNomUtilisateur($mail){
    $SQL = "SELECT name FROM utilisateur WHERE mail = '$mail'";
    return SQLGetChamp($SQL);
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
    $SQL = "SELECT * FROM concerne JOIN chat ON concerne.codeChat = chat.code JOIN demandeAdoption ON concerne.idDemande = demandeAdoption.id ORDER BY date DESC";
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
function supprimerDemande($id, $code){
    $SQL = "DELETE FROM concerne WHERE idDemande=$id AND codeChat=$code;
            DELETE FROM demandeAdoption WHERE id=$id;";
    SQLDelete($SQL);
}

/** 
 * Fonction qui met le statut d'une demande d'adoption à la bonne valeur
 */
function setStatutDemande($id, $statut){
    $SQL = "UPDATE demandeAdoption SET statutDemande=$statut WHERE id=$id";
    SQLUpdate($SQL);
}

/** 
 * Fonction qui met à jour le contenu d'un memo
 */
function setMemo($id, $memo, $datePv, $resultatPv, $dateRencontre){
    $SQL = "UPDATE demandeAdoption SET memo='$memo', datePv='$datePv', resultatPv='$resultatPv', dateRencontre='$dateRencontre' WHERE id=$id";
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

function addChat($nom,$code,$date,$sexe,$race,$description,$familleAccueil,$couleur,$nbPhotos){
    $sexe--;
    $familleAccueil--;
    $SQL = "INSERT INTO chat (code, name, dateDeNaissance, race, sexe, statut, description, chatDuMois, nbDemande, familleAccueil, vues, nbPhoto, couleur) VALUES ('$code','$nom','$date','$race','$sexe','1','$description','0','0','$familleAccueil','0','$nbPhotos','$couleur')";
    return SQLInsert($SQL);
}

function getChat($code){
    $SQL = "SELECT * FROM chat WHERE code = $code";
    return parcoursRS(SQLSelect($SQL));
}

function getRaces() {
    $SQL = "SELECT DISTINCT race FROM chat";
    return parcoursRS(SQLSelect($SQL));
}

function getEvent($id){
    $SQL = "SELECT * FROM evenement WHERE id = $id";
    return parcoursRS(SQLSelect($SQL));
}

function getNbPhotos($code){
    // retourne un tableau de photos du chat stocké dans le dossier ressources/chats/$code qui contient toutes les informations sur les photos pour pouvoir les afficher
    $SQL = "SELECT nbPhoto FROM chat WHERE code = $code";
    return SQLGetChamp($SQL);
}

function editChat($nom,$statut,$description,$familleAccueil,$couleur,$nbPhotos,$code){
    if ($nom != false){
        $SQL = "UPDATE chat SET name = '$nom' WHERE code = $code";
        SQLUpdate($SQL);
    }
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
        $SQL = "UPDATE chat SET nbPhoto = '$nbPhotos' WHERE code = $code";
        SQLUpdate($SQL);
    }
}

function editEvent($id,$titre,$description,$date,$heureDebut,$heureFin,$couleur){
    $SQL = "UPDATE evenement SET titre = '$titre', description = '$description', date = '$date', heureDebut = '$heureDebut', heureFin = '$heureFin', couleur = '$couleur' WHERE id = $id";
    SQLUpdate($SQL);
}


function supprimerChat($code){
    $SQL = "DELETE FROM chat WHERE code = $code";
    SQLDelete($SQL);
}

function ajouterPassage($date,$heureDebut,$heureFin,$description,$mail){
    // si il y a un passage à la même date et heure meme personne
    $SQL = "SELECT mailBenevole FROM passageRefuge WHERE date = '$date' AND heureDebut = '$heureDebut' AND heureFin = '$heureFin' AND mailBenevole = '$mail'";
    $passage = SQLGetChamp($SQL);
    if ($passage != false){
        return "alreadyExist";
    }
    $SQL = "INSERT INTO passageRefuge (date, heureDebut, heureFin, description, mailBenevole) VALUES ('$date','$heureDebut','$heureFin','$description','$mail')";
    SQLInsert($SQL);
    return "success";
}



function supprimerDossier($dir){
    rmdir($dir);
}

function getPassages($mois, $annee){
    $SQL = "SELECT * FROM passageRefuge WHERE MONTH(date) = $mois AND YEAR(date) = $annee";
    return parcoursRS(SQLSelect($SQL));
}

function deletePassage($date,$heureDebut,$heureFin){
    $SQL = "DELETE FROM passageRefuge WHERE heureDebut = '$heureDebut' AND heureFin = '$heureFin' AND date = '$date' AND mailBenevole = '".$_SESSION["mail"]."'";
    SQLDelete($SQL);
}


function verifyPDF($file){
    if ($_FILES[$file]['type'] != "application/pdf"){
        return false;
    }
    return $_FILES[$file];
}

?>