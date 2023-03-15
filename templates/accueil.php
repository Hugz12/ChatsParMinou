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
		<div id="presentationTexte">
			<div id="presentationTexte1" class="policeTitre">Chats Par Minou, pour leur bien-être partout</div>
			<div id="presentationTexte2" class="policeTexte">En adoptant un chat, vous offrez non seulement un foyer chaleureux et aimant, mais aussi une vie pleine de rires, de tendresse et de moments inoubliables.</div>
		</div>
	</div>
	<!-- Fin Affichage de la description de l'association -->




	<!-- Debut Affichage du Chat du Mois -->
	<div id="allChatDuMois">
	</div>

	<script>
		var chatDuMois = <?= json_encode(chatDuMois());?>;
		var admin = <?= (valider("Admin","SESSION")? 1 : 0)?>;
		afficherChatDuMois(chatDuMois);
	</script> 
	<!-- Fin Affichage du Chat du Mois -->

	


	
	<!-- Debut Affichage des Evenements -->
	<div id="event">
		<div id="eventTitre" class="policeTitre">Les événements à venir</div>
		<?php 
			if(valider("Admin","SESSION")) echo "<button id='buttonAddEvenement' class='button' onclick='displayForm(\"addEvenement\")'>Ajouter un évènement</button>";
		?>
		<div id="allSliderEvent" class="allSlider">
			<img class="flecheGauche clickable" onclick="translateX(this);" src="./ressources/flecheLeft.png" alt="flecheGauche">
			<div id="sliderEvent" class="slider">
				<div class="slides"></div>
				<div id="pointsEvent" class="sliderPoints"></div>
			</div>
			<img class="flecheDroite clickable" onclick="translateX(this);" src="./ressources/flecheRight.png" alt="flecheDroite">
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
							<input type='text' name='titre' required>
							<label for=\"titre\">Titre</label>
						</div>
					
						<div class='group'>
							<input type='date' name='date' required onchange=\"changerDate(this);\" max='".date('Y-m-d')."'>
							<label for=\"date\">Date</label>
						</div>

						<div class='colorPicker group'>
							<label for='couleur' class='colorPickerText'>Couleur</label>
							<div class='colorPickerColor' onclick=\"openDialogBox(document.getElementById('colorInput'), 'color');\" ><div></div></div>
							<input id='colorInput' type='hidden' name='couleur' value='#000000'>
						</div>

					</div>


					<div class='inputOther'>

						<div class='group'>
							<textarea name='description'required></textarea>
							<label for=\"description\">Description</label>
						</div>

						<div class='file'>
							<input type='file' name='image' id='img' accept='image/*' onchange=\"previewFile(this);\" style='display:none'>
							<label for='img' class='photo-upload-label'></label>
							<div id='fileText'>Choisir une photo</div>
							<svg width='180' height='180' viewBox='0 0 180 180' style='border-radius: 25px; background-color: rgba(255, 255, 255, 0.7); opacity: 0;' onmouseover='opacitySwitch(this);'>
								<rect x='77.5' y='40' width='25' height='100' fill='rgba(200, 200, 200, 0.8)'/>
								<rect x='40' y='77.5' width='100' height='25' fill='rgba(200, 200, 200, 0.8)'/>
							</svg>
						</div>

					</div>


					<div class='inputText'>
						<input type='submit' class='buttonType' onclick='undisplayAddEvenement();' name='action' value='Ajouter Evenement'>
					</div>
				</form>
			</div>


			<div id='switchChatDuMois' class='formType' style='display: none'>
				<div class='buttonHideForm' onclick='hideForm(\"switchChatDuMois\");'>
					<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
				</div>
				<div class='policeTitre tailleTitre'>Changer de Chat Du Mois</div><br>
				<form action='controleur.php' method='get'>
					<select class='champDeTexte'name='code' style='width: 500px;'>";
						foreach(listerChats() as $chat){
							echo "<option style='font-style:italic;' value='".$chat['code']."'>".$chat['code']." -- ".$chat['name']."</option>";
						}
		echo "
					</select>
					
					<div class='button' onclick='switchChatDuMois();'> Changer Chat Du Mois </div>
				</form>
			</div>";

		
	}
?>


	