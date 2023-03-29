//Fonction qui append une demande
function divDemande(date, btn, img, demande){
    return `<div id="demande${demande["id"]}" class="demandes">
                <div class="contenuDemande">
                    <img class="btnDemande ${btn} clickable" onclick='changerStatut(this, ${JSON.stringify(demande)});' src="./ressources/${img}.png" alt="${img}">
                    <div class="infoDemande">
                        <p class="tpsDate">${date}</p>
                        <p class="tpsComplet">${demande["date"]}|</p>
                        <div class="infoMoins">
                            <div class="infosChat">
                                <img class="imageDemande" src="./ressources/chats/${demande["code"]}/0.jpg" alt="${demande["code"]}/0.jpg">
                                <div class="idChat">
                                    <p class="nomChat policeTitre">${demande['name']}</p>
                                    <div class="para">
                                        <p name="code">${demande["code"]}</p>
                                        <label for=\"code\">Code</label>
                                    </div>
                                    <div class="para none">
                                        <p class="statutChat" name="statut">${demande["statut"]}</p>
                                        <label for=\"statut\">Statut</label>
                                    </div>
                                </div>
                            </div>
                            <div class="infosPers">
                                <p class="nomPers policeTitre">${demande['prenom']} ${demande["nom"]}</p>
                                <div class="para">
                                    <p name="mail">${demande['mail']}</p>
                                    <label for=\"mail\">Mail</label>
                                </div>
                                <div class="para">
                                    <p name="tel">${demande['tel']}</p>
                                    <label for=\"tel\">Tel.</label>
                                </div>
                                <div class="para none">
                                    <p name="adresse">${demande['adresse']}</p>
                                    <label for=\"adresse\">Adresse</label>
                                </div>
                                <div class="para none">
                                    <p name="habitation">${demande['habitation']}</p>
                                    <label for=\"habitation\">Habitation</label>
                                </div>
                                <div class="para none">
                                    <p class="exterieur" name="exterieur">${demande['exterieur']}</p>
                                    <label for=\"exterieur\">Exterieur</label>
                                </div>
                                <div class="para none">
                                    <p class="sortie" name="sortie">${demande['sortie']}</p>
                                    <label for=\"sortie\">Sortie</label>
                                </div>
                                <div class="para none">
                                    <p name="sitFam">${demande['situationFamiliale']}</p>
                                    <label for=\"sitFam\">Situation familiale</label>
                                </div>
                                <div class="para none">
                                    <p name="animaux">${demande['animaux']}</p>
                                    <label for=\"animaux\">Animaux</label>
                                </div>
                            </div>
                        </div>
                        <div class="infoPlus">
                            <form>
                                <div class='group memo'>
                                    <textarea name='memo' required>${demande['memo']}</textarea>
                                    <label for=\"memo\">Memo</label>
                                </div>
                                <div class="sous-memos">
                                    <div class='group datePv'>
                                        <textarea name='datePv' required>${demande['datePv']}</textarea>
                                        <label for=\"datePv\">datePv</label>
                                    </div>
                                    <div class='group resultatPv'>
                                        <textarea name='resultatPv' required>${demande['resultatPv']}</textarea>
                                        <label for=\"resultatPv\">resultatPv</label>
                                    </div>
                                    <div class='group dateRencontre'>
                                        <textarea name='dateRencontre'>${demande['dateRencontre']}</textarea>
                                        <label for=\"dateRencontre\">dateRencontre</label>
                                    </div>
                                </div>
                                <div class='para commentaire none'>
                                    <p name='commentaire'>${demande['commentaire']}</p>
                                    <label for=\"commentaire\">commentaire</label>
                                </div>
                            </form>
                            <button class="btnMemo clickable">Enregistrer</button>
                        </div>
                    </div>
                    <img class="btnDemande btnSupp clickable" onclick='supprimerDemande(this);' src="./ressources/cross.png" alt="cross">
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

    var classe = "class='policeTitre tailleTitre marginTitre'";
    $("#nouvellesDemandes").before("<p id='titreNouvellesDemandes' " + classe + "></p>");
    $("#demandesEnCours").before("<p id='titreEnCours' " + classe + "></p>");
    $("#traitees").before("<p id='titreTraitees' " + classe + "></p>");

    if (iN != 0){
        if (iN == 1) $("#titreNouvellesDemandes").text("Nouvelle demande");
        else $("#titreNouvellesDemandes").text("Nouvelles demandes");
    } else $("#titreNouvellesDemandes").text("Aucune nouvelle demande");

    if (iC != 0){
        if (iC == 1) $("#titreEnCours").text("Demande en cours");
        else $("#titreEnCours").text("Demandes en cours");
    } else $("#titreEnCours").text("Aucune demande en cours");

    if (iT != 0){
        if (iT == 1) $("#titreTraitees").text("Demande traitée");
        else $("#titreTraitees").text("Demandes traitées");
    } else $("#titreTraitees").text("Aucune demande traitée");

    montrerPlusMoins();
}

// Fonction qui change le titre en fonction du nombre de demandes
function changerTitres() {
    console.log("changerTitres");
    var idN = document.getElementById("nouvellesDemandes");
    var idC = document.getElementById("demandesEnCours");
    var idT = document.getElementById("traitees");

    if (idN.childElementCount != 0) {
        if (idN.childElementCount == 1) $("#titreNouvellesDemandes").text("Nouvelle demande");
        else $("#titreNouvellesDemandes").text("Nouvelles demandes");
    } else $("#titreNouvellesDemandes").text("Aucune nouvelle demande");

    if (idC.childElementCount != 0) {
        if ((idC.childElementCount == 1)) $("#titreEnCours").text("Demande en cours");
        else $("#titreEnCours").text("Demandes en cours");
    } else $("#titreEnCours").text("Aucune demande en cours");

    if (idT.childElementCount != 0) {
        if ((idT.childElementCount == 1)) $("#titreTraitees").text("Demande traitée");
        else $("#titreTraitees").text("Demandes traitées");
    } else $("#titreTraitees").text("Aucune demande traitée");

    //console.log(idN.childElementCount);
    //console.log(idC.childElementCount);
    //console.log(idT.childElementCount);
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
function supprimerDemande(contexte) {
        console.log("supprimerDemande");

        var id = $($(contexte).parent().parent()).attr("id").match(/\d/g).toString().replace(',', '');
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
    }

//Fonctions d'edition des commentaires
$(function() {
    $(".btnMemo").on("click", function() {
        console.log("Changer Memo");
        var id = $($(this).parent().parent().parent().parent()).attr("id").match(/\d/g).toString().replace(',', '');
        //console.log("id : " + id);
        var parent = $(this).parent().children("form");

        $.ajax({
            url: "./controleur.php",
            type: "POST",
            dataType: "html",
            data: {
                action: "Changer Memo",
                id: id,
                memo: $(parent.children(".memo").children("textarea")).val(),
                datePv: $(parent.children(".sous-memos").children(".datePv").children("textarea")).val(),
                resultatPv: $(parent.children(".sous-memos").children(".resultatPv").children("textarea")).val(),
                dateRencontre: $(parent.children(".sous-memos").children(".dateRencontre").children("textarea")).val(),
            },
            success: function() {
                console.log("success");
            },
            error: function() {
                console.log("error");
            }
        });
    });

    var moveLeft = 20;
    var moveDown = 10;

    $('#i').hover(function() {
        $('#popupInfos').toggle();
    });

    $('#i').mousemove(function(e) {
        $("#popupInfos").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });
});

// Fonctions de recherche
$(function() {
    $("#contenuRecherche").on("keyup", function() {
        console.log("recherche");
        $(".nonTrouvée").remove();
        var contenu = $("#contenuRecherche").val().toLowerCase();

        switch ($("#selectRecherche").text()) {
            case 'Recherche générale':
                //console.log("case rchGenerale");
                $(".demandes").filter(function(){ 
                    $(this).toggle($(this).text().toLowerCase().indexOf(contenu) > -1)
                });
                break;

            case 'Recherche d\'un chat':
                //console.log("case rchChat");
                $(".infosChat").filter(function(){ 
                    $($(this).parent().parent().parent()).toggle($(this).text().toLowerCase().indexOf(contenu) > -1)
                });
                break;

            case 'Recherche d\'une personne':
                //console.log("case rchPers");
                $(".infosPers").filter(function(){ 
                    $($(this).parent().parent().parent().parent()).toggle($(this).text().toLowerCase().indexOf(contenu) > -1)
                });
                break;

            case 'Recherche d\'une date':
                //console.log("case rchDate");
                $(".tpsDate").filter(function(){ 
                    $($(this).parent().parent()).toggle($(this).text().toLowerCase().indexOf(contenu) > -1)
                });
                break;
        }

        var aucun = "<p class='nonTrouvée policeTitre'>Il n'y a aucune demande trouvée</p>";

        if($('#nouvellesDemandes').children(':visible').length == 0 && $("#titreNouvellesDemandes").text().match("Aucune") == null) {
            $("#nouvellesDemandes").append(aucun);
        }

        if($('#demandesEnCours').children(':visible').length == 0 && $("#titreEnCours").text().match("Aucune") == null) {
            $("#demandesEnCours").append(aucun);
        }

        if($('#traitees').children(':visible').length == 0 && $("#titreTraitees").text().match("Aucune") == null) {
            $("#traitees").append(aucun);
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
    $(".infoMoins").on("click", function() {
        console.log("zoom");

        if ($($(this).parent()).css("display") == "block") {
            $($(this).parent()).css({"display" : "flex", "transform" : "scale(1)" , "transition" : "1s"}); //infoDemande
            $($(this).parent().parent()).removeAttr('style'); //contenuDemande
            $(this).removeAttr('style'); //infoMoins
            $($(this).children(".infosChat").children("img")).removeAttr('style'); //infoMoins infosChat img
            $($(this).parent().children(".infoPlus")).removeAttr('style'); //infoPlus
            
            $($(this).children(".infosChat")).removeAttr('style'); //infosChat
            $($(this).children(".infosChat").children(".idChat")).removeAttr('style'); //infosChat idChat
            $($(this).children(".infosChat").children(".idChat").children(".nomChat")).removeAttr('style'); //infosChat idChat nomChat
            $($(this).children(".infosChat").children(".idChat").children(".para")).removeAttr('style'); //infosChat idChat para
            $($(this).children(".infosChat").children(".idChat").children(".none")).removeAttr('style'); //infosChat idChat none

            $($(this).children(".infosPers")).removeAttr('style'); //infosPers 
            $($(this).children(".infosPers").children(".nomPers")).removeAttr('style'); //infosPers nomPers
            $($(this).children(".infosPers").children(".none")).removeAttr('style'); //infosPers none
            
            $($(this).parent().children(".infoPlus").children("form").children(".none")).removeAttr('style'); //infoPlus form none
            $($(this).parent().children(".infoPlus").children("form").children(".commentaire")).removeAttr('style'); //infosPlus form commentaire
            $($(this).parent().children(".infoPlus").children("form").children(".memo")).removeAttr('style') //infosPlus form memo
            $($(this).parent().children(".infoPlus").children("form").children(".sous-memos")).removeAttr('style') //infosPlus form sous-memos
            $($(this).parent().children(".infoPlus").children("form").children(".sous-memos").children("div")).removeAttr('style'); //infosPlus form sous-memos div
            $($(this).parent().children(".infoPlus").children(".btnMemo")).removeAttr('style'); //infosPlus btnMemo
            $($(this).parent().children(".tpsDate")).removeAttr('style'); //tpsDate
        } else {
            $($(this).parent()).css({"display" : "block", "transform" : "scale(1.2)" , "transition" : "1s"}); //infoDemande
            $($(this).parent().parent()).css({"margin" : "3% auto 6% auto"}); //contenuDemande
            $(this).css({"width" : "100%"}); //infoMoins
            $($(this).children(".infosChat").children("img")).css({"width" : "300px", "height" : "200px"}); //infoMoins infosChat img
            $($(this).parent().children(".infoPlus")).css({"width" : "98%" , "height" : "10em", "margin" : "1em"}); //infoPlus

            $($(this).children(".infosChat")).css({"display" : "flex", "width" : "40%"}); //infosChat
            $($(this).children(".infosChat").children(".idChat")).css({"justify-content" : "space-around"}); //infosChat idChat
            $($(this).children(".infosChat").children(".idChat").children(".nomChat")).css({"font-size" : "3em"}); //infosChat idChat nomChat
            $($(this).children(".infosChat").children(".idChat").children(".para")).css({"width" : "30%"}); //infosChat idChat para
            $($(this).children(".infosChat").children(".idChat").children(".none")).css({"display" : "unset"}); //infosChat idChat none

            $($(this).children(".infosPers")).css({"grid-template-columns" : "repeat(2, 1fr)", "grid-template-rows" : "repeat(5, 0.9fr)", "width" : "55%"}); //infosPers 
            $($(this).children(".infosPers").children(".nomPers")).css({"grid-area" : "1 / 1 / 2 / 3"}); //infosPers nomPers
            $($(this).children(".infosPers").children(".none")).css({"display" : "unset"}); //infosPers none

            $($(this).parent().children(".infoPlus").children("form").children(".none")).css({"display" : "unset"}); //infoPlus form none
            $($(this).parent().children(".infoPlus").children("form").children(".commentaire")).css({"display" : "unset", "width" : "45%", "height" : "100%"}); //infosPlus form commentaire
            $($(this).parent().children(".infoPlus").children("form").children(".memo")).css({"width" : "30%", "height" : "100%"}); //infosPlus form memo
            $($(this).parent().children(".infoPlus").children("form").children(".sous-memos")).css({"width" : "20%", "height" : "115%"}); //infosPlus form sous-memos
            $($(this).parent().children(".infoPlus").children(".btnMemo")).css({"width" : "8%"}); //infosPlus btnMemo
            $($(this).parent().children(".tpsDate")).css({"display" : "none"}); //tpsDate
        }
    });
});

// Remplacement de texte
$(function() {
    $(".statutChat").each(function() {
        switch ($(this).text()) {
            case '1':
                $(this).text("A adopter");
                break;
            case '2':
                $(this).text("En cours d'adoption");
                break;
            case '3':
                $(this).text("Adopté");
                break;
        }
    });

    $(".exterieur").each(function() {
        switch ($(this).text()) {
            case '0':
                $(this).text("Pas d'extérieur");
                break;
            case '1':
                $(this).text("Extérieur disponible");
                break;
        }
    });

    $(".sortie").each(function() {
        switch ($(this).text()) {
            case '0':
                $(this).text("Pas de sortie");
                break;
            case '1':
                $(this).text("Sortie autorisée");
                break;
        }
    });
});


$(function() {
    /*Dropdown Menu*/
    $('.dropdown').click(function () {
        $(this).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
    });
});

function etatBtnTri(element){
	if ($(element).children("input").prop("checked") == false) {
        $(element).children("div").fadeOut(150, function() {
            $(this).text("Récent").fadeIn(150);
        });
    }
    else {
        $(element).children("div").fadeOut(150, function() {
            $(this).text("Ancien").fadeIn(150);
        });
    }
}
