function Main(){}
	
Main.prototype._camera		= null;
Main.prototype._ctx			= null;
Main.prototype._prgm		= null;
Main.prototype._mvMatrix 	= null;
Main.prototype._pMatrix 	= null;
Main.prototype._buffer		= null;
Main.prototype._indexBuffer	= null;
Main.prototype._uvBuffer	= null;
Main.prototype._texture		= null;
Main.prototype._image		= null;
Main.prototype._custom		= null;
Main.prototype._meshes		= null;
Main.prototype.rotY			= 0;


Main.prototype.initTexture = function() 
{
	this._image	 = document.getElementById("texture");
	this._texture = this._ctx.createTexture();
	this._ctx.bindTexture(this._ctx.TEXTURE_2D, this._texture);
	this._ctx.pixelStorei(this._ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
	this._ctx.pixelStorei(this._ctx.UNPACK_FLIP_Y_WEBGL, true);
	this._ctx.texImage2D(this._ctx.TEXTURE_2D, 0, this._ctx.RGBA, this._ctx.RGBA, this._ctx.UNSIGNED_BYTE, this._image);
	this._ctx.texParameteri(this._ctx.TEXTURE_2D, this._ctx.TEXTURE_MAG_FILTER, this._ctx.NEAREST);
	this._ctx.texParameteri(this._ctx.TEXTURE_2D, this._ctx.TEXTURE_MIN_FILTER, this._ctx.NEAREST);
	this._ctx.bindTexture(this._ctx.TEXTURE_2D, null);
};

Main.prototype.getWorldData = function(srcURL)
{
	var http = new XMLHttpRequest();
	var obj = null;
	http.open("GET",srcURL, false); // synchronous call
	http.send();
	
	str = http.responseText;
	obj = JSON.parse(str);
	
	return obj;
};

Main.prototype.initMeshes	= function()
{
	var data 		= this.getWorldData("./data/world.json");
	var vertices 	= null;
	var uvs 		= null;
	var indices 	= null;
	var normales 	= null;
	var mesh		= null;
	var meshData	= null;
	var max			= data.meshes.length;
	var i			= 0;
	
	this._meshes = new Array();
	
	
	for( i = 0; i < max; i++ )
	{
		meshData = data.meshes[i];
		
		mesh = new Mesh();
		mesh.init(meshData.vertices, meshData.uvs, meshData.indices, meshData.normales);
		mesh.alpha = meshData.alpha;
		mesh.rotX = meshData.rotationX;
		mesh.rotY = meshData.rotationY;
		mesh.rotZ = meshData.rotationZ;
		mesh.x = meshData.x;
		mesh.y = meshData.y;
		mesh.z = meshData.z;
		mesh.scale = meshData.scale;
		mesh.update();
		
		this._meshes.push(mesh);
	}
};

Main.prototype.drawScene	= function()
{
	
	var plane1 = this._meshes[0];
	plane1.rotY+=0.5;
	plane1.rotX+=0.5;
	plane1.update();
	this._renderer.getCamera().z = 5.0;
	this._renderer.getCamera().update();
	this._renderer.render(this._program, this._meshes, this._texture);
	
	setTimeout( this.drawScene.bind(this), 33 );
};

Main.prototype.init 		= function() 
{
	var canvas 		= document.getElementById("canvas");
	
	this._ctx 		= canvas.getContext("experimental-webgl");
	this._renderer 	= new Renderer(this._ctx);
	this._program	= new ShaderProgram(this._ctx);
	
	this._renderer.viewportWidth = canvas.width;
	this._renderer.viewportHeight = canvas.height;
	
	
	this.initTexture();
	this.initMeshes();
	
	this.drawScene();
}

window.onload = function()
{
	var main = new Main();
	main.init();
};

