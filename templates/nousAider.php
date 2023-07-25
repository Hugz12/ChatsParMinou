<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>
<link rel="stylesheet" href="./css/nousAider.css">


<div class="nousAider">
	<div class="fondCouleur">
		<div class="photo">
			<img src="./ressources/users/aze.jpg" alt="Photo 1" width="100" height="100">
		</div>
		<div class="droite">
			<div class="texte tailleSousTitre">
				<h1>Devenir bénévole</h1>
				<p>Pour devenir membre et/ou bénévole de Chats par Minou il vous suffit d'appuyer sur ce bouton</p>
				<input type='button' class='buttonType' onclick=window.location.href='https://www.helloasso.com/associations/association-chats-par-minou/adhesions/adhesion-2021'; value='Adhérer' />
			</div>
		</div>
		<div style="clear:both;"></div>
	</div>
	<div class="fondBlanc">
		<div class="photo">
			<img src="./ressources/users/aze.jpg" alt="Photo 2" width="100" height="100">
		</div>
		<div class="droite">
			<div class="texte">
				<h1>Titre 1</h1>
				<p>Texte 1</p>
			</div>
		</div>
		<div style="clear:both;"></div>
	</div>
</div>
		<!-- Ajoutez les autres blocs similaires ici -->
	</div>
</body>