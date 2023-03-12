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
							<input type='text' name='nom' value='${chat['name']}' required>
							<label for=\"nom\">Name</label>
						</div>

						<div class='group'>
							<input type='text' name='statut' value='${chat['statut']}'required>
							<label for=\"statut\">Statut</label>
						</div>

					</div>

					<div class='inputOther'>

						<div id='inputAddChatOther' class='group' style='justify-content:center;'>
							<div class='group'>	

								<div class='switch' onclick='checkboxPhotoSwitch(this); etatSwitch(this);'>
									<div id='etatFamilleAccueil' class='checkboxText'>Famille</div>
									<div class='photoGauche'><img src='./ressources/logo.png'></div>
									<input type='checkbox' class='checkbox checkboxFamille' checked='' name='familleAccueil' value='2'>
									<div class='photoDroite'><img src='./ressources/famille_accueil.png'></div>
									<input type='hidden' name='familleAccueil' value='1'> 
								</div>

								<div class='colorPicker'>
									<label for='couleur' class='colorPickerText'>Couleur</label>
									<div class='colorPickerColor' onclick=\"openDialogBox(document.getElementById('colorInput'), 'color');\" ><div></div></div>
									<input id='colorInput' type='hidden' name='couleur' value='${chat['couleur']}'>
								</div>

							</div>
						</div>

						<div class='group'>
							<textarea rows='1' name='description'required>${chat['description']}</textarea>
							<label for=\"description\">Description</label>
						</div>

					</div>

					<div class='inputFile'>
						
						<div id='allSliderPhoto' class='allSlider'>
							<img class='flecheGauche clickable' onclick='translateX(this, undefined, false);' src='./ressources/flecheLeft.png' alt='flecheGauche'>
							<div id='sliderPhoto' class='slider ombre'>
								<div class='slides' id='edit'></div>
							</div>
							<img class='flecheDroite clickable' onclick='translateX(this, undefined, false);' src='./ressources/flecheRight.png' alt='flecheDroite'>
						</div>

						<label for='photo-upload' class='photo-upload-label'>
							<svg width='50' height='50'>
								<circle cx='25' cy='25' r='20' stroke='black' stroke-width='2' fill='transparent' />
								<path d='M 20 25 L 30 25 M 25 20 L 25 30' stroke='black' stroke-width='2' />
							</svg>
						</label>
						<input id='photo-upload' type='file' name='photos[]' onchange='filesAdd(this)' multiple accept='image/*' style='display:none'>

					</div>

					<div class='inputText'>
						<input type='submit' class='buttonType' name='action' value='Ajouter Chat'>
					</div>

					<input type='hidden' name='code' value='${chat['code']}'>
			`);
			addPreviewOfExistantFiles(chat['code']);

		},
		error: function (data) {
			console.log("error");
		}
	});
}


let selectedFiles = [];

function filesAdd(contexte) {
	const slides = $(".formType .inputFile .slides");
	console.log(slides);
	console.log("contexte");
	console.log(contexte);
	console.log("contexte_end");

	for (const file of contexte.files) { // Pour tous les fichiers sélectionnés
               
		selectedFiles.push(file); // On les ajoute à la liste des fichiers sélectionnés


		// Création dela balise img et ajout de l'image
		const img = document.createElement("img");
		img.src = URL.createObjectURL(file);


		// Création de la div qui contiendra l'image et le bouton de suppression
		const slidePhoto = document.createElement("div");
		slidePhoto.classList.add("slidePhoto");
		slidePhoto.appendChild(img);

		// création du bouton de suppression
		const deleteButton = document.createElement("button");
		deleteButton.classList.add("delete-button");
		deleteButton.innerText = "X";

		deleteButton.addEventListener("click", () => { // Au clic sur le bouton de suppression

			// On supprime le fichier de la liste des fichiers sélectionnés
			selectedFiles = selectedFiles.filter(f => f !== file); 

			// On supprime la div qui contient l'image et le bouton de suppression
			photoUploadInput = document.getElementById("photo-upload");
			var taille = slides.children().length-1;
			if (slides.css("transform") != "translateX(0px)") {
				$(".formType .inputFile .flecheGauche").click();
			}
			slides.css("width", taille*100+"px");
			console.log(photoUploadInput.files);

			$(slidePhoto).remove();
			pushSelectedFilesInInput();
		});


		// On ajoute l'image et le bouton de suppression à la div qui les contient
		slidePhoto.appendChild(deleteButton);
		slides.append(slidePhoto);


		var taille = slides.children().length;
		slides.css("width", taille*100+"px");
	}

	pushSelectedFilesInInput();
}

function pushSelectedFilesInInput() {
	const fileInput = document.getElementById("photo-upload");
	
	const fileData = new ClipboardEvent('').clipboardData || new DataTransfer();
	for (const file of selectedFiles) {
		fileData.items.add(file);
	}
	fileInput.files = fileData.files;
	console.log(fileInput.files);
}



function addPreviewOfExistantFiles(code){
	$.ajax({
		url: 'controleur.php',
		type: 'POST',
		data: {
			action: 'getPhotos',
			code: code
		},
		success: function (data) {
			console.log(data);
			const slides = $(".formType .inputFile #edit");

			var taille = slides.children().length;
			slides.css("width", taille*100+"px");
			for (const photo of data) {
				const img = document.createElement("img");
				img.src = photo['url'];

				const slidePhoto = document.createElement("div");
				slidePhoto.classList.add("slidePhoto");
				slidePhoto.appendChild(img);

				const deleteButton = document.createElement("button");
				deleteButton.classList.add("delete-button");
				deleteButton.innerText = "X";
				deleteButton.addEventListener("click", () => {
					$.ajax({
						url: 'controleur.php',
						type: 'POST',
						data: {
							action: 'deletePhoto',
							url: photo['url']
						},
						success: function (data) {
							console.log(data);
							$(slidePhoto).remove();
							var taille = slides.children().length-1;
							slides.css("width", taille*100+"px");
						},
						error: function (data) {
							console.log("error");
						}
					});
				});

				slidePhoto.appendChild(deleteButton);
				slides.append(slidePhoto);
			}
		},
		error: function (data) {
			console.log("error");
		}
	});
}




