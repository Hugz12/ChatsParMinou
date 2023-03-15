<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>
<link rel="stylesheet" href="./css/profil.css">
<link rel="stylesheet" href="css/form.css">

<div class="info">
		<div class="titre">Informations personnelles</div>
		<form>
			<div class='group'>
								<input type='text' name='nom' value ="Albert" required>
								<label for="nom">Nom et prénom</label>
			</div>

			<div class='group'>
								<input type='text' name='mail' required>
								<label for="mail">Adresse mail</label>
			</div>

		</form>

</div>

<div class="pdp">
	<div class="titre">Photo de profil</div>
	<?php
	echo "<img id=\"photoDeProfil\" src=\"".valider("photoDeProfil", "SESSION")."\"   />";
	?>
</div>

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

		</form>
</div>

<div class="gestion">
	<div class="titre">Gestion des utilisateurs</div>

</div>

<div class="mail">
	<div class="titre">Changer d'adresse mails</div>
	<form>
			<div class='group'>
								<input type='text' name='mailv'  required>
								<label for="mailv">Ancien mail</label>
			</div>

			<div class='group'>
								<input type='text' name='mailn' required>
								<label for="mailn">Nouveau mail</label>
			</div>

			<div class='group'>
								<input type='text' name='mailn2' required>
								<label for="mailn2">Confirmer le nouveau mail</label>
			</div>

		</form>
</div>