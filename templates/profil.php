<?php

include_once './PHPMailer-master/src/PHPMailer.php';
/********************Protocole PHPMailer*****************************/
//$mail = new PHPMailer\PHPMailer\PHPMailer();












/********************************************************************/
if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

if (!valider('Connecte', 'SESSION')) {
	header("Location:./index.php?view=accueil");
	die();
}
?>

<link rel="stylesheet" href="./css/profil.css">
<link rel="stylesheet" href="css/form.css">
<script src="./js/profil.js"></script>
<div class="titre">
				<?php
				$nom=getNomUtilisateur($_SESSION['mail']);
				echo "Bonjour  " .$nom. ", voici votre profil";
				?> 
</div>
			

<div class="contour">
	<div class="pdpInfo">
		<div class="pdp">
			<form action="controleur.php" method="post" enctype="multipart/form-data">
				<?php
				if (file_exists("./ressources/users/".$_SESSION['mail'].".jpg")) {
					echo "<label for='image'><img id=\"photoDeProfil\" class=\"photoProfil\" src=\"".valider("photoDeProfil", "SESSION")."\"   /></label>";
				} else{
					echo "<label for='image'><img id=\"photoDeProfil\" class=\"photoProfil\" src=\"./ressources/users/default.png\"   /></label>";
				}
				?>
				<input type="file" name="image" style="display : none;" id="image" onchange="changerPhotoProfil(this);">
				<input type="hidden" class="buttonType" value="ChangerPhotoProfil" name="action">
			</form>
		</div>

		<div class="info">
		<form>
			<div class='group'>
			<?php
			$nom=getNomUtilisateur($_SESSION['mail']);
			echo "<input type='text' name='nom' value='$nom' id='nom-input' required>";
			?>
			<label for="nom">Nom et prénom</label>
			</div>
			<input type="button" onclick="changerNom();" class="buttonType" value="Modifier mes informations personnelles">
		</form>
		</div>
	</div>


	<div class="mdpMailGestion">
		<div class="mdp">
			<div class="titre">Changer de mot de passe</div>
			<form>
					<div class='group'>
						<input type='password' name='mdpv' id='mdpV' required>
						<label for="mdpv">Ancien mdp</label>
					</div>
					<div class='group'>
						<input type='password' name='mdpn' id='mdpN' required>
						<label for="mdpn">Nouveau mdp</label>
					</div>

					<div class='group'>
						<input type='password' name='mdpn2' id='mdpN2'required>
						<label for="mdpn2">Confirmer le nouveau mdp</label>
					</div>

					<input type="button" class="buttonType" value="changer de mot de passe" onclick="changerMdp()">
				</form>
		</div>

		<div class="mail">
			<div class="titre">Changer d'adresse mails</div>
			<form>


					<div class='group'>
						<input type='text' name='mailn' id="mail-input" required>
						<label for="mailn">Nouveau mail</label>
					</div>

					<input type="button" class="buttonType" value="changer d'adresse mail" onclick="changerMail();">
				</form>
		</div>
		<?php
			// Vérifier si l'utilisateur est admin
			if ($_SESSION["Admin"]) {
				echo '<form>';
				echo '<div class="tabGestion">';
				// Si l'utilisateur est admin, récupérer les résultats de la fonction
				$resultats = listerUtilisateurs();
				// Afficher la div et les résultats
				echo '<div class="gestion">
				<div class="titre">Gestion des utilisateurs
				<div id="i">i</div>
				</div>
				<form id="formRechercheUser" onsubmit="return false;" onkeyup="rechercher();">
				<div class="group">
					<input type="text" id="rechercheUser" required>
					<label for="rechercheUser">Rechercher un utilisateur par son nom</label>
				</div>
				</form>';
				echo '<div class="utilisateurs">';
				foreach($resultats as $resultat) {
					echo'<div class="utilisateur">';
					if (($resultat['role']==3||( $resultat['role']==2 && isSuperAdmin($_SESSION['mail']))&& $resultat['role']!=1)){
					echo '<input type="button" id="upRole_'.$resultat['mail'].'" data-mail="'.$resultat['mail'].'" data-nom="'.$resultat['name'].'" data-role="'.$resultat['role'].'" class="buttonType" value="+" onclick="changerRole();">';
					} else {
						echo '<input type="button" class="buttonType buttonNoHover" value="+">';	
					}
					echo'<div class="perso">';
					$mail = $resultat['mail'];
					if (file_exists("./ressources/users/$mail.jpg")) {
						echo "<img id=\"photoDeProfil\" class=\"photoGestion\" src=\"./ressources/users/$mail.jpg\"/>";
					} else{
						echo "<img id=\"photoDeProfil\" class=\"photoGestion\" src=\"./ressources/users/default.png\"/>";
					}
					// Utilisation de la structure de contrôle if/else pour déterminer la classe de couleur
					if ($resultat['role'] == 1) {
						echo '<span class="role-1">' . $resultat['name'] . '</span>';
					} else if ($resultat['role'] == 2) {
						echo '<span class="role-2">' . $resultat['name'] . '</span>';
					} else if ($resultat['role'] == 3) {
						echo '<span class="role-3">' . $resultat['name'] . '</span>';
					} else {
						echo $resultat['name'];
					}

					echo '</div>';
					if ($resultat['role']==2){
					echo '<input type="button" id="downRole_'.$resultat['mail'].'" data-mail="'.$resultat['mail'].'" data-nom="'.$resultat['name'].'" data-role="'.$resultat['role'].'" class="buttonType" value="-" onclick="changerRole();">';
					} else if ( $resultat['role']==3) {
					echo '<input type="button" id="downRole_'.$resultat['mail'].'" data-mail="'.$resultat['mail'].'" data-nom="'.$resultat['name'].'" data-role="'.$resultat['role'].'" class="buttonType" value="x" onclick="changerRole();">';
					} else if ($resultat['role']==1) {
						echo '<input type="button" class="buttonType buttonNoHover"  value="-">';	
					}
					echo '</div>';
				}
				echo '</div>';
			
				


				echo '</div>';
				echo '</div>';
				echo '</form>';
			}
			 else {
				// Si l'utilisateur n'est pas admin, cacher la div en ajoutant un attribut de style
				echo '<div class="gestion" style="display:none;"></div>';
		}
		?>
	</div>
</div>
<div id="popupInfos">
	<p>Rôles des utilisateurs :</p>
	<ul>
		<li class="role-1">Administrateur</li> (de préférence 1 seul / il à tous les droits)
		<li class="role-2">Bénévole</li> (peut voir le calendrier et modifier les événements)
		<li>Utilisateur</li> (pour les personnes qui veulent juste adopter)
	</ul>
	<p>Boutons de gestions :</p>
	<ul>
		<li>Le bouton de gauche permet passer un utilisateur au rôle supérieur </li>

		<li>Le bouton de droite permet passer un utilisateur au rôle inférieur </li>
		Si il est utlisateur il sera supprimé de la liste des utilisateurs
	</ul>
</div>