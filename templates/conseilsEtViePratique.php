<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>

<script src="./js/utils.js"></script>
<script src="./js/conseilsEtViePratique.js"></script>
<link rel="stylesheet" href="css/conseilsEtViePratique.css"> 

<div>
	<div id="conseils">
		<div id="conseilTitre" class="policeTitre">
			<h1>Conseils et vie pratique</h1>
		</div>
		<a href="https://www.youtube.com" id="conseilText" class="policeTexte">Votre chat chie partout ? Voici notre conseil</a>
	</div>
	<div>
		<img src="./ressources/chats/1/0.jpg" alt="Bonsoir" id="image"></img>
	</div>
</div>