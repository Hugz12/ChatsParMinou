const monthString = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
//var calendar = document.getElementById("calendar");

function fillCalendar() {
    var calendar = document.getElementById("calendar");
    console.log(calendar);
    // on recupere le mois et l'année actuelle
    var month = new Date().getMonth(); // 0 = janvier, 1 = fevrier, etc...
    var year = new Date().getFullYear();
    // on recupere le jour de la semaine du premier jour du mois
    var firstDay = new Date(year, month, 1).getDay(); // 1 = lundi, 2 = mardi, etc...
    if (firstDay == 0) { // conversion du dimanche (le truc est en anglais sinon)
        firstDay = 7;
    }

    // on change le mois et l'année
    calendar.children[1].children[0].children[0].innerHTML = year;
    calendar.children[1].children[0].children[1].innerHTML = monthString[month];
    calendar.children[1].children[0].children[2].innerHTML = month;
    

    // on remplit les jours vides
    var day = document.createElement("div");
    day.className = "day";
    for (var i = 1; i < firstDay; i++) {
        calendar.children[3].appendChild(day.cloneNode());
    }

    $.ajax({
        url: "./controleur.php",
        type: "POST",
        dataType: "json",
        data: {
            "action" : "getPassages",
            "mois" : month+1
        },
        success: function (data) {
            console.log(data);
            var passagesRefuge = document.getElementById("passagesRefuge");
            passagesRefuge.innerHTML = "";
            for(element of data){
                var passage = document.createElement("div");
                passage.className = "passage";
                passagesRefuge.appendChild(passage);

                var listeAttributs = ["mailBenevole", "date", "heureDebut", "heureFin", "description"];
                var currentAttribut;

                for(attribut of listeAttributs){
                    currentAttribut = document.createElement("div");
                    currentAttribut.className = attribut;
                    currentAttribut.innerHTML = element[attribut];
                    passage.appendChild(currentAttribut);
                }
            }

                // on remplit les jours du mois avec les passages
                var daysInMonth = new Date(year, month + 1, 0).getDate();
                console.log(passagesRefuge.children.length);

                
                for (var i = 1; i <= daysInMonth; i++) {
                    var day = document.createElement("div");
                    day.className = "day";
                    if (i == new Date().getDate() && month == new Date().getMonth() && year == new Date().getFullYear()) {
                        day.className += " currentDay";
                    }
                    day.innerHTML = i;
                    for(var j = 0; j < passagesRefuge.children.length; j++){
                        // recupere le jour de la date du passage qui est sous format yyy-mm-dd hh:mm:ss
                        var jour = passagesRefuge.children[j].children[1].innerHTML.split(" ")[0].split("-")[2];
                        jour = parseInt(jour);
                        console.log(jour);
                        if(jour == i){
                            day.onclick = function(){displayPassage(this);}
                            day.className += " passageDay";
                        }
                        
                    
                    }
                    calendar.children[3].appendChild(day);
                }
        },
        error: function (data) {
            console.log("error");
        }
    });

   


    
}



function changeMonth(element){
    var calendar = document.getElementById("calendar");
    sens = element.id == "next" ? 1 : -1;

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

    $.ajax({
        url: "./controleur.php",
        type: "POST",
        dataType: "json",
        data: {
            "action" : "getPassages",
            "mois" : month+1
        },
        success: function (data) {
            console.log(data);
            var passagesRefuge = document.getElementById("passagesRefuge");
            passagesRefuge.innerHTML = "";
            for(element of data){
                var passage = document.createElement("div");
                passage.className = "passage";
                passagesRefuge.appendChild(passage);

                var listeAttributs = ["mailBenevole", "date", "heureDebut", "heureFin", "description"];
                var currentAttribut;

                for(attribut of listeAttributs){
                    currentAttribut = document.createElement("div");
                    currentAttribut.className = attribut;
                    currentAttribut.innerHTML = element[attribut];
                    passage.appendChild(currentAttribut);
                }
            }

            var daysInMonth = new Date(year, month + 1, 0).getDate();
            var passagesRefuge = document.getElementById("passagesRefuge");
            
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
                    if(jour == i && day.className != "currentDay passageDay"){
                        day.onclick = function(){displayPassage(this);}
                        day.className += " passageDay";
                    }
                }
                calendar.children[3].appendChild(day);
            }
        },
        error: function (data) {
            console.log("error");
        }
    });

    
}

function setMinDate(){
    var date = document.getElementById("datePassage");
    date.min = new Date().toISOString().split("T")[0];
}


function displayPassage(element){
    var passagesRefuge = document.getElementById("passagesRefuge");
    var id = element.innerHTML;
    for(elt of passagesRefuge.children){
        // recupere le jour de la date du passage qui est sous format yyy-mm-dd hh:mm:ss
        var jour = elt.children[1].innerHTML.split(" ")[0].split("-")[2];
        jour = parseInt(jour);
        if(jour == id){
            elt.style.display = "block";
        }else{
            elt.style.display = "none";
        }
    }
    passagesRefuge.style.display = "block";
}
