<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>

<script src="./js/utils.js"></script>

<link rel="stylesheet" href="css/conseilsEtViePratique.css"> 

<div id="rechercher">
	<form>
        <div class="group">
            <input id="rechercheBubble" type="text" required>
            <label for="rechercheBubble">Rechercher</label>
        </div>
        
		
	</form>
</div>


<div id="container">
</div>

<script src="./js/conseilsEtViePratique.js"></script>

<?php
    if(valider("Admin","SESSION")) {
        echo "

            <div class='svgBox'>
                <div id='svgAdd' class='svg' onclick='displayForm(\"addConseil\")'>";
                    include("ressources/add.svg");
        echo " </div>
            </div>
            
            <div id='addConseil' class='formType' style='display: none'>

                <div class='buttonHideForm' onclick='hideForm(\"addConseil\");'>
                    <img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
                </div>

                <div class='policeTitre tailleTitre titreForm'>Ajouter un conseil</div>
                <br>
                <form class='policeTexte' action='controleur.php' method='post' enctype='multipart/form-data'>
                    

                    <div id='evenement'>

                        <div class='group'>
                            <input type='text' name='name' required>
                            <label for=\"name\">Nom</label>
                        </div>

                        <input type='file' name='fichier' accept='application/pdf' required>
                    
                    </div>


                    <div class='inputOther'>

                        <div class='group'>
                            <textarea name='description'required></textarea>
                            <label for=\"description\">Description</label>
                        </div>

                    </div>
                    
                    <input type='submit' class='buttonType' name='action' value='Ajouter Conseil'>

                </form>
            </div>

        ";

    }
?>
