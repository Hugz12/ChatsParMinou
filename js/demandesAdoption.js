//Fonction qui append une demande
function divDemande(date, btn, img, demande){
    return `<div id="demande${demande["id"]}" class="demandes">
                <p class="tpsDate">${date}</p>
                <p class="tpsComplet">${demande["date"]}|</p>
                <div class="contenuDemande">
                    <img class="btnDemande ${btn} clickable" onclick='changerStatut(this, ${JSON.stringify(demande)});' src="./ressources/${img}.png" alt="${img}">
                    <div class="infoDemande clickable">
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
                <div class="infoPlus">
                            <p>${demande['habitation']}</p>
                            <p>${demande['exterieur']}</p>
                            <p>${demande['sortie']}</p>
                            <p>${demande['situationFamiliale']}</p>
                            <p>${demande['animaux']}</p>
                            <p>${demande['commentaire']}</p>
                </div>
            </div>`;
}

//Fonction qui calcule le temps écoulé depuis la date de la demande
function dateCompteur(dateDemande){ 
    var tps = "";

    const difference = new Date() - dateDemande;

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
    console.log("afficherDemandes");
    var statut, btn, img;
    var iN = 0, iC = 0, iT = 0;
	//console.log(demandes);
    for (var i=0; i < demandes.length; i++) {
        var dateDemande = new Date(demandes[i]["date"]);
        //console.log(dateDemande);
        var date = dateCompteur(dateDemande) + ", le " + dateDemande.toLocaleDateString();

        switch (demandes[i]["statutDemande"]) {
            case '1':
                //console.log("case 1");
                statut = "#nouvellesDemandes";
                btn = "btnNouvelleDemande";
                img = "check";
                iN++;

                if (iN <= 10) $(statut).append(divDemande(date, btn, img, demandes[i]));
                else {
                    $(statut).append(divDemande(date, btn, img, demandes[i]));
                    $("#demande" + demandes[i]["id"]).css("display", "none");
                }
                break;
            case '2':
                //console.log("case 2");
                statut = "#demandesEnCours";
                btn = "btnEnCours";
                img = "play";
                iC++;

                if (iC <= 10) $(statut).append(divDemande(date, btn, img, demandes[i]));
                else {
                    $(statut).append(divDemande(date, btn, img, demandes[i]));
                    $("#demande" + demandes[i]["id"]).css("display", "none");
                }
                break;
            case '3':
                //console.log("case 3");
                statut = "#traitees";
                btn = "btnTraitees";
                img = "return";
                iT++;

                if (iT <= 10) $(statut).append(divDemande(date, btn, img, demandes[i]));
                else {
                    $(statut).append(divDemande(date, btn, img, demandes[i]));
                    $("#demande" + demandes[i]["id"]).css("display", "none");
                }
                break;
        }
        //console.log(demandes[i]);
    }
}

//Fonction qui affiche les titres des demandes
function afficherTitres(demandes) {
    console.log("afficherTitres");
	//console.log(demandes);
    var iC = 0 , iN = 0 , iT = 0; 
    for (var i=0; i < demandes.length; i++) {
        if (demandes[i]["statutDemande"] == 1) iN++;
        if (demandes[i]["statutDemande"] == 2) iC++;
        if (demandes[i]["statutDemande"] == 3) iT++;
    }
    if (iN != 0){
        if (iN == 1) $("#nouvellesDemandes").before("<h2 id='titreNouvellesDemandes'>Nouvelle demande</h2>");
        else $("#nouvellesDemandes").before("<h2 id='titreNouvellesDemandes'>Nouvelles demandes</h2>");
    } else $("#nouvellesDemandes").before("<h2 id='titreNouvellesDemandes'>Aucune nouvelle demande</h2>");

    if (iC != 0){
        if (iC == 1) $("#demandesEnCours").before("<h2 id='titreEnCours'>Demande en cours</h2>");
        else $("#demandesEnCours").before("<h2 id='titreEnCours'>Demandes en cours</h2>");
    } else $("#demandesEnCours").before("<h2 id='titreEnCours'>Aucune demande en cours</h2>");
    
    if (iT != 0){
        if (iT == 1) $("#traitees").before("<h2 id='titreTraitees'>Demande traitée</h2>");
        else $("#traitees").before("<h2 id='titreTraitees'>Demandes traitées</h2>");
    } else $("#traitees").before("<h2 id='titreTraitees'>Aucune demande traitée</h2>");

    montrerPlusMoins();
}

