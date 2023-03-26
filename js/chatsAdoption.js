/**
 * Fonction qui permet d'afficher tous les chats dans la page d'adoption
 * @param {*} chats 
 */
function afficherChats(chats) {
	console.log("afficherChat");
	console.log(chats);

	var slides = $("#allSliderChats").children(".slider").children(".slides");
	var sliderPoint = $("#allSliderChats").children(".slider").children("#allSliderPointsChats").children(".slider").children(".slides");

	for (var j = 0; j < chats.length; j++) {
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
							<div class="sliderPhotoChat slider">
								<div class="flecheGauche clickable" onclick="translateX(this)"></div>

								<div class="slides"></div>
								<div class="allSliderPointsPhotosChats allSlider">
									<div class="slider">
										<div class="flecheGauche clickable" onclick="translateX(this)"><?php include("./ressources/flecheLeft.svg") ?></div>

										<div class="slides"></div>

										<div class="flecheDroite clickable" onclick="translateX(this)"><?php include("./ressources/flecheRight.svg") ?></div>
									</div>
								</div>
		
								<div class="flecheDroite clickable" onclick="translateX(this)"></div>
							</div>
						</div>
					</div>
				</div>
			</div>`
		);

		slides.append(`
			<div class="slideChatSmall slide">
				<div class="firstBanner">
					<div class="tailleTitre policeTitre titreChatDuMois">${chatActuel['name']}</div>
					
					<div class="chatInfoSmall">
						<div class="policeTexte boxInfoTitle">Race</div>
						<div class="policeTexte boxInfoSmall">${chatActuel['race']}</div>
					</div>

					<div class="chatInfoSmall">
						<div class="policeTexte boxInfoTitle">Sexe</div>
						<div class="policeTexte boxInfoSmall">${(chatActuel['sexe'] ? 'Femelle' : 'Mâle')}</div>
					</div>

					<div class="chatInfoSmall">
						<div class="policeTexte boxInfoTitle">Situation</div>
						<div class="policeTexte boxInfoSmall">${(chatActuel['familleAccueil'] ? 'En famille' : 'Au refuge')}</div>
					</div>
				</div>

				<div class="secondBanner">
					<div>
						<img src="./ressources/calendar.png" alt="calendar" style="width: 20px; height: 20px;">
						<div class="chatTexte policeTexte"> Né le ${chatActuel['dateDeNaissance']}</div>
					</div>
					<div>
						<img src="./ressources/description.png" alt="description" style="width: 20px; height: 20px;">
						<div class=" chatTexte policeTexte">${chatActuel['description']}</div>
					</div>
				</div>

				<div class="thirdBanner">
					<div class="allSliderPhotoChatSmall allSlider">
						<div class="sliderPhotoChat slider">
							<div class="flecheGauche clickable" onclick="translateX(this)"></div>

							<div class="slides"></div>
							<div class="allSliderPointsPhotosChatsSmall allSlider">
								<div class="slider">
									<div class="flecheGauche clickable" onclick="translateX(this)"><?php include("./ressources/flecheLeft.svg") ?></div>

									<div class="slides"></div>

									<div class="flecheDroite clickable" onclick="translateX(this)"><?php include("./ressources/flecheRight.svg") ?></div>
								</div>
							</div>

							<div class="flecheDroite clickable" onclick="translateX(this)"></div>
						</div>
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
				for (var i=0; i < elt.length; i++) {
					elt[i].innerHTML = data;
				}
			}
		});
	
		$.ajax({
			url: "./ressources/flecheRight.svg",
			dataType: "text",
			success: function(data) {
				elt = document.getElementsByClassName("flecheDroite");
				for (var i=0; i < elt.length; i++) {
					elt[i].innerHTML = data;
				}
			}
		});

		var colorChatFade = convertColor(chatActuel['couleur'], 0.5);
		var colorChat = convertColor(chatActuel['couleur'], 1);
		var colorChatLight = convertColor(chatActuel['couleur'], 0.25);

		var slideChat = document.getElementsByClassName("slideChat")[j];
		var slideChatSmall = document.getElementsByClassName("slideChatSmall")[j];

		slideChat.style.setProperty('--third-color', colorChatFade);
		slideChat.style.setProperty('--fourth-color', colorChatLight);
		slideChat.style.setProperty('--fifth-color', colorChat);

		slideChatSmall.style.setProperty('--third-color', colorChatFade);
		slideChatSmall.style.setProperty('--fourth-color', colorChatLight);
		slideChatSmall.style.setProperty('--fifth-color', colorChat);
		
		
		var slidesPhoto = $(slides.children()[2*j]).children(".chatBox").children(".chatContent").children(".allSliderPhotoChat").children(".sliderPhotoChat").children(".slides");
		var sliderPointPhoto = $(slides.children()[2*j]).children(".chatBox").children(".chatContent").children(".allSliderPhotoChat").children(".sliderPhotoChat").children(".sliderPoints");

		var slidesPhotoSmall = $(slideChatSmall).children(".thirdBanner").children(".allSliderPhotoChatSmall").children(".sliderPhotoChat").children(".slides");
		var sliderPointPhotoSmall = $(slideChatSmall).children(".thirdBanner").children(".allSliderPhotoChatSmall").children(".sliderPhotoChat").children(".sliderPoints");

		console.log($(slides.children()[2*j]).children(".slideChatSmall"));
		console.log(slidesPhotoSmall);
		console.log(sliderPointPhotoSmall);
		for (var i=0; i < chatActuel['nbPhoto']; i++) {
			$(slidesPhoto).append("<img class='slidePhotoChat slide' src='./ressources/chats/"+chatActuel['code']+"/"+i+".jpg' alt='photo chat'/>");
			if (i == 0) $(sliderPointPhoto).append("<img class='slidePoint slidePointSelected clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-i)+");'/>");
			else $(sliderPointPhoto).append("<img class='slidePoint clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-i)+");'/>");
			$(slidesPhotoSmall).append("<img class='slidePhotoChat slide' src='./ressources/chats/"+chatActuel['code']+"/"+i+".jpg' alt='photo chat'/>");
			if (i == 0) $(sliderPointPhotoSmall).append("<img class='slidePoint slidePointSelected clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-i)+");'/>");
			else $(sliderPointPhotoSmall).append("<img class='slidePoint clickable' src='./ressources/point.png' alt='slidePoint' onclick='translateX(this, "+(-i)+");'/>");
		
		}

		if (j == 0) $(sliderPoint).append("<img class='slidePointChats slidePointSelected slide clickable' src='./ressources/chats/"+ chatActuel["code"] +"/0.jpg' alt='slidePoint' onclick='translateX(this, "+(-j)+");'/>");
		else $(sliderPoint).append("<img class='slidePointChats slide clickable' src='./ressources/chats/"+ chatActuel["code"] +"/0.jpg' alt='slidePoint' onclick='translateX(this, "+(-j)+");'/>");

		
		
	}
	var allSliderPoint = document.getElementById("allSliderPointsChats");
	if (chats.length < parseInt(getComputedStyle(allSliderPoint).getPropertyValue("--nbElement"))) {
		console.log("OUIIIIIIII");
		var taille = (parseInt(getComputedStyle(allSliderPoint).getPropertyValue("--taille").slice(0, -2))/parseInt(getComputedStyle(allSliderPoint).getPropertyValue("--nbElement")) * chats.length)
		taille = taille + "px";

		allSliderPoint.style.setProperty("--taille", taille);
		allSliderPoint.style.setProperty("--nbElement", chats.length);
	}

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
					eltBis = elt.cloneNode(true);
					eltBis.onclick = function() {displayFormEditChat(this);};
					document.getElementsByClassName("chatNomBlock")[k].appendChild(elt);
					document.getElementsByClassName("firstBanner")[k].appendChild(eltBis);
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
 * Fonction qui affiche le formulaire d'edition d'un chat
 * @param {} element 
 */
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
									<div class='colorPickerColor' onclick=\"openDialogBox(document.getElementById('colorInputEdit'), 'color');\" ><div></div></div>
									<input id='colorInputEdit' type='hidden' name='couleur' value='${chat['couleur']}'>
								</div>

							</div>
						</div>

						<div class='group'>
							<textarea rows='1' name='description'required>${chat['description']}</textarea>
							<label for=\"description\">Description</label>
						</div>

					</div>

					<div class='inputFile'>
						<div class='labelAllSlider'>Ajouter des photos</div>
						<div id='allSliderPhoto' class='allSlider'>
							<div id='sliderPhoto' class='slider'>
								<div class='flecheGauche clickable' onclick='translateX(this, undefined, false)'></div>

								<div class='slides' id='edit'></div>

								<div class='flecheDroite clickable' onclick='translateX(this, undefined, false)'></div>
							</div>
						</div>
						<label class='clickable' for='fileModifChat'>
							<svg width='50' height='50'>
								<circle cx='25' cy='25' r='20' stroke='black' stroke-width='2' fill='transparent' />
								<path d='M 20 25 L 30 25 M 25 20 L 25 30' stroke='black' stroke-width='2' />
							</svg>
						</label>
						
						<input id='fileModifChat' type='file' name='photos[]' onchange='filesAdd(this)' multiple accept='image/*' style='display:none'>
						<input id='existentFiles' type='hidden' name='existentFiles'>

						

					</div>

					<input type='submit' class='buttonType' name='action' value='Edit Chat'>


					<input type='hidden' name='code' value='${chat['code']}'>
			`);

			$.ajax({
				url: "./ressources/flecheLeft.svg",
				dataType: "text",
				success: function(data) {
					elt = document.getElementsByClassName("flecheGauche");
					for (var i=0; i < elt.length; i++) {
						elt[i].innerHTML = data;
					}
				}
			});
		
			$.ajax({
				url: "./ressources/flecheRight.svg",
				dataType: "text",
				success: function(data) {
					elt = document.getElementsByClassName("flecheDroite");
					for (var i=0; i < elt.length; i++) {
						elt[i].innerHTML = data;
					}
				}
			});
			
			addPreviewOfExistentFiles(chat['code']);

		},
		error: function (data) {
			console.log("error");
		}
	});
}



/**
 * Fonction qui ajoute les photos de l'input file dans le slider
 * @param {Object} contexte
 */
let selectedFiles = [];
function filesAdd(contexte) {
	slides = $(contexte).parent().find(".slides");
	slider = $(contexte).parent().find(".slider");
	console.log(slides);

	for (const file of contexte.files) { // Pour tous les fichiers sélectionnés
               
		selectedFiles.push(file); // On les ajoute à la liste des fichiers sélectionnés

		// Création de la balise img et ajout de l'image
		const img = document.createElement("img");
		img.src = URL.createObjectURL(file);


		// Création de la div qui contiendra l'image et le bouton de suppression
		const slidePhoto = document.createElement("div");
		slidePhoto.classList.add("slidePhoto");
		slidePhoto.classList.add("slide");
		slidePhoto.appendChild(img);

		// Creation of delete button
		const deleteButton = document.createElement("button");
		deleteButton.classList.add("delete-button");
		deleteButton.innerText = "X";

		
		deleteButton.addEventListener("click", () => { // add event listener to delete button
			// On supprime le fichier de la liste des fichiers sélectionnés
			selectedFiles = selectedFiles.filter(f => f !== file); 

			// On supprime la div qui contient l'image et le bouton de suppression
			$(slidePhoto).remove();
			pushSelectedFilesInInput(contexte);
			$(".formType .inputFile .flecheGauche").click();
			console.log(contexte.files);

			if (slides.children().length > 0) {
				slider.css("border", "2px solid var(--third-color)");
			} else {
				slider.css("border", "2px solid rgb(200, 200, 200)");
			}
		}); 


		// add image and delete button to div
		slidePhoto.appendChild(deleteButton);
		slides.append(slidePhoto);


		var taille = slides.children().length;
	}

	pushSelectedFilesInInput(contexte); // update input file with selected files

	// border color change if there is at least one file
	if (slides.children().length > 0) {
		slider.css("border", "2px solid var(--third-color)");
	} else {
		slider.css("border", "2px solid rgb(200, 200, 200)");
	}
}



/**
 * Fonction qui permet de recharger les fichiers sélectionnés dans l'input file
 * @param {*} contexte
 */
function pushSelectedFilesInInput(contexte) {
	const fileInput = contexte;
	const fileData = new ClipboardEvent('').clipboardData || new DataTransfer();
	for (const file of selectedFiles) {
		fileData.items.add(file);
	}
	fileInput.files = fileData.files;
	console.log(fileInput.files);
}



/**
 * Fonction qui ajoute les photos existantes du chat dans le slider via ajax
 * @param {*} code du chat dont on veut afficher les photos
 */
var existentFiles = [];
function addPreviewOfExistentFiles(code){
	$.ajax({
		url: 'controleur.php',
		type: 'POST',
		data: {
			action: 'getPhotos',
			code: code
		},
		success: function (data) {
			console.log(data);
			const slides = $(".formType #edit");

			for (const photo of data) {
				existentFiles.push(photo['name']);
				const img = document.createElement("img");
				img.src = photo['url'];

				const slidePhoto = document.createElement("div");
				slidePhoto.classList.add("slidePhoto");
				slidePhoto.classList.add("slide");
				slidePhoto.appendChild(img);

				const deleteButton = document.createElement("button");
				deleteButton.classList.add("delete-button");
				deleteButton.innerText = "X";
				deleteButton.addEventListener("click", () => {
					console.log(data);
					existentFiles = existentFiles.filter(f => f !== photo['name']);
					var taille = slides.children().length-1;
					$(slidePhoto).remove();
					console.log(existentFiles);
				});

				slidePhoto.appendChild(deleteButton);
				slides.append(slidePhoto);
			}
			var taille = slides.children().length;
			console.log(existentFiles);
		},
		error: function (data) {
			console.log("error");
		}
	});
}




function displayFilter() {
	var menuFiltre = document.getElementById("menuFiltre");
	if (menuFiltre.style.display == "none") {
		menuFiltre.style.display = "block";
		$("#menuFiltre").animate({right: "0px"}, 300);
	}
	else {
		$("#menuFiltre").animate({right: "-300px"}, 300, function() {menuFiltre.style.display = "none";});
	}
}