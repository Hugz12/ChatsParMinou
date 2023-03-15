/**
 * Fonction qui permet de faire défiler les événements en cliquant sur les flèches
 * @param  {int} sens 1 pour aller à droite et -1 pour aller à gauche
 * @return {void}
 */
function translateX(contexte, transform, overflow=false){
	// !!!! le transform marche a l'envers, 
	// transform(taille) par exemple centre sur le 1er element
	// transform(0) par exemple centre sur le 2eme element
	// transform(-taille) par exemple centre sur le 3eme element

	
	////////////////////////////////////////////////////////
	// on recupere les infos necessaires pour le défilement
	////////////////////////////////////////////////////////
	console.log("translateX");


	if (transform == undefined) { // si on passe par le point
		console.log("fleche");
		if ($(contexte).hasClass("flecheDroite")) sens = 1; // on recupere le sens avec l'id de la fleche
		else sens = -1;
		var slides = $(contexte).parent().children(".slider").children(".slides"); // on recupere le div .slides en partant de la fleche cliquée
		var points = $(contexte).parent().children(".slider").children(".sliderPoints"); // on recupere le div .sliderPoints en partant de la fleche cliquée
		var taille = $(slides.children()[0]).outerWidth(true); // on recupere la taille d'un evenement
		var nbElement = slides.parent().outerWidth() / taille; // on recupere le nombre d'evenement visible
		var max = slides.outerWidth() / taille; // on recupere le nombre d'evenements

		// on ajoute une transition au .slides
		if (slides[0].style.transform) var transform = parseInt(slides[0].style.transform.split('(')[1].split('p')[0])/taille; // on recupere la position actuelle du .slides (en indice soit 0, 1, -1 etc...)
			// on recupere la position actuelle du .slides (en indice soit 0, 1, -1 etc...)
			//split('(')[1].split('p')[0] permet de recuperer la valeur entre les parentheses et sans le px
		else var transform = 0; // si le .slides n'a pas de transform on le met a 0
	}

	else { // si on passe par les flèches
		console.log("point");
		var sens = 0;
		var slides = $(contexte).parent().parent().children(".slides"); // on recupere le div .slides en partant de la fleche cliquée
		var points = $(contexte).parent(); // on recupere le div .sliderPoints en partant du bouton cliqué
		var taille = slides.children().outerWidth(true); // on recupere la taille d'un evenement
		var nbElement = slides.parent().outerWidth() / taille; // on recupere le nombre d'evenement visible
		var max = slides.outerWidth() / taille; // on recupere le nombre d'evenements
		
	}	
	////////////////////////////////////////////////////////
	// on fait le défilement
	////////////////////////////////////////////////////////

	// Math.trunc(nbElement/2) permet de recuperer le nombre d'element avant le centre
	// et de gerer les exeptions pour le premier et le dernier element
	transform = transform - sens; // calcul de la nouvelle position du .slides
	if (transform > (overflow ? Math.trunc(nbElement/2) : 0)) { // si on est sur le premier element on revient au dernier
		transform = (overflow ? -(max-(1+Math.trunc(nbElement/2))) : -(max - nbElement));
		if (!overflow && transform > 0) transform = 0; // on gere l'overflow pour le premier element
	}
	else if (transform <= (overflow ? -(max - Math.trunc(nbElement/2)) : -(max - nbElement+1))) { // si on est sur le dernier element on revient au premier
		transform = (overflow ? Math.trunc(nbElement/2) : 0);
	}
	console.log(transform);
	slides.css('transform', 'translateX('+(transform)*taille +'px)'); // on applique le défilement

	// on change la couleur du point
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
			console.log("color");
			console.log(this);
			retour.parentNode.style.setProperty("--colorSelected", this.value);
		}
	});
	input.click();


}


function changerDate(contexte) {
	console.log(contexte);
	console.log($(contexte).parent().children('label'));
	date = $(contexte).val();
	date = date.split("-");
	date = date[2] + "/" + date[1] + "/" + date[0];
	$(contexte).parent().children('label').html(date);
}


function previewFile(contexte){
	// le contexte c'est l'input file
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

function opacitySwitch(element) {
	// qunad je passe la souris sur l'element l'opecité passe à 1 et quand je la retire elle passe à 0
	$(element).hover(function() {
		$(this).animate({opacity: 1}, 200);
	}
	, function() {
		$(this).animate({opacity: 0}, 200);
	}
	);
	// cette fonction, je l'inc
}







