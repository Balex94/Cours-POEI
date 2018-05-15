
function faireHeriter(parentClass,childClass)
{
	var obj = new Object();
	var prop = null;
	var instanceParent = new parentClass();
	var instanceChild = new childClass();
	
	for( prop in instanceParent )
	{
		obj[prop] = instanceParent[prop];
	}
	

	for( prop in instanceChild )
	{
		obj[prop] = instanceChild[prop];
	}
	
	childClass.prototype = obj;
}


function main()
{	
	faireHeriter(Vehicule, Voiture);
	faireHeriter(Voiture, Ferrari);
	
	var ferrari = new Ferrari("vraouuuuummm");
	ferrari.makeNoise();
}


window.addEventListener("load", main);
