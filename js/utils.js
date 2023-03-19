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
		var allSlider = contexte.parentNode.parentNode.parentNode; // on recupere le div allSlider en partant du point cliqué
	}

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










