<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

if (!valider('Connecte', 'SESSION')) {
	header("Location:./index.php?view=accueil");
	die();
}

if(isset($_SESSION["message"])){
	echo "<script>window.alert('" . $_SESSION['message'] . "');</script>";
    unset($_SESSION['message']);
}




?>
<link rel="stylesheet" href="./css/planning.css">
<script src="./js/planning.js"></script>

<div>
	<div class="all">
		
		<div id="calendar" class="calendar">

			<div id="prev" class="flecheGauche clickable" onclick="changeMonth(this)" style="left:-30px">
				<?php include("./ressources/flecheLeft.svg");?>
			</div>

			<div class="year policeTitre">
				<div class="tailleTitre">
					<div class="yearValue"></div>
					<div class="monthValueString"></div>
					<div class="monthValue" style="display: none;"></div>
				</div>
				<div class="addPassageButton" onclick="displayForm('formPassageRefuge')">
					<?php include("./ressources/add.svg");?>
				</div>
			</div>
			

			<div class="weekdays policeTexte">
				<div class="weekday">Lun</div>
				<div class="weekday">Mar</div>
				<div class="weekday">Mer</div>
				<div class="weekday">Jeu</div>
				<div class="weekday">Ven</div>
				<div class="weekday">Sam</div>
				<div class="weekday">Dim</div>
			</div>

			<div class="days policeTexte"></div>

			<div id="next" class="flecheDroite clickable" onclick="changeMonth(this)" style="right:-30px">
				<?php include("./ressources/flecheRight.svg");?>
			</div>
		</div>
		
	</div>

	<div class="passagesRefuge" id="passagesRefuge" style="display:none"></div>

    <script>
        fillCalendar();
    </script>

	<div id="formPassageRefuge" class="formType" style="display:none;">
		<div class='buttonHideForm' onclick='hideForm("formPassageRefuge");'>
			<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
		</div>
		<div class='policeTitre tailleTitre titreForm'>Ajouter Un Passage</div>
		<br>

		
		<form class='policeTexte' action='controleur.php'>
			<div class='inputOther'>
				<div id='inputAddChatOther'>
					<div class='group'>
						<div class='group'>
							<input id="datePassage" type='date' name='date' onchange="changerDate(this);" max=".date('Y-m-d')." required>
							<label for="date">Date</label>
						</div>
					</div>

					<div class='group'>
						<div class='group'>
							<input type='time' name='debut' required>
							<label for="debut">Début</label>
						</div>

						<div class='group'>
							<input type='time' name='fin' required>
							<label for="fin">Fin</label>
						</div>
					</div>

				</div>


				<div class='group'>
					<textarea name='description' required></textarea>
					<label for="description">Description</label>
				</div>
			
			</div>
			<input type='submit' class='buttonType' name='action' value='Ajouter Un Passage'>

		</form>
	</div>

	<script>
        setMinDate();
    </script>


</div>
