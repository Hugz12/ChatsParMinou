<?php

if (basename($_SERVER["PHP_SELF"]) != "index.php"){ // Si la page est appelée directement par son adresse
	header("Location:../index.php?view=accueil"); // on redirige en passant par la page index
	die("");
}

?>
<link rel="stylesheet" href="./css/nousAider.css">

<div id="patteConnexion" class="conteneurDeConteneurDePattes">
    <div id="1" class="patteContainer"></div>
    <div id="2" class="patteContainer"></div>
    <div id="3" class="patteContainer"></div>

</div>


<script>
    
    var patteContainer = document.getElementById("1");    
    var patteContainer2 = document.getElementById("2");
    var patteContainer3 = document.getElementById("3");


    move(patteContainer, 0, 0, 0, 0, 500, 1);
    move(patteContainer2, 180, 0, 0, 0, 600, 1);
    move(patteContainer3, 270, 0, 0, 500, 0, 1);
</script>

<div class="container">

	<div class="flip-card">
		<div class="flip-card-inner">
			<div class="flip-card-front">
				<p class="title">ADHÉSION</p>
				<p class="petitTxt">Si vous voulez en savoir plus sur l'adhésion passez votre souris sur cette carte</p>
			</div>
			<div class="flip-card-back">
				<p class="title">ADHÉSION</p>
				<p class="petitTxt">Il existe plusieurs moyens d'adhérer:
				</br>
				</br>Vous pouvez faire un don de matériel comme de la nourriture ou des jouets pour les chats
				</br>Pour cela il vous suffit de nous contacter par mail, téléphone, sur nos réseaux sociaux ou tout simplement venir au refuge
				</br>
				</br>
				</br>
				</br>Vous pouvez aussi faire un don d'argent en cliquant sur ce lien :</p>
				<div>
					<input type='button' class='buttonType' onclick=window.location.href='https://www.helloasso.com/associations/association-chats-par-minou/adhesions/adhesion-2021'; value='Adhérer' />
				</div>
			</div>
		</div>
	</div>

	<div class="flip-card">
		<div class="flip-card-inner">
			<div class="flip-card-front">
				<p class="title">DONATION</p>
				<p class ="petitTxt">Si vous voulez en savoir plus sur les donations passez votre souris sur cette carte </p>
			</div>
			<div class="flip-card-back">
				<p class="title">DONATION</p>
				<p class="petitTxt">Comme pour l'adhésion la donation peut se faire de plusieurs façon:
				</br>Il est possible pour vous de faire des dons à chacune de nos différentes cagnottes en cliquant sur les liens ci-dessous
				</br>Les donations peuvent être sous deux formes différentes.
				</br>La première est un don d'argent qui sera utilisé pour les soins des chats et l'entretien du refuge
				</br>La deuxième sera utilisé de la même façon mais sera un don qui s'effectue tous les mois automatiquement
				</p>
				<div>
					<input type='button' class='buttonType' onclick=window.location.href='https://www.figma.com/file/9QvlJw0EBA2jp3zRxXtgw9/Nous-aider?node-id=0%3A1&t=zfyDYJpcrkYKNrKv-0'; value='Teaming' />
				</div>
			</div>
		</div>
	</div>

</div>