// Fonction qui change le titre en fonction du nombre de demandes
function changerTitres() {
    console.log("changerTitres");
    if (document.getElementById("nouvellesDemandes").childElementCount != 0) {
        if ((document.getElementById("nouvellesDemandes").childElementCount == 1)) $("#titreNouvellesDemandes").text("Nouvelle demande");
        else $("#titreNouvellesDemandes").text("Nouvelles demandes");
    } else $("#titreNouvellesDemandes").text("Aucune nouvelle demande");

    if (document.getElementById("demandesEnCours").childElementCount != 0) {
        if ((document.getElementById("demandesEnCours").childElementCount == 1)) $("#titreEnCours").text("Demande en cours");
        else $("#titreEnCours").text("Demandes en cours");
    } else $("#titreEnCours").text("Aucune demande en cours");

    if (document.getElementById("traitees").childElementCount != 0) {
        if ((document.getElementById("traitees").childElementCount == 1)) $("#titreTraitees").text("Demande traitée");
        else $("#titreTraitees").text("Demandes traitées");
    } else $("#titreTraitees").text("Aucune demande traitée");

    //console.log(document.getElementById("nouvellesDemandes").childElementCount);
    //console.log(document.getElementById("demandesEnCours").childElementCount);
    //console.log(document.getElementById("traitees").childElementCount);
}

// Tri par date
function triDate(dateDemande, statut) {
    console.log("triDate");
    var count = document.getElementById(statut).childElementCount;
    var split = $("#" + statut + " .tpsComplet").text().split("|", count);

    if (document.getElementById(statut).childElementCount != null) {
        for (var i=0; i < document.getElementById(statut).childElementCount; i++) {
            var dateStatut = new Date(split[i]);
            if ($(".choix-recent").hasClass('choix-ancien')) {
                if (dateDemande < dateStatut) return i;
            } else {
                if (dateDemande > dateStatut) return i;
            }
        }
        return null;
    } else return null;
    
}

// Fonction qui permet de changer le statut d'une demande
function changerStatut(contexte, demande) {
    console.log("changerStatut");
    //console.log(contexte);
    //console.log(demande);
    if ($(contexte).hasClass("btnNouvelleDemande") || $(contexte).hasClass("btnTraitees")) {
        var statut = "demandesEnCours";
        var btn = "btnEnCours";
        var img = "play";
        var statutDemande = 2;
    } 
    if ($(contexte).hasClass("btnEnCours")) {
        var statut = "traitees";
        var btn = "btnTraitees";
        var img = "return";
        var statutDemande = 3;
    }
    //console.log(demande["id"]);
    //console.log(demande["statutDemande"]);
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

    demande["statutDemande"] = statutDemande;
    var dateDemande = new Date(demande["date"]);
    //console.log(dateDemande);
    var date = dateCompteur(dateDemande) + ", le " + dateDemande.toLocaleDateString();

    var tri = triDate(dateDemande, statut);
    if (tri != null) $($("#" + statut).children().eq(tri)).before(divDemande(date, btn, img, demande));
    else $("#" + statut).append(divDemande(date, btn, img, demande));
        
    changerTitres();
    montrerPlusMoins();
}

//Fonction de suppression d'une demande
$(function() {
    $(".btnSupp").on("click", function() {
        console.log("supprimerDemande");

        var id = $(this).parent().parent().attr("id").match(/\d/g).toString().replace(',', '');
        //console.log("id : " + id);

        $("#overlay").css("visibility", "visible");

        $("#popupBtnOui").on("click", function() { 
            //console.log("oui");
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

            changerTitres();
            montrerPlusMoins();
        });

        $("#popupBtnNon").on("click", function() { 
            //console.log("non");
            $("#overlay").css("visibility", "hidden");
        });
    });
});

