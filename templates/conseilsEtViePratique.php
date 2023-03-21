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
	<div id="conteneur-divs"></div>
	
	<div id="conseils">

		<a href="https://www.youtube.com">
			<div class="conseilTitre">Bonjour</div>
			<div class="conseilText">Au revoir</div>
		</a>
		
		<a href=""></a>
	</div>

	<button id="ajouter-div" onclick="ajouterDiv()">Ajouter une div</button>
</div>


<div>
	
</div>