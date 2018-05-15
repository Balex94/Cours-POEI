function Renderer(ctx,viewportWidth,viewportHeight)
{
	this.reset(ctx,viewportWidth, viewportHeight);
}

Renderer.prototype._meshes 			= null;
Renderer.prototype._vertexBuffer 	= null;
Renderer.prototype._normalBuffer 	= null;
Renderer.prototype._uvsBuffer 		= null;
Renderer.prototype._indexBuffer 	= null;
Renderer.prototype._pMatrix			= null;
Renderer.prototype._custom			= null;

Renderer.prototype.viewportWidth	= 800;
Renderer.prototype.viewportHeight	= 600;


Renderer.prototype.reset	= function(ctx,viewportWidth,viewportHeight)
{
	this._custom		= new Object();
	this._pMatrix		= mat4.create();
	this._vertexBuffer 	= ctx.createBuffer();
	this._uvBuffer 		= ctx.createBuffer();
	this._indexBuffer 	= ctx.createBuffer();
	this._normalBuffer 	= ctx.createBuffer();
	this.viewportWidth	= viewportWidth;
	this.viewportHeight	= viewportHeight;
	
	mat4.identity(this._pMatrix);
	mat4.perspective(45, this.viewportWidth / this.viewportHeight, 0.1, 100.0, this._pMatrix);
};

Renderer.prototype._updateBuffers = function(ctx,mesh)
{
	var vertices = mesh.vertices
	var normals	= mesh.normales
	var uvs = mesh.uvs
	var indices = mesh.indices
	
	ctx.bindBuffer(ctx.ARRAY_BUFFER, this._vertexBuffer);
	ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW);
	
	ctx.bindBuffer(ctx.ARRAY_BUFFER, this._normalBuffer);
	ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(normals), ctx.STATIC_DRAW);
	
	ctx.bindBuffer(ctx.ARRAY_BUFFER, this._uvBuffer);
	ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(uvs), ctx.STATIC_DRAW);
	
	ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), ctx.STATIC_DRAW);
	this._custom.indexNumItems = indices.length / Mesh.INDEX_SIZE;
};

Renderer.prototype.clear = function(ctx)
{
	/*clear ********************************************************/
	
	/* on désactive la gestion de la transparence */
	//meshes.sort(this.sortBackToFront.bind(this));
	//ctx.clearColor(0.0, 0.0, 0.0, 1.0);
	//ctx.disable(ctx.DEPTH_TEST);
	//ctx.blendFunc(ctx.ONE, ctx.ONE_MINUS_SRC_ALPHA);
	//ctx.enable(ctx.BLEND);
	
	
	ctx.viewport(0, 0, this.viewportWidth, this.viewportHeight);
	ctx.enable(ctx.DEPTH_TEST);	
	ctx.clearColor(0.0, 0.0, 0.0, 1.0);
	ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
	
	
	/*clear ********************************************************/
};

Renderer.prototype.render = function(scene,mesh,ctx)
{
	
	var program = mesh.program;
	var texture = mesh.material.texture;
	
	this._updateBuffers(ctx,mesh);
	
	program.reset(ctx);
	
	ctx.bindBuffer(ctx.ARRAY_BUFFER, this._vertexBuffer);
	ctx.vertexAttribPointer(program.vertexPositionAttribute, Mesh.VERTEX_SIZE, ctx.FLOAT, false, 0, 0);
	
	ctx.bindBuffer(ctx.ARRAY_BUFFER, this._normalBuffer);
	ctx.vertexAttribPointer(program.vertexNormalAttribute, Mesh.NORMAL_SIZE, ctx.FLOAT, false, 0, 0);
	
	ctx.bindBuffer(ctx.ARRAY_BUFFER, this._uvBuffer);
	ctx.vertexAttribPointer(program.vertexCoordsAttribute, Mesh.UVS_SIZE, ctx.FLOAT, false, 0, 0);
	
	ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	
	ctx.activeTexture(ctx.TEXTURE0);
    ctx.bindTexture(ctx.TEXTURE_2D, texture);
	
    ctx.uniform1i(program.uSamplerUniform			, 0);
	ctx.uniformMatrix4fv(program.pMatrixUniform		, false	, this._pMatrix);
	ctx.uniformMatrix4fv(program.mvMatrixUniform	, false	, mesh.matrix);
	ctx.uniformMatrix4fv(program.worldMatrixUniform	, false	, scene.camera.matrix);
	ctx.uniformMatrix3fv(program.normalMatrixUniform, false	,mesh.getNormalMatrix() );
	ctx.uniform3fv(program.lightPositionUniform		, scene.pointLightPosition);
	ctx.uniform3fv(program.lightColorUniform		, scene.pointLightColor);
	ctx.uniform3fv(program.ambiantColorUniform		, scene.ambiantLightColor);
	
	ctx.drawElements(ctx.TRIANGLES, this._custom.indexNumItems, ctx.UNSIGNED_SHORT, 0);
};

