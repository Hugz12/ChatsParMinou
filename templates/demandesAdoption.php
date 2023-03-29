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
	<select id="selectRecherche">
		<option value="rchGenerale">Recherche générale</option>
		<option value="rchChat">Recherche d'un chat</option>
		<option value="rchPers">Recherche d'une personne</option>
		<option value="rchDate">Recherche d'une date</option>
	</select>

	<input type="text" id="contenuRecherche" placeholder="Rechercher...">

	<p>Date d'ajout (plus récentes)</p>
	<div class="choix-recent">
		<button id="btnTriTps"></button>
	</div>
	
	<img src="./ressources/infos.png" alt="infos">
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
    <p>echap pour quitter / crtl + entrée pour sauvegarder</p>
</div>


<script>
	var demandesAdoption = <?php echo json_encode(getDemandes());?>;
	afficherTitres(demandesAdoption);
	afficherDemandes(demandesAdoption);
</script>

