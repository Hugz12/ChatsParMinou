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
<script src="./js/utils.js"></script>
<script src="./js/formulaireAdoption.js"></script>

<script>


var retour = <?= json_encode(valider("chatsSelected", "POST")); ?>;

</script>


<div id ="allFormulaireAdoption" class="policeTexte" >
    <div id="titreFormulaireAdoption" class ="policeTitre tailleTitre">formulaire d'adoption</div>
    <form action='controleur.php' method='post'>
        <div class="titre tailleSousTitre">Informations personnelles</div>
        <div id="infoPerso">
            <div class='p1'>
                <div class='group'>
                    <input type='text' maxlength="255" name='nom' id='nomForm'required>
                    <label for="nom">Nom</label>
                    <span class="tooltip">Votre nom</span>
                </div>
                <div class='group'>
                    <input type='text' maxlength="255" name='prenom' id='prenomForm'required>
                    <label for="prenom">Prénom</label>
                    <span class="tooltip">Votre prénom</span>
                </div>
                <div class='group'>
                    <input type='text' maxlength="255" name='mail'id='mailForm' required>
                    <label for="mail">Adresse mail</label>
                    <span class="tooltip">Votre adresse mail</span>
                </div>
            </div>
            <div class='p2'>
                <div class='group'>
                    <input type='text' maxlength="255" name='tel'id='telForm' required>
                    <label for="tel">Numéro de téléphone</label>
                    <span class="tooltip">Votre numéro de téléphone</span>
                </div>
                <div class='group'>
                    <input type='text' maxlength="255" name='adresse'id='adresseForm' required>
                    <label for="adresse">Adresse</label>
                    <span class="tooltip">Votre adresse postale</span>
                </div>
                <div class='group'>
                    <input type='text' maxlength="255" name='habitation' id='habitationForm' required>
                    <label for="habitation">Type d'habitation</label>
                    <span class="tooltip">Type de logement dans lequel vous êtes</span>
                </div>
            </div>
        </div>
    </form>
        <div id="infoChat">
            <div class="titre  tailleSousTitre">Chats repérés</div>
            <div id="conteneurChatsliké"></div>
            <script>
                var chats = <?= json_encode(listerChats());?>;
                afficherChatsliké(chats);
            </script> 
            <div class="titre  tailleSousTitre">Tous nos chats a l'adoption</div>
            <div id="rechercheChat">
                <form id="formRechercheChats" onsubmit="return false;" onkeyup="rechercherChat();">
                    <div class="group">
                        <input type="text" maxlength="255" id="rechercheAdoption" required>
                        <label for="rechercheAdoption">Recherche un chat par son nom</label>
                    </div>
                </form>
                <div id="conteneurChats"></div>
                <script>
                    var chats = <?= json_encode(listerChats());?>;
                    afficherChats(chats);
                </script> 
            </div>
        </div>
    <form action='controleur.php' method='post'>
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
                    <input type='text' maxlength="255" name='animaux' id='animauxForm' required>
                    <label for="animaux">Animaux</label>
                    <span class="tooltip">Listez les différents animaux que vous avez</span>
                </div>
                <div class='group'>
                    <input type='text' maxlength="255" name='situationFamiliale' id='sitForm' required>
                    <label for="situationFamiliale">Situation familiale</label>
                    <span class="tooltip">Expliquez brievement votre situation familiale</span>
                </div>
                <div class='group'>
                    <textarea id="comForm" name="commentaire" rows="10" maxlength="3000" required></textarea>
                    <label for="commentaire">Commentaire libre</label>
                    <span class="tooltip">Ajoutez ce que vous voulez</span>
                </div>           

                <label class="checkbox">
                        <input type="checkbox" id="preForm" required>
                        <span class="checkmark"></span>
                        <span class="text">Je m'engage à autoriser une pré-visite à mon domicile et à participer aux frais vétérinaires liés à l'adoption</span>
                </label>
                <label class="checkbox">
                        <input type="checkbox" id="justiForm" required>
                        <span class="checkmark"></span>
                        <span class="text">J'ai pris connaissance du <a target="_Blank" href="./ressources/divers/certificatEngagement.pdf">certificat d'engagement</a></span>
                </label>
            </div>
        </div>
        <input id ="submitFormulaireAdoption" type="button" class='buttonType' onclick="submitForm();" value= "Envoyer le formulaire">
    </form>
</div>