function Light(x,y,z,r,g,b)
{
	this.id = Light._COUNTER++;
	this.reset(x,y,z,r,g,b);
}

Light.prototype.id			= 0;	
Light.prototype.r			= 1.0;
Light.prototype.g			= 1.0;
Light.prototype.b			= 1.0;
Light.prototype.x			= 0.0;
Light.prototype.y			= 0.0;
Light.prototype.z			= 0.0;
Light.prototype.specularR 	= 1.0;
Light.prototype.specularG 	= 1.0;
Light.prototype.specularB 	= 1.0;

Light._COUNTER		= 0;


Light.prototype.reset = function(x,y,z,r,g,b)
{
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r;
	this.g = g;
	this.b = b;
};

Light.prototype.getColor = function()
{
	return [this.r,this.g,this.b];
};

Light.prototype.getPosition = function()
{
	return [this.x,this.y,this.z];
};

Light.prototype.getSpecularColor = function()
{
	return [this.specularR, this.specularG, this.specularB];
};

