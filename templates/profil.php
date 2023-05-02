<?php

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
				$nom = "$_SESSION[mail]";
				echo "Bonjour  " . $nom . ", voici votre profil";
				?> 
</div>
			
<div class="contour">

	<div class="pdpInfo">
		<div class="pdp">
			<form action="controleur.php" method="post" enctype="multipart/form-data">
				<?php
				echo "<label for='image'><img id=\"photoDeProfil\" class=\"photoProfil\" src=\"".valider("photoDeProfil", "SESSION")."\"   /></label>";
				?>
				<input type="file" name="image" style="display : none;" id="image" onchange="changerPhotoProfil(this);">
				<input type="hidden" class="buttonType" value="Changer la photo de profil" name="action">
			</form>
		</div>

		<div class="info">
				<form>
					<div class='group'>
										<input type='text' name='nom' required>
										<label for="nom">Nom</label>
					</div>

					<div class='group'>
										<input type='text' name='prenom' required>
										<label for="prenom">Prénom</label>
					</div>

					<div class='group'>
										<input type='text' name='mail' value="<?php echo"$_SESSION[mail]"; ?>"required>
										<label for="mail">Adresse mail</label>
					</div>

					<input type="submit" class="buttonType" value="Modifier mes informations personnelles">
				</form>
  
	<div class="mdpMailGestion">
		<div class="mdp">
			<div class="titre">Changer de mot de passe</div>
			<form>
					<div class='group'>
										<input type='text' name='mdpv'  required>
										<label for="mdpv">Ancien mdp</label>
					</div>

					<div class='group'>
										<input type='text' name='mdpn' required>
										<label for="mdpn">Nouveau mdp</label>
					</div>

					<div class='group'>
										<input type='text' name='mdpn2' required>
										<label for="mdpn2">Confirmer le nouveau mdp</label>
					</div>

					<input type="submit" class="buttonType" value="changer de mot de passe">
				</form>
		</div>

		<div class="mail">
			<div class="titre">Changer d'adresse mails</div>
			<form>


					<div class='group'>
										<input type='text' name='mailn' required>
										<label for="mailn">Nouveau mail</label>
					</div>

					<input type="submit" class="buttonType" value="changer d'adresse mail">
				</form>
		</div>

		<div class="gestion">
			<div class="titre">Gestion des utilisateurs</div>

		</div>
	</div>
</div>