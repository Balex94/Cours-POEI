//ES5
"use strict";



function start()
{
	var element = document.getElementById("test");
	console.log(element);
	
	window.removeEventListener("load", start);
}


window.addEventListener("load", start);