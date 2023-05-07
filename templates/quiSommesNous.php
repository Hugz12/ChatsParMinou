<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>

	<script src="./js/utils.js"></script>
	<script src="./js/quiSommesNous.js"></script>
	<link rel="stylesheet" href="css/quiSommesNous.css"> 

<div>
	<div class="qsn">
		<a target="_blank" href="ressources/chats/0_0.jpg">
			<img src="ressources/chats/3/0.jpg" alt="poti chat">
		</a>
		<div class="qsnContent">
			<div class='policeTitre qsnTitre'>Qui Sommes-nous ?</div>
			<div class='policeTexte qsnTexte'>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
			</div>
		</div>
	</div>

	<div class="qsn qsnCadre">
		<div class="qsnContent">
		<div class='policeTitre qsnTitre'>Nos Actions</div>
		<div class='policeTexte qsnTexte'>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
		</div>
		</div>
		<a target="_blank" href="ressources/chats/0_0.jpg">
			<img src="ressources/chats/2/0.jpg" alt="poti chat">
		</a>
	</div>

	<div class="qsn">
		<a target="_blank" href="ressources/chats/0_0.jpg">
			<img src="ressources/chats/1/0.jpg" alt="poti chat">
		</a>
		<div class="qsnContent qsnTexte">
		<div class='policeTitre qsnTitre'>Rejoignez-nous !</div>
		<div class='policeTexte'>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
		</div>
		</div>
	</div>

	<div class="qsn policeTexte">
		<div class="qsnStats qsnTexte">
			<h1>500</h1>
			<p>chats pris en charge</p>
		</div>

		<div class="qsnStats qsnTexte">
			<h1>25</h1>
			<p>chats adoptés depuis le début d'année</p>
		</div>

		<div class="qsnStats qsnTexte">
			<h1>18</h1>
			<p>bénévoles</p>
		</div>
	</div>

	<?php 
			if(valider("Admin","SESSION")) {
				echo " 
					<div class='svgBox'>
						<div id='svgAdd' class='svg' onclick='changeTexte(3)'>
				";
							include("ressources/edit.svg");
				// inclue le svg dans le html
			}
	?>
</div>


