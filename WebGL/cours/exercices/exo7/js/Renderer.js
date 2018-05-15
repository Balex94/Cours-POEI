function Renderer(ctx)
{
	this.init(ctx);
}


Renderer.prototype._meshes 			= null;
Renderer.prototype._vertexBuffer 	= null;
Renderer.prototype._normalBuffer 	= null;
Renderer.prototype._uvsBuffer 		= null;
Renderer.prototype._indexBuffer 	= null;
Renderer.prototype._camera			= null;
Renderer.prototype._meshes			= null;
Renderer.prototype._texture			= null;
Renderer.prototype._pMatrix			= null;
Renderer.prototype._custom			= null;

Renderer.prototype.viewportWidth	= 800;
Renderer.prototype.viewportHeight	= 600;
Renderer.prototype._lightColor		= [1.0,1.0,1.0];
Renderer.prototype._ambiantColor	= [0.1,0.1,0.1];
Renderer.prototype._lightDirection	= [0.0,0.0,1.0];


Renderer.prototype.init	= function(context)
{
	this._ctx			= context;
	this._custom		= new Object();
	this._camera		= new Camera();
	this._pMatrix		= mat4.create();
	this._vertexBuffer 	= this._ctx.createBuffer();
	this._uvBuffer 		= this._ctx.createBuffer();
	this._indexBuffer 	= this._ctx.createBuffer();
	this._normalBuffer 	= this._ctx.createBuffer();
};

Renderer.prototype._updateBuffers = function()
{
	var vertices = new Array();
	var normals	= new Array();
	var uvs = new Array();
	var indices = new Array();
	var meshes = this._meshes;
	var i = 0;
	var j = 0;
	var max = this._meshes.length;
	var max2 = 0;
	var currentMesh = null;
	var offset = 0;
	
	for( i = 0; i < max; i++ )
	{
		currentMesh = this._meshes[i];
		vertices = vertices.concat(currentMesh.vertices);
		normals = normals.concat(currentMesh.normals);
		uvs = uvs.concat(currentMesh.uvs);
		
		max2 = currentMesh.indices.length;
		
		for( j = 0; j < max2; j++ )
		{
			indices.push( currentMesh.indices[j] + offset );
		}
		
		offset += currentMesh.vertices.length / Mesh.VERTEX_SIZE;
	}
	
	this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._vertexBuffer);
	this._ctx.bufferData(this._ctx.ARRAY_BUFFER, new Float32Array(vertices), this._ctx.STATIC_DRAW);
	this._custom.numItems = vertices.length / Mesh.VERTEX_SIZE;
	
	this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._normalBuffer);
	this._ctx.bufferData(this._ctx.ARRAY_BUFFER, new Float32Array(normals), this._ctx.STATIC_DRAW);
	this._custom.normalNumItems = normals.length / Mesh.NORMAL_SIZE;
	
	this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._uvBuffer);
	this._ctx.bufferData(this._ctx.ARRAY_BUFFER, new Float32Array(uvs), this._ctx.STATIC_DRAW);
	this._custom.coordNumItems = uvs.length / Mesh.UVS_SIZE;
	
	this._ctx.bindBuffer(this._ctx.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	this._ctx.bufferData(this._ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this._ctx.STATIC_DRAW);
	this._custom.indexNumItems = indices.length / Mesh.INDEX_SIZE;
};

Renderer.prototype.sortBackToFront	= function(meshA, meshB)
{
	var distA = this.distanceFromCamera(meshA);
	var distB = this.distanceFromCamera(meshB);
	
	return ( distA > distB ) ? -1 : 1;
};

Renderer.prototype.getCamera = function()
{
	return this._camera;
};

Renderer.prototype.distanceFromCamera = function( mesh )
{
	var vec1 = [mesh.width/2, mesh.height/2, 0.0, 1.0];
	var mat = mat4.create();
	
	mat4.identity(mat);
	mat4.multiply(mat, this._camera.matrix);
	mat4.multiply(mat, mesh.matrix);
	mat4.multiplyVec4(mat, vec1);
	
	var distX = - vec1[0] * - vec1[0];
	var distY = - vec1[1] * - vec1[1];
	var distZ = - vec1[2] * - vec1[2];
	
	var segLength = Math.sqrt( distX + distY + distZ);
	return segLength;
};


Renderer.prototype.render = function(program, meshes, texture )
{
	meshes.sort(this.sortBackToFront.bind(this));
	
	this._ctx.clearColor(0.0, 0.0, 0.0, 1.0);
	this._ctx.enable(this._ctx.DEPTH_TEST);
	//this._ctx.disable(this._ctx.DEPTH_TEST);
	//this._ctx.blendFunc(this._ctx.ONE, this._ctx.ONE_MINUS_SRC_ALPHA);
	//this._ctx.enable(this._ctx.BLEND);
	
	this._render(program, meshes, texture);
};

Renderer.prototype._render = function(program, meshes, texture)
{
	var ldir = vec3.create();
	vec3.normalize(this._lightDirection, ldir);
    vec3.scale(ldir, -1);
	
	this._ctx.viewport(0, 0, this.viewportWidth, this.viewportHeight);
	this._ctx.clear(this._ctx.COLOR_BUFFER_BIT | this._ctx.DEPTH_BUFFER_BIT);
	
	this._meshes = meshes;
	this._camera.update();
	this._updateBuffers();

	mat4.identity(this._pMatrix);
	mat4.perspective(45, this.viewportWidth / this.viewportHeight, 0.1, 100.0, this._pMatrix);
	
	this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._vertexBuffer);
	this._ctx.vertexAttribPointer(program.vertexPositionAttribute, Mesh.VERTEX_SIZE, this._ctx.FLOAT, false, 0, 0);
	
	this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._normalBuffer);
	this._ctx.vertexAttribPointer(program.vertexNormalAttribute, Mesh.NORMAL_SIZE, this._ctx.FLOAT, false, 0, 0);
	
	this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._uvBuffer);
	this._ctx.vertexAttribPointer(program.vertexCoordsAttribute, Mesh.UVS_SIZE, this._ctx.FLOAT, false, 0, 0);
	
	this._ctx.bindBuffer(this._ctx.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	
	this._ctx.activeTexture(this._ctx.TEXTURE0);
    this._ctx.bindTexture(this._ctx.TEXTURE_2D, texture);
    this._ctx.uniform1i(program.uSamplerUniform, 0);
	
	this._ctx.uniformMatrix4fv(program.pMatrixUniform, false, this._pMatrix);
	this._ctx.uniformMatrix4fv(program.mvMatrixUniform, false, this._camera.matrix);
	this._ctx.uniformMatrix3fv(program.normalMatrixUniform, false, this._camera.getNormalMatrix());
	this._ctx.uniform3fv(program.lightDirectionUniform, ldir);
	this._ctx.uniform3fv(program.lightColorUniform, this._lightColor);
	this._ctx.uniform3fv(program.ambiantColorUniform, this._ambiantColor);
	
	this._ctx.drawElements(this._ctx.TRIANGLES, this._custom.indexNumItems, this._ctx.UNSIGNED_SHORT, 0);
};

