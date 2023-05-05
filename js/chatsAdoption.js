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
						${chatActuel['chatDuMois'] ? '<div class="tailleTitre policeTitre titreChatDuMois">Notre chat du mois</div>' : ''}
						<div class="buttonType adoptBtn policeTexte" onclick="adopterChat(this, ${chatActuel['code']});">Ajouter a ma liste d'adoption</div>


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
								<div class="sliderPoints"></div>
		
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
					<div class="buttonType adoptBtnSmall" onclick="adopterChat(this, ${chatActuel['code']});">Ajouter a ma liste d'adoption</div>
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
							<div class="sliderPoints"></div>

							<div class="flecheDroite clickable" onclick="translateX(this)"></div>
						</div>
					</div>
				</div>
			</div>
		`
		);

		var chatsSelected = document.getElementById("chatsSelected");
		var option = document.createElement("option");
		option.value = chatActuel['code'];
		option.innerHTML = chatActuel['code'];
		chatsSelected.appendChild(option);

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
		var sliderPointPhoto = $(slides.children()[2*j]).children(".chatBox").children(".chatContent").children(".allSliderPhotoChat").children(".slider").children(".sliderPoints");
		
		console.log(sliderPointPhoto);
		var slidesPhotoSmall = $(slideChatSmall).children(".thirdBanner").children(".allSliderPhotoChatSmall").children(".sliderPhotoChat").children(".slides");
		var sliderPointPhotoSmall = $(slideChatSmall).children(".thirdBanner").children(".allSliderPhotoChatSmall").children(".slider").children(".sliderPoints");

		
		for (var i=0; i < chatActuel['nbPhoto']; i++) {
			$(slidesPhoto).append("<img class='slidePhotoChat slide' src='./ressources/chats/"+chatActuel['code']+"/"+i+".jpg' alt='photo chat'/>");
			if (i == 0) $(sliderPointPhoto).append("<div class='slidePoint slidePointSelected clickable' onclick='translateX(this, "+(-i)+");'></div>");
			else $(sliderPointPhoto).append("<div class='slidePoint clickable' onclick='translateX(this, "+(-i)+");'></div>");
			
			$(slidesPhotoSmall).append("<img class='slidePhotoChat slide' src='./ressources/chats/"+chatActuel['code']+"/"+i+".jpg' alt='photo chat'/>");
			if (i == 0) $(sliderPointPhotoSmall).append("<div class='slidePoint slidePointSelected clickable' onclick='translateX(this, "+(-i)+");'></div>");
			else $(sliderPointPhotoSmall).append("<div class='slidePoint clickable' onclick='translateX(this, "+(-i)+");'></div>");
		
		}

		if (j == 0) $(sliderPoint).append("<img class='slidePointChats slidePointSelected slide clickable' src='./ressources/chats/"+ chatActuel["code"] +"/0.jpg' alt='" + chatActuel["name"] + "' onclick='translateX(this, "+(-j)+");'/>");
		else $(sliderPoint).append("<img class='slidePointChats slide clickable' src='./ressources/chats/"+ chatActuel["code"] +"/0.jpg' alt='" + chatActuel["name"] + "' onclick='translateX(this, "+(-j)+");'/>");

		
		
	}

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
							<select name='statut'>
								<option value='1' ${chat['statut'] == 1 ? "selected" : ""}>A adopter</option>
								<option value='2' ${chat['statut'] == 2 ? "selected" : ""}>En cours d'adoption</option>
								<option value='3' ${chat['statut'] == 3 ? "selected" : ""}>Adopté</option>
							</select>
							<label class='labelFocused' for='statut'>Statut</label>
						</div>


					</div>

					<div class='inputOther'>

						<div id='inputAddChatOther' class='group' style='justify-content:center;'>
							<div class='group'>	

								<div class='switch' onclick='checkboxPhotoSwitch(this); etatSwitch(this);'>
									<div id='etatFamilleAccueil' class='checkboxText'>Famille</div>
									<div class='photoGauche'style='opacity : ${chat['familleAccueil'] ? "0" : "1"}'><img src='./ressources/logo_toutnoir.png'></div>
									<input type='checkbox' class='checkbox checkboxFamille' ${chat['familleAccueil'] ? "checked": ""} name='familleAccueil' value='2'>
									<div class='photoDroite' style='opacity : ${chat['familleAccueil'] ? "1" : "0"}'><img src='./ressources/famille_accueil_noir.png'></div>
									<input type='hidden' name='familleAccueil' value='1'> 
								</div>

								<div class='colorPicker'>
									<label for='couleur' class='colorPickerText'>Couleur</label>
									<div class='colorPickerColor' style='--colorSelected: ${chat['couleur']}' onclick=\"openDialogBox(document.getElementById('colorInputEdit'), 'color');\" ><div></div></div>
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
						<input id='existentFiles' type='hidden' name='existentFiles' value="${listePhoto(chat['nbPhoto'])}">

						

					</div>

					<input type='submit' class='buttonType' name='action' value='Modifier le chat'>


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
function addPreviewOfExistentFiles(code){
	$.ajax({
		url: 'controleur.php',
		type: 'POST',
		data: {
			action: 'getNbPhotos',
			code: code
		},
		success: function (data) {
			console.log(data);
			var nbPhoto = data;
			$("#existentFiles").val(listePhoto(nbPhoto));
			const slides = $(".formType #edit");
			
			for (var i=0; i < nbPhoto; i++	) {
				const img = document.createElement("img");
				img.src = "./ressources/chats/" + code + "/" + i + ".jpg";

				const slidePhoto = document.createElement("div");
				slidePhoto.value = i;
				slidePhoto.classList.add("slidePhoto");
				slidePhoto.classList.add("slide");
				slidePhoto.appendChild(img);

				const deleteButton = document.createElement("button");
				deleteButton.classList.add("delete-button");
				deleteButton.innerText = "X";
				deleteButton.addEventListener("click", () => {
					for(j = 0; j < slides[0].childNodes.length; j++) {
						if (slides[0].childNodes[j].value == slidePhoto.value) {
							index = j;
							console.log("trouvé");
						} 
					}
					existentFiles = $("#existentFiles").val();
					$("#existentFiles").val(existentFiles);
					$(slidePhoto).remove();
					$(".formType .inputFile .flecheGauche").click();
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

function rechercheChat() {
	var nbChatsShow = 0;
	var input = document.getElementById("rechercheChats");
	var recherche = input.value.toUpperCase();
	console.log(recherche);
	var allSlider = document.getElementById('allSliderChats');
	var allSliderPoints = document.getElementById('allSliderPointsChats');

	var listeChats = allSlider.getElementsByClassName('chatNom');
	var listePoints = allSliderPoints.getElementsByClassName('slidePointChats');
	for (var i = 0; i < listeChats.length; i++) {

		if (listeChats[i].innerHTML.toUpperCase().includes(recherche)) {
			listeChats[i].parentElement.parentElement.parentElement.style.display = "block";
			nbChatsShow++;
		}
		else {
			listeChats[i].parentElement.parentElement.parentElement.style.display = "none";
		}

		if (listePoints[i].alt.toUpperCase().includes(recherche)) {
			listePoints[i].style.display = "block";
			nbChatsShow++;
		}
		else {
			listePoints[i].style.display = "none";
		}

		if (recherche == "") {
			listeChats[i].parentElement.parentElement.parentElement.style.display = "block";
			listePoints[i].style.display = "block";
		}

	}
	responsivePointsChats();
	var allSlider = document.getElementById("allSliderChats");
	if (nbChatsShow == 0) {
		$(allSlider).children(".slider")[0].style.display = "none";
		document.getElementById("zeroChat").style.display = "block";
	}
	else {
		$(allSlider).children(".slider")[0].style.display = "block"
		document.getElementById("zeroChat").style.display = "none";
	}
	allSlider.style.setProperty("--transform", 0);
}

const rechercher = debounce(() => rechercheChat(), 500);





function responsivePointsChats() {
	
	var allSliderPoints = document.getElementById('allSliderPointsChats');
	var listePoints = allSliderPoints.getElementsByClassName('slidePointChats');
	var nbElement = 0;
	for (var i = 0; i < listePoints.length; i++) {
		if (window.getComputedStyle(listePoints[i]).getPropertyValue("display") == "block") {
			nbElement += 1;
		}
	}
	console.log(nbElement);
	
	var x = window.getComputedStyle(allSliderPoints).getPropertyValue("--taille").slice(0, -2);
	var y = window.getComputedStyle(allSliderPoints).getPropertyValue("--nbElement");
	var taille = x/y;
	
	
	
	if (window.innerWidth < 480 && nbElement > 1) {
		nbElement = 1;
	}
	else if (window.innerWidth < 760 && nbElement > 3) {
		nbElement = 3;
	}
	else if (window.innerWidth < 1040 && nbElement > 5) {
		nbElement = 5;
	}
	else if (nbElement > 7) {
		nbElement = 7;
	}

	taille = taille * nbElement;
	taille = taille + "px";
	
	
	allSliderPoints.style.setProperty("--taille", taille);
	allSliderPoints.style.setProperty("--nbElement", nbElement);

}



function addFilterRaces(races) {
	console.log(races);
	var filtreContent = $("#filtreRace").children(".filtreContent");
	for (let i = 0; i < races.length; i++) {
		filtreContent.append(`
			<label class="checkbox">
				<input type="checkbox" id="filtreRaces${i}" checked>
				<span class="checkmark"></span>
				<span class="text">${races[i]["race"]}</span>
			</label>
		`);
		
	}
}




function updateFiltre () {
	console.log("updateFiltre");

	var nbChatsShowBefore = 0;
	var allSlider = document.getElementById("allSliderChats");
	var slides = $(allSlider).children(".slider").children(".slides");
	for (let i = 0; i < slides.children().length; i++) {
		if (slides.children()[i].style.display == "block") {
			nbChatsShowBefore++;
		}
	}


	var chats = $(".slideChat");
	var chatsSmall = $(".slideChatSmall");
	var pointsChats = $(".slidePointChats");

	if (window.innerWidth < 850) {
		for (let i = 0; i < chats.length; i++) {
			chats[i].style.display = "none";
			chatsSmall[i].style.display = "block";
			pointsChats[i].style.display = "block";
		}
	}
	else {
		for (let i = 0; i < chats.length; i++) {
			chats[i].style.display = "block";
			chatsSmall[i].style.display = "none";
			pointsChats[i].style.display = "block";
		}
	}


	updateFiltreRace();
	updateFiltreSexe();
	updateFiltreAge();

	var nbChatsShow = 0;
	
	for (let i = 0; i < slides.children().length; i++) {
		if (slides.children()[i].style.display == "block") {
			nbChatsShow++;
		}
	}
	if (nbChatsShow == 0) {
		$(allSlider).children(".slider")[0].style.display = "none";
		document.getElementById("zeroChat").style.display = "block";
	}
	else {
		$(allSlider).children(".slider")[0].style.display = "block"
		document.getElementById("zeroChat").style.display = "none";
	}
	if (nbChatsShow != nbChatsShowBefore) {
		allSlider.style.setProperty("--transform", 0);
	}

	responsivePointsChats();
}

function updateFiltreRace() {
	console.log("updateRace");

	var taille = $("#filtreRace").children(".filtreContent").children().length;

	var chats = $(".slideChat");
	var infos = $(".chatInfos1");
	var chatsSmall = $(".slideChatSmall");
	var infosSmall = $(".firstBanner");
	var pointsChats = $(".slidePointChats");

	if (window.innerWidth < 850) {
		for (let i = 0; i < taille; i++) {
			var race = $("#filtreRaces" + i).parent().children(".text")[0].innerHTML;
			if (document.getElementById("filtreRaces" + i).checked == false) {
				for (let j = 0; j < infos.length; j++) {
					if ($(infosSmall[j]).children().eq(1).children().eq(1)[0].innerHTML.normalize() === race.normalize()) {
						chatsSmall[j].style.display = "none";
						pointsChats[j].style.display = "none";
					}
				}
			}
			
		}
	}
	else {
		for (let i = 0; i < taille; i++) {
			var race = $("#filtreRaces" + i).parent().children(".text")[0].innerHTML;
			if (document.getElementById("filtreRaces" + i).checked == false) {
				for (let j = 0; j < infos.length; j++) {
					if ($(infos[j]).children().eq(1).children().eq(1)[0].innerHTML.normalize() === race.normalize()) {
						chats[j].style.display = "none";
						pointsChats[j].style.display = "none";
					}
				}
			}
			
		}
	}
	
}

function updateFiltreSexe() {
	console.log("updateSexe");

	var chats = $(".slideChat");
	var infos = $(".chatInfos1");
	var chatsSmall = $(".slideChatSmall");
	var infosSmall = $(".firstBanner");
	var pointsChats = $(".slidePointChats");


	if (window.innerWidth < 850) {
		if (document.getElementById("filtreMale").checked == false) {
			for (let j = 0; j < infos.length; j++) {
				if ($(infosSmall[j]).children().eq(2).children().eq(1)[0].innerHTML.normalize() === "Mâle".normalize()) {
					chatsSmall[j].style.display = "none";
					pointsChats[j].style.display = "none";
				}
			}
		}

		if (document.getElementById("filtreFemelle").checked == false) {
			for (let j = 0; j < infos.length; j++) {
				if ($(infosSmall[j]).children().eq(2).children().eq(1)[0].innerHTML.normalize() === "Femelle".normalize()) {
					chatsSmall[j].style.display = "none";
					pointsChats[j].style.display = "none";
				}
			}
		}
	}
	else {
		if (document.getElementById("filtreFemelle").checked == false) {
			for (let j = 0; j < infos.length; j++) {
				if ($(infos[j]).children().eq(2).children().eq(1)[0].innerHTML.normalize() === "Femelle".normalize()) {
					chats[j].style.display = "none";
					pointsChats[j].style.display = "none";
				}
			}
		}

		if (document.getElementById("filtreMale").checked == false) {
			for (let j = 0; j < infos.length; j++) {
				if ($(infos[j]).children().eq(2).children().eq(1)[0].innerHTML.normalize() === "Mâle".normalize()) {
					chats[j].style.display = "none";
					pointsChats[j].style.display = "none";
				}
			}
		}
	}
}

function updateFiltreAge() {
	console.log("updateAge");
	var filtreAgeMin = document.getElementById("filtreAgeMin");
	var filtreAgeMax = document.getElementById("filtreAgeMax");

	var chats = $(".slideChat");
	var infos = $(".chatInfos2");
	var chatsSmall = $(".slideChatSmall");
	var infosSmall = $(".secondBanner");
	var pointsChats = $(".slidePointChats");
	
	

	if(filtreAgeMin.value != "") {
		console.log(filtreAgeMin.value);
		var ageMin = parseInt(filtreAgeMin.value);
		if (window.innerWidth < 850) {
			for (let j = 0; j < infos.length; j++) {
				var age = (Date.now() - Date.parse($(infosSmall[j]).children().eq(0).children().eq(1)[0].innerHTML.slice(7, 17)))/(60*60*24*365.25*1000);
				console.log(age);
				if (age < ageMin) {
					chatsSmall[j].style.display = "none";
					pointsChats[j].style.display = "none";
				}
			}
		}
		else {
			for (let j = 0; j < infos.length; j++) {
				console.log($(infos[j]).children().eq(0).children().eq(1)[0].innerHTML.slice(6, 16));
				var age = (Date.now() - Date.parse($(infos[j]).children().eq(0).children().eq(1)[0].innerHTML.slice(6, 16)))/(60*60*24*365.25*1000);
				console.log(age);
				if (age < ageMin) {
					chats[j].style.display = "none";
					pointsChats[j].style.display = "none";
				}
			}
		}
	}

	if(filtreAgeMax.value != "") {
		console.log(filtreAgeMax.value);
		var ageMax = parseInt(filtreAgeMax.value);
		if (window.innerWidth < 850) {
			for (let j = 0; j < infos.length; j++) {
				var age = (Date.now() - Date.parse($(infosSmall[j]).children().eq(0).children().eq(1)[0].innerHTML.slice(7, 17)))/(60*60*24*365.25*1000);
				console.log(age);
				if (age > ageMax) {
					chatsSmall[j].style.display = "none";
					pointsChats[j].style.display = "none";
				}
			}
		}
		else {
			for (let j = 0; j < infos.length; j++) {
				var age = (Date.now() - Date.parse($(infos[j]).children().eq(0).children().eq(1)[0].innerHTML.slice(6, 16)))/(60*60*24*365.25*1000);
				console.log(age);
				if (age > ageMax) {
					chats[j].style.display = "none";
					pointsChats[j].style.display = "none";
				}
			}
		}

	}

}




function listePhoto(nbPhoto) {
	// renvoie une chaine de 0 a nbPhoto-1
	var liste = "";
	for (let i = 0; i < nbPhoto; i++) {
		liste += i + " ";
	}
	console.log(liste);
	return liste;
}


function adopterChat(contexte, code) {
	console.log("adopterChat");
	console.log(code);
	var chatsSelected = document.getElementById("chatsSelected");
	for (let i = 0; i < chatsSelected.children.length; i++) {
		if (chatsSelected.children[i].value == code) {
			if (chatsSelected.children[i].selected) {
				chatsSelected.children[i].selected = false;
				contexte.innerHTML = "Ajouter a ma liste d'adoption"
				contexte.style.backgroundColor = "initial";

			}
			else {
				chatsSelected.children[i].selected = true;
				contexte.innerHTML = "Ne plus adopter ce chat"
				contexte.style.backgroundColor = "var(--third-color)";

			}
		}
	}

}

const updateFiltreAll = debounce(() => updateFiltre(), 30);
const responsivePointsChatsDebounce = debounce(() => responsivePointsChats(), 30);

window.addEventListener("resize", responsivePointsChatsDebounce);
window.addEventListener("resize", updateFiltreAll);

window.addEventListener('load', updateFiltreAll);