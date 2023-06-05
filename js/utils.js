/**
 * Fonction qui permet de faire défiler les événements en cliquant sur les flèches
 * @param  {int} sens 1 pour aller à droite et -1 pour aller à gauche
 * @return {void}
 */
function translateX(contexte, transform, overflow=false){
	// !!!! le transform marche a l'envers, 
	// transform(1) décale de 1 contenant vers la droite
	// transform(-1) décale de 1 contenant vers la gauche
	console.log("translateX");
	

	
	////////////////////////////////////////////////////////
	// on recupere les infos necessaires pour le défilement
	////////////////////////////////////////////////////////
	
	if (transform == undefined) { // si on passe par les fleches

		
		var allSlider = contexte.parentNode.parentNode // on recupere le div allSlider en partant de la fleche cliquée

		var transform = getComputedStyle(allSlider).getPropertyValue("--transform"); // on recupere le transform
		if ($(contexte).hasClass("flecheDroite")) transform--; // on recupere le sens avec l'id de la fleche
		else transform++;
	}
	else { // si on passe par les points
		var allSlider = contexte.parentNode.parentNode.parentNode;
		if (allSlider.id == "allSliderPointsChats") // exception pour les points des chats car c'est des photos
		{
			allSlider = allSlider.parentNode.parentNode
		}
	}
	console.log(allSlider);

	var nbElement = getComputedStyle(allSlider).getPropertyValue("--nbElement"); // on recupere le nombre d'evenement visible
	var max = Math.round($(allSlider).children(".slider").children(".slides").outerWidth(true) / $(allSlider).children(".slider").children(".slides").children(".slide").outerWidth(true)); // on recupere le nombre d'evenements


	console.log("nbElement : " + nbElement);
	console.log("max : " + max);
	console.log("transform : " + transform);


	// on gere les exeptions pour le premier et le dernier element
	if (transform > (overflow ? Math.trunc(nbElement/2) : 0)) { // si on est sur le premier element on revient au dernier
		transform = (overflow ? -(max-(1+Math.trunc(nbElement/2))) : -(max - nbElement));
		if (!overflow && transform > 0) transform = 0; // on gere l'overflow pour le premier element
	}
	else if (transform <= (overflow ? -(max - Math.trunc(nbElement/2)) : -(max - nbElement+1))) { // si on est sur le dernier element on revient au premier
		transform = (overflow ? Math.trunc(nbElement/2) : 0);
	}
	
	console.log(transform);
	allSlider.style.setProperty("--transform", transform); // on initialise le transform



	var points = $(allSlider).children(".slider").children(".sliderPoints"); // on recupere le div .sliderPoints en partant de la fleche cliquée
	points.children()[length]
	points.children(".slidePointSelected").removeClass("slidePointSelected");
	$(points.children()[-(transform)]).addClass("slidePointSelected");
		
		//.css("background-color", "black"); // on recupere l'element qui est au centre

}



function convertColor(color,opacity){
	if (color[0] == "#") {
		r = parseInt(color.substring(1,3), 16);
		g = parseInt(color.substring(3,5), 16);
		b = parseInt(color.substring(5,7), 16);
	}
	else {
		r = color.substring(4, color.indexOf(","));
		g = color.substring(color.indexOf(",")+1, color.lastIndexOf(","));
		b = color.substring(color.lastIndexOf(",")+1, color.lastIndexOf(")"));
	}
	max = Math.max(r,g,b);
	r = max * (1 - opacity) + r * opacity;
	g = max * (1 - opacity) + g * opacity;
	b = max * (1 - opacity) + b * opacity;
    result = 'rgb('+r+','+g+','+b+')';
    return result;
}


function rotateLogo(contexte){
	$(contexte).children("img").css("transform", "rotate(360deg)");
}

function rotateLogoBack(contexte){
	$(contexte).children("img").css("transform", "rotate(0)");
}


function displayForm(id){
	console.log("display" + id);
	$("#"+id + " form").trigger("reset");
	$("#"+id).css("display", "flex");
	$(".disabled").css("pointer-events", "none");
	$("#"+id).animate({opacity: 1}, 250);
}

function hideForm(id){
	console.log("hide" + id);
	$("#"+id).animate({opacity: 0}, 250, function(){$("#"+id).css("display", "none");});
	$(".disabled").css("pointer-events", "auto");
}

function deleteForm(id){
	console.log("delete" + id);
	$("#"+id).animate({opacity: 0}, 250, function(){$("#"+id).remove();});
	$(".disabled").css("pointer-events", "auto");
}


