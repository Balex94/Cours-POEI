
/*hérite de voiture*/
function Ferrari(noise)
{
	Voiture.apply(this,[noise]);
}

Ferrari.prototype.makeNoise = function()
{
	// super appel de la méthode parente
	Voiture.prototype.makeNoise.apply(this); 
	console.log("méthode surchargée");
};

