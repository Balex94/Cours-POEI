function Cube()
{
	this.init();
}

Cube.prototype = new Mesh();

Cube.prototype.init = function()
{	
	var vertices = [	0.0,0.0,0.0,
						1.0,0.0,0.0, 
						0.0,1.0,0.0, 
						1.0,1.0,0.0,
						
						0.0,0.0,-1.0,
						1.0,0.0,-1.0, 
						0.0,1.0,-1.0, 
						1.0,1.0,-1.0,
					];
					
	var uvs = [	0.0,0.0, 
				1.0,0.0,
				0.0,1.0,
				1.0,1.0,
				
				0.0,0.0, 
				1.0,0.0,
				0.0,1.0,
				1.0,1.0
				];
				
	var indices = 	[0,1,2,1,3,2,  4,5,6,5,7,6  ];
	var normales = 	[
						0.0,0.0,1.0,
						0.0,0.0,1.0,
						0.0,0.0,1.0,
						0.0,0.0,1.0,
						
						0.0,0.0,-1.0,
						0.0,0.0,-1.0,
						0.0,0.0,-1.0,
						0.0,0.0,-1.0
					];
					
	Mesh.prototype.init.apply(this, [vertices, uvs, indices, normales] );
};

