// Fonction qui recupére des images svg
function getSVG(img) {
    var svg;
    $.ajax({
        url: `./ressources/${img}.svg`,
        dataType: "text",
        async: false,
        success: function(data) {
            svg =  data;
        }
    });
    return svg;
}

// Fonction qui append une demande
function appendDemande(statut, date, btn, img, demande){
    $(statut).append(`<div id="demande${demande["id"]}" class="demandes">
                <div class="btnDemande ${btn} clickable" onclick='changerStatut(this);'>${img}</div>
                <div class="fondDemande">
                    <div class="contenuDemande">
                        <p class="tpsDate">${date}</p>
                        <p class="tpsComplet">${demande["date"]}|</p>
                        <div class="infos">
                            <div class="infosChat">
                                <img onclick='zoom(this);' src="./ressources/chats/${demande["code"]}/0.jpg" alt="${demande["code"]}/0.jpg">
                                <div class="idChat">
                                    <p class="nomChat policeTitre">${demande['name']} - ${demande["code"]}</p>
                                    <div class="para none">
                                        <p class="statutChat" name="statut">${demande["statut"]}</p>
                                    </div>
                                </div>
                                <div class='para none'>
                                    <p name='description'>${demande['description']}</p>
                                    <label for=\"description\">Description</label>
                                </div>
                                <div class='para none'>
                                    <p name='particularite'>${demande['particularite']}</p>
                                    <label for=\"particularite\">Particularité</label>
                                </div>
                            </div>
                            <div class="infosPers">
                                <p class="nomPers policeTitre">${demande['prenom']} ${demande["nom"]}</p>
                                <div class="flex">
                                    <div class="column">
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
                                    </div>
                                    <div class="column">
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
                                <div class='para commentaire none'>
                                    <p name='commentaire'>${demande['commentaire']}</p>
                                    <label for=\"commentaire\">Commentaire</label>
                                </div>
                            </div>
                        </div>
                        <form>
                            <div class='group memo'>
                                <textarea name='memo' maxlength="255" required>${demande['memo']}</textarea>
                                <label for=\"memo\">Mémo</label>
                            </div>
                            <div class="sous-memos">
                                <div class='group datePv'>
                                    <input type='text' name='datePv' value='${demande['datePv']}' maxlength="255" required>
                                    <label for=\"datePv\">Date de PV</label>
                                </div>
                                <div class='group resultatPv'>
                                    <input type='text' name='resultatPv' value='${demande['resultatPv']}' maxlength="255" required>
                                    <label for=\"resultatPv\">Résultat de PV</label>
                                </div>
                                <div class='group dateRencontre'>
                                    <input type='text' name='dateRencontre' value='${demande['dateRencontre']}' maxlength="255" required>
                                    <label for=\"dateRencontre\">Date de rencontre</label>
                                </div>
                            </div>
                        </form>
                        <div onclick='enregistrerMemo(this);' class="btnMemo clickable">Enregistrer</div>
                    </div>
                </div>
                <div class="btnDemande btnSupp clickable" onclick='supprimerDemande(this);'>${getSVG("cross")}</div>
            </div>`);
}

//Fonction qui calcule le temps écoulé depuis la date de la demande
function dateCompteur(dateDemande){ 
    var tps;
    const difference = new Date() - dateDemande;

    const secondes = Math.floor(difference / 1000);
    const minutes = Math.floor(difference / (1000 * 60));
    const heures = Math.floor(difference / (1000 * 60 * 60));
    const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
    const semaines = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
    const mois = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
    const annees = Math.floor(difference / (1000 * 60 * 60 * 24 * 30 * 12));

    if (secondes < 60) tps = 'il y a quelques secondes';
    else if (minutes < 60) tps = `il y a ${minutes} minute${minutes === 1 ? '' : 's'}`;
    else if (heures < 24) tps = `il y a ${heures} heure${heures === 1 ? '' : 's'}`;
    else if (jours < 7) tps = `il y a ${jours} jour${jours === 1 ? '' : 's'}`;
    else if (semaines <= 4) tps = `il y a ${semaines} semaine${semaines === 1 ? '' : 's'}`;
    else if (mois < 12) tps = `il y a ${mois} mois`;
    else tps = `Il y a ${annees} an${annees === 1 ? '' : 's'}`;

    return tps;
}

