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
	
	mesh = new Sphere(50,50);
	mesh.x = -2.0;
	mesh.y = 0.0;
	mesh.z = -10.0;
	mesh.scale = 2.0;
	mesh.update();
	
	this._meshes.push(mesh);
	
	
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
	var mesh = null;
	var i = this._meshes.length;
	
	while( --i > -1 )
	{
		mesh = this._meshes[i];
		mesh.rotY++;
		mesh.rotX++;
		mesh.update();
	}
	
	this._renderer.getCamera().update();
	this._renderer.render(this._program, this._meshes, this._texture);
	
	setTimeout( this.drawScene.bind(this), 33 );
};

Main.prototype.changeHandler = function(event)
{
	var renderer = this._renderer;
	var x_val = parseFloat( document.getElementById("x_pos").value );
	var y_val = parseFloat( document.getElementById("y_pos").value );
	var z_val = parseFloat( document.getElementById("z_pos").value );
	
	var r_val = parseFloat( document.getElementById("r_canal").value );
	var g_val = parseFloat( document.getElementById("g_canal").value );
	var b_val = parseFloat( document.getElementById("b_canal").value );
	
	var ar_val = parseFloat( document.getElementById("ar_canal").value );
	var ag_val = parseFloat( document.getElementById("ag_canal").value );
	var ab_val = parseFloat( document.getElementById("ab_canal").value );
	
	var camx_val = parseFloat( document.getElementById("cam_x").value );
	var camy_val = parseFloat( document.getElementById("cam_y").value );
	var camz_val = parseFloat( document.getElementById("cam_z").value );
	
	var rotx_val = parseFloat( document.getElementById("rot_x").value );
	var roty_val = parseFloat( document.getElementById("rot_y").value );
	
	var lightPos = this._renderer.lightPos;
	var lightColor = this._renderer.lightColor;
	var ambiantColor = this._renderer.ambiantColor;
	var camera = this._renderer.getCamera();
	var lightObj = {	
						x: lightPos[0], 
						y: lightPos[1], 
						z: lightPos[2], 
						r: lightColor[0], 
						g: lightColor[1], 
						b: lightColor[2],
						ar: ambiantColor[0],
						ag: ambiantColor[1],
						ab: ambiantColor[2],
						cam_x: camera.x,
						cam_y: camera.y,
						cam_z: camera.z,
						rot_x: camera.rotX,
						rot_y: camera.rotY
					};
	
	TweenMax.to(lightObj, 2, {	
								x: x_val, y: y_val, z: z_val, 
								r: r_val, g: g_val, b: b_val, 
								ar: ar_val, ag: ag_val, ab: ab_val, 
								cam_x: camx_val, cam_y: camy_val, cam_z: camz_val, 
								rot_x: rotx_val, rot_y: roty_val,
								
								onUpdate: function()
								{
									renderer.lightPos = [lightObj.x, lightObj.y, lightObj.z];
									renderer.lightColor = [lightObj.r, lightObj.g, lightObj.b];
									renderer.ambiantColor = [lightObj.ar, lightObj.ag, lightObj.ab];
									renderer.getCamera().x = lightObj.cam_x;
									renderer.getCamera().y = lightObj.cam_y;
									renderer.getCamera().z = lightObj.cam_z;
									renderer.getCamera().rotX = lightObj.rot_x;
									renderer.getCamera().rotY = lightObj.rot_y;
								}
							});	
};

Main.prototype.initListeners = function()
{
	var btn = document.getElementById("change_btn");
	btn.addEventListener("click", this.changeHandler.bind(this));
};

Main.prototype.init 		= function() 
{
	var canvas 		= document.getElementById("canvas");
	
	this._ctx 		= canvas.getContext("experimental-webgl");
	this._renderer 	= new Renderer(this._ctx);
	
	this._program	= new ShaderProgram(	this._ctx, 
											"shaders/f_point/vertexshader.glsl", 
											"shaders/f_point/pixelshader.glsl"
										);
	
	this._renderer.viewportWidth = canvas.width;
	this._renderer.viewportHeight = canvas.height;
	
	
	this.initTexture();
	this.initMeshes();
	this.initListeners();
	this.drawScene();
	
	this.changeHandler();
}

window.onload = function()
{
	var main = new Main();
	main.init();
};

