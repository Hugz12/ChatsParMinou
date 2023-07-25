var evenementActuel = 0;


/**
 * Fonction qui permet dde changer le chat du mois via une requête AJAX
 * @return {void}
 */
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



// /**
//  * Fonction qui gère le responsive de la page d'accueil
//  */
// window.addEventListener("resize", responsive); // on appelle la fonction responsive quand on redimensionne la fenêtre
// function responsive(){

// 	// Responsive la présentation
// 	if (window.innerWidth < 900) {
// 		$("#presentation").css('height', '350px');
// 		$("#presentation img").css('height', '350px');
// 		$("#presentationTexte").css('height', '350px');
// 		$("#presentationTexte").css('left', '10%');
// 		$("#presentationTexte1").css('font-size', '35px');
// 		$("#presentationTexte1").css('width', '100%');
// 		$("#presentationTexte2").css('font-size', '12px');

// 		$("#allChatDuMoisSmall").css('display', 'flex');
// 		$("#allChatDuMois").css('display', 'none');

// 	}else{
// 		$("#presentation").css('height', '500px');
// 		$("#presentation img").css('height', '500px');
// 		$("#presentationTexte").css('height', '500px');
// 		$("#presentationTexte").css('left', '15%');
// 		$("#presentationTexte1").css('font-size', '58px');
// 		$("#presentationTexte1").css('width', '80%');
// 		$("#presentationTexte2").css('font-size', '16px');
// 		$("#allChatDuMoisSmall").css('display', 'none');
// 		$("#allChatDuMois").css('display', 'block');
// 	}
// }



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

		var date = evenements[i]['date'].split("-");
		date = date[2]+"/"+date[1]+"/"+date[0];

		var heureDebut = evenements[i]['heureDebut'].split(":");
		heureDebut = heureDebut[0]+"h"+heureDebut[1];

		var heureFin = evenements[i]['heureFin'].split(":");
		heureFin = heureFin[0]+"h"+heureFin[1];


		slides.append(`
			<div class='slide slideEvent'>
				<div class='texteEvent'>
					<div class='titreEvent policeTitre'>${evenements[i]['titre']}</div>
					<div class='descriptionEvent policeTexte'>${evenements[i]['description']}</div>
					<div class='dateEvent policeTexte'>Le ${date} de ${heureDebut} à ${heureFin}</div>
				</div>
				<div class='imgEvent'>
					<div class='blurImage'></div>
					<img src='./ressources/evenements/${evenements[i]['id']}.jpg' alt='${evenements[i]['titre']}'/>
				</div>
		`);

		if (i == 0) sliderPoints.append("<div class='slidePoint slidePointSelected clickable' onclick='translateX(this, "+(-i)+");'></div>");
		else sliderPoints.append("<div class='slidePoint clickable' onclick='translateX(this, "+(-i)+");'></div>");
	}

	if(admin){ // si l'utilisateur est admin on affiche les boutons d'édition
		var xhr = new XMLHttpRequest();
		// Définir la fonction à exécuter lorsque la requête est terminée
		xhr.onload = function() {
		// Vérifier que la requête a réussi
			if (xhr.status === 200) {
				// Récupérer le contenu du fichier SVG
				
				for (var k=0; k<document.getElementsByClassName("slideEvent").length; k++) {
					var elt = document.createElement("div");
					elt.classList.add("editButton");
					elt.id = evenements[k]['id'];
					elt.onclick = function() {displayFormEditEvent(this);};
					elt.innerHTML = xhr.responseText;
					elt.style.position = "absolute";
					elt.style.top = "-20px";
					elt.style.right = "-20px";
					elt.style.setProperty("--third-color", convertColor(document.getElementsByClassName("slideEvent")[k].style.backgroundColor, 0.5));
					console.log(document.getElementsByClassName("slideEvent")[k].children[0]);
					document.getElementsByClassName("slideEvent")[k].children[0].appendChild(elt);
				}
			}
		};
		// Ouvrir la requête pour charger le fichier SVG
		xhr.open("GET", "./ressources/edit.svg", true);
		// Envoyer la requête
		xhr.send();
	}
}



/**
 * Fonction qui permet d'afficher le formulaire d'édition d'un événement dans le body
 * @param {} elt 
 * @return {void}
 */
