function Mesh(){}

Mesh.prototype._vertices	= null;
Mesh.prototype._normales	= null;
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

Mesh.NORMAL_SIZE			= 3;
Mesh.VERTEX_SIZE			= 4;
Mesh.INDEX_SIZE				= 1;
Mesh.UVS_SIZE				= 2;

Mesh.prototype.init			= function(vertices, uvs, indices, normales )
{
	this.matrix		= mat4.create();
	this._vertices 	= vertices;
	this.indices 	= indices;
	this.uvs	 	= uvs;
	this._normales	= normales;
	
	this.update();
};

Mesh.prototype.update		= function()
{
	var degtorad= Math.PI / 180;
	var vertex	= null;
	var normale	= null;
	var i = 0;
	var max = 0;
	var normalMatrix = mat4.create();
	
	this.vertices = new Array();
	this.normales = new Array();
	
	
	mat4.identity(this.matrix);
	mat4.identity(normalMatrix);
	mat4.translate(this.matrix,[this.x,this.y,this.z]);
	
	if( this.scale != 1.0 )
		mat4.scale(this.matrix, [this.scale, this.scale, this.scale]);
	
	if( this.rotX != 0 )
	{
		mat4.rotateX(this.matrix, this.rotX * degtorad );
		mat4.rotateX(normalMatrix, this.rotX * degtorad );
	}
		
	if( this.rotY != 0 )
	{
		mat4.rotateY(this.matrix, this.rotY * degtorad );
		mat4.rotateY(normalMatrix, this.rotY * degtorad );
	}
		
	if( this.rotZ != 0 )
	{
		mat4.rotateZ(this.matrix, this.rotZ * degtorad );	
		mat4.rotateZ(normalMatrix, this.rotZ * degtorad );	
	}
	
		
	max = this._vertices.length;
	
	for( i = 0; i < max; i+=3 )
	{
		vertex = [this._vertices[i],this._vertices[i+1],this._vertices[i+2]];
		normale = [this._normales[i],this._normales[i+1],this._normales[i+2]];
		mat4.multiplyVec3(this.matrix, vertex);
		mat4.multiplyVec3(normalMatrix, normale);
		
		this.vertices.push(vertex[0], vertex[1], vertex[2], this.alpha);
		this.normales.push(normale[0], normale[1], normale[2]);
	}
	
	console.log(this.normales);
};


