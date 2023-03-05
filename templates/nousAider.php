<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>
	<h1>Nous Aider</h1>
<div id='nousAider'>
	
	<input type='button' onclick=window.location.href='https://www.helloasso.com/associations/association-chats-par-minou/adhesions/adhesion-2021'; value='Adhérer' />
	<h2>texte pour l'adhésion</h2>
</div>
<h1>Soutiens financier</h1>
<div id='nousAider'>
	<input type='button' onclick=window.location.href='https://www.figma.com/file/9QvlJw0EBA2jp3zRxXtgw9/Nous-aider?node-id=0%3A1&t=zfyDYJpcrkYKNrKv-0'; value='Teaming' />
	<h2>texte pour teaming</h2>
</div>
<div id='nousAider'>
	<input type='button' onclick=window.location.href='https://www.helloasso.com/associations/association-chats-par-minou/formulaires/1/widget'; value='Hello Asso' />
	<h2>texte pour hello asso</h2>
</div>
<div id='nousAider'>
	<h1>Donner de l'équipement</h1>
	<h2>texte pour donner de l'équipement</h2>
	//faudra changer l'image
	<img src='ressources/images/box.jpg' width='200px' height='150px'/>

</div>