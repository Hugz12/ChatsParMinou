<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

if (isset($_SESSION['error'])){ // Si mauvais login ou mot de passe
    echo "<script>window.alert('" . $_SESSION['error'] . "');</script>";
    unset($_SESSION['error']);
}

?>

<script src="./js/utils.js"></script>
<script src="./js/chatsAdoption.js"></script>
<link rel="stylesheet" href="./css/chatsAdoption.css">
<link rel="stylesheet" href="./css/accueil.css">

<div class="disabled">
	<div id="chatsTitre" class="policeTitre">
		Nos Chats
		<div id="svgFilter" class="svg" onclick="displayFilter();"><?php include("./ressources/filter.svg") ?></div>
	</div>
	<?php 
		if(valider("Admin","SESSION")) {

			echo " 
				<div class='svgBox' >
					<div id='svgAdd' class='svg' onclick='displayForm(\"formAjoutChat\")'>
			";
						include("ressources/add.svg");
			echo "
					</div>
					<div id='svgDelete' class='svg' onclick='displayForm(\"formSupprimerChat\")'>
			";
						include("ressources/dustbin.svg");
			echo "
					</div>
				</div>
			";
			// inclue le svg dans le html
			
		}
	?>

	<div id="allSliderChats" class="allSlider">
		<div id="sliderChats" class="slider">
			<div class="flecheGauche clickable" onclick="translateX(this)"><?php include("./ressources/flecheLeft.svg") ?></div>

			<div class="slides"></div>
			<div id="pointsEvent" class="sliderPoints"></div>

			<div class="flecheDroite clickable" onclick="translateX(this)"><?php include("./ressources/flecheRight.svg") ?></div>

		</div>
	</div>

		
	<script>
		var chats = <?= json_encode(listerChats());?>;
		var admin = <?= (valider("Admin","SESSION")? 1 : 0)?>;
		afficherChats(chats);
	</script> 

	
	<div id="menuFiltre">
		
	</div>
	


	
</div>





<?php 
	if (valider("Admin","SESSION")){ 

		// form ajout chat
		echo "
			<div id='formSupprimerChat' class='formType' style='display: none'>

				<div class='buttonHideForm' onclick='hideForm(\"formSupprimerChat\")'>
					<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
				</div>

				<div class='policeTitre tailleTitre titreForm' >Supprimer Un Chat</div><br>
				
				<form action='controleur.php' method='get'>

					<select name='code' style='width: auto;'>";
						foreach(listerChats() as $chat){
							echo "<option style='font-style:italic;' value='".$chat['code']."'>".$chat['code']." -- ".$chat['name']."</option>";
						}
		echo "
					</select>

					<input type='submit' class='buttonType' name='action' onclick='undisplaySwitchChatDuMois();'value='Supprimer Chat'>
				
				</form>
			</div>


		

			<div id='formAjoutChat' class='formType' >

				<div class='buttonHideForm' onclick='hideForm(\"formAjoutChat\")'>
					<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
				</div>

				<div class='policeTitre tailleTitre titreForm'>Ajouter Un Chat</div>

				<form class='policeTexte' action='controleur.php' method='post' enctype='multipart/form-data'>

					<div class='inputText'>

						<div class='group'>
							<input type='text' name='nom' required>
							<label for=\"nom\">Nom</label>
						</div>

						<div class='group'>
							<input type='text' name='code' required>
							<label for=\"code\">Code</label>
						</div>
					
						<div class='group'>
							<input type='text' name='race' required>
							<label for=\"race\">Race</label>
						</div>

						<div class='group'>
							<input type='text' name='statut' required>
							<label for=\"statut\">Statut</label>
						</div>

					</div>

						
					<div class='inputOther'>
						<div id='inputAddChatOther' class='group'>
							<div class='group'>
								<div class='switch' onclick='checkboxPhotoSwitch(this); etatSwitch(this);'>
									<div id='etatSexe' class='checkboxText'>Mâle</div>
									<div class='photoGauche'><img src='./ressources/femelle.png'></div>
									<input type='checkbox' class='checkbox checkboxSexe' checked='' name='sexe' value='1'>
									<div class='photoDroite'><img src='./ressources/male.png'></div>
									<input type='hidden' name='sexe' value='2'> 
								</div>

								<div class='switch' onclick='checkboxPhotoSwitch(this); etatSwitch(this);'>
									<div id='etatFamilleAccueil' class='checkboxText'>Famille</div>
									<div class='photoGauche'><img src='./ressources/logo_toutnoir.png'></div>
									<input type='checkbox' class='checkbox checkboxFamille' checked='' name='familleAccueil' value='2'>
									<div class='photoDroite'><img src='./ressources/famille_accueil_noir.png'></div>
									<input type='hidden' name='familleAccueil' value='1'> 
								</div>
								
								
							</div>

							<div class='group'>
								<div class='group'>
									<input type='date' name='dateNaissance' required onchange=\"changerDate(this);\" max='".date('Y-m-d')."'>
									<label for=\"date\">Naissance</label>
								</div>

								<div class='colorPicker'>
									<label for='couleur' class='colorPickerText'>Couleur</label>
									<div class='colorPickerColor' onclick=\"openDialogBox(document.getElementById('colorInputAdd'), 'color');\" ><div></div></div>
									<input id='colorInputAdd' type='hidden' name='couleur' value='#000000'>
								</div>

								
							</div>
						</div>

						<div class='group'>
							<textarea name='description' required></textarea>
							<label for=\"description\">Description</label>
						</div>
					
					</div>



					<div class='inputFile'>
						
						<div class='labelAllSlider'>Ajouter des photos</div>
						<div id='allSliderPhoto' class='allSlider'>
							<div id='sliderPhoto' class='slider'>
								<div class='flecheGauche clickable' onclick='translateX(this, undefined, false)'><?php include('./ressources/flecheLeft.svg') ?></div>

								<div class='slides'></div>

								<div class='flecheDroite clickable' onclick='translateX(this, undefined, false)'><?php include('./ressources/flecheRight.svg') ?></div>

							</div>
						</div>

						<label class='clickable' for='fileAjoutChat'>
							<svg width='50' height='50'>
								<circle cx='25' cy='25' r='20' stroke='black' stroke-width='2' fill='transparent' />
								<path d='M 20 25 L 30 25 M 25 20 L 25 30' stroke='black' stroke-width='2' />
							</svg>
						</label>
						<input id='fileAjoutChat' type='file' name='photos[]' onchange='filesAdd(this)' multiple accept='image/*' style='display:none'>

					</div>
					

					<input type='submit' class='buttonType' name='action' value='Ajouter un chat'>
						
				</form>

			</div>



		";
		
	}
?>

