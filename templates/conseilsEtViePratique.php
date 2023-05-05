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
	<div class="conseilTitre policeTitre">Conseils et vie pratique</div>
	<div id="conseils">
		<div id="conteneur-divs"></div>
		<div class="bulle">
			<a class="conseilText" href="https://www.youtube.com">
				Au revoir
			</a>
		</div>
		<div class="bulle">
			<a class="conseilText" href="https://www.youtube.com">
				Au revoir
			</a>
		</div>
	</div>

	<script>
		var conseils = <?= json_encode(getConseils());?>;
		afficherConseils(conseils);
	</script>


	<?php 
			if(valider("Admin","SESSION")) {

				echo " 
					<div class='svgBox'>
						<div id='svgAdd' class='svg' onclick='displayForm(\"addConseil\")'>
				";
							include("ressources/add.svg");
				echo "
						</div>
						<div id='svgDelete' class='svg' onclick='displayForm(\"delConseil\")'>
				";
							include("ressources/dustbin.svg");
				echo "
						</div>
					</div>
				";
				// inclue le svg dans le html
				
			}
	?>
	
</div>

<?php 
	if(valider("Admin","SESSION")) {
		echo "
			
			<div id='addEvenement' class='formType' style='display: none'>

				<div class='buttonHideForm' onclick='hideForm(\"addConseil\");'>
					<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
				</div>

				<div class='policeTitre tailleTitre titreForm'>Ajouter une bulle</div>
				<br>
				<form class='policeTexte' action='controleur.php' method='post' enctype='multipart/form-data'>
					

					<div id='bulleForm'>

						<div class='group'>
							<input type='text' name='name' required>
							<label for=\"titre\">Texte</label>
						</div>
					
						<div class='group'>
							<label for=\"fiche\" class='label-fiche'>Choisir une fiche</label>
							<input id='fiche' name='value' class='input-fiche' type='file'>
						</div>

					</div>
					
					<input type='submit' class='buttonType' name='action' value='Ajouter Bulle'>

				</form>
			</div>


			<div id='supprimerEvenement' class='formType' style='display: none'>

				<div class='buttonHideForm' onclick='hideForm(\"delConseil\")'>
					<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
				</div>

				<div class='policeTitre tailleTitre titreForm'>Supprimer Une Bulle</div><br>
				
				<form action='controleur.php' method='get'>

					<select name='id' style='width: auto;'>";

						foreach(listeEvenements() as $event){
							echo "<option style='font-style:italic;' value='".$event['id']."'>".$event['id']." -- ".$event['titre']."</option>";
						}
		echo "
					</select>

					<input type='submit' class='buttonType' name='action' value='Supprimer Bulle'>
				
				</form>
			</div>
		";
	}
?>