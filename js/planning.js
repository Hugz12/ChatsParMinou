const monthString = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
//var calendar = document.getElementById("calendar");
// recupere le localStorage
var userConnected = localStorage.getItem("userConnected");
var test = 0;



function fillPassagesRefuge(year, month){
    $.ajax({
        url: "./controleur.php",
        type: "POST",
        dataType: "json",
        data: {
            "action" : "getPassages",
            "mois" : month+1,
            "annee" : year
        },
        success: function (data) {
            var passagesRefuge = document.getElementById("passagesRefuge"); // On recupere le div des passages
            passagesRefuge.innerHTML = ""; // On vide le div des passages
            
            // ON ajoute les passages dans le conteneur des passages en indiquant le mail du benevole, la date, l'horaire et la description
            for(element of data){

                // On ajoute le passage
                var passage = document.createElement("div");
                passage.className = "passage";
                // enleve les secondes des heures
                element.heureDebut = element.heureDebut.split(":")[0] + ":" + element.heureDebut.split(":")[1];
                element.heureFin = element.heureFin.split(":")[0] + ":" + element.heureFin.split(":")[1];

                passage.innerHTML = `
                    <div class="mailBenevole">${element.mailBenevole}</div>
                    <div class="date" style="display:none;">${element.date.split(" ")[0]}</div>
                    <div class="horaire">De ${element.heureDebut} à ${element.heureFin}</div>
                    <div class="description">${element.description}</div>
                `;
                
                if(userConnected == element.mailBenevole){
                    var btnSupprimer = document.createElement("div");
                    btnSupprimer.className = "deletePassage";
                    btnSupprimer.innerHTML = "❌";
                    btnSupprimer.onclick = function(){deletePassage(this)};
                    passage.appendChild(btnSupprimer);
                }

                passagesRefuge.appendChild(passage);

                
            }


            // On ajoute les jours du mois dans le calendrier en mettant les classes & les onclicks pour les jours de passages
            var daysInMonth = new Date(year, month + 1, 0).getDate();
            for (var i = 1; i <= daysInMonth; i++) {
                var day = document.createElement("div");
                day.className = "day";
                if (i == new Date().getDate() && month == new Date().getMonth() && year == new Date().getFullYear()) {
                    day.className += " currentDay";
                }
                day.innerHTML = i;
                for(elt of passagesRefuge.children){
                    // recupere le jour de la date du passage qui est sous format yyy-mm-dd hh:mm:ss
                    var jour = elt.children[1].innerHTML.split(" ")[0].split("-")[2];
                    jour = parseInt(jour);

                    // Si le jour du passage est le meme que le jour du calendrier, on ajoute la classe passageDay
                    if(jour == i && day.classList.contains("passageDay") == false){
                        day.onclick = function(){displayPassage(this);}
                        day.className += " passageDay";
                    }
                }
                calendar.children[3].appendChild(day);
            }
            test = 1;
        },
        error: function (data) {
            console.log(data);
            console.log("error");
        }
    });
}







function fillCalendar() {
    var calendar = document.getElementById("calendar");
    // on recupere le mois et l'année actuelle
    var month = new Date().getMonth(); // 0 = janvier, 1 = fevrier, etc...
    var year = new Date().getFullYear();
    // on recupere le jour de la semaine du premier jour du mois
    var firstDay = new Date(year, month, 1).getDay(); // 1 = lundi, 2 = mardi, etc...
    if (firstDay == 0) { // conversion du dimanche (le truc est en anglais sinon)
        firstDay = 7;
    }

    // on set le mois et l'année 
    calendar.children[1].children[0].children[0].innerHTML = year;
    calendar.children[1].children[0].children[1].innerHTML = monthString[month];
    calendar.children[1].children[0].children[2].innerHTML = month;
    

    // On remplit les jours vides du mois
    var day = document.createElement("div");
    day.className = "day";
    for (var i = 1; i < firstDay; i++) {
        calendar.children[3].appendChild(day.cloneNode());
    }

    // On remplit 
    fillPassagesRefuge(year, month);
}



