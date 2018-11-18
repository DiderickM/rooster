var imported = document.createElement('script');
imported.src = 'JamDrop.js';
document.head.appendChild(imported);

var baseurl = "https://publish.gepro-osi.nl/roosters/rooster.php?";
var url;
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
        //window.location.href = "class.html";
    }
    console.log(url);
    console.log(siteavailable(url));
    /*
    scrapeTagAttr("https://publish.gepro-osi.nl/roosters/rooster.php?school=368&tabblad=1&type=Leerlingrooster", "option", "value",
        function(reponse){
            console.log(response);
        });
    */
   scrapeTextContent("https://publish.gepro-osi.nl/roosters/rooster.php?klassen%5B%5D=HA11&type=Klasrooster&tabblad=1&school=368", function(response){
       alert(response);
   });
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