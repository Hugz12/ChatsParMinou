function afficherFormAjoutChat() {
	console.log("afficherForm");
	$("#formAjoutChat").css("display", "flex");
	$(".disabled").css("pointer-events", "none");
	$("#formAjoutChat").animate({opacity: 1}, 250);
}

function cacherFormAjoutChat() {
	console.log("enleverForm");
	$("#formAjoutChat").animate({opacity: 0}, 250, function() {
		$("#formAjoutChat").css("display", "none");
		$(".disabled").css("pointer-events", "auto");
	});
}

function afficherFormSupprimerChat(){
	$("#formSupprimerChat").css("display", "flex");
	$(".disabled").css("pointer-events", "none");
	$("#formSupprimerChat").animate({opacity: 1}, 250);
}


function cacherFormSupprimerChat() {
	console.log("enleverForm");
	$("#formSupprimerChat").animate({opacity: 0}, 250, function() {
		$("#formSupprimerChat").css("display", "none");
		$(".disabled").css("pointer-events", "auto");
	});
}




function afficherChats(chats) {
	console.log("afficherChat");
	console.log(chats);

	var slides = $("#allSliderChats").children(".slider").children(".slides");
	var sliderPoint = $("#allSliderChats").children(".slider").children(".sliderPoints");

	for (var j = 0; j < chats.length; j++) {
		console.log("j = " + j);
		chatActuel = chats[j];

		slides.append(`
			<div class="slideChat slide">
				<div class="chatBanniere">
					<div>
						<img src="./ressources/description.png" alt="description">
						<div class="chatDescription chatTexte policeTexte">${chatActuel['description']}</div>
					</div>
				</div>
				<div class="chatBox">
					<div class="chatNomBlock">
						<div class="chatNom policeTitre">${chatActuel['name']}</div>
					</div>
					<div class="chatContent policeTexte">
						<div class="chatInfos">
							<div class="chatInfos1">
								<div>
									<div class="chatTitre textColor3 policeTexte">Nom</div>
									<div class="chatTexte policeTexte">${chatActuel['name']}</div>
								</div>
								<div>
									<div class="chatTitre textColor3 policeTexte">Race</div>
									<div class="chatTexte policeTexte">${chatActuel['race']}</div>
								</div>
								<div>
									<div class="chatTitre textColor3 policeTexte">Sexe</div>
									<div class="chatTexte policeTexte">${(chatActuel['sexe'] ? 'Femelle' : 'Mâle')}</div>
								</div>
							</div>
							<div class="chatInfos2">
								<div>
									<img src="./ressources/calendar.png" alt="calendar" style="width: 20px; height: 20px;">
									<div class="chatTitre policeTexte">Né le ${chatActuel['dateDeNaissance']}</div>
								</div>
								<div>
									<img src="./ressources/location.png" alt="calendar" style="width: 20px; height: 20px;">
									<div class="chatTitre policeTexte">${(chatActuel['familleAccueil'] ? "Actuellement en famille d'accueil" : "Actuellement au refuge")}</div>
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
				</div>
			</div>`
		);
		var colorChatFade = convertColor(chatActuel['couleur'], 0.5);
		var colorChatSuivantFade = convertColor(chats[(j+1)%chats.length]['couleur'], 0.5);
		var colorChat = convertColor(chatActuel['couleur'], 1);

		var slideChat = document.getElementsByClassName("slideChat")[j];

		slideChat.style.setProperty('--third-color', colorChatFade);
		slideChat.style.setProperty('--fourth-color', convertColor(colorChat, 0.25));
		slideChat.style.setProperty('--fifth-color', colorChat);
		
		console.log($(slides.children()[j]).children(".chatBanniere"));
		$(slides.children()[j]).children(".chatBanniere").css("background", 'linear-gradient(60deg,'+ colorChatFade +' 80%, '+ colorChatSuivantFade +' 90%)');
		
		
		var slidesPhoto = $(slides.children()[j]).children(".chatBox").children(".chatContent").children(".allSliderPhotoChat").children(".sliderPhotoChat").children(".slides");
		var sliderPointPhoto = $(slides.children()[j]).children(".chatBox").children(".chatContent").children(".allSliderPhotoChat").children(".sliderPhotoChat").children(".sliderPoints");

		for (var i=0; i < chatActuel['nbPhoto']; i++) {
			$(slidesPhoto).append("<img class='slidePhotoChat' src='./ressources/chats/"+chatActuel['code']+"/"+i+".jpg' alt='Chat du mois'/>");
			if (i == 0) $(sliderPointPhoto).append("<img class='slidePoint slidePointSelected clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-i)+");'/>");
			else $(sliderPointPhoto).append("<img class='slidePoint clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-i)+");'/>");
		}
		$(slidesPhoto).css("width", (chatActuel['nbPhoto']*500)+"px");
		console.log("fin afficherChat "+ j);

		if (j == 0) $(sliderPoint).append("<img class='slidePoint slidePointSelected clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-i)+");'/>");
		else $(sliderPoint).append("<img class='slidePoint clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-j)+");'/>");

		
		
	}
	$(slides).css("width", (chats.length*1100)+"px");

	if(admin) {
		var xhr = new XMLHttpRequest();
		// Définir la fonction à exécuter lorsque la requête est terminée
		xhr.onload = function() {
		// Vérifier que la requête a réussi
			if (xhr.status === 200) {
				// Récupérer le contenu du fichier SVG
				
				for(var k=0; k<document.getElementsByClassName("chatNomBlock").length; k++) {
					var elt = document.createElement("div");
					elt.classList.add("editButton");
					elt.id = chats[k]['code'];
					elt.onclick = function() {displayFormEditChat(this);};
					elt.innerHTML = xhr.responseText;
					console.log(document.getElementsByClassName("chatNomBlock")[k]);
					document.getElementsByClassName("chatNomBlock")[k].appendChild(elt);
				}
			}
		};
		// Ouvrir la requête pour charger le fichier SVG
		xhr.open("GET", "./ressources/edit.svg", true);
		// Envoyer la requête
		xhr.send();
	}
}