// Fonction qui affiche les demandes
function afficherDemandes(demandes) {
    var statut, btn, img;
    var iN = 0, iC = 0, iT = 0;
    for (var i=0; i < demandes.length; i++) {
        var dateDemande = new Date(demandes[i]["date"]);
        var date = dateCompteur(dateDemande) + ", le " + dateDemande.toLocaleDateString();

        switch (demandes[i]["statutDemande"]) {
            case '1':
                statut = "#nouvellesDemandes";
                btn = "btnNouvelleDemande";
                img = "check";
                iN++;

                if (iN <= 10) appendDemande(statut,date, btn, getSVG(img), demandes[i]);
                else {
                    appendDemande(statut,date, btn, getSVG(img), demandes[i]);
                    $("#demande" + demandes[i]["id"]).css("display", "none");
                }
                break;
            case '2':
                statut = "#demandesEnCours";
                btn = "btnEnCours";
                img = "play";
                iC++;

                if (iC <= 10) appendDemande(statut,date, btn, getSVG(img), demandes[i]);
                else {
                    appendDemande(statut,date, btn, getSVG(img), demandes[i]);
                    $("#demande" + demandes[i]["id"]).css("display", "none");
                }
                break;
            case '3':
                statut = "#traitees";
                btn = "btnTraitees";
                img = "return";
                iT++;

                if (iT <= 10) appendDemande(statut,date, btn, getSVG(img), demandes[i]);
                else {
                    appendDemande(statut,date, btn, getSVG(img), demandes[i]);
                    $("#demande" + demandes[i]["id"]).css("display", "none");
                }
                break;
        }
    }
}

//Fonction qui affiche les titres des demandes
function afficherTitres(demandes) {
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
}

// Tri par date
function triDate(dateDemande, statut) {
    var count = document.getElementById(statut).childElementCount;
    count = parseInt(count);
    var split = $("#" + statut + " .tpsComplet").text().split("|", count);

    if (count != null) {
        for (var i=0; i < count; i++) {
            var dateStatut = new Date(split[i]).getTime();
            if ($($("#triTps").children("p")).text() == 'Ancien') {
                if (dateDemande < dateStatut) return i;
            }
            else if ($($("#triTps").children("p")).text() == 'Récent') {
                if (dateDemande > dateStatut) return i;
            }
        }
        return null;
    } else return null;
    
}

// Fonction qui permet de changer le statut d'une demande
function changerStatut(contexte) {
    var demande = $(contexte).parent();
    var id = $($(contexte).parent()).attr("id").match(/\d+/g).toString().replace(',', '');
    id = parseInt(id);

    if ($(contexte).hasClass("btnNouvelleDemande") || $(contexte).hasClass("btnTraitees")) {
        var statut = "demandesEnCours";
        var statutDemande = 2;

        if ($(contexte).hasClass("btnNouvelleDemande")) {
            $($(demande).children(".btnNouvelleDemande")).html(getSVG("play"));

            $(demande).children(".btnNouvelleDemande").addClass("btnEnCours");
            $(demande).children(".btnNouvelleDemande").removeClass("btnNouvelleDemande");
        } else if ($(contexte).hasClass("btnTraitees")) {
            $($(demande).children(".btnTraitees")).html(getSVG("play"));

            $(demande).children(".btnTraitees").addClass("btnEnCours"); 
            $(demande).children(".btnTraitees").removeClass("btnTraitees");
        }
    } 
    else if ($(contexte).hasClass("btnEnCours")) {
        var statut = "traitees";
        var statutDemande = 3;
        
        $($(demande).children(".btnEnCours")).html(getSVG("return"));

        $(demande).children(".btnEnCours").addClass("btnTraitees");
        $(demande).children(".btnEnCours").removeClass("btnEnCours");
    }

    $.ajax({
        url: './controleur.php',
        type: 'POST',
        data: {
            action: 'Changer Statut Demande',
            id: id,
            statut: statutDemande
        }
    });
    $("#demande" + id).remove();

    var dateDemande = $($(contexte).parent().children(".fondDemande").children(".contenuDemande").children(".tpsComplet")).text().match(/^(.*).$/);
    dateDemande = new Date (dateDemande[1]).getTime();

    var tri = triDate(dateDemande, statut);
    if (tri != null) $($("#" + statut).children().eq(tri)).before(demande);
    else $("#" + statut).append(demande);
        
    changerTitres();
    montrerPlusMoins();
}

//Fonction de suppression d'une demande
function supprimerDemande(contexte) {
    var id = $($(contexte).parent()).attr("id").match(/\d/g).toString().replace(',', '');
    id = parseInt(id);

    var code = $($(contexte).parent().children(".fondDemande").children(".contenuDemande").children(".infos")
        .children(".infosChat").children(".idChat").children(".nomChat")).text().split("-");
    code = code[1].trim();

    $("#overlay").show();

    $("#popupBtnOui").on("click", function() { 
        $.ajax({
            url: './controleur.php',
            type: 'POST',
            data: {
                action: 'Supprimer Demande',
                id: id,
                code : code
            }
        });
        $("#demande" + id).remove();
        $("#overlay").hide();

        changerTitres();
        montrerPlusMoins();
    });

    $("#popupBtnNon").on("click", function() { 
        $("#overlay").hide();
    });
}

