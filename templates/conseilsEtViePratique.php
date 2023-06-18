<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>

<script src="./js/utils.js"></script>
<script src="https://d3js.org/d3.v7.min.js"></script>
<link rel="stylesheet" href="css/conseilsEtViePratique.css"> 

<div id="container">
    <svg id="svg-container"></svg>
</div>

<script src="./js/conseilsEtViePratique.js"></script>