function displayFormEditChat(element){
	var id = element.id;
	$.ajax({
		url: "./controleur.php",
		type: "POST",
		dataType: "html",
		data: {
			"action": "getChat",
			"code": id
		},
		success: function (retour) {
			console.log(retour);
			var chat = JSON.parse(retour);
			// enleve le double tableau
			chat = chat[0];
			// ajoute un element div class="formType" dans le body
			
			$("body").append("<div id='formEditChat' class='formType' style='display:none; opacity:0;'></div>");
			displayForm("formEditChat");
			$("#formEditChat").append(`

				<div class='buttonHideForm' onclick='deleteForm(\"formEditChat\");'>
					<img src='./ressources/fermer_form.png' style='width: 30px; height: 30px;'>
				</div>

				<div class='policeTitre tailleTitre' style='color:#83bcf2; text-align:center;'>Modifier ${chat['name']} - ${chat['code']} </div>
				<br>

				<form class='policeTexte' action='controleur.php' method='post' enctype='multipart/form-data'>

					<div class='inputText'>

						<div class='group'>
							<input type='text' class='input' name='statut' value='${chat['statut']}' required>
							<span class='highlight'></span>
							<span class='bar'></span>
							<label>Statut</label>
						</div>

						<div class='group'>
							<input type='text' class='input' name='description' value='${chat['description']}' required>
							<span class='highlight'></span>
							<span class='bar'></span>
							<label>Description</label>
						</div>

					</div>
					
					<div class='inputOther'>

						

						<input type='color' name='couleur' value='${chat['couleur']}' style='width:32px; height: 32px;' >

						<div class='switch'>
							<div><img src='./ressources/logo.png'></div>
							<input type='checkbox' class='checkbox checkboxFamille' checked='' name='familleAccueil' value='2'>
							<div><img src='./ressources/famille_accueil.png'></div>
							<input type='hidden' name='familleAccueil' value='1'> 
						</div>

					</div>

					<div class='inputText'>
						<input type='file' name='photos[]' multiple required>
					</div>

					<div class='inputText'>
						<input type='submit' class='buttonType' name='action' value='Ajouter Chat'>
					</div>

					<input type='hidden' name='code' value='${chat['code']}'>
			`);

		},
		error: function (data) {
			console.log("error");
		}
	});
}





$(".colorPickerColor").on("change", function() {
	console.log("je change");
	this.style.backgroundColor = this.value;
});




