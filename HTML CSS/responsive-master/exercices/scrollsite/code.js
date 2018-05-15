
var tl = null;
	
function getScroll()
{
	var element = document.getElementById("map");
	return element.scrollLeft;
}

function getMaxScroll()
{
	var element = document.getElementById("map");
	return element.scrollWidth - 800;
}
	
function getScrollProgression()
{
	var progression =  parseInt( (getScroll() / getMaxScroll()) * 100 );
	progression = progression / 100;
	return progression;
}

function onScroll()
{
	var progression = getScrollProgression();
	var currentTime = progression * tl.totalDuration();
	
	document.getElementById("time").innerHTML = currentTime+"s";
	tl.progress(progression);
}

function init()
{	
	var element = document.getElementById("map");
	element.onscroll = onScroll;
	
	tl = new TimelineMax();
	
	tl.to("#bilbo_img", 0, {"rotation":0,"scaleX":2, "scaleY":2}, 0 )
	  .to("#bilbo_img", 1, {"rotation":0,"scaleX":1, "scaleY":1}, 1 )
	  .to("#gollum_img", 1, {"rotation":0,"scaleX":2, "scaleY":2}, 5 )
	  .to("#gollum_img", 1, {"rotation":0,"scaleX":1, "scaleY":1}, 11 )
	  .to("#gollum_img", 1, {"rotation":0,"scaleX":1, "scaleY":1}, 13 )
	  .to("#ring_img", 1, {"rotation":0,"scaleX":2, "scaleY":2}, 15 )
	  .to("#end", 0, {"top":0}, 20 );
	  
	tl.pause();
	
	
	/*
	document.getElementById("bilbo_img").onclick = function()
	{
		TweenLite.to( "#bilbo_img", 2, {"rotation":90,"scaleX":5, "scaleY":5} );
	};*/
	
}

window.onload = init;

		