//Fonctions d'edition des commentaires
function enregistrerMemo(contexte) {
    var id = $($(contexte).parent().parent().parent()).attr("id").match(/\d+/g).toString().replace(',', '');
    id = parseInt(id);
    var parent = $($(contexte).parent()).children("form");

    var memo = $(parent).children(".memo").children("textarea").val();
    var datePv = $(parent).children(".sous-memos").children(".datePv").children("input").val();
    var resultatPv = $(parent).children(".sous-memos").children(".resultatPv").children("input").val();
    var dateRencontre = $(parent).children(".sous-memos").children(".dateRencontre").children("input").val();

    if (memo == "") memo = "null";
    if (datePv == "") datePv = "null";
    if (resultatPv == "") resultatPv = "null";
    if (dateRencontre == "") dateRencontre = "null";

    $.ajax({
        url: './controleur.php',
        type: 'POST',
        data: {
            action: 'Changer Memo',
            id: id,
            memo: memo,
            datePv: datePv,
            resultatPv: resultatPv,
            dateRencontre: dateRencontre
        }
    });
}

// Fonction qui permet d'afficher la popup d'infos
$(function() {
    window.addEventListener("resize", function() {
        offset = $("#i").offset();
        $("#popupInfos").css('top', $("#i").offset().top + 60).css('left', ($(window).width() - 420)/2);
    });

    $('#i').click(function() {
        offset = $("#i").offset();

        $('#popupInfos').toggle();
        $("#popupInfos").css('top', $("#i").offset().top + 60).css('left', ($(window).width() - 420)/2);

        if ($("#popupInfos").css("display") == "block") $("#i").css({'color': 'var(--third-color)', 'border-color': 'var(--third-color)'});
        else $('#i').removeAttr('style');
    });
});

// Fonctions de recherche
$(function() {
    $("#contenuRecherche").on("keyup", function() {
        $(".nonTrouvée").remove();
        var contenu = $("#contenuRecherche").val().toLowerCase();

        switch ($("#selectRecherche").text()) {
            case 'Recherche générale':
                $(".demandes").filter(function(){ 
                    $(this).toggle($(this).text().toLowerCase().indexOf(contenu) > -1)
                });
                break;

            case 'Recherche d\'un chat':
                $(".infosChat").filter(function(){ 
                    $($(this).parent().parent().parent().parent()).toggle($(this).text().toLowerCase().indexOf(contenu) > -1)
                });
                break;

            case 'Recherche d\'une personne':
                $(".infosPers").filter(function(){ 
                    $($(this).parent().parent().parent().parent()).toggle($(this).text().toLowerCase().indexOf(contenu) > -1)
                });
                break;

            case 'Recherche d\'une date':
                $(".tpsDate").filter(function(){ 
                    $($(this).parent().parent().parent()).toggle($(this).text().toLowerCase().indexOf(contenu) > -1)
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
        if ($(this).children("input").prop("checked") == false) {
            $(this).parent().children("p").fadeOut(150, function() {
                $(this).text("Récent").fadeIn(150);
            });
        }
        else {
            $(this).parent().children("p").fadeOut(150, function() {
                $(this).text("Ancien").fadeIn(150);
            });
        }

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
    $(".lienPlusMoins").on("click", function() {
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
function zoom(contexte) {
    if ($($(contexte).parent().parent().parent().parent().parent()).hasClass("zoom")) {
        $($(contexte).parent().parent().parent()).fadeOut(300, function() { // contenuDemande
            $($(this).parent()).css({"width": "85%"}); // fondDemande
            $($(this).parent().parent()).toggleClass("zoom"); // demandes
            $(this).fadeIn(300); // contenuDemande
            $($(this).parent().parent()).children(".btnDemande").fadeIn(200); // btnDemande
        });
    } else {
        $($(contexte).parent().parent().parent().parent().parent().parent()).children(".btnDemande").fadeOut(200); // btnDemande
        $($(contexte).parent().parent().parent()).fadeOut(300, function() { // contenuDemande
            $($(this).parent()).css({"width": "90%"}); // fondDemande
            $($(this).parent().parent()).toggleClass("zoom"); // demandes
            $(this).fadeIn(300); // contenuDemande
        });
    }
}

// Remplacement de texte
$(function() {
    $(".para p").each(function() {
        if ($(this).text() == "null") $(this).text("Aucune information");
    });
    
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

    $(".memo textarea").each(function() {
        if ($(this).val() == "null") $(this).val("");
    });

    $(".sous-memos input").each(function() {
        if ($(this).val() == "null") $(this).val("");
    });
});

/* Dropdown Menu */
$(function() {
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