function checkboxPhotoSwitch(element){
	console.log($(element).children("input").prop("checked"));
	if($(element).children("input").prop("checked") == false) {
		$(element).children(".photoDroite").animate({opacity: 0}, 300);
		$(element).children(".photoGauche").animate({opacity: 1}, 300);

	} else {
		$(element).children(".photoDroite").animate({opacity: 1}, 300);
		$(element).children(".photoGauche").animate({opacity: 0}, 300);

		
	}
}

function etatSwitch(element){
	
	if ($(element).children("#etatSexe")) {
		// si il est coché
		if ($(element).children("input").prop("checked") == false) {

			$(element).children("#etatSexe").fadeOut(150, function() {
				$(this).text("Femelle").fadeIn(150);
			});
		}
		else {
			$(element).children("#etatSexe").fadeOut(150, function() {
				$(this).text("Male").fadeIn(150);
			});
		}
	}

	if ($(element).children("#etatFamilleAccueil")) {
		if ($(element).children("input").prop("checked") == false) {
			$(element).children("#etatFamilleAccueil").fadeOut(150, function() {
				$(this).text("Refuge").fadeIn(150);
			});
		}
		else {
			$(element).children("#etatFamilleAccueil").fadeOut(150, function() {
				$(this).text("Famille").fadeIn(150);
			});
		}
	}
}



/**
 * Fonction qui permet d'ouvrir une boite de dialogue pour certains types d'input
 * @param {*} retour 
 * @param {*} type 
 */
function openDialogBox(retour, type) {
	console.log("openDialogBox");
	console.log(retour);
	console.log(type);
	const input = document.createElement("input");
	input.type = type;
	input.value = retour.value;
	//console.log(input);
	input.addEventListener("change", function() {
		retour.value = this.value;
		console.log(this.value);
		
		if(this.type == "color") {
			retour.parentNode.style.setProperty("--colorSelected", this.value);
		}
	});
	input.click();


}


/**
 * Fonction qui permet de changer la date d'un label associé à un input date
 * @param {*} contexte 
 */
function changerDate(contexte) {
	console.log(contexte);
	console.log($(contexte).parent().children('label'));
	date = $(contexte).val();
	date = date.split("-");
	date = date[2] + "/" + date[1] + "/" + date[0];
	$(contexte).parent().children('label').html(date);
}



/**
 * Fonction qui permet de prévisualiser une image d'un input file dans une div associée
 * @param {} contexte 
 */
function previewFile(contexte){
	// le contexte c'est l'input file
	console.log(contexte);
	if ($(contexte).parent().children(".previewImg")) {
		$(contexte).parent().children(".previewImg").remove();
	}

	var file = contexte.files[0];
	
	const img = document.createElement("img");
	img.src = URL.createObjectURL(file);
	// ajoute la class previewImg
	img.classList.add("previewImg");

	$(contexte).parent().append(img);
}



function move(container,direction, state, sens, x, y, sens2) {

	if (state == 0) {
		sens = Math.random() * 2 - 1; // -1 = gauche, 1 = droite
		sens*=10;
		state = 10;
	}

	direction += sens;
	x += Math.cos(direction * Math.PI / 180) * 30 + Math.sin(direction * Math.PI / 180) * sens2 * 30;
	y += Math.sin(direction * Math.PI / 180) * 30 - Math.cos(direction * Math.PI / 180) * sens2 * 30;

	var patte = document.createElement("img");
	patte.src = "./ressources/patte.png";
	patte.classList.add("patte");
	patte.style.top = y + "px";
	patte.style.left = x + "px";
	patte.style.transform = "rotate(" + direction + "deg)";
	if (container.children.length > 6) {
		$(container.childNodes[0]).animate({opacity: 0}, 300, function() {
			$(container.childNodes[0]).remove();
		});
		
	}
	container.appendChild(patte);
	
	

	//taille max converti en int
	var maxY = parseInt(window.getComputedStyle(container).height.slice(0, -2));
	var maxX = parseInt(window.getComputedStyle(container).width.slice(0, -2));

	// console.log("max Y: " + maxY);
	// console.log("max X : " + maxX);
	// console.log("y : " + y);
	// console.log("x : " + x);

	if(y > maxY)
		y = 0;
	if(y < 0)
		y = maxY;
	if(x > maxX)
		x = 0;
	if(x < 0)
		x = maxX;

	state--;

  
	setTimeout(function() {
		move(container, direction, state, sens, x, y, -sens2);
	}, 650);
}




function debounce(func, timeout = 300){
	let timer;
	return (...args) => {
	  clearTimeout(timer);
	  timer = setTimeout(() => { func.apply(this, args); }, timeout);
	};
}



function verifierCaracteres(contexte, event) {
	 		
	var keyCode = event.which ? event.which : event.keyCode;
	var touche = String.fromCharCode(keyCode);
			
			
	var caracteres = '0123456789';
			
	if(caracteres.indexOf(touche) >= 0) {
		contexte.value += touche;
	}
			
}