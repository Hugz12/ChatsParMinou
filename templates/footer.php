</div>

<link rel="stylesheet" href="./css/footer.css">

    


    <div id="footer">

        <div id="nousContacter">
            <div class="footerTitre">Nous contacter</div>
            <div class="footerContent">chatsparminou@gmail.com</div>
            <div class="footerContent">06 06 06 06 06</div>
            <div class="footerContent">Adresse du refuge</div>
        </div>
        <div id="reseauxSociaux">
            <div class="footerTitre">Réseaux sociaux</div>
            <a class="footerContent" target="_blank" href="https://facebook.com/Chatsparminou">Facebook</a>
        </div>
        <div id="lienImportant">
            <div class="footerTitre">Liens importants</div>
            <a class="footerContent" href="index.php?view=formulaireAdoption">Formulaire d'adoption</a>
            <a class="footerContent" href="index.php?view=nousAider">Nous aider</a>

        </div>

    </div>



</body>
</html>

<?php
if (isset($_SESSION['error'])){ // Si mauvais login ou mot de passe
    echo "<script>window.alert('" . addslashes($_SESSION['error']) . "');</script>";
    unset($_SESSION['error']);
}
?>
