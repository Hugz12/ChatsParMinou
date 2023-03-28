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

    calendar.children[1].children[0].children[0].innerHTML = year;
    calendar.children[1].children[0].children[1].innerHTML = monthString[month];
    calendar.children[1].children[0].children[2].innerHTML = month;
    

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
                passage.innerHTML = element;
                passagesRefuge.appendChild(passage);
            }
        },
        error: function (data) {
            console.log("de la merde");
        }
    });

   



    var daysInMonth = new Date(year, month + 1, 0).getDate();
    for (var i = 1; i <= daysInMonth; i++) {
        var day = document.createElement("div");
        day.className = "day";
        if (i == new Date().getDate()) {
            day.className += " currentDay";
        }
        day.innerHTML = i;
        calendar.children[3].appendChild(day);
    }
}



function changeMonth(element){
    var calendar = document.getElementById("calendar");
    sens = element.id == "next" ? 1 : -1;

    var month = parseInt(calendar.children[1].children[0].children[2].innerHTML) + sens;
    var year = parseInt(calendar.children[1].children[0].children[0].innerHTML);

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

    calendar.children[1].children[0].children[0].innerHTML = year;
    calendar.children[1].children[0].children[1].innerHTML = monthString[month];
    calendar.children[1].children[0].children[2].innerHTML = month;

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

                var currentAttribut = document.createElement("div");
                currentAttribut.className = "mail";
                currentAttribut.innerHTML = element["maiBenevole"];
                passage.appendChild(currentAttribut);

                currentAttribut = document.createElement("div");
                currentAttribut.className = "date";
                currentAttribut.innerHTML = element["date"];
                passage.appendChild(currentAttribut);

                currentAttribut = document.createElement("div");
                currentAttribut.className = "heureDebut";
                currentAttribut.innerHTML = element["heureDebut"];
                passage.appendChild(currentAttribut);

                currentAttribut = document.createElement("div");
                currentAttribut.className = "heureFin";
                currentAttribut.innerHTML = element["heureFin"];
                passage.appendChild(currentAttribut);

                currentAttribut = document.createElement("div");
                currentAttribut.className = "description";
                currentAttribut.innerHTML = element["description"];
                passage.appendChild(currentAttribut);
            }
        },
        error: function (data) {
            console.log("de la merde");
        }
    });

    var daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (var i = 1; i <= daysInMonth; i++) {
        var day = document.createElement("div");
        day.className = "day";
        if (i == new Date().getDate() && month == new Date().getMonth() && year == new Date().getFullYear()) {
            day.className += " currentDay";
        }
        day.innerHTML = i;
        calendar.children[3].appendChild(day);
    }


}

function setMinDate(){
    var date = document.getElementById("datePassage");
    date.min = new Date().toISOString().split("T")[0];
}