<?php
//TODO pop up pour dire que l'adoption a été prise en compte


// Si la page est appelée directement par son adresse, on redirige en passant pas la page index
// Pas de soucis de bufferisation, puisque c'est dans le cas où on appelle directement la page sans son contexte
if (basename($_SERVER["PHP_SELF"]) != "index.php")
{
	header("Location:../index.php?view=accueil");
	die("");
}

?>

<link rel="stylesheet" href="./css/formulaireAdoption.css">

<div id ="allFormulaireAdoption" class="policeTexte" >
    <div id="titreFormulaireAdoption" class ="policeTitre">formulaire d'adoption</div>
    <form action="controleur.php" method="get">
    <div>Informations personnelles</div>
        <div id="infoPerso">
            <input type='text' id='test' name='nom' required>
			<label for="nom">Nom</label>
            <input type='text' name='prenom' required>
			<label for="prenom">Prénom</label>
            <input type='text' name='mail' required>
			<label for="mail">Adresse mail</label>
            <input type='text' name='tel' required>
			<label for="tel">Numéro de téléphone</label>
        </div>
        <input type="text" class="champDeTexte" name="nomChat" placeholder="nomChat" required/>
        <input type="text" class="champDeTexte"  name="adresse" placeholder="adresse" required/>
        <input type="text" class="champDeTexte" name="habitation" placeholder="habitation" required/>
        <div> Je dispose d'un extérieur <input id="checkboxFormulaireAdoption" type="checkbox" class="champDeTexte" name="exterieur" required/> </div>
        <div> Le chat pourra sortir ? <input id="checkboxFormulaireAdoption" type="checkbox" class="champDeTexte" name="sortie" required/></div>
        <input type="text" class="champDeTexte" name="animaux" placeholder="animaux" required/>
        <input type="text" class="champDeTexte" name="situationFamiliale" placeholder="situationFamiliale" required/>
        <input type="textarea" class="champDeTexte" name="commentaire" placeholder="commentaire" required/>
        <div><input id="checkboxFormulaireAdoption" type ="checkbox" name="engagement" required/> J’ai lu et j’ai pris connaissances du <a id="lienFormulaireAdoption" href="http://jeuxstrategie.free.fr/Avalam_complet.php">Certificat d’engagement </a></div>
        <div> Je m'engage à prendre en charge les frais de vétérinaire et faire une prévisite <input id="checkboxFormulaireAdoption" type ="checkbox" name="previsite" required/></div>
        <input id ="submitFormulaireAdoption"type="submit" name="action" value="Demande adoption"/>
    </form>
</div>
