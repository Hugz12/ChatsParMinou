function displayProfil(){
    if($("#profil").css("display") == "block")
        hideProfil();
    else
        $("#profil").css("display", "block");
}

function hideProfil(){
    $("#profil").css("display", "none");
}


function displayNav2(element){
    if($("#allHeader").css("height") == "70px"){
        console.log("displayNav2");
        var taille = document.getElementById("nav2").clientHeight + 70;
        console.log(taille);
        //$("#allHeader").css("height", taille.toString()+"px");
        // prend toute la hauteur de la page
        $("#allHeader").css("height", "100vh");
        // desactive le scroll
        $("body").css("overflow", "hidden");
        element.classList.add('checked');
    }
    else{
        console.log("hideNav2");
        hideNav2(element);
    }
}

function hideNav2(element){
    $("#allHeader").css("height", "70px");
    $("body").css("overflow", "");
    element.classList.remove('checked');

}



window.addEventListener("resize", responsiveHeader);


function responsiveHeader(){
    console.log("responsiveHeader");
	if (window.innerWidth < 1200) {
        // display none header nav 
        $("#nav").css("display", "none");
        $("#menuDeroulant").css("display", "block");
	}else{
        $("#nav").css("display", "flex");
        $("#menuDeroulant").css("display", "none");
        hideNav2(document.getElementById("menuDeroulant"));
	}
	
}

function initHeader(){
    var menuDeroulant = document.getElementById("menuDeroulant");
    responsiveHeader();
    
}