//Fonctions d'edition des memos
$(function() {
    var jTA = $("<textarea>").keyup(function(contexte){
        if(contexte.ctrlKey && (contexte.key == "Enter" || contexte.keyCode == 10 || contexte.keyCode == 13)) {
            //console.log("appui sur touche Control + " + contexte.key);
            var text = $(this).val();
            //console.log("text : " + text);
    
            if ($(this).hasClass("memo")) var contenu = "memo";
            if ($(this).hasClass("datePv")) var contenu = "datePv";
            if ($(this).hasClass("resultatPv")) var contenu = "resultatPv";
            if ($(this).hasClass("dateRencontre")) var contenu = "dateRencontre";
    
            if ($(this).parent().parent().parent().parent().hasClass("demandes")) var parent = $(this).parent().parent().parent().parent();
            else var parent = $(this).parent().parent().parent().parent().parent();
            //console.log(parent);
    
            var id = parent.attr("id").match(/\d/g).toString().replace(',', '');
            //console.log("id : " + id);
    
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
    }, function() {
        $('#popupInfos').hide();
    });

    $('#recherche img').mousemove(function(e) {
        $("#popupInfos").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });

    /*$(document).on("mouseover","textarea", function(){
        console.log($(this).data());
        console.log("val : " + $(this).val());
    });*/
});

// Fonctions de recherche
$(function() {
    $("#contenuRecherche").on("keyup", function() {
        console.log("recherche");
        $(".nonTrouvée").remove();

        switch ($("#selectRecherche").val()) {
            case 'rchGenerale':
                //console.log("case rchGenerale");
                $(".demandes").filter(function(){ 
                    $(this).toggle($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) > -1)
                });
                break;

            case 'rchChat':
                //console.log("case rchChat");
                $(".infosChat").filter(function(){ 
                    $($(this).parent().parent().parent()).toggle($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) > -1)
                });
                break;

            case 'infosPers':
                //console.log("case rchPers");
                $(".infosChat").filter(function(){ 
                    $($(this).parent().parent().parent()).toggle($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) > -1)
                });
                break;

            case 'rchDate':
                //console.log("case rchDate");
                $(".timeDemande").filter(function(){ 
                    $($(this).parent()).toggle($(this).text().toLowerCase().indexOf($("#contenuRecherche").val().toLowerCase()) > -1)
                });
                break;
        }

        if($('#nouvellesDemandes').children(':visible').length == 0 && $("#titreNouvellesDemandes").text().match("Aucune") == null) {
            $("#nouvellesDemandes").append("<h3 class='nonTrouvée'>Il n'y a aucune demande trouvée</h3>");
        }

        if($('#demandesEnCours').children(':visible').length == 0 && $("#titreEnCours").text().match("Aucune") == null) {
            $("#demandesEnCours").append("<h3 class='nonTrouvée'>Il n'y a aucune demande trouvée</h3>");
        }

        if($('#traitees').children(':visible').length == 0 && $("#titreTraitees").text().match("Aucune") == null) {
            $("#traitees").append("<h3 class='nonTrouvée'>Il n'y a aucune demande trouvée</h3>");
        }
    });
});

// Tri par date d'ajout
$(function() {
    $("#btnTriTps").on("click", function() {
        console.log("tri date d'ajout");
        $(".choix-recent").toggleClass('choix-ancien');

        if ($(".choix-recent").hasClass('choix-ancien')) $("#recherche p").text("Date d'ajout (plus anciennes)");
        else $("#recherche p").text("Date d'ajout (plus récentes)");

        $("#nouvellesDemandes .demandes").each(function(){ 
            $("#nouvellesDemandes").prepend(this);
        });

        $("#demandesEnCours .demandes").each(function(){ 
            $("#demandesEnCours").prepend(this);
        }); 

        $("#traitees .demandes").each(function(){ 
            $("#traitees").prepend(this);
        }); 

        if ($("#lienNouvellesDemandes").text() == "Montrer plus") {
            $("#nouvellesDemandes .demandes").hide();
            for (var i = 0; i < 10; i++) {
                $("#nouvellesDemandes .demandes").eq(i).show();
            }
        }

        if ($("#lienEnCours").text() == "Montrer plus") {
            $("#demandesEnCours .demandes").hide();
            for (var i = 0; i < 10; i++) {
                $("#demandesEnCours .demandes").eq(i).show();
            }
        }

        if ($("#lienTraitees").text() == "Montrer plus") {
            $("#traitees .demandes").hide();
            for (var i = 0; i < 10; i++) {
                $("#traitees .demandes").eq(i).show();
            }
        }
    });
});

// Montrer plus / montrer moins
$(function() {
    $("a").on("click", function() {
        console.log("montrer plus / moins");
        var statut;

        if ($(this).attr("id") == "lienNouvellesDemandes") statut = "#nouvellesDemandes";
        else if ($(this).attr("id") == "lienEnCours") statut = "#demandesEnCours";
        else statut = "#traitees";

        if ($(this).text() == "Montrer plus") {
            $(this).text("Montrer moins");
            $(statut + " .demandes").show();
        } else {
            $(this).text("Montrer plus");
            $(statut + " .demandes").hide();
            for (var i = 0; i < 10; i++) {
                $(statut + " .demandes").eq(i).show();
            }
        }
    });   
});

function montrerPlusMoins() {
    $("#lienNouvellesDemandes").toggle($("#titreNouvellesDemandes").text().match("Aucune") == null);
    $("#lienEnCours").toggle($("#titreEnCours").text().match("Aucune") == null);
    $("#lienTraitees").toggle($("#titreTraitees").text().match("Aucune") == null);
}

// Zoom sur une demande
$(function() {
    $(".infoDemande").on("click", function() {
        console.log("zoom");
        var id = $(this).parent().parent().attr("id").match(/\d/g).toString().replace(',', '');
        $(this).css({"transform" : "scale(1.2)"})/*.animate({height: '300px'})*/;
        $("#demande" + id + " .infoPlus").show();
        //$($(this).parent().parent()).css({"height": "300px"});
    });
});
