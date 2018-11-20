var imported = document.createElement('script');
imported.src = 'JamDrop.js';
document.head.appendChild(imported);
var lengthofarray;

var baseurl = "https://publish.gepro-osi.nl/roosters/rooster.php?";
var url;
var schoolcode;

function chooseclasslink(){
    var e = document.getElementById("school");
    var schoolcode = e.options[e.selectedIndex].value;
    
    if(schoolcode == null){
        alert("De school bestaat niet");
    }
    var url = baseurl.concat("school=", schoolcode);
    document.cookie = "url=" + url;
    document.cookie = "school=" + schoolcode;
    if(siteavailable(url) == false){
        alert("De site is nu niet beschikbaar");
    }else{
        scrapeTagAttr(url, "option", "value",
        function(response){
            var cookiename = "value=";
            var cookievar = cookiename.concat("", response);
            document.cookie = cookievar;
            window.location.href = "class.html";
        });
    }
}

function chooseclass(){
    var allclasses = [];
    var lengthofarray;
    console.log(getCookie("value").length);
    console.log(getCookie("url").length);

    if(getCookie("value").length == 0 || getCookie("url").length == 0){
        window.location.href = "index.html";
    }else{
        valueNew = getCookie("value");
    }

    valueNew = valueNew.split(",");
    var list = document.getElementById('myList');
    for (i = 0; i < valueNew.length; i++) {
        var entry = document.createElement("option");
        entry.setAttribute('value', valueNew[i]);
        entry.setAttribute('selected', 'selectedIndex');
        entry.appendChild(document.createTextNode(valueNew[i]));
        list.appendChild(entry);
    }
}

function getSchedule(){
    var url = getCookie("url");
    //console.log(url);
    scrapeSchedule(url, function(response){
        console.log(response);
        processArray(response);
    });
}

function processArray(response){
    var day = ['ma', 'di', 'wo', 'do', 'vr'];

    
    var obj = JSON.parse(response);
    //console.log(obj[1][1]);
    console.log(obj[3][7]);
    //dit moet straks in een lus om alle 'standaard' vakjes te laden
    for(var a = 0; a < 5; a++){
        console.log("+------+");
        console.log(a + 1);
        console.log("+------+");
        for(var i = 0; i < 8; i++){
            if(obj[1][i] != false){
                console.log(i);
                
                var time = [
                    ["08:25", "09:15"],
                    ["09:15", "10:05"],
                    ["10:25", "11:15"],
                    ["11:15", "12:05"],
                    ["12:35", "13:25"],
                    ["13:25", "14:15"],
                    ["14:35", "15:25"],
                    ["15:25", "16:15"]
                ];
                
                var list = document.getElementById(day[a]);
                var dagdata = a + 1;
                var uurdata = i;
                var data = obj[dagdata][uurdata];
                console.log(data);
                var entry = document.createElement("li");
                entry.setAttribute('class', 'single-event');
                entry.setAttribute('data-start', time[i][0]);
                entry.setAttribute('data-end', time[i][1]);
                entry.setAttribute('data-event', 'event-1');
                entry.setAttribute('selected', 'selectedIndex');
                
                varelement = document.createElement("a");
                varelement.setAttribute("href", '#0');
                
                varelementtwo = document.createElement('em');
                varelementtwo.setAttribute('class', 'event-name');
                varelementtwo.appendChild(document.createTextNode(data));
                
                varelement.appendChild(varelementtwo);
                entry.appendChild(varelement);
                list.appendChild(entry);
            }else{console.log("false");};
        }
    };

    loadschedule();
    /*
    var list = document.getElementById(day[0]);
    var deelen = obj[1][1].split(",");
    var entry = document.createElement("li");
    entry.setAttribute('class', 'single-event');
    entry.setAttribute('data-start', time[0][0]);
    entry.setAttribute('data-end', time[0][1]);
    entry.setAttribute('data-event', 'event-1');
    entry.setAttribute('selected', 'selectedIndex');

    varelement = document.createElement("a");
    varelement.setAttribute("href", '#0');

    varelementtwo = document.createElement('em');
    varelementtwo.setAttribute('class', 'event-name');
    varelementtwo.appendChild(document.createTextNode(deelen[2]));

    varelementthree= document.createElement('span');
    varelementthree.setAttribute('class', 'event-date');
    varelementthree.appendChild(document.createTextNode(time[0][0] + ' - ' + time[0][1]));

    varelement.appendChild(varelementthree);
    varelement.appendChild(varelementtwo);
    entry.appendChild(varelement);
    list.appendChild(entry);
    */
};


function getclass(){
    var e = document.getElementById("myList");
    var klas = e.options[e.selectedIndex].value;
    console.log(klas);
    var baseurl = "https://publish.gepro-osi.nl/roosters/rooster.php?";
    var type = "Klasrooster";
    var school = getCookie("school");
    var url = baseurl + "Type=" + type + "&" + "klassen%5B%5D=" + klas + "&" + "school=" + school;
    document.cookie = "url=" + url;
    window.location.href = "schedule.html";
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function siteavailable(url){
    var request = new XMLHttpRequest();  
    request.open('GET', url, true);
    request.onreadystatechange = function(){
        if (request.readyState === 4){
            if (request.status === 404) {  
                console.log("Oh no, it does not exist!");
                return false;
            }  
        }
    }
    return true;
}