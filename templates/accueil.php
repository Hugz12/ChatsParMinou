<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>
<script src="./js/accueil.js"></script>
<link rel="stylesheet" href="css/accueil.css"> 



<div class="disabled">

	


	<!-- Debut Affichage de la description de l'association -->
	<div id="presentation" >
		<img src="ressources/accueil.jpg" alt="accueil">
		<div id="presentationTexteBox">
			<div id="presentationTitre" class="policeTitre tailleTitre">Chats Par Minou, pour leur bien-être avant tout</div>
			<div id="presentationTexte" class="policeTexte tailleSousTitre">En adoptant un chat via notre association, vous offrez à un petit malheureux issu des rues la belle vie qu'il mérite !</div>
		</div>
	</div>
	<!-- Fin Affichage de la description de l'association -->




	<!-- Debut Affichage du Chat du Mois -->
	<div id="boxTitreChatDuMois">
		<div id="titreChatDuMois" class="policeTitre tailleTitre">Notre chat du mois</div>
		<div id="sousTitreChatDuMois" class="policeTexte tailleSousTitre">C'est la star du moment !</div>
	</div>
	<div id="allChatDuMois"></div>
	<div id="allChatDuMoisSmall"></div>

	<script>
		var chatDuMois = <?= json_encode(chatDuMois());?>;
		var admin = <?= (valider("Admin","SESSION")? 1 : 0)?>;
		afficherChatDuMois(chatDuMois);
		afficherChatDuMoisSmall(chatDuMois);
	</script> 
	<!-- Fin Affichage du Chat du Mois -->

	


	
	<!-- Debut Affichage des Evenements -->
	<div id="event">
		<div id="eventTitre" class="policeTitre tailleTitre">Les événements à venir</div>
		<?php 
			if(valider("Admin","SESSION")) {

				echo " 
					<div class='svgBox'>
						<div id='svgAdd' class='svg' onclick='displayForm(\"addEvenement\")'>
				";
							include("ressources/add.svg");
				echo "
						</div>
						<div id='svgDelete' class='svg' onclick='displayForm(\"supprimerEvenement\")'>
				";
							include("ressources/dustbin.svg");
				echo "
						</div>
					</div>
				";
				// inclue le svg dans le html
				
			}
		?>
		<div id="allSliderEvent" class="allSlider">
			<div id="sliderEvent" class="slider">
				<div class="flecheGauche clickable" onclick="translateX(this)"><?php include("./ressources/flecheLeft.svg") ?></div>

				<div class="slides"></div>
				<div id="pointsEvent" class="sliderPoints"></div>

				<div class="flecheDroite clickable" onclick="translateX(this)"><?php include("./ressources/flecheRight.svg") ?></div>
			</div>
		</div>
	</div>
	

	<script>
		var evenements = <?php echo json_encode(listeEvenements());?>;
		console.log(evenements);
		afficherEvenements(evenements);
	</script>
	<!-- Fin Affichage des Evenements -->

	
	<div id="nousAider" class="policeTexte clickable" onclick=window.location.href="index.php?view=nousAider" onmouseenter="rotateLogo(this);" onmouseleave="rotateLogoBack(this);">
		<img src="./ressources/nousAider.png" alt="logo">
		<div>Nous aider</div>
	</div>

	<div id="nousAiderResponsiveBox">
		<img class="clickable" src="./ressources/flecheLeft.svg" alt="arrow" onclick="sideButtonToggle('nousAiderResponsiveBox');">
		<div id="nousAiderResponsive" class="policeTexte clickable" onclick=window.location.href="index.php?view=nousAider" onmouseenter="rotateLogo(this);" onmouseleave="rotateLogoBack(this);">
			<img src="./ressources/nousAider.png" alt="logo">
			<div>Nous aider</div>
		</div>
	</div>
	
</div>


<?php 
	if(valider("Admin","SESSION")) {
		echo "
			
			<div id='addEvenement' class='formType' style='display: none'>

				<div class='buttonHideForm' onclick='hideForm(\"addEvenement\");'>
					<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
				</div>

				<div class='policeTitre tailleTitre titreForm'>Ajouter un évènement</div>
				<br>
				<form class='policeTexte' action='controleur.php' method='post' enctype='multipart/form-data'>
					

					<div id='evenement'>

						<div class='group'>
							<input type='text' maxlength='255' name='titre' required>
							<label for=\"titre\">Titre</label>
						</div>
					
						<div class='group'>
							<input type='date' name='date' required onchange=\"changerDate(this);\" min='".date('Y-m-d')."'>
							<label for=\"date\">Date</label>
						</div>

						<div class='group'>
							<input type='time' name='heureDebut' required>
							<label for=\"date\">Début</label>
						</div>

						<div class='group'>
							<input type='time' name='heureFin' required>
							<label for=\"date\">Fin</label>
						</div>

					</div>


					<div class='inputOther'>

						<div class='group'>
							<textarea maxlength='3000' name='description'required></textarea>
							<label for=\"description\">Description</label>
						</div>

						<div class='file'>
							<input type='file' name='image' id='img' accept='image/*' onchange=\"previewFile(this);\" style='display:none'>
							<label for='img' class='photo-upload-label'></label>
							<div class='fileText'>Choisir une photo</div>
							<img class='addImage' src='./ressources/add.svg' alt='add.svg'>

						</div>

					</div>
					
					<input type='submit' class='buttonType' onclick='undisplayAddEvenement();' name='action' value='Ajouter Evenement'>

				</form>
			</div>


			<div id='supprimerEvenement' class='formType' style='display: none'>

				<div class='buttonHideForm' onclick='hideForm(\"supprimerEvenement\")'>
					<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
				</div>

				<div class='policeTitre tailleTitre titreForm' >Supprimer Un Evenement</div><br>
				
				<form action='controleur.php' method='get'>

					<select name='id' style='width: auto;'>";

						foreach(listeEvenements() as $event){
							echo "<option value='".$event['id']."'>".$event['id']." -- ".$event['titre']."</option>";
						}
		echo "
					</select>

					<input type='submit' class='buttonType' name='action' onclick='undisplaySwitchChatDuMois();'value='Supprimer Evenement'>
				
				</form>
			</div>


			<div id='switchChatDuMois' class='formType' style='display: none'>
				<div class='buttonHideForm' onclick='hideForm(\"switchChatDuMois\");'>
					<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
				</div>
				<div class='policeTitre tailleTitre titreForm'>Changer de Chat Du Mois</div><br>
				<form action='controleur.php' method='get'>
					<select name='code' style='width: auto;'>";
						foreach(listerChats() as $chat){
							echo "<option style='font-style:italic;' value='".$chat['code']."'>".$chat['code']." -- ".$chat['name']."</option>";
						}
		echo "
					</select>

					<div class='buttonType' onclick='switchChatDuMois();'> Changer Chat Du Mois </div>
				
				</form>
			</div>";

		
	}
?>


	