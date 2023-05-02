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
        <div id="infoPerso">
            <div>Informations personnelles</div>
            <div class='group'>
                <input type='text' name='nom' required>
                <label for="nom">Nom</label>
            </div>
            <div class='group'>
                <input type='text' name='prenom' required>
                <label for="prenom">Prénom</label>
            </div>
            <div class='group'>
                <input type='text' name='mail' required>
                <label for="mail">Adresse mail</label>
            </div>
            <div class='group'>
                <input type='text' name='tel' required>
                <label for="tel">Numéro de téléphone</label>
            </div>
            <div class='group'>
                <input type='text' name='adresse' required>
                <label for="adresse">Adresse</label>
            </div>
            <div class='group'>
                <input type='text' name='habitation' required>
                <label for="habitation">Type d'habitation</label>
            </div>
        </div>
        <div id="infoChat">
            <div>Informations sur le chat</div>
            <div class='group'>
                <input type='text' name='nomChat' required>
                <label for="nomChat">Nom du chat</label>
            </div>

            <div> <input id="checkboxFormulaireAdoption" type="checkbox" class="champDeTexte" name="exterieur" required/>Je dispose d'un extérieur  </div>
            <div> <input id="checkboxFormulaireAdoption" type="checkbox" class="champDeTexte" name="sortie" required/> Le chat pourra sortir ? </div>
            <div class='group'>
                <input type='text' name='animaux' required>
                <label for="animaux">Animaux</label>
            </div>
            <div class='group'>
                <input type='text' name='situationFamiliale' required>
                <label for="situationFamiliale">Situation familiale</label>
            </div>
            <div class='group'>
                <input type='textarea' name='commentaire' required>
                <label for="commentaire">Commentaire</label>
            </div>
            <div><input id="checkboxFormulaireAdoption" type ="checkbox" name="engagement" required/> J’ai lu et j’ai pris connaissances du <a id="lienFormulaireAdoption" href="http://jeuxstrategie.free.fr/Avalam_complet.php">Certificat d’engagement </a></div>
            <div><input id="checkboxFormulaireAdoption" type ="checkbox" name="previsite" required/> Je m'engage à prendre en charge les frais de vétérinaire et faire une prévisite </div>
            <input id ="submitFormulaireAdoption"type="submit" name="action" value="Demande adoption"/>
        </div>
    </form>
</div>
