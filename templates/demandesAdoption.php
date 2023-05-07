<?php

// Si la page est appelée directement par son adresse, on redirige en passant pas la page index
// Pas de soucis de bufferisation, puisque c'est dans le cas où on appelle directement la page sans son contexte
if (basename($_SERVER["PHP_SELF"]) != "index.php")
{
	header("Location:../index.php?view=accueil");
	die("");
}

if (!valider('Connecte', 'SESSION')) {
	header("Location:./index.php?view=accueil");
	die();
}

if (!valider('Admin', 'SESSION')) {
	header("Location:./index.php?view=accueil");
	die();
}


?>

<link rel="stylesheet" href="./css/demandesAdoption.css">
<script src="./js/demandesAdoption.js"></script>

<div id="recherche">
	
	<div id="container">
		<div class="dropdown">
			<div class="select">
				<span id="selectRecherche">Recherche générale</span>
				<i class="fa fa-chevron-left"></i>
			</div>
			<ul class="dropdown-menu">
				<li>Recherche générale</li>
				<li>Recherche d'un chat</li>
				<li>Recherche d'une personne</li>
				<li>Recherche d'une date</li>
			</ul>
		</div>
	</div>

	<form>
		<div class='group'>
			<input type="text" id="contenuRecherche" placeholder="Rechercher..." maxlength="255" required>
		</div>
	</form>


	<div id="triI">
		<div id="triTps">
			<p>Récent</p>
			<div id="btnTriTps">
				<input type='checkbox'>
			</div>
		</div>
		
		<div id="i">i</div>
	</div>
</div>

<div id="nouvellesDemandes"></div>

<div id="lienNouvellesDemandes" class="lienPlusMoins">Montrer plus</div>

<div id="demandesEnCours"></div>

<div id="lienEnCours" class="lienPlusMoins">Montrer plus</div>

<div id="traitees"></div>

<div id="lienTraitees" class="lienPlusMoins">Montrer plus</div>

<div id="overlay">
	<div id="popupSupp">
		<p>Êtes-vous sûr de vouloir supprimer cette demande ?</p>
		<div>
			<div id="popupBtnOui" class="clickable">Oui</div>
			<div id="popupBtnNon" class="clickable">Non</div>
		</div>
	</div>
</div>

<div id="popupInfos">
	<p>Recherche :</p>
	<ul>
		<li>Sélectionnez votre type de recherche avec le menu</li>
		<li>Tapez le contenu de la recherche dans la zone prévu</li>
	</ul>
	<p>Bouton de tri Récent/Ancien :</p>
	<ul>
		<li>Permet de trier par date d'ajout</li>
	</ul>
	<p>Gestion des demandes :</p>
	<ul>
		<li>Le bouton de gauche passe la demande au prochain statut</li>
		<li>Le bouton de droite supprime définitivement la demande</li>
	</ul>
	<p>Bouton d'affichage plus/moins :</p>
	<ul>
		<li>Permet d'afficher plus ou moins de demandes</li>
	</ul>
	<p>Zoomer une demande :</p>
	<ul>
		<li>Cliquer sur l'image de la demande pour l'aggrandir</li>
	</ul>
</div>


<script>
	var demandesAdoption = <?php echo json_encode(getDemandes());?>;
	afficherTitres(demandesAdoption);
	afficherDemandes(demandesAdoption);
</script>
