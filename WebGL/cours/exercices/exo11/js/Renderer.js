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
Renderer.prototype._lastProgram		= null;
Renderer.prototype._lastMaterial	= null;
Renderer.prototype.numDrawCalls		= 0;
Renderer.prototype.numTriangles		= 0;
Renderer.prototype.numMeshes		= 0;

Renderer.prototype.viewportWidth	= 800;
Renderer.prototype.viewportHeight	= 600;

Renderer.prototype._updateBuffers 	= function(ctx,mesh)
{	
	ctx.bindBuffer(ctx.ARRAY_BUFFER, this._vertexBuffer);
	ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(mesh.vertices), ctx.STATIC_DRAW);
	
	ctx.bindBuffer(ctx.ARRAY_BUFFER, this._normalBuffer);
	ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(mesh.normales), ctx.STATIC_DRAW);
	
	ctx.bindBuffer(ctx.ARRAY_BUFFER, this._uvBuffer);
	ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(mesh.uvs), ctx.STATIC_DRAW);
	
	ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), ctx.STATIC_DRAW);
	this._custom.indexNumItems = mesh.indices.length / Mesh.INDEX_SIZE;
};

Renderer.prototype._renderTask		= function(task, scene, ctx)
{
	var program = null;
	var texture = null;
	var j 		= 0;
	var max2 	= 0;
	var mesh 	= null;
	
	max2 	= task.meshes.length;
	
	if( this._lastProgram == null || this._lastProgram.id != task.program.id )
	{
		program = task.program;
		//program.reset(ctx);
		program.useProgram(ctx);
		this._lastProgram = program;
	}
	else
	{
		program = this._lastProgram;
	}
	
	if( this._lastMaterial == null || this._lastMaterial.id != task.material.id )
	{
		texture = task.material.texture;
		ctx.activeTexture(ctx.TEXTURE0);
		ctx.bindTexture(ctx.TEXTURE_2D, texture);
		this._lastMaterial = task.material;
	}
	else
	{
		texture = this._lastMaterial.texture;
	}
	
	
	
	
	for( j = 0; j < max2; j++ )
	{
		mesh = task.meshes[j];
		
		this._updateBuffers(ctx,mesh);
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this._vertexBuffer);
		ctx.vertexAttribPointer(program.vertexPositionAttribute, Mesh.VERTEX_SIZE, ctx.FLOAT, false, 0, 0);
		
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this._normalBuffer);
		ctx.vertexAttribPointer(program.vertexNormalAttribute, Mesh.NORMAL_SIZE, ctx.FLOAT, false, 0, 0);
		
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this._uvBuffer);
		ctx.vertexAttribPointer(program.vertexCoordsAttribute, Mesh.UVS_SIZE, ctx.FLOAT, false, 0, 0);
		
		ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
		
		ctx.uniform1i(program.uSamplerUniform			, 0);
		ctx.uniformMatrix4fv(program.pMatrixUniform		, false	, this._pMatrix);
		ctx.uniformMatrix4fv(program.mvMatrixUniform	, false	, mesh.matrix);
		ctx.uniformMatrix4fv(program.worldMatrixUniform	, false	, scene.camera.matrix);
		ctx.uniformMatrix3fv(program.normalMatrixUniform, false	, mesh.getNormalMatrix() );
		ctx.uniform3fv(program.lightPositionUniform		, scene.pointLightPosition);
		ctx.uniform3fv(program.lightColorUniform		, scene.pointLightColor);
		ctx.uniform3fv(program.ambiantColorUniform		, scene.ambiantLightColor);
		ctx.uniform1f(program.alphaUniform				, mesh.alpha);
		
		this.numTriangles += this._custom.indexNumItems / Mesh.VERTEX_SIZE;
		this.numMeshes++;
		this.numDrawCalls++
		ctx.drawElements(ctx.TRIANGLES, this._custom.indexNumItems, ctx.UNSIGNED_SHORT, 0);
	}
};


Renderer.prototype.reset			= function(ctx,viewportWidth,viewportHeight)
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

Renderer.prototype.clear 			= function(ctx)
{
	ctx.viewport(0, 0, this.viewportWidth, this.viewportHeight);
	ctx.clearColor(0.0, 0.0, 0.0, 1.0);
	ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
};

Renderer.prototype.sortBackToFront	= function(meshA, meshB)
{
	var distA = Utils.distanceFromCamera(meshA, meshA.scene.camera);
	var distB = Utils.distanceFromCamera(meshB, meshA.scene.camera);
	
	return ( distA > distB ) ? -1 : 1;
};

Renderer.prototype.flush			= function(scene,ctx)
{
	
	var opaques 		= RenderTask.getOpaques();
	var translucents 	= RenderTask.getTranslucents();
	var i 				= 0;
	var max 			= opaques.length;
	
	this.numMeshes 		= 0;
	this.numTriangles 	= 0;
	this.numDrawCalls 	= 0;
	
	
	this.clear(ctx);
	//********************************** render opaques **************************
	
	
	if( opaques.length > 0 )
	{
		ctx.depthMask(true);
		ctx.enable(ctx.DEPTH_TEST);	
		ctx.disable(ctx.BLEND);
		
		for( i = 0; i < max; i++ )
		{
			this._renderTask(opaques[i],scene, ctx);
		}
	}
	
	
	//********************************** render translucents **************************
	
	if( translucents.length > 0 )
	{
		max = translucents.length;
		ctx.depthMask(false);
		ctx.blendFunc(ctx.SRC_ALPHA, ctx.ONE_MINUS_SRC_ALPHA);
		ctx.enable(ctx.BLEND);
		//ctx.disable(ctx.DEPTH_TEST);
		//ctx.blendFunc(ctx.ONE, ctx.ONE_MINUS_SRC_ALPHA);
			
		for( i = 0; i < max; i++ )
		{
			translucents[i].meshes.sort(this.sortBackToFront.bind(this));
			this._renderTask(translucents[i],scene, ctx);
		}
	}
	
	
	RenderTask.clean();
};

