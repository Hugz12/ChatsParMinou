//Fonction qui append une demande
function afficherUneDemande(date, btn, statut, img, demande){
    $(statut).append(`
        <div id="demande${demande["id"]}" class="demandes">
            <p class="timeDemande">${date}</p>
            <div class="contenuDemande">
                <img class="btnDemande ${btn} clickable" onclick='changerStatut(this, ${JSON.stringify(demande)});' src="./ressources/${img}.png" alt="${img}">
                <div class="infoDemande">
                    <div class="imageDemande">
                        <img src="./ressources/chats/${demande["code"]}/0.jpg" alt="${demande["code"]}/0.jpg">
                    </div>
                    <div class="infosChat">
                        <p>${demande['name']}</p>
                        <p>${demande["code"]}</p>
                    </div>
                    <div class="infosPers">
                        <p>${demande['prenom']} ${demande["nom"]}</p>
                        <p>${demande['mail']}</p>
                        <p>${demande['tel']}</p>
                    </div>
                    <div class="memos">
                        <p class="memo">${demande['memo']}</p>
                        <div class="sous-memos">
                            <p class="datePv">${demande['datePv']}</p>
                            <p class="resultatPv">${demande['resultatPv']}</p>
                            <p class="dateRencontre">${demande['dateRencontre']}</p>
                        </div>
                    </div>
                </div>
                <img class="btnDemande btnSupp clickable" src="./ressources/cross.png" alt="cross">
            </div>
        </div>
    `);
}

//Fonction qui calcule le temps écoulé depuis la date de la demande
function dateCompteur(dateDemande){ 
    var tps = "";

    const difference = new Date() - new Date(dateDemande);

    const secondes = Math.round(difference / 1000);
    const minutes = Math.round(difference / (1000 * 60));
    const heures = Math.round(difference / (1000 * 60 * 60));
    const jours = Math.round(difference / (1000 * 60 * 60 * 24));
    const semaines = Math.round(difference / (1000 * 60 * 60 * 24 * 7));
    const mois = Math.round(difference / (1000 * 60 * 60 * 24 * 30));
    const annees = Math.round(difference / (1000 * 60 * 60 * 24 * 30 * 12));

    if (secondes < 60) tps = 'il y a quelques secondes';
    else if (minutes < 60) tps = `il y a ${minutes} minute${minutes === 1 ? '' : 's'}`;
    else if (heures < 24) tps = `il y a ${heures} heure${heures === 1 ? '' : 's'}`;
    else if (jours < 7) tps = `il y a ${jours} jour${jours === 1 ? '' : 's'}`;
    else if (semaines <= 4) tps = `il y a ${semaines} semaine${semaines === 1 ? '' : 's'}`;
    else if (mois < 12) tps = `il y a ${mois} mois`;
    else tps = `Il y a ${annees} an${annees === 1 ? '' : 's'}`;

    return tps;
}

//Fonction qui affiche les demandes
function afficherDemandes(demandes) {
    var statut, btn, img;
    console.log("afficherDemandes");
	console.log(demandes);
    for (var i=0; i < demandes.length; i++) {

        switch (demandes[i]["statutDemande"]) {
            case '1':
                console.log("case 1");
                statut = "#nouvellesDemande";
                btn = "btnNouvelleDemande";
                img = "check";
                break;
            case '2':
                console.log("case 2");
                statut = "#demandesEnCours";
                btn = "btnEnCours";
                img = "play";
                break;
            case '3':
                console.log("case 3");
                statut = "#traitees";
                btn = "btnTraitees";
                img = "return";
                break;
        }

        var dateDemande = new Date(demandes[i]["date"]);
        console.log(dateDemande);
        var date = dateCompteur(dateDemande) + ", le " + dateDemande.toLocaleDateString();

        afficherUneDemande(date, btn, statut, img, demandes[i]);
        console.log(demandes[i]);
    }
   
}

//Fonction qui affiche les titres des demandes
function afficherTitres(demandes) {
    console.log("afficherTitres");
	console.log(demandes);
    var iC = 0 , iN = 0 , iT = 0; 
    for (var i=0; i < demandes.length; i++) {
        if (demandes[i]["statutDemande"] == 1) iN++;
        if (demandes[i]["statutDemande"] == 2) iC++;
        if (demandes[i]["statutDemande"] == 3) iT++;
    }
    if (iN != 0){
        if (iN == 1) $("#nouvellesDemande").append("<h2 id='titreNouvelleDemande'>Nouvelle demande</h2>");
        else $("#nouvellesDemande").append("<h2 id='titreNouvelleDemande'>Nouvelles demandes</h2>");
    } else $("#nouvellesDemande").append("<h2 id='titreNouvelleDemande'>Aucune nouvelle demande</h2>");

    if (iC != 0){
        if (iC == 1) $("#demandesEnCours").append("<h2 id='titreEnCours'>Demande en cours</h2>");
        else $("#demandesEnCours").append("<h2 id='titreEnCours'>Demandes en cours</h2>");
    } else $("#demandesEnCours").append("<h2 id='titreEnCours'>Aucune demande en cours</h2>");
    
    if (iT != 0){
        if (iT == 1) $("#traitees").append("<h2 id='titreTraitees'>Demande traitée</h2>");
        else $("#traitees").append("<h2 id='titreTraitees'>Demandes traitées</h2>");
    } else $("#traitees").append("<h2 id='titreTraitees'>Aucune demande traitée</h2>");
}