function displayFormEditEvent(elt){
	if (window.innerWidth < 650) {
		alert("Veuillez utiliser un écran plus grand pour accéder a l'administration du site");
	} else {
		var id = elt.id;
		$.ajax({
			url: "./controleur.php",
			type: "POST",
			dataType: "json",
			data: {
				"action": "getEvent",
				"id": id
			},
			success: function(data){
				
				var event = data[0];

				console.log(event['date']);
				console.log(event['date'].split(" ")[0]);

				var date = event['date'].split("-");
				date = date[2]+"/"+date[1]+"/"+date[0];
				
				var heureDebut = event['heureDebut'].split(":");
				heureDebut = heureDebut[0]+":"+heureDebut[1];
				
				var heureFin = event['heureFin'].split(":");
				heureFin = heureFin[0]+":"+heureFin[1];


				$("body").append("<div id='formEditEvent' class='formType' style='display:none; opacity:0;'>");
				displayForm("formEditEvent");
				$("#formEditEvent").append(`

					<div class='buttonHideForm' onclick='deleteForm(\"formEditEvent\");'>
						<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
					</div>

					<div class='policeTitre tailleTitre titreForm' style='color:#83bcf2; text-align:center;'>Modifier Evenement</div>
					<br>

					<form class='policeTexte' action='controleur.php' method='post' enctype='multipart/form-data'>

						<div id='evenement'>

							<div class='group'>
								<input type='text' name='titre' value='${event['titre']}' required>
								<label for=\"titre\">Titre</label>
							</div>
						
							<div class='group'>
								<input type='date' name='date' required onchange=\"changerDate(this);\" max='".date('Y-m-d H:i:s')."' value='${event['date']}'>
								<label for=\"date\">${date}</label>
							</div>

							<div class='group'>
								<input type='time' name='heureDebut' required value='${heureDebut}'>
								<label for=\"date\">Début</label>
							</div>

							<div class='group'>
								<input type='time' name='heureFin' required value='${heureFin}'>
								<label for=\"date\">Fin</label>
							</div>

						</div>


						<div class='inputOther'>

							<div class='group'>
								<textarea name='description'required>${event['description']}</textarea>
								<label for=\"description\">Description</label>
							</div>

							<div class='file'>
								<input type='file' name='image' id='image' accept='image/*' onchange=\"previewFile(this);\" style='display:none'>
								<label for='image' class='photo-upload-label'></label>
								<img class='previewImg' src='./ressources/evenements/${event['id']}.jpg' alt='preview'>
								<div class='fileText'>Choisir une photo</div>
								<img class="addImage" src="./ressources/add.svg" alt="add.svg">
							</div>

						</div>

						<input type='hidden' name='id' value='${event['id']}'>

						
						<div class='inputText'>
							<input type='submit' class='buttonType' onclick='undisplayAddEvenement();' name='action' value='Modifier Evenement'>
						</div>

					</form>


				`);
			},
			error: function(data){
				console.log("error");
			}
		});
	}
}