function changeMonth(element){
    var calendar = document.getElementById("calendar");
    switch(element.id){
        case "previousMonth":
            var sens = -1;
            break;
        case "nextMonth":
            var sens = 1;
            break;
        case "refreshMonth":
            var sens = 0;
    }

    var month = parseInt(calendar.children[1].children[0].children[2].innerHTML) + sens;
    var year = parseInt(calendar.children[1].children[0].children[0].innerHTML);

    // On change l'année si on change de mois
    if (month == 12) {
        month = 0;
        year++;
    }
    if (month == -1) {
        month = 11;
        year--;
    }
    var firstDay = new Date(year, month, 1).getDay(); // 1 = lundi, 2 = mardi, etc...
    if (firstDay == 0) { // conversion du dimanche (le truc est en anglais sinon)
        firstDay = 7;
    }

    // On change le mois et l'année
    calendar.children[1].children[0].children[0].innerHTML = year;
    calendar.children[1].children[0].children[1].innerHTML = monthString[month];
    calendar.children[1].children[0].children[2].innerHTML = month;


    // On vide le calendier et on remplit les jours vides
    calendar.children[3].innerHTML = "";
    var day = document.createElement("div");
    day.className = "day";
    for (var i = 1; i < firstDay; i++) {
        calendar.children[3].appendChild(day.cloneNode());
    }

    

    fillPassagesRefuge(year, month);
}



function setMinDate(){
    var date = document.getElementById("datePassage");
    date.min = new Date().toISOString().split("T")[0];
}


function displayPassage(element){
    var passagesRefuge = document.getElementById("passagesRefuge");
    var dayPassageRefuge = document.getElementById("containerPassagesRefuge").children[0];
    var id = element.innerHTML;
    id = parseInt(id);
    for(elt of passagesRefuge.children){

        // recupere le jour de la date du passage qui est sous format yyy-mm-dd hh:mm:ss
        var jour = elt.children[1].innerHTML.split(" ")[0].split("-")[2];
        jour = parseInt(jour);
        if(jour === id){
            elt.style.display = "block";
        }else{
            elt.style.display = "none";
        }
    }

    dayPassageRefuge.innerText = "Passages du " + id + " " + monthString[parseInt(calendar.children[1].children[0].children[2].innerHTML)] + " " + calendar.children[1].children[0].children[0].innerHTML;
    
    passagesRefuge.style.display = "block";
    displayForm("containerPassagesRefuge");
}



function validerFormPassageRefuge(){
    var debut = document.getElementById("debut").value;
    var fin = document.getElementById("fin").value;
    var date = document.getElementById("datePassage").value;
    var description = document.getElementById("description").value;


    $.ajax({
        url: "./controleur.php",
        type: "POST",
        dataType: "json",
        data: {
            "action" : "addPassage",
            "debut" : debut,
            "fin" : fin,
            "date" : date,
            "description" : description
        },
        success: function (data) {
            switch(data){
                case "added":
                    hideForm("formPassageRefuge")
                    alert("Le passage a bien été ajouté");
                    break;
                case "alreadyExist":
                    alert("Vous essayez d'ajouter une ligne existante");
                    break;
                default:
                    alert("Une erreur est survenue, les données ne sont pas cohérentes");
                    break;
            }
            var elt = document.createElement("div");
            elt.id = "refreshMonth";
            changeMonth(elt);
        },
        error: function (data) {
            console.log("error");
        }
    });
    

}


function deletePassage(element){
    if (!window.confirm("Voulez-vous vraiment supprimer ce passage ?")) {
        return;
    }
    else {
        var passage = element.parentNode;
        var date = passage.children[1].innerHTML;
        var heureDebut = passage.children[2].innerHTML.split(" ")[1];
        var heureFin = passage.children[2].innerHTML.split(" ")[3];
        console.log(date);
        console.log(heureDebut);
        console.log(heureFin);

        $.ajax({
            url: "./controleur.php",
            type: "POST",
            dataType: "json",
            data: {
                "action" : "deletePassage",
                "date" : date,
                "heureDebut" : heureDebut,
                "heureFin" : heureFin
            },
            success: function (data) {
            
                var elt = document.createElement("div");
                elt.id = "refreshMonth";
                
                changeMonth(elt);
                alert("Le passage a bien été supprimé");
                
                
                
            },
            error: function (data) {
                console.log("error");
            }
        });
    }
}

