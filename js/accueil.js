var evenementActuel = 0;



function switchChatDuMois(){
	code = $("#switchChatDuMois").children("form").children("select").val();
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", "./controleur.php?action=Changer+Chat+Du+Mois&code="+code, true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// Traitement de la réponse ici
			
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "./controleur.php?action=getChatDuMois", true);
			xhr.send();
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					// Traitement de la réponse ici
					var data = this.responseText;
					data = JSON.parse(data);
					console.log(data);
					$("#allChatDuMois").empty();
					afficherChatDuMois(data);
				}
			};
			hideForm("switchChatDuMois");
		}
	};
}



/**
 * Fonction qui gère le responsive de la page d'accueil
 */
window.addEventListener("resize", responsive); // on appelle la fonction responsive quand on redimensionne la fenêtre
function responsive(){

	// Responsive la présentation
	if (window.innerWidth < 800) {
		$("#presentation").css('height', '350px');
		$("#presentation img").css('height', '350px');
		$("#presentationTexte").css('height', '350px');
		$("#presentationTexte").css('left', '10%');
		$("#presentationTexte1").css('font-size', '35px');
		$("#presentationTexte1").css('width', '100%');
		$("#presentationTexte2").css('font-size', '12px');

	}else{
		$("#presentation").css('height', '500px');
		$("#presentation img").css('height', '500px');
		$("#presentationTexte").css('height', '500px');
		$("#presentationTexte").css('left', '15%');
		$("#presentationTexte1").css('font-size', '58px');
		$("#presentationTexte1").css('width', '80%');
		$("#presentationTexte2").css('font-size', '16px');
	}

	// Responsive le chat du mois
	

	
}


/**
 * Fonction qui permet d'afficher les événements dans le .slides
 * @param  {array} evenements tableau contenant les événements
 * @return {void}
 */
function afficherEvenements(evenements){
	console.log("afficherEvenements");

	var slides = $("#allSliderEvent .slides");
	var sliderPoints = $("#allSliderEvent .sliderPoints");

	

	for (var i = 0; i < evenements.length; i++) {
		var date = evenements[i]['date'];
		
		date = date.split(" ");
		heure = date[1].split(":")[0];
		date = date[0];
		slides.append(
			"<div class='slideEvent' style='background-color:"+evenements[i]['couleur']+"'>"
				+ "<div class='texteEvent'>"
					+ "<div class='titreEvent policeTitre'>"+evenements[i]['titre']+"</div>"
					+ "<div class='descriptionEvent policeTexte'>"+evenements[i]['description']+"</div>"
					+ "<div class='dateEvent policeTexte' style='color:white;background-color:#22252b;'>Le "+date+" à "+heure+"h</div>"
				+ "</div>"
				+ "<div class='imgEvent'>"
					+ "<img src='./ressources/evenements/"+evenements[i]['id']+".jpg' alt='"+evenements[i]['titre']+"'/>"
				+ "</div>");
		if (i == 0) sliderPoints.append("<img class='slidePoint slidePointSelected clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-i)+");'/>");
		else sliderPoints.append("<img class='slidePoint clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-i)+");'/>");
	}
	$(slides).css("width", (evenements.length*1080)+"px");

	if(admin){
		var xhr = new XMLHttpRequest();
		// Définir la fonction à exécuter lorsque la requête est terminée
		xhr.onload = function() {
		// Vérifier que la requête a réussi
			if (xhr.status === 200) {
				// Récupérer le contenu du fichier SVG
				
				for(var k=0; k<document.getElementsByClassName("slideEvent").length; k++) {
					var elt = document.createElement("div");
					elt.classList.add("editButton");
					elt.id = evenements[k]['id'];
					elt.onclick = function() {displayFormEditEvent(this);};
					elt.innerHTML = xhr.responseText;
					console.log(document.getElementsByClassName("slideEvent")[k]);
					document.getElementsByClassName("slideEvent")[k].appendChild(elt);
				}
			}
		};
		// Ouvrir la requête pour charger le fichier SVG
		xhr.open("GET", "./ressources/edit.svg", true);
		// Envoyer la requête
		xhr.send();
	
	}
}


function displayFormEditChat(elt){
	
}




