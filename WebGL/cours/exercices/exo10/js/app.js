function Main(){}
	

Main.prototype._ctx				= null;
Main.prototype._material		= null;
Main.prototype._program			= null;

Main.prototype.initMeshes		= function(material, program)
{
	var mesh = null;
	var i = 10;
	
	this._scene.meshes = new Array();
	
	while( --i > -1 )
	{
		mesh = new Sphere(30,30);
		mesh.x = (Math.random() * 10) - 5;
		mesh.y = (Math.random() * 10) - 5;
		mesh.z = -5 + -(Math.random() * 10);
		mesh.scale = 1.0;
		mesh.material = material;
		mesh.program = program;
		mesh.update();
		this._scene.meshes.push(mesh);
	}
};

Main.prototype.drawScene		= function()
{
	var mesh = null;
	var i = this._scene.meshes.length;
	
	while( --i > -1 )
	{
		mesh = this._scene.meshes[i];
		mesh.rotY++;
		mesh.rotX++;
		mesh.update();
	}
	
	
	this._scene.render();
	
	setTimeout( this.drawScene.bind(this), 33 );
};

Main.prototype.changeHandler 	= function(event)
{
	var scene 			= this._scene;
	var x_val 			= parseFloat( document.getElementById("x_pos").value );
	var y_val 			= parseFloat( document.getElementById("y_pos").value );
	var z_val 			= parseFloat( document.getElementById("z_pos").value );
	
	var r_val 			= parseFloat( document.getElementById("r_canal").value );
	var g_val 			= parseFloat( document.getElementById("g_canal").value );
	var b_val 			= parseFloat( document.getElementById("b_canal").value );
	
	var ar_val 			= parseFloat( document.getElementById("ar_canal").value );
	var ag_val 			= parseFloat( document.getElementById("ag_canal").value );
	var ab_val 			= parseFloat( document.getElementById("ab_canal").value );
	
	var camx_val 		= parseFloat( document.getElementById("cam_x").value );
	var camy_val 		= parseFloat( document.getElementById("cam_y").value );
	var camz_val 		= parseFloat( document.getElementById("cam_z").value );
	
	var rotx_val 		= parseFloat( document.getElementById("rot_x").value );
	var roty_val 		= parseFloat( document.getElementById("rot_y").value );
	
	var lightPos 		= this._scene.pointLightPosition;
	var lightColor 		= this._scene.pointLightColor;
	var ambiantColor 	= this._scene.ambiantLightColor;
	var camera 			= this._scene.camera;
	var lightObj 		= {	
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
									scene.pointLightPosition = [lightObj.x, lightObj.y, lightObj.z];
									scene.pointLightColor = [lightObj.r, lightObj.g, lightObj.b];
									scene.ambiantLightColor = [lightObj.ar, lightObj.ag, lightObj.ab];
									scene.camera.x = lightObj.cam_x;
									scene.camera.y = lightObj.cam_y;
									scene.camera.z = lightObj.cam_z;
									scene.camera.rotX = lightObj.rot_x;
									scene.camera.rotY = lightObj.rot_y;
								}
							});	
};

Main.prototype.initListeners 	= function()
{
	var btn = document.getElementById("change_btn");
	btn.addEventListener("click", this.changeHandler.bind(this));
};

Main.prototype.init 			= function() 
{
	var canvas 		= document.getElementById("canvas");
	var material	= null;
	var program		= null;
	
	this._ctx 		= canvas.getContext("experimental-webgl");
	this._scene 	= new Scene(this._ctx, canvas.width, canvas.height);
	
	program			= new ShaderProgram(	this._ctx, 
											"shaders/f_point/vertexshader.glsl", 
											"shaders/f_point/pixelshader.glsl"
										);
	
	material 		= new Material();
	material.init(this._ctx,document.getElementById("texture"));
	
	this.initMeshes(material,program);
	this.initListeners();
	this.drawScene();
	this.changeHandler(null);
}

window.onload 					= function()
{
	var main = new Main();
	main.init();
};

