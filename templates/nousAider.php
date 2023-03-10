<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>
<link rel="stylesheet" href="./css/nousAider.css">

<div class="container">

	<div class="flip-card" id="cardG">
		<div class="flip-card-inner">
			<div class="flip-card-front">
				<p class="title">ADHERER</p>
				<p>Passer la souris pour plus d'informations</p>
			</div>
			<div class="flip-card-back">
				<p class="title">ADHERER</p>
				<p>Leave Me</p>
				<input type='button' class='button' onclick=window.location.href='https://www.helloasso.com/associations/association-chats-par-minou/adhesions/adhesion-2021'; value='Adhérer' />
			</div>
		</div>
	</div>

	<div class="flip-card">
		<div class="flip-card-inner">
			<div class="flip-card-front">
				<p class="title">DONNER</p>
				<p>Passer la souris pour plus d'informations</p>
			</div>
			<div class="flip-card-back">
				<p class="title">DONNER</p>
				<p>Leave Me</p>
				<input type='button' class='button'onclick=window.location.href='https://www.helloasso.com/associations/association-chats-par-minou/formulaires/1/widget'; value='Hello Asso' />
			</div>
		</div>
	</div>

	<div class="flip-card" id="cardD">
		<div class="flip-card-inner">
			<div class="flip-card-front">
				<p class="title">TEAMING</p>
				<p>Passer la souris pour plus d'informations</p>
			</div>
			<div class="flip-card-back">
				<p class="title">TEAMING</p>
				<p>Leave Me</p>
				<input type='button' class='button' onclick=window.location.href='https://www.figma.com/file/9QvlJw0EBA2jp3zRxXtgw9/Nous-aider?node-id=0%3A1&t=zfyDYJpcrkYKNrKv-0'; value='Teaming' />
			</div>
		</div>
	</div>

</div>