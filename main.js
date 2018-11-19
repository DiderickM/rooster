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
    console.log(getCookie("value"));
    if(getCookie("value") == null){
        window.location.href = "index.html";
    }else{
        valueNew = getCookie("value");
    }
    valueNew = valueNew.split(",");
    var list = document.getElementById('myList');
    for (i = 0; i < valueNew.length; i++) {
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(valueNew[i]));
        list.appendChild(entry);
    }
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