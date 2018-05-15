function Material(ctx, img)
{
	this.id		 = Material._COUNTER++;
	this.init(ctx, img);
}

Material.prototype.id 			= 0;
Material.prototype.image 		= null;
Material.prototype.texture 		= null;
Material.prototype.color 		= [1.0,1.0,1.0];
Material.prototype.shininess 	= 32.0;
Material._COUNTER 				= 0;



Material.prototype.init = function( ctx, img )
{	
	this.image	 = img;
	this.texture = ctx.createTexture();
	ctx.bindTexture(ctx.TEXTURE_2D, this.texture);
	ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
	ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, true);
	ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, this.image);
	ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);
	ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
	ctx.bindTexture(ctx.TEXTURE_2D, null);
};