function Plane()
{
	this.init();
}

Plane.prototype = new Mesh();

Plane.prototype.init = function()
{
	var vertices = [	0.0,0.0,0.0,
						1.0,0.0,0.0, 
						0.0,1.0,0.0, 
						1.0,1.0,0.0
					];
					
	var uvs = [	0.0,0.0, 
				1.0,0.0,
				0.0,1.0,
				1.0,1.0	];
				
	var indices = 	[0,1,2, 1,3,2 ];
	var normales = 	[
						0.0,0.0,1.0,
						0.0,0.0,1.0,
						0.0,0.0,1.0,
						0.0,0.0,1.0
					];
					
	Mesh.prototype.init.apply(this, [vertices, uvs, indices, normales] );
};

