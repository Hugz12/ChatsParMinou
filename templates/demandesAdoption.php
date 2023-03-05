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
	<input type="text" id="contenuRecherche" placeholder="Rechercher...">
	<div id="choixRecherche">
		<p> Chats </p>
		<div class="choix-chat">
			<button id="btnChoixRecherche"></button>
		</div>
		<p>Personne</p>
	</div>
	<p> Tri par temps </p>
	<img class="clickable"src="./ressources/infos.png" alt="infos">
</div>

<div id="nouvellesDemande"></div>

<div id="demandesEnCours"></div>

<div id="traitees"></div>

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
