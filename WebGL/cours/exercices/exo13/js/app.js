function Main(){}
	

Main.prototype._ctx				= null;
Main.prototype._program			= null;
Main.prototype._plane			= null;

Main.prototype.initMeshes		= function(program)
{
	var alpha 		= 1.0;
	var materials	= new Array();
	var mesh 		= null;
	var i 			= 0;
	var max			= 0;
	var data 		= Utils.getData("./data/teapot.json");
	
	materials.push( new Material(this._ctx,document.getElementById("jouy")) );
	materials.push( new Material(this._ctx,document.getElementById("earth")) );
	materials.push( new Material(this._ctx,document.getElementById("metal")) );
	materials.push( new Material(this._ctx,document.getElementById("moon")) );
	materials.push( new Material(this._ctx,document.getElementById("numbers")) );
	
	materials[0].shininess = 32.0;
	
	this._scene.meshes = new Array();
	
	this._plane = new Plane();
	this._plane.scale = 0.1;
	//this._plane.visible = false;
	this._plane.program = program;
	this._plane.material = materials[0];
	this._scene.meshes.push(this._plane);
	
	max = data.meshes.length;
	
	for( i = 0; i < max; i++ )
	{
		mesh = new Mesh();
		mesh.x = data.meshes[i].x;
		mesh.y = data.meshes[i].y;
		mesh.z = data.meshes[i].z;
		mesh.rotX = data.meshes[i].rotationX;
		mesh.rotY = data.meshes[i].rotationY;
		mesh.rotZ = data.meshes[i].rotationZ;
		mesh.scale = data.meshes[i].scale;
		mesh.pivotX = data.meshes[i].pivotX;
		mesh.pivotY = data.meshes[i].pivotY;
		mesh.pivotZ = data.meshes[i].pivotZ;
		mesh.alpha = data.meshes[i].alpha;
		
		mesh.init( 	data.meshes[i].vertices, 
					data.meshes[i].uvs, 
					data.meshes[i].indices, 
					data.meshes[i].normales );
					
		mesh.material = materials[i%materials.length];
		mesh.program = program;
		mesh.update();
		
		
		this._scene.meshes.push(mesh);
	}
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
		mesh.update();
	}
	
	setTimeout( this.animate.bind(this), 30 );
};

Main.prototype.changeHandler 	= function(event)
{
	var scene 			= this._scene;
	var plane			= this._plane;
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
	
	TweenMax.to(	plane,
					2, 
					{
						x:x_val,
						y:y_val,
						z:z_val,
						onUpdate:function()
						{
							plane.update();
						}
					}
				);
	
	TweenMax.to(	scene.pointLight, 
					2, 
					{	x:x_val, 
						y:y_val, 
						z:z_val, 
						r:r_val, 
						g:g_val, 
						b:b_val ,
						specularR: 1.0,
						specularG: 1.0,
						specularB: 1.0
					}
				);	
				
	TweenMax.to(	scene.ambientLight, 
					2, 
					{
						r:ar_val, 
						g:ag_val, 
						b:ab_val 
					}
				);
				
	TweenMax.to( 	scene.camera, 
					2,
					{
						x: camx_val,
						y: camy_val,
						z: camz_val,
						rotX: rotx_val,
						rotY: roty_val
					}
				);
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

