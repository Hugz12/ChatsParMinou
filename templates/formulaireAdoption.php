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
<script src="./js/formulaireAdoption.js"></script>
<div id="patteFormulaireAdoption" class="conteneurDeConteneurDePattes">
    <div id="1" class="patteContainer"></div>
    <div id="2" class="patteContainer"></div>
    <div id="3" class="patteContainer"></div>
    <div id="4" class="patteContainer"></div>
</div>


<script>
    
    var patteContainer = document.getElementById("1");    
    var patteContainer2 = document.getElementById("2");
    var patteContainer3 = document.getElementById("3");
    var patteContainer4 = document.getElementById("4");


    move(patteContainer, 0, 0, 0, 0, 500, 1);
    move(patteContainer2, 180, 0, 0, 0, 600, 1);
    move(patteContainer3, 270, 0, 0, 500, 0, 1);
    move(patteContainer4, 180, 0, 0, 250, 0, 1);
</script>

<script>

    var retour = <?= json_encode(valider("chatsSelected", "POST")); ?>;
    console.log(retour);

</script>


<div id ="allFormulaireAdoption" class="policeTexte" >
    <div id="titreFormulaireAdoption" class ="policeTitre">formulaire d'adoption</div>
    <form action="controleur.php" method="get">
        <div class="titre">Informations personnelles</div>
        <div id="infoPerso">
            <div class='p1'>
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
            </div>
            <div class='p2'>
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
        </div>
        <div id="infoChat">
            <div class="titre">Choix des chats</div>
            <div class='group'>
                <input type='text' name='nomChat' required>
                <label for="nomChat">Nom du chat</label>
            </div>
        </div>
        <div id="infoAdoption">
            <div class="titre">Informations pratiques</div>
            <div id="coche">
                <label class="checkbox">
                        <input type="checkbox" id="filtreFemelle">
                        <span class="checkmark"></span>
                        <span class="textP">Je dispose d'un espace extérieur</span>
                </label>
                <label class="checkbox">
                        <input type="checkbox" id="filtreFemelle">
                        <span class="checkmark"></span>
                        <span class="textP">Le chat aura la possibilité de sortir</span>
                </label>
            </div>
            <div class='group'>
                <input type='text' name='animaux' required>
                <label for="animaux">Animaux</label>
            </div>
            <div class='group'>
                <input type='text' name='situationFamiliale' required>
                <label for="situationFamiliale">Situation familiale</label>
            </div>
            <div class='group'>
                <input type='text' name='commentaire' required>
                <label for="commentaire">Commentaire libre</label>
            </div>           

            <label class="checkbox">
					<input type="checkbox" id="filtreFemelle" required>
					<span class="checkmark"></span>
					<span class="text">Je m'engage à faire une prévisite et à prendre en charge les frais de vétérinaire </span>
			</label>
            <label class="checkbox">
					<input type="checkbox" id="filtreFemelle" required>
					<span class="checkmark"></span>
					<span class="text">J'ai pris conscience du certificat d'engagement</span>
			</label>
        </div>
        <input id ="submitFormulaireAdoption"type="submit" name="action" value="Demande adoption"/>
    </form>
</div>