function afficherChatDuMois(chatDuMois){
	console.log("afficherChatDuMois");
	chatDuMois = chatDuMois[0];
	$("#allChatDuMois").append(`
		<div class="chatBanniere">
			<div>
				<img src="./ressources/description.png" alt="description">
				<div class="chatDescription chatTexte policeTexte">${chatDuMois['description']}</div>
			</div>
		</div>
		<div class="chatBox">
			<div class="chatNomBlock">
				<div class="chatNom policeTitre">${chatDuMois['name']}</div>
			</div>
			<div class="chatContent policeTexte">
				<div class="chatInfos">
					<div class="chatInfos1">
						<div>
							<div class="chatTitre policeTexte">Nom</div>
							<div class="chatTexte policeTexte">${chatDuMois['name']}</div>
						</div>
						<div>
							<div class="chatTitre policeTexte">Race</div>
							<div class="chatTexte policeTexte">${chatDuMois['race']}</div>
						</div>
						<div>
							<div class="chatTitre policeTexte">Sexe</div>
							<div class="chatTexte policeTexte">${(chatDuMois['sexe'] ? 'Femelle' : 'Mâle')}</div>
						</div>
					</div>
					<div class="chatInfos2">
						<div>
							<img src="./ressources/calendar.png" alt="calendar" style="width: 20px; height: 20px;">
							<div class="chatTitre policeTexte"> Né le ${chatDuMois['dateDeNaissance']}</div>
						</div>
						<div>
							<img src="./ressources/location.png" alt="calendar" style="width: 20px; height: 20px;">
							<div class="chatTitre policeTexte">${(chatDuMois['familleAccueil'] ? "Actuellement en famille d'accueil" : "Actuellement au refuge")}</div>
						</div>
					</div>
				</div>
				<div class="allSliderPhotoChat allSlider">
					<img class="flecheGauche clickable" onclick="translateX(this);" src="./ressources/flecheLeft.png" alt="flecheGauche">
					<div class="sliderPhotoChat slider">
						<div class="slides"></div>
						<div class="sliderPoints"></div>
					</div>
					<img class="flecheDroite clickable" onclick="translateX(this);" src="./ressources/flecheRight.png" alt="flecheDroite"></div>
				</div>
			</div>
		</div>`
	);
	//var slides = document.getElementById("allChatDuMois").childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0];
	//var sliderPoints = document.getElementById("allChatDuMois").childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1];

	var colorChatFade = convertColor(chatDuMois['couleur'], 0.5);
	var colorChat = convertColor(chatDuMois['couleur'], 1);
	console.log(colorChatFade);
	document.documentElement.style.setProperty('--third-color', colorChatFade);
	document.documentElement.style.setProperty('--fourth-color', convertColor(chatDuMois['couleur'], 0.25));
	document.documentElement.style.setProperty('--fifth-color', colorChat);


	console.log(document.documentElement.style.getPropertyValue('--third-color'));
	
	var slides = $("#allChatDuMois .slides");
	var sliderPoints = $("#allChatDuMois .sliderPoints");

	for (var i=0; i < chatDuMois['nbPhoto']; i++) {
		$(slides).append("<img class='slidePhotoChat' src='./ressources/chats/"+chatDuMois['code']+"/"+i+".jpg' alt='Chat du mois'/>");
		if (i == 0) $(sliderPoints).append("<img class='slidePoint slidePointSelected clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-i)+");'/>");
		else $(sliderPoints).append("<img class='slidePoint clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-i)+");'/>");
	}
	$(slides).css("width", (chatDuMois['nbPhoto']*500)+"px");

	if(admin) {
		var xhr = new XMLHttpRequest();
		// Définir la fonction à exécuter lorsque la requête est terminée
		xhr.onload = function() {
		// Vérifier que la requête a réussi
			if (xhr.status === 200) {
				// Récupérer le contenu du fichier SVG
				var elt = document.createElement("div");
				elt.classList.add("editButton");
				elt.innerHTML = xhr.responseText;
				elt.onclick = function () {displayForm("switchChatDuMois");};
				document.getElementsByClassName("chatNomBlock")[0].appendChild(elt);
			}
		};
		// Ouvrir la requête pour charger le fichier SVG
		xhr.open("GET", "./ressources/edit.svg", true);
		// Envoyer la requête
		xhr.send();
	}
}

	