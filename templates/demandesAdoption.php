<?php

// Si la page est appelée directement par son adresse, on redirige en passant pas la page index
// Pas de soucis de bufferisation, puisque c'est dans le cas où on appelle directement la page sans son contexte
if (basename($_SERVER["PHP_SELF"]) != "index.php")
{
	header("Location:../index.php?view=accueil");
	die("");
}

?>

<link rel="stylesheet" href="./css/demandesAdoption.css">
<script src="./js/demandesAdoption.js"></script>

<div id="recherche">
	
	<div class="container">
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

	<input type="search" id="contenuRecherche" placeholder="Rechercher...">

	<div id="btnTriTps" onclick='etatBtnTri(this);'>
		<div>Récent</div>
		<input type='checkbox'>
	</div>
	
	<div id="i">i</div>
</div>

<div id="nouvellesDemandes" class="conteneurDemandes"></div>

<a id="lienNouvellesDemandes" class="lienPlusMoins" href="javascript:void(0)">Montrer plus</a>

<div id="demandesEnCours" class="conteneurDemandes"></div>

<a id="lienEnCours" class="lienPlusMoins" href="javascript:void(0)">Montrer plus</a>

<div id="traitees" class="conteneurDemandes"></div>

<a id="lienTraitees" class="lienPlusMoins" href="javascript:void(0)">Montrer plus</a>

<div id="overlay">
	<div id="popupSupp">
		<p>Êtes-vous sûr de vouloir supprimer cette demande ?</p>
		<button id="popupBtnOui" class="popupBtn">Oui</button>
		<button id="popupBtnNon" class="popupBtn">Non</button>
	</div>
</div>

<div id="popupInfos">
    <p>Sélectionnez votre type de recherche avec le menu</p>
	<p>Tapez le contenu de la recherche dans la zone prévu</p>
	<p>Le bouton permet de trier par date</p>
</div>


<script>
	var demandesAdoption = <?php echo json_encode(getDemandes());?>;
	afficherTitres(demandesAdoption);
	afficherDemandes(demandesAdoption);
</script>

