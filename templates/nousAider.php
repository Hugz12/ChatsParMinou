<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>
<link rel="stylesheet" href="./css/nousAider.css">



<div class="category categoryColor1">
	<img src="./ressources/divers/chat.jpg" alt="photo qui somme nous">
	<div class="directContent">
		<div class="title">Devenir bénévole</div>
		<div class="content">
			La misère féline vous touche ? vous avez envie de vous investir dans des actions de protection animale concrètes, 
			serieuses et efficaces, dans un contexte associatif serein et épanouissant ? Alors rejoignez les bénévoles de Chats par Minou.
		</div>
		<div class="buttonList">
			<button class="buttonType">Devenir bénévole</button>
		</div>
	</div>
</div>


<div class="category categoryColor2">
	<img src="./ressources/divers/chat.jpg" alt="photo qui somme nous">
	<div class="directContent">
		<div class="title">Don matériel</div>
		<div class="content">
			Vous souhaitez faire un don de alimentaire/matériel ? Vous pouvez le faire a la permanance de la Maison des Chats par Minou tout les 
			mercredi de 14h a 16h ou sur rendez-vous <br>(contactez-nous: chatsparminou@gmail.com ou via Facebook)
		</div>
	</div>
</div>


<div class="category categoryColor1">
	<img src="./ressources/divers/chat.jpg" alt="photo qui somme nous">
	<div class="directContent">
		<div class="title">Don financier</div>
		<div class="content">
			Vous souhaitez faire un don de financer ? Vous pouvez le faire par virement (RIB sur demande), par Paypal, par chèque, en espèces 
			(directement a l'association) ou en participant sur HelloAsso ou Teaming   
		</div>
		<div class="buttonList">
			<button class="buttonType" onclick="window.open('https://www.helloasso.com/associations/association-chats-par-minou/adhesions/adhesion-2021', '_blank')">HelloAsso</button>
			<button class="buttonType" onclick="window.open('https://www.teaming.net/chatsparminou', '_blank')">Teaming</button>
		</div>
	</div>
</div>


<div class="category categoryColor2">
	<img src="./ressources/divers/chat.jpg" alt="photo qui somme nous">
	<div class="directContent">
		<div class="title">Spécial entreprise</div>
		<div class="content">
			Si vous etes une entreprise ou un commerçant, vous pouvez ajouter une tirelire dans votre commerce/entreprise on en développant 
			des actions solidaires contre publicité
		</div>
	</div>
</div>

