/*
JamDrop Open Source Javascript Library v1.0.0
Date: 04.03.18.
Written by James Ryan (codejoyContact@gmail.com).
*/

//Selector model.
function $(selector){
	//Main object.
	var jamdrop = {};
	jamdrop.selector = selector;
	jamdrop.element = document.querySelector(jamdrop.selector);
	
	//Get element by id.
	var id = document.getElementById(selector);
	
	//Basic DOM functions.
	if(selector !== null){
		
		//Collect the content of an element.
		jamdrop.getText = function(){
			var getText = id.innerHTML;
			return getText;
		}
		
		//Set the content of an element.
		jamdrop.setContent = function(newText){
			id.innerHTML = newText;
		}
		
		//Change the background of an element.
		jamdrop.background = function(newBackground){
			id.style.background = newBackground;
		}
		
		//Change the width of an element.
		jamdrop.width = function(newWidth){
			id.style.width = newWidth;
		}
		
		//Change the height of an element.
		jamdrop.height = function(newHeight){
			id.style.height = newHeight;
		}
		
		//Change the colour of an element.
		jamdrop.color = function(newColor){
			id.style.color = newColor;
		}
		
		//Change the font-family of an element.
		jamdrop.font = function(newFont){
			id.style.fontFamily = newFont;
		}
		
		//Change the font-size of an element.
		jamdrop.fontSize = function(newSize){
			id.style.fontSize = newSize;
		}		
		
		//Move the element right.
		jamdrop.moveRight = function(distance){
			id.style.position = "absolute";
			var currentPlace = 0;
			if(id.style.left.toString().includes("px")){
				currentPlace = parseInt(id.style.left.toString().replace("px", ""));
			}else{}
			var newPlace = (currentPlace + parseInt(distance.toString().replace("px", "")));
			distance = newPlace.toString() + "px";
			id.style.left = distance;
		}
		
		//Move the element left.
		jamdrop.moveLeft = function(distance){
			id.style.position = "absolute";
			var currentPlace = 0;
			if(id.style.left.toString().includes("px")){
				currentPlace = parseInt(id.style.left.toString().replace("px", ""));
			}else{}
			var newPlace = (currentPlace - parseInt(distance.toString().replace("px", "")));
			distance = newPlace.toString() + "px";
			id.style.left = distance;
		}
		
		//Show the element.
		jamdrop.show = function(){
			id.style.opacity = "1.0";
		}
		
		//Hide the element.
		jamdrop.hide = function(){
			id.style.opacity = "0.0";
		}
		
		//Detect element click.
		jamdrop.click = function(func){
			id.onclick = func;
		}
		
		//Detect element double click.
		jamdrop.dblClick = function(func){
			id.ondblclick = func;
		}
		
		//Destroy/remove the element.
		jamdrop.kill = function(){
			id.parentElement.removeChild(id);
		}
		
		//Remove all the children of an element.
		jamdrop.drain = function(){
			//Not compatible in IE (fix that later). 
			id.innerHTML = "";
		}

		//Create a child element within the parent element.
		jamdrop.createChild = function(el){
			var newChild = document.createElement(el);
			id.appendChild(newChild);
		}
		
		//Detect mouse over element.
		jamdrop.mouseOver = function(func){
			id.addEventListener("mouseover", func);
		}
		
		//Detect mouse leaving element.
		jamdrop.mouseOut = function(func){
			id.addEventListener("mouseout", func);
		}
		
		//Detect hover over an element.
		jamdrop.hover = function(func){
			//Add this feature.
		}
		
		//Get the current styling of an element.
		jamdrop.getCss = function(css){
			var currentCss = window.getComputedStyle(id, null).getPropertyValue(css);
			return currentCss;
		}
		
		//Elevate the element.
		jamdrop.elevate = function(elevation, color){
			if(color === undefined){
				color = "#ededed";
			}else{}
			if(elevation === undefined){
				elevation = "1px";
			}else{}
			id.style.boxShadow = elevation + " " + elevation + " " + elevation + " " + elevation + " " + color;
		}
		
		//Get a specific attribute of a certain element.
		jamdrop.getAttr = function(attr){
			var attrValue = id.getAttribute(attr);
			return attrValue;
		}
		
		//Centre an element.
		jamdrop.center = function(){
			var left = (id.parentElement.offsetWidth - id.offsetWidth) / 2;
			id.style.marginLeft = left.toString() + "px";
		}
		
		//Centre the text of an element.
		jamdrop.centerText = function(){
			id.style.textAlign = "center";
		}
		
	}else{}

	//Return jamdrop.
	return jamdrop;
}

