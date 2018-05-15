function Mesh(){}

Mesh.prototype.vertices 	= null;
Mesh.prototype.normals 		= null;
Mesh.prototype.uvs			= null;
Mesh.prototype.alpha		= 1.0;
Mesh.prototype.matrix		= null;
Mesh.prototype.width		= 1.0;
Mesh.prototype.height		= 1.0;
Mesh.prototype.x			= 0.0;
Mesh.prototype.y			= 0.0;
Mesh.prototype.z			= 0.0;
Mesh.prototype.rotX			= 0.0;
Mesh.prototype.rotY			= 0.0;
Mesh.prototype.rotZ			= 0.0;
Mesh.prototype.scale		= 1.0;
Mesh.prototype.id			= 0;

Mesh.NORMAL_SIZE			= 3;
Mesh.VERTEX_SIZE			= 4;
Mesh.INDEX_SIZE				= 1;
Mesh.UVS_SIZE				= 2;

Mesh.prototype.init			= function(width, height, textureRect, alpha )
{
	this.matrix		= mat4.create();
	this.indices 	= [0,1,2,1,2,3];
	this.alpha 		= alpha;
	this.uvs 		= [
		textureRect[0]					, textureRect[1],
		textureRect[0] + textureRect[2]	, textureRect[1],
		textureRect[0]					, textureRect[1] + textureRect[3],
		textureRect[0] + textureRect[2]	, textureRect[1] + textureRect[3]
	];
	
	this.width 	= width;
	this.height = height;
	
	this.update();
};

Mesh.prototype.update		= function()
{
	var degtorad = Math.PI / 180;
	var vertex1			= [0.0, 0.0, 0.0, 1.0];
	var vertex2			= [this.width, 0.0, 0.0, 1.0];
	var vertex3			= [0.0, this.height, 0.0, 1.0];
	var vertex4			= [this.width, this.height, 0.0, 1.0];
	var normal			= Utils.normalize( Utils.getNormal(vertex2, vertex3) );
	var nMatrix			= mat4.create();
	
	mat4.identity(nMatrix);
	mat4.identity(this.matrix);
	mat4.translate(this.matrix,[this.x,this.y,this.z]);
	
	if( this.scale != 1.0 )
	{
		mat4.scale(this.matrix, [this.scale, this.scale, this.scale]);
	}
	
	if( this.rotX != 0 )
	{
		mat4.rotateX(this.matrix, this.rotX * degtorad );
		mat4.rotateX(nMatrix, this.rotX * degtorad );
	}
		
	if( this.rotY != 0 )
	{
		mat4.rotateY(this.matrix, this.rotY * degtorad );
		mat4.rotateY(nMatrix, this.rotY * degtorad );
	}
		
	if( this.rotZ != 0 )
	{
		mat4.rotateZ(this.matrix, this.rotZ * degtorad );	
		mat4.rotateZ(nMatrix, this.rotZ * degtorad );	
	}
		
	mat4.multiplyVec4(this.matrix, vertex1);
	mat4.multiplyVec4(this.matrix, vertex2);
	mat4.multiplyVec4(this.matrix, vertex3);
	mat4.multiplyVec4(this.matrix, vertex4);
	
	mat4.multiplyVec3(nMatrix, normal);
	
	this.vertices = [
		vertex1[0], vertex1[1], vertex1[2], this.alpha,
		vertex2[0], vertex2[1], vertex2[2], this.alpha,
		vertex3[0], vertex3[1], vertex3[2], this.alpha,
		vertex4[0], vertex4[1], vertex4[2], this.alpha
	];
	
	this.normals = [
		normal[0], normal[1], normal[2],
		normal[0], normal[1], normal[2],
		normal[0], normal[1], normal[2],
		normal[0], normal[1], normal[2]
	];
};