// Fonction qui change le titre en fonction du nombre de demandes
function changerTitres() {
    console.log("changerTitres");
    if (document.getElementById("nouvellesDemande").childElementCount-1 != 0) {
        if ((document.getElementById("nouvellesDemande").childElementCount-1 == 1)) $("#titreNouvelleDemande").replaceWith("<h2 id='titreNouvelleDemande'>Nouvelle demande</h2>");
        else $("#titreNouvelleDemande").replaceWith("<h2 id='titreNouvelleDemande'>Nouvelles demandes</h2>");
    } else $("#titreNouvelleDemande").replaceWith("<h2 id='titreNouvelleDemande'>Aucune nouvelle demande</h2>");

    if (document.getElementById("demandesEnCours").childElementCount-1 != 0) {
        if ((document.getElementById("demandesEnCours").childElementCount-1 == 1)) $("#titreEnCours").replaceWith("<h2 id='titreEnCours'>Demande en cours</h2>");
        else $("#titreEnCours").replaceWith("<h2 id='titreEnCours'>Demandes en cours</h2>");
    } else $("#titreEnCours").replaceWith("<h2 id='titreEnCours'>Aucune demande en cours</h2>");

    if (document.getElementById("traitees").childElementCount-1 != 0) {
        if ((document.getElementById("traitees").childElementCount-1 == 1)) $("#titreTraitees").replaceWith("<h2 id='titreTraitees'>Demande traitée</h2>");
        else $("#titreTraitees").replaceWith("<h2 id='titreTraitees'>Demandes traitées</h2>");
    } else $("#titreTraitees").replaceWith("<h2 id='titreTraitees'>Aucune demande traitée</h2>");

    console.log(document.getElementById("nouvellesDemande").childElementCount-1);
    console.log(document.getElementById("demandesEnCours").childElementCount-1);
    console.log(document.getElementById("traitees").childElementCount-1);
}

// Fonction qui permet de changer le statut d'une demande
function changerStatut(contexte, demande) {
    console.log("changerStatut");
    console.log(contexte);
    console.log(demande);
    if ($(contexte).hasClass("btnNouvelleDemande") || $(contexte).hasClass("btnTraitees")) {
        var statut = "#demandesEnCours";
        var btn = "btnEnCours";
        var img = "play";
    } 
    if ($(contexte).hasClass("btnEnCours")) {
        var statut = "#traitees";
        var btn = "btnTraitees";
        var img = "return";
    }
    console.log(demande["id"]);
    console.log(demande["statutDemande"]);
    $.ajax({
        url: "./controleur.php",
        type: "POST",
        dataType: "html",
        data: {
            action: 'Changer Statut Demande',
            id: demande["id"],
            statut: demande["statutDemande"]
        },
        success: function() {
            console.log("success");
        },
        error: function() {
            console.log("error");
        }
    });
    $("#demande" + demande["id"]).remove();

    var dateDemande = new Date(demande["date"]);
    console.log(dateDemande);
    var date = dateCompteur(dateDemande) + ", le " + dateDemande.toLocaleDateString();

    afficherUneDemande(date, btn, statut, img, demande);

    changerTitres();
}

//Fonction de suppression d'une demande
$(function() {
    $(".btnSupp").on("click", function() {
        console.log("supprimerDemande");

        var id = $(this).parent().parent().attr("id").match(/\d/g).toString().replace(',', '');
        console.log("id : " + id);

        $("#overlay").css("visibility", "visible");

        $("#popupBtnOui").on("click", function() { 
        console.log("oui");
        $.ajax({
            url: "./controleur.php",
            type: "POST",
            dataType: "html",
            data: {
                action: "Supprimer Demande",
                id: id
            },
            success: function() {
                console.log("success");
            },
            error: function() {
                console.log("error");
            }
        });
        $("#demande" + id).remove();
        $("#overlay").css("visibility", "hidden");
        });

        $("#popupBtnNon").on("click", function() { 
        console.log("non");
        $("#overlay").css("visibility", "hidden");
        });
    });
});

