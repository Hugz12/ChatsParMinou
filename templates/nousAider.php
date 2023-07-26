<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>
<link rel="stylesheet" href="./css/nousAider.css">



<div class="container fondBlanc">
	<img src="./ressources/divers/chat.jpg" alt="Photo 1" width="100" height="100">
	<div>
		<div class="tailleTitre policeTitre">Devenir bénévole</div>
		<div class="texte">
			La misère féline vous touche ? Vous avez envie de vous investir dans des actions de protection 
			animale concrètes, serieuse, et efficaces, dans un contexte associatif serein et épanouissant ? Alors rejoignez les bénévoles de Chats par Minous
		</div>
		<button class="buttonType">Rejoindre Chats par Minous</button>
	</div>
</div>

<div class="container fondCouleur">
	<div class="photo">
		<img src="./ressources/divers/chat.jpg" alt="Photo 2" width="100" height="100">
	</div>
	<div class="droite">
		<div class="texte">
			<h1>Titre 1</h1>
			<p>Texte 1</p>
		</div>
	</div>
	<div style="clear:both;"></div>
</div>

