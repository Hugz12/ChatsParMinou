<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>
<script src="./js/quiSommesNous.js"></script>
<link rel="stylesheet" href="css/quiSommesNous.css"> 



<div id="quiSommesNous" class="categoryColor1">
	
	<div class="category">
		<img src="./ressources/divers/quiSommesNous1.jpg" alt="photo qui somme nous">
		<div class="directContent">
			<div class="title">Qui sommes-nous ?</div>
			<div class="content">
				<p>Les sauver, les soigner, les aimer... et les faire adopter !</p>
				<p>Voilà notre « raison d’être » associative !</p><br><br>
				<p>Notre association, créée en novembre 2020, n’a de cesse d’œuvrer :</p>
			</div>
		</div>
	</div>


	<div class="category">
		<div class="directContent">
			<div class="content">
				<div class="listContent">au sauvetage des chats abandonnés, maltraités, blessés</div>
				<div class="listContent">à leur adoption dans des familles sélectionnées pour leur sérieux</div>
				<div class="listContent">à aider les personnes les plus démunies ou en situation d’urgence à prendre soin de leurs animaux</div>
				<div class="listContent">à conduire des campagnes de stérilisation</div>
				<div class="listContent">à développer la sensibilisation à la cause animale et au respect du vivant dans l’opinion publique.</div>
			</div>
		</div>
		<img src="./ressources/divers/quiSommesNous2.jpg" alt="photo qui somme nous">
	</div>
	
	
	<div class="category">
		<img src="./ressources/divers/quiSommesNous3.jpg" alt="photo qui somme nous">
		<div class="directContent">
			<div class="content">
				<p>
					Fonctionnant sous forme de refuge associatif (La Maison des Chats par Minou), complétée de
					plusieurs familles d’accueil, notre association comprend près de <b>90 adhérents</b> dont plus de <b>30
					bénévoles actifs.</b>
					<br><br>
					Nous avons ainsi sauvé <b>plusieurs centaines</b> de chats (entre 150 et 200 / an) depuis
					nos débuts.
				</p>
			</div>
		</div>
	</div>
</div>
<div id="outerImage">
	<div id="allSliderQuiSommesNous" class="allSlider">
		<div id="sliderQuiSommesNous" class="slider">
			<div class="flecheGauche clickable" onclick="translateX(this)"><?php include("./ressources/flecheLeft.svg") ?></div>

			<div class="slides">
				<div class="slide slideQuiSommesNous"><img src="./ressources/divers/quiSommesNous4.jpg" alt="chat"></div>
				<div class="slide slideQuiSommesNous"><img src="./ressources/divers/quiSommesNous5.jpg" alt="chat"></div>
				<div class="slide slideQuiSommesNous"><img src="./ressources/divers/quiSommesNous6.jpg" alt="chat"></div>
				<div class="slide slideQuiSommesNous"><img src="./ressources/divers/quiSommesNous7.jpg" alt="chat"></div>
				<div class="slide slideQuiSommesNous"><img src="./ressources/divers/quiSommesNous8.jpg" alt="chat"></div>
			</div>
			<div id="pointsQuiSommesNous" class="sliderPoints"></div>

			<div class="flecheDroite clickable" onclick="translateX(this)"><?php include("./ressources/flecheRight.svg") ?></div>
		</div>
	</div>
</div>
<div id="action" class="category categoryColor2">
	<div class="directContent">
		<div class="title">Nos actions</div>
		<div class="content">
		Le Bureau est composé de 5 personnes. <br>
		Il assure la gestion de l’association. <br>
		Et à côté, plus d’une trentaine de bénévoles font vivre l’association dans les différentes actions et missions :
		</div>
	</div>
	<div class="directContent">
		<div class="content">
			<div class="listContent">les « familles d’accueil » pour les chats, chatons et lapins recueillis et soignés</div>
			<div class="listContent">les « dorloteurs et dorloteuses » pour les soins quotidiens des chats de la Maison des Chats par Minous.</div>
			<div class="listContent">Les bénévoles pour les autres actions et événements : transport des chats chez les vétérinaires, collectes alimentaires, ventes de livres et marchés de Noël, etc.</div>
		</div>
	</div>
	<img src="./ressources/divers/quiSommesNous9.jpg" alt="photo action">

	
</div>
<div id="chiffres" class="category categoryColor1">
	<div class="title">LES CHIFFRES MARQUANTS</div>
	<div class="directContent">
		<div class="chiffre">
			<div class="chiffreTitle title">100</div>
			<div class="chiffreDescription">chats libres stérilisés dans le cadre de la campagne de stérilisation</div>
		</div>
		<div class="chiffre">
			<div class="chiffreTitle title">200</div>
			<div class="chiffreDescription">prises en charge par an</div>
		</div>
		<div class="chiffre">
			<div class="chiffreTitle title">150</div>
			<div class="chiffreDescription">adoptions par an</div>
		</div>
	</div>
</div>


<div id="rejoignezNous" class="category categoryColor1">
	<div class="title">Rejoignez nous!</div>
	<video controls>
		<source src="./ressources/divers/video.mp4" type="video/mp4">
	</video>
	<div class="directContent">
		<a href="index.php?view=nousAider" class="clickable">
			Toutes les possibilités de nous aider par ICI
		</a>
	</div>
</div>





<!-- <?php 
	if(valider("Admin","SESSION")) {
		echo " 
			<div class='svgBox'>
				<div id='svgAdd' class='svg' onclick='changeTexte(3)'>
		";
					include("ressources/edit.svg");
		// inclue le svg dans le html
	}
?> -->