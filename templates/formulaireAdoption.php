<?php
//TODO pop up pour dire que l'adoption a été prise en compte


// Si la page est appelée directement par son adresse, on redirige en passant pas la page index
// Pas de soucis de bufferisation, puisque c'est dans le cas où on appelle directement la page sans son contexte
if (basename($_SERVER["PHP_SELF"]) != "index.php")
{
	header("Location:../index.php?view=formulaireAdoption");
	die("");
}

?>


<link rel="stylesheet" href="./css/formulaireAdoption.css">
<script src="./js/formulaireAdoption.js"></script>

<script>

    var retour = <?= json_encode(valider("chatsSelected", "POST")); ?>;
    console.log(retour);

</script>


<div id ="allFormulaireAdoption" class="policeTexte" >
    <div id="titreFormulaireAdoption" class ="policeTitre tailleTitre">formulaire d'adoption</div>
    <form action='controleur.php' method='post'>
        <div class="titre tailleSousTitre">Informations personnelles</div>
        <div id="infoPerso">
            <div class='p1'>
                <div class='group'>
                    <input type='text' name='nom' id='nomForm'required>
                    <label for="nom">Nom</label>
                    <span class="tooltip">Votre nom</span>
                </div>
                <div class='group'>
                    <input type='text' name='prenom' id='prenomForm'required>
                    <label for="prenom">Prénom</label>
                    <span class="tooltip">Votre prénom</span>
                </div>
                <div class='group'>
                    <input type='text' name='mail'id='mailForm' required>
                    <label for="mail">Adresse mail</label>
                    <span class="tooltip">Votre adresse mail</span>
                </div>
            </div>
            <div class='p2'>
                <div class='group'>
                    <input type='text' name='tel'id='telForm' required>
                    <label for="tel">Numéro de téléphone</label>
                    <span class="tooltip">Votre numéro de téléphone</span>
                </div>
                <div class='group'>
                    <input type='text' name='adresse'id='adresseForm' required>
                    <label for="adresse">Adresse</label>
                    <span class="tooltip">Votre adresse postal</span>
                </div>
                <div class='group'>
                    <input type='text' name='habitation' id='habitationForm' required>
                    <label for="habitation">Type d'habitation</label>
                    <span class="tooltip">Type de logement dans lequel vous êtes</span>
                </div>
            </div>
        </div>
        <div id="infoChat">
        <div class="titre  tailleSousTitre">Chats likés</div>
            <div id="conteneurChatsliké"></div>
            <script>
                var chats = <?= json_encode(listerChats());?>;
                afficherChatsliké(chats);
            </script> 
            <div class="titre  tailleSousTitre">Choix des chats</div>
            <div id="conteneurChats"></div>
            <script>
                var chats = <?= json_encode(listerChats());?>;
                afficherChats(chats);
            </script> 
         </div>
        <div id="infoAdoption">
            <div class="titre  tailleSousTitre">Informations pratiques</div>
            <div class="infoAdoptionInput">
                <div id="coche">
                    <label class="checkbox">
                            <input type="checkbox" id="extForm">
                            <span class="checkmark"></span>
                            <span class="textP">Je dispose d'un espace extérieur</span>
                    </label>
                    <label class="checkbox">
                            <input type="checkbox" id="sortirForm">
                            <span class="checkmark"></span>
                            <span class="textP">Le chat aura la possibilité de sortir</span>
                    </label>
                </div>
                <div class='group'>
                    <input type='text' name='animaux' id='animauxForm' required>
                    <label for="animaux">Animaux</label>
                    <span class="tooltip">Les animaux que vous avez</span>
                </div>
                <div class='group'>
                    <input type='text' name='situationFamiliale' id='sitForm' required>
                    <label for="situationFamiliale">Situation familiale</label>
                    <span class="tooltip">Informations des personnes dans votre foyer</span>
                </div>
                <div class='group'>
                    <input type='text' name='commentaire' id='comForm' required>
                    <label for="commentaire">Commentaire libre</label>
                    <span class="tooltip">Ajoutez ce que vous voulez</span>
                </div>           

                <label class="checkbox">
                        <input type="checkbox" id="preForm" required>
                        <span class="checkmark"></span>
                        <span class="text">Je m'engage à faire une prévisite et à prendre en charge les frais de vétérinaire </span>
                </label>
                <label class="checkbox">
                        <input type="checkbox" id="justiForm" required>
                        <span class="checkmark"></span>
                        <span class="text">J'ai pris conscience du certificat d'engagement</span>
                </label>
            </div>
        </div>
        <input id ="submitFormulaireAdoption" type="button" class='buttonType' onclick="submitForm();" value= "Envoyer le formulaire"/>
    </form>
</div>