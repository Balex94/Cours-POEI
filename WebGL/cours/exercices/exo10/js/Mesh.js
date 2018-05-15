function Mesh(){}

Mesh.prototype.indices		= null;
Mesh.prototype.vertices 	= null;
Mesh.prototype.normales 	= null;
Mesh.prototype.uvs			= null;
Mesh.prototype.alpha		= 1.0;
Mesh.prototype.matrix		= null;
Mesh.prototype.x			= 0.0;
Mesh.prototype.y			= 0.0;
Mesh.prototype.z			= 0.0;
Mesh.prototype.rotX			= 0.0;
Mesh.prototype.rotY			= 0.0;
Mesh.prototype.rotZ			= 0.0;
Mesh.prototype.scale		= 1.0;
Mesh.prototype.id			= 0;
Mesh.prototype.pivotX		= 0;
Mesh.prototype.pivotY		= 0;
Mesh.prototype.pivotZ		= 0;
Mesh.prototype.program		= null;
Mesh.prototype.material		= null;

Mesh.NORMAL_SIZE			= 3;
Mesh.VERTEX_SIZE			= 4;
Mesh.INDEX_SIZE				= 1;
Mesh.UVS_SIZE				= 2;

Mesh.prototype.init			= function(vertices, uvs, indices, normales )
{
	this.matrix		= mat4.create();
	this.normales	= normales;
	this.indices 	= indices;
	this.uvs	 	= uvs;
	
	this.setVertices(vertices);
	this.update();
};

Mesh.prototype.setVertices	= function(vertices)
{
	var vertex = null;
	var i = 0;
	var max = vertices.length;
	
	this.vertices = new Array();
	
	for( i = 0; i < max; i+=3 )
	{
		this.vertices.push(	vertices[i],
							vertices[i+1], 
							vertices[i+2],
							this.alpha
						);
	}
};

Mesh.prototype.update		= function()
{
	var degtorad= Math.PI / 180;
	
	mat4.identity(this.matrix);
	mat4.translate(this.matrix,[this.x,this.y,this.z]);
	
	if( this.scale != 1.0 )
		mat4.scale(this.matrix, [this.scale, this.scale, this.scale]);
	
	if( this.rotX != 0 )
		mat4.rotateX(this.matrix, this.rotX * degtorad );
		
	if( this.rotY != 0 )
		mat4.rotateY(this.matrix, this.rotY * degtorad );
		
	if( this.rotZ != 0 )
		mat4.rotateZ(this.matrix, this.rotZ * degtorad );	
	
};

Mesh.prototype.getNormalMatrix = function()
{
	var n = mat3.create();
	mat4.toInverseMat3(this.matrix, n);
	mat3.transpose(n);
	
	return n;
};


