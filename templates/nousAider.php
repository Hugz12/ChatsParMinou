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
			La misère féline vous touche ? Vous avez envie de vous investir dans des actions de protection animale concrètes, sérieuses et efficaces, 
			dans un contexte associatif serein et épanouissant ? Alors rejoignez les bénévoles de Chats par Minou !
		</div>
		<div class="buttonList">
			<div class="buttonType" onclick="window.open('mailto:chatsparminou@gmail.com', 'mail')">chatsparminou@gmail.com</div>
			<button class="buttonType" onclick="window.open('https://www.helloasso.com/associations/association-chats-par-minou/adhesions/adhesion-2023', '_blank')">Nous rejoindre</button>
		</div>
	</div>
</div>


<div class="category categoryColor2">
	<img src="./ressources/divers/chat.jpg" alt="photo qui somme nous">
	<div class="directContent">
		<div class="title">Don matériel</div>
		<div class="content">
			Vous souhaitez nous faire un don alimentaire ou matériel ?
			Vous pouvez le faire lors de la permanence de la Maison des Chats par Minou, tous les Mercredi, de 14h à 16h, ou sur rendez-vous !
		</div>
		<div class="buttonList">
			<div class="buttonType" onclick="window.open('mailto:chatsparminou@gmail.com', 'mail')">chatsparminou@gmail.com</div>
			<button class="buttonType" onclick="window.open('https://facebook.com/Chatsparminou', '_blank')">Facebook</button>
		</div>
	</div>
</div>


<div class="category categoryColor1">
	<img src="./ressources/divers/chat.jpg" alt="photo qui somme nous">
	<div class="directContent">
		<div class="title">Don financier</div>
		<div class="content">
			Vous souhaitez faire un don financer ? 
			Vous pouvez le faire par virement (RIB sur demande), par Paypal, par chèque, en espèces (directement à l'association), ou en participant sur HelloAsso 
			(don ponctuel libre) ou Teaming (don mensuel d'1€) ! 
		</div>
		<div class="buttonList">
			<button class="buttonType" onclick="window.open('https://www.helloasso.com/associations/association-chats-par-minou/formulaires/1', '_blank')">HelloAsso</button>
			<button class="buttonType" onclick="window.open('https://www.teaming.net/chatsparminou', '_blank')">Teaming</button>
		</div>
	</div>
</div>


<div class="category categoryColor2">
	<img src="./ressources/divers/chat.jpg" alt="photo qui somme nous">
	<div class="directContent">
		<div class="title">Spécial entreprise</div>
		<div class="content">
			Si vous êtes une entreprise ou un commerçant, vous pouvez nous aider en ajoutant une tirelire dans votre commerce/entreprise ! <br>
			Demande d'informations complémentaires sur nos réseaux.
		</div>
	</div>
</div>

