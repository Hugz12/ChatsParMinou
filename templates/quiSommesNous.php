<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>

<div class="qsn">
	<a target="_blank" href="ressources/chats/0_0.jpg">
		<img src="ressources/chats/0_0.jpg" alt="poti chat">
	</a>
	<div class="qsnContent">
		<h1>Qui Sommes-nous ?</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
	</div>
</div>

<div class="qsn">
	<div class="qsnContent">
		<h1>Nos Actions</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
	</div>
	<a target="_blank" href="ressources/chats/0_0.jpg">
		<img src="ressources/chats/0_0.jpg" alt="poti chat">
	</a>
</div>

<div class="qsn">
	<a target="_blank" href="ressources/chats/0_0.jpg">
		<img src="ressources/chats/0_0.jpg" alt="poti chat">
	</a>
	<div class="qsnContent">
		<h1>Rejoignez nous !</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
	</div>
</div>

<div class="qsn">
	<div class="qsnStats">
		<h1>500</h1>
		<p>chats pris en charge</p>
	</div>

	<div class="qsnStats">
		<h1>25</h1>
		<p>chats adoptés depuis le début d'année</p>
	</div>

	<div class="qsnStats">
		<h1>18</h1>
		<p>bénévoles</p>
	</div>
</div>