//Fonctions d'edition des memos
var jTA = $("<textarea>").keyup(function(contexte){
    if(contexte.ctrlKey && (contexte.key == "Enter" || contexte.keyCode == 10 || contexte.keyCode == 13)) {
        console.log("appui sur touche Control + " + contexte.key);
        var text = $(this).val();
        console.log("text : " + text);

        if ($(this).hasClass("memo")) var contenu = "memo";
        if ($(this).hasClass("datePv")) var contenu = "datePv";
        if ($(this).hasClass("resultatPv")) var contenu = "resultatPv";
        if ($(this).hasClass("dateRencontre")) var contenu = "dateRencontre";

        if ($(this).parent().parent().parent().parent().hasClass("demandes")) var parent = $(this).parent().parent().parent().parent();
        else var parent = $(this).parent().parent().parent().parent().parent();
        console.log(parent);

        var id = parent.attr("id").match(/\d/g).toString().replace(',', '');
        console.log("id : " + id);

        $.ajax({
            url: "./controleur.php",
            type: "POST",
            dataType: "html",
            data: {
                action: "Changer Memo",
                id: id,
                text: text,
                class: contenu
            },
            success: function() {
                console.log("success");
            },
            error: function() {
                console.log("error");
            }
        });

        $(this).replaceWith($("<p class=" + contenu + ">").clone().html(text));
    }
}); 

$(document).on("keyup",function(contexte){
    if (contexte.key == "Escape") {
        console.log("appui sur touche " + contexte.key);
        $("textarea").each(function(){
            if ($(this).hasClass("memo")) var contenu = "memo";
            if ($(this).hasClass("datePv")) var contenu = "datePv";
            if ($(this).hasClass("resultatPv")) var contenu = "resultatPv";
            if ($(this).hasClass("dateRencontre")) var contenu = "dateRencontre";

            var jPClone = $("<p class=" + contenu + ">").clone().html($(this).data("lastValue"));
            $(this).replaceWith(jPClone);
        });
    }
});

$(function() {
    $(".memos").on("click", "p", function() {
        console.log("click sur p");
        var jTAClone = jTA.clone(true).val($(this).text()).data("lastValue", $(this).text());

        if ($(this).hasClass("memo")) jTAClone = jTAClone.addClass("memo");
        if ($(this).hasClass("datePv")) jTAClone = jTAClone.addClass("datePv");
        if ($(this).hasClass("resultatPv")) jTAClone = jTAClone.addClass("resultatPv");
        if ($(this).hasClass("dateRencontre")) jTAClone = jTAClone.addClass("dateRencontre");

        $(this).replaceWith(jTAClone);
    });

    var moveLeft = 20;
    var moveDown = 10;

    $('#recherche img').hover(function(e) {
        $('#popupInfos').show();
        //.css('top', e.pageY + moveDown)
        //.css('left', e.pageX + moveLeft)
        //.appendTo('body');
    }, function() {
        $('#popupInfos').hide();
    });

    $('#recherche img').mousemove(function(e) {
        $("#popupInfos").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
});

$(document).on("mouseover","textarea", function(){
    console.log($(this).data());
    console.log("val : " + $(this).val());
});

// Fonctions de recherche
$(function() {
    $("#btnChoixRecherche").on("click", function(){
        $(".choix-chat").toggleClass('choix-pers');
    });

    $("#contenuRecherche").on("keyup", function() {
        console.log("recherche");
        $(".nonTrouvée").remove();

        if ($($("#btnChoixRecherche").parent()).hasClass("choix-pers")) {
            $(".infosPers").filter(function(){ 
                $($(this).parent().parent().parent()).toggle($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) > -1)
            });

            $("#nouvellesDemande .infosPers").filter(function(){ 
                if ($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) == -1) 
                    $("#nouvellesDemande").append("<h3 class='nonTrouvée'>Il n'y a aucune demande trouvée</h3>");
            }); 
    
            $("#demandesEnCours .infosPers").filter(function(){ 
                if ($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) == -1) 
                    $("#demandesEnCours").append("<h3 class='nonTrouvée'>Il n'y a aucune demande trouvée</h3>")
            }); 
    
            $("#traitees .infosPers").filter(function(){ 
                if ($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) == -1) 
                    $("#traitees").append("<h3 class='nonTrouvée'>Il n'y a aucune demande trouvée</h3>");
            }); 
        } else {
            $(".infosChat").filter(function(){ 
                $($(this).parent().parent().parent()).toggle($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) > -1)
            });

            $("#nouvellesDemande .infosChat").filter(function(){ 
                if ($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) == -1) 
                    $("#nouvellesDemande").append("<h3 class='nonTrouvée'>Il n'y a aucune demande trouvée</h3>");
            }); 
    
            $("#demandesEnCours .infosChat").filter(function(){ 
                if ($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) == -1) 
                    $("#demandesEnCours").append("<h3 class='nonTrouvée'>Il n'y a aucune demande trouvée</h3>")
            }); 
    
            $("#traitees .infosChat").filter(function(){ 
                if ($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) == -1) 
                    $("#traitees").append("<h3 class='nonTrouvée'>Il n'y a aucune demande trouvée</h3>");
            }); 
        } 
    });
});
