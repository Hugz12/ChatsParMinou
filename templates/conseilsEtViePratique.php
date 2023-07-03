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
		<div class="conseilTitre policeTitre">Conseils et vie pratique</div>
		<div class="bulle">
			<a href="https://www.youtube.com">
				<div class="conseilText">Au revoir</div>
			</a>
		</div>
		<div class="bulle">
			<a href="https://www.youtube.com">
				<div class="conseilText">Au revoir</div>
			</a>
		</div>
		<a href=""></a>
	</div>

	<?php 
			if(valider("Admin","SESSION")) {

				echo " 
					<div class='svgBox'>
						<div id='svgAddB' class='svg' onclick='displayForm(\"addBulle\")'>
				";
							include("ressources/add.svg");
				echo "
						</div>
						<div id='svgDeleteB' class='svg' onclick='displayForm(\"supprimerBulle\")'>
				";
							include("ressources/dustbin.svg");
				echo "
						</div>
					</div>
				";
				// inclue le svg dans le html
				
			}
	?>

	<!-- <button id="ajouter-div" onclick="ajouterDiv()">Ajouter une bulle</button> -->
	
	
</div>


<div>
	
</div>

<?php 
	if(valider("Admin","SESSION")) {
		echo "
			
			<div id='addBulle' class='formType' style='display: none'>

				<div class='buttonHideForm' onclick='hideForm(\"addBulle\");'>
					<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
				</div>

				<div class='policeTitre tailleTitre titreForm'>Ajouter une bulle</div>
				<br>
				<form class='policeTexte' action='controleur.php' method='post' enctype='multipart/form-data'>
					

					<div id='bulle'>

						<div class='group'>
							<input type='text' name='texte' required>
							<label for=\"titre\">Texte</label>
						</div>
					
						<div class='group'>
							<label for=\"fiche\" class='label-fiche'>Choisir une fiche</label>
							<input id='fiche' class='input-fiche' type='file'>
						</div>

					</div>

					</div>
					
					<input type='submit' class='buttonType' onclick='undisplayAddBulle();' name='action' value='Ajouter Bulle'>

				</form>
			</div>


			<div id='supprimerBulle' class='formType' style='display: none'>

				<div class='buttonHideForm' onclick='hideForm(\"supprimerBulle\")'>
					<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
				</div>

				<div class='policeTitre tailleTitre titreForm' >Supprimer Une Bulle</div><br>
				
				<form action='controleur.php' method='get'>

					<select name='id' style='width: auto;'>";

						foreach(listeEvenements() as $event){
							echo "<option style='font-style:italic;' value='".$event['id']."'>".$event['id']." -- ".$event['titre']."</option>";
						}
		echo "
					</select>

					<input type='submit' class='buttonType' name='action' onclick='undisplaySwitchChatDuMois();'value='Supprimer Bulle'>
				
				</form>
			</div>
		";
	}
?>