/**
 * Fonction qui permet d'afficher le chat du mois avec toutes ses informations
 * @param {*} chatDuMois 
 * @return {void}
 */
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
				<div class="buttonType adoptBtnChatDuMois policeTexte" onclick="adopterChatDuMois(${chatDuMois['code']});">Adopter ce chat</div>
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
					<div class="sliderPhotoChat slider">
						<div class="flecheGauche clickable" onclick="translateX(this)"></div>

						<div class="slides"></div>
						<div class="sliderPoints"></div>

						<div class="flecheDroite clickable" onclick="translateX(this)"></div>
					</div>
				</div>
			</div>
		</div>`
	);

	$.ajax({
		url: "./ressources/flecheLeft.svg",
		dataType: "text",
		success: function(data) {
			elt = document.getElementsByClassName("flecheGauche");
			elt[0].innerHTML = data;
		}
	});

	$.ajax({
		url: "./ressources/flecheRight.svg",
		dataType: "text",
		success: function(data) {
			elt = document.getElementsByClassName("flecheDroite");
			console.log(elt);
			elt[0].innerHTML = data;
		}
	});
	//var slides = document.getElementById("allChatDuMois").childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0];
	//var sliderPoints = document.getElementById("allChatDuMois").childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1];

	document.documentElement.style.setProperty('--third-color', convertColor(chatDuMois['couleur'], 0.5));
	document.documentElement.style.setProperty('--fourth-color', convertColor(chatDuMois['couleur'], 0.25));
	document.documentElement.style.setProperty('--fifth-color', convertColor(chatDuMois['couleur'], 1));
	document.documentElement.style.setProperty('--sixth-color', convertColor(chatDuMois['couleur'], 0.1));
	

	
	var slides = $("#allChatDuMois .slides");
	var sliderPoints = $("#allChatDuMois .sliderPoints");

	for (var i=0; i < chatDuMois['nbPhoto']; i++) {
		$(slides).append("<img class='slidePhotoChat slide' src='./ressources/chats/"+chatDuMois['code']+"/"+i+".jpg' alt='Chat du mois'/>");
		if (i == 0) $(sliderPoints).append("<div class='slidePoint slidePointSelected clickable' onclick='translateX(this, "+(-i)+");'></div>");
		else $(sliderPoints).append("<div class='slidePoint clickable' onclick='translateX(this, "+(-i)+");'></div>");
	}

	if(admin) { // Si l'utilisateur est un administrateur on affiche le bouton d'édition du chat du mois
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




function afficherChatDuMoisSmall(chatDuMois){
	console.log("afficherChatDuMois");
	chatDuMois = chatDuMois[0];
	var flecheLeft;
	var flecheRight;
	$.ajax({
		url: "./ressources/flecheLeft.svg",
		dataType: "text",
		success: function(data) {
			flecheLeft = data;
		}
	});

	$.ajax({
		url: "./ressources/flecheRight.svg",
		dataType: "text",
		success: function(data) {
			flecheRight = data;
		}
	});


	$("#allChatDuMoisSmall").append(`
		<div class="firstBanner">
			<div class="tailleTitre policeTitre titreChatDuMois">${chatDuMois['name']}</div>
			
			<div class="chatInfoSmall">
				<div class="policeTexte boxInfoTitle">Race</div>
				<div class="policeTexte boxInfoSmall">${chatDuMois['race']}</div>
			</div>

			<div class="chatInfoSmall">
				<div class="policeTexte boxInfoTitle">Sexe</div>
				<div class="policeTexte boxInfoSmall">${(chatDuMois['sexe'] ? 'Femelle' : 'Mâle')}</div>
			</div>

			<div class="chatInfoSmall">
				<div class="policeTexte boxInfoTitle">Situation</div>
				<div class="policeTexte boxInfoSmall">${(chatDuMois['familleAccueil'] ? 'En famille' : 'Au refuge')}</div>
			</div>

			<div class="buttonType adoptBtnChatDuMois policeTexte" onclick="adopterChatDuMois(${chatDuMois['code']});">Adopter ce chat</div>

		</div>

		<div class="secondBanner">
			<div>
				<img src="./ressources/calendar.png" alt="calendar" style="width: 20px; height: 20px;">
				<div class="chatTexte policeTexte"> Né le ${chatDuMois['dateDeNaissance']}</div>
			</div>
			<div>
				<img src="./ressources/description.png" alt="description" style="width: 20px; height: 20px;">
				<div class=" chatTexte policeTexte">${chatDuMois['description']}</div>
			</div>
		</div>

		<div class="thirdBanner">
			<div class="allSliderPhotoChatSmall allSlider">
				<div class="sliderPhotoChat slider">
					<div class="flecheGauche clickable" onclick="translateX(this)"></div>

					<div class="slides"></div>
					<div class="sliderPoints"></div>

					<div class="flecheDroite clickable" onclick="translateX(this)"></div>
				</div>
			</div>
		</div>
	`
	);

	$.ajax({
		url: "./ressources/flecheLeft.svg",
		dataType: "text",
		success: function(data) {
			elt = document.getElementsByClassName("flecheGauche");
			elt[1].innerHTML = data;
		}
	});

	$.ajax({
		url: "./ressources/flecheRight.svg",
		dataType: "text",
		success: function(data) {
			elt = document.getElementsByClassName("flecheDroite");
			console.log(elt);
			elt[1].innerHTML = data;
		}
	});

	//var slides = document.getElementById("allChatDuMois").childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[0];
	//var sliderPoints = document.getElementById("allChatDuMois").childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1];

	document.documentElement.style.setProperty('--third-color', convertColor(chatDuMois['couleur'], 0.5));
	document.documentElement.style.setProperty('--fourth-color', convertColor(chatDuMois['couleur'], 0.25));
	document.documentElement.style.setProperty('--fifth-color', convertColor(chatDuMois['couleur'], 1));
	

	
	var slides = $("#allChatDuMoisSmall .slides");
	var sliderPoints = $("#allChatDuMoisSmall .sliderPoints");

	for (var i=0; i < chatDuMois['nbPhoto']; i++) {
		$(slides).append("<img class='slidePhotoChat slide' src='./ressources/chats/"+chatDuMois['code']+"/"+i+".jpg' alt='Chat du mois'/>");
		if (i == 0) $(sliderPoints).append("<div class='slidePoint slidePointSelected clickable' onclick='translateX(this, "+(-i)+");'></div>");
		else $(sliderPoints).append("<div class='slidePoint clickable' onclick='translateX(this, "+(-i)+");'></div>");
	}

	if(admin) { // Si l'utilisateur est un administrateur on affiche le bouton d'édition du chat du mois
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
				document.getElementsByClassName("firstBanner")[0].appendChild(elt);
			}
		};
		// Ouvrir la requête pour charger le fichier SVG
		xhr.open("GET", "./ressources/edit.svg", true);
		// Envoyer la requête
		xhr.send();
	}
}


	
function adopterChatDuMois(code) {
	var input = document.createElement("input");
	input.type = "hidden";
	input.name = "chatsSelected[]";
	input.value = code;
	var form = document.createElement("form");
	form.method = "post";
	form.action = "./index.php?view=formulaireAdoption";
	form.style.display = "none";
	form.appendChild(input);
	document.body.appendChild(form);
	form.submit();
} 

