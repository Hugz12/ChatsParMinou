function displayProfil(){
    if($("#profil").css("display") == "block")
        hideProfil();
    else
        $("#profil").css("display", "block");
}

function hideProfil(){
    $("#profil").css("display", "none");
}


function displayNav2(){
    if($("#allHeader").css("height") == "70px"){
        console.log("displayNav2");
        var taille = document.getElementById("nav2").clientHeight + 70;
        console.log(taille);
        //$("#allHeader").css("height", taille.toString()+"px");
        // prend toute la hauteur de la page
        $("#allHeader").css("height", "100vh");
        // desactive le scroll
        $("body").css("overflow", "hidden");
    }
    else{
        console.log("hideNav2");
        hideNav2();
    }
}

function hideNav2(){
    $("#allHeader").css("height", "70px");
    $("body").css("overflow", "");
}



window.addEventListener("resize", responsiveHeader);


function responsiveHeader(){
	if (window.innerWidth < 1200) {
        // display none header nav 
        $("#nav").css("display", "none");
        $("#menuDeroulant").css("display", "block");
	}else{
        $("#nav").css("display", "flex");
        $("#menuDeroulant").css("display", "none");
        hideNav2();
	}
	
}

function initHeader(){
    responsiveHeader();
}