//Functions.
//Detect whether the document is ready.
function documentReady(func){
	window.addEventListener("load", function(){
        func();
    }); 
}

//Change the location of the window.
function windowLocation(newPlace){
	window.location = newPlace;
}

//Split the string into an array of characters.
function explode(array){
	var explodedArray = array.split("");
	return explodedArray;
}

//Find the index of a certain char, int ect in an array.
function indexOf(char, array){
	var index = 0;
	for(findIndex = 0; findIndex < array.length; findIndex++){
		if(array[findIndex] === char){
			index = findIndex;
		}else{}
	}
	
	return index;
}

//Combine the items of two arrays into one array.
function mergeArray(arrayOne, arrayTwo, unique){
	//New array.
	var newArray = arrayOne.concat(arrayTwo);
	return newArray;
}

//Convert an array to a string.
function arrayToString(array, seperator){
	if(seperator === undefined){
		seperator = "";
	}else{}
	var variable = "";
	for(arrTo = 0; arrTo < array.length; arrTo++){
		if(arrTo !== 0){
			variable = variable + seperator + array[arrTo].toString();
		}else{
			variable = variable + array[arrTo].toString();
		}
	}
	return variable;
}

//Clear/wipe an array.
function drainArray(array){
	var newArray = new Array(array.length);
	return newArray;
}

//Server-side functions.
//Text call (textfile, success function).
function textCall(filename, func){	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			func(this.responseText);
		}else{}
	};
	xhttp.open("GET", filename, true);
	xhttp.send();
}

//PHP: Call to any PHP file (file, data given, success function).
function phpCall(filename, data, func){
    var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			func(this.responseText);
		}else{}
	};
	xhttp.open("GET", filename + "?jamPass=" + data, true);
	xhttp.send();
}

//Scrape the element by id from an external server.
function scrapeElementById(url, newId, func){
    var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			func(this.responseText);
		}else{}
	};
	xhttp.open("GET", "lib_php/scrapeElementById.php?idPass=" + url + " " + newId, true);
	xhttp.send();
}

//Scrape the tagname by id from an external server.
function scrapeTagById(url, newId, func){
    var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		func(this.responseText);
    	}else{}
	};
	xhttp.open("GET", "lib_php/scrapeTagById.php?tagPass=" + url + " " + newId, true);
	xhttp.send();
}

//Scrape an element by tagname.
function scrapeElementsByTag(url, tagName, func, index){
    var realIndex = "";
    if(index === undefined){
        realIndex = "all";
    }else{
        realIndex = index;
    }
    var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			func(this.responseText);
		}{}
	};
	xhttp.open("GET", "lib_php/scrapeElementsByTag.php?tagPass=" + url + " " + tagName + " " + realIndex, true);
	xhttp.send();
}

//Scrape all the p elements from a webpage.
function scrapeTextContent(url, func){
    var realIndex = "all";
    var tagName = "p";
    var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			func(this.responseText);
		}else{}
	};
	xhttp.open("GET", "lib_php/scrapeElementsByTag.php?tagPass=" + url + " " + tagName + " " + realIndex, true);
	xhttp.send();
}

//Scrape attribute by tag name.
function scrapeTagAttr(url, newTag, attr, func){
    var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		func(this.responseText);
    	}else{}
	};
	xhttp.open("GET", "lib_php/scrapeTagAttr.php?tagPass=" + btoa(url + " " + newTag + " " + attr), true);
	xhttp.send();
}

//Scrape schedules (custom)
function scrapeSchedule(url, func){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			func(this.responseText);
		} else{}
	};
	xhttp.open("GET", "lib_php/scrapeSchedule.php?tagPass=" + btoa(url), true);
	xhttp.send();
}