function Main(){}
	

Main.prototype._ctx				= null;
Main.prototype._program			= null;
Main.prototype._plane			= null;

Main.prototype.initMeshes		= function(program)
{
	var alpha 		= 1.0;
	var materials	= new Array();
	var mesh 		= null;
	var i 			= 1;
	
	materials.push( new Material(this._ctx,document.getElementById("texture")) );
	materials.push( new Material(this._ctx,document.getElementById("texture2")) );
	
	this._scene.meshes = new Array();
	
	while( --i > -1 )
	{
		//alpha = 0.5 + Math.random() * 1.5;
		//alpha = (alpha > 1) ? 1 : alpha;
		alpha = 1;
		
		mesh = new Sphere(30,30);
		mesh.x = 0;
		mesh.y = 0;
		mesh.z = -5;
		mesh.alpha = alpha;
		mesh.scale = 1.0;
		mesh.material = materials[i%materials.length];
		mesh.program = program;
		mesh.update();
		
		this._scene.meshes.push(mesh);
	}
	
	
	this._plane = new Plane();
	this._plane.scale = 0.1;
	this._plane.program = program;
	this._plane.material = materials[0];
	this._scene.meshes.push(this._plane);
};

Main.prototype.animate			= function()
{
	var mesh = null;
	var i = this._scene.meshes.length;
	var stats = this._scene.getStats();
	
	document.getElementById("fps").innerText 		= stats.fps;
	document.getElementById("triangles").innerText 	= stats.triangles;
	document.getElementById("meshes").innerText 	= stats.meshes;
	document.getElementById("drawCalls").innerText 	= stats.drawCalls;
	document.getElementById("tasks").innerText 		= stats.tasks;
	
	while( --i > -1 )
	{
		mesh = this._scene.meshes[i];
		mesh.rotY++;
		mesh.rotX++;
		mesh.rotZ++;
		mesh.update();
	}
	
	setTimeout( this.animate.bind(this), 30 );
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
	var plane			= this._plane;
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
									
									plane.x =lightObj.x;
									plane.y =lightObj.y;
									plane.z =lightObj.z;
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
	var program		= null;
	
	this._ctx 		= canvas.getContext("experimental-webgl");
	this._scene 	= new Scene(this._ctx, canvas.width, canvas.height);
	
	program			= new ShaderProgram(	this._ctx, 
											"shaders/f_point/vertexshader.glsl", 
											"shaders/f_point/pixelshader.glsl"
										);
	
	this.initMeshes(program);
	this.initListeners();
	this.animate();
	this.changeHandler(null);
	
	
	this._scene.render();
}

window.onload 					= function()
{
	var main = new Main();
	main.init();
};

