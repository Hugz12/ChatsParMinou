<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>

<div>
	<h1>Planning</h1>
	<h2>Le planning des passages aux refuges</h2>
</div>