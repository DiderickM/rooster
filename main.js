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

function getclass(){
    var e = document.getElementById("myList");
    var klas = e.options[e.selectedIndex].value;
    console.log(klas);
    var baseurl = "https://publish.gepro-osi.nl/roosters/rooster.php?";
    var type = "Klasrooster";
    var school = getCookie("school");
    var url = baseurl + "Type=" + type + "&" + "klassen%5B%5D=" + klas + "&" + "school=" + school;
    scrapeSchedule(url, 
        function(response) {
            document.write(response);
        });
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