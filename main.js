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
        var cookiename = "url=";
        var cookievar = cookiename.concat("", url);
        document.cookie = cookievar;
        window.location.href = "class.html";
    }
    console.log(url);
    console.log(siteavailable(url));
}

function chooseclass(){
    var allclasses = [];
    console.log(getCookie("url"));
    if(getCookie("url") == null){
        window.location.href = "index.html";
    }else{
        url = getCookie("url");
    }

    scrapeElementsByTag(url, "option",
    function(response){
        var classcount = response.length, prevalue = 0, indexofarray = 0, i;
        for(i= 4; i < classcount + 4; i = i + 4){
            allclasses[indexofarray] = response.substring(prevalue, i);
            var temp = response.substring(prevalue, i);
            prevalue = i;
            indexofarray++;
        }
        lengthofarray = indexofarray;
        console.log(lengthofarray);
        for(var i = 0; i < lengthofarray; i++){
            document.write(allclasses[i]);
        }
    });
    console.log(allclasses);
    console.log(allclasses.length);
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