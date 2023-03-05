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
			<h1>Conseils</h1>
		</div>
		<div id="conseilText" class="policeTexte">
			<a href="https://www.youtube.com">Mmmh oui c'est le conseil de la semaine</a>
			<br/>
			<a href="https://www.youtube.com">C'est genre le conseil mais pas le même</a>
		</div>
	</div>
	<div id="viePratique">
		<div id="viePratiqueTitre" class="policeTitre">
			<h2>Vie pratique</h2>
		</div>
		<div id="conseilText2" class="policeTexte">
			<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		</div>
		<div>
			<img src="./ressources/chats/1/0.jpg" alt="Bonsoir" id="image"></img>
		</div>
	</div>
</div>