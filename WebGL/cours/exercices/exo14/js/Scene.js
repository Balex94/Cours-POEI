function Scene(ctx,viewportWidth,viewportHeight)
{
	this.init(ctx,viewportWidth,viewportHeight);
}

Scene.prototype.r 					= 1.0;
Scene.prototype.g 					= 1.0;
Scene.prototype.b 					= 1.0;
Scene.prototype.a 					= 1.0;
Scene.prototype.pointLight 			= null;
Scene.prototype.ambientLight 		= null;
Scene.prototype.camera 				= null;
Scene.prototype.viewportWidth 		= null;
Scene.prototype.viewportHeight 		= null;
Scene.prototype._renderer 			= null;
Scene.prototype._context 			= null;
Scene.prototype._currentFPS 		= 0;
Scene.prototype._lastTime 			= 0;
Scene.prototype.meshes 				= null;

Scene.prototype.init = function(ctx,viewportWidth,viewportHeight)
{
	this.pointLight		= new Light(0.0,0.0,0.0,0.8,0.8,0.8);
	this.ambientLight	= new Light(0.0,0.0,0.0,0.2,0.2,0.2);
	this.camera 		= new Camera();
	this.meshes 		= new Array();
	this._context 		= ctx;
	this._renderer 		= new Renderer(ctx, viewportWidth,viewportHeight);
	this.setFPS(60);
	
	this.viewportWidth	= viewportWidth;
	this.viewportHeight	= viewportHeight;
};

Scene.prototype.getCurrentFPS = function()
{
	return this._currentFPS;
};

Scene.prototype.getStats = function()
{
	var obj = { fps: this._currentFPS, 
				drawCalls: this._renderer.numDrawCalls,
				triangles: this._renderer.numTriangles,
				meshes: this._renderer.numMeshes,
				tasks: this._renderer.numTasks
	};
	
	return obj;
};


Scene.prototype.renderToTexture = function(width,height)
{
	var ctx = this._context;
	var texture = ctx.createTexture();
	var frameBuffer = ctx.createFramebuffer();
	var renderBuffer = ctx.createRenderbuffer();
	var i = 0;
	var max = this.meshes.length;
	
	ctx.bindFramebuffer(ctx.FRAMEBUFFER, frameBuffer);
	
	ctx.bindTexture(ctx.TEXTURE_2D, texture);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.LINEAR);
    ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.LINEAR_MIPMAP_NEAREST);
    ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, width, height, 0, ctx.RGBA, ctx.UNSIGNED_BYTE, null)
	
    ctx.bindRenderbuffer(ctx.RENDERBUFFER, renderBuffer);
	ctx.renderbufferStorage(ctx.RENDERBUFFER, ctx.DEPTH_COMPONENT16, width, height);
	
	ctx.framebufferTexture2D(ctx.FRAMEBUFFER, ctx.COLOR_ATTACHMENT0, ctx.TEXTURE_2D, texture, 0);
    ctx.framebufferRenderbuffer(ctx.FRAMEBUFFER, ctx.DEPTH_ATTACHMENT, ctx.RENDERBUFFER, renderBuffer);
	
	
	this._renderer.resetViewport(width, height );
	this.camera.update();
	
	for( i = 0; i < max; i++ )
	{
		this.meshes[i].scene = this;
		
		if( this.meshes[i].visible == false )
			continue;
			
		this.meshes[i].render();
	}
	
	this._renderer.flush(this,this._context);
	ctx.bindTexture(ctx.TEXTURE_2D, texture);
    ctx.generateMipmap(ctx.TEXTURE_2D);
	
	ctx.bindTexture(ctx.TEXTURE_2D, null);
    ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
    ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
	
	this._renderer.resetViewport(this.viewportWidth, this.viewportHeight);
	
	return texture;
};

Scene.prototype.render = function()
{
	var i = 0;
	var max = this.meshes.length;
	var time = new Date().getTime();
	var elapsed = (time - this._lastTime);
	this._currentFPS = parseInt(1000 / elapsed);
	
	this._lastTime = time;
	
	this.camera.update();
	
	for( i = 0; i < max; i++ )
	{
		this.meshes[i].scene = this;
		
		if( this.meshes[i].visible == false )
			continue;
			
		this.meshes[i].render();
	}
	
	this._renderer.flush(this,this._context);
	
	window.requestAnimationFrame(this.render.bind(this));
};


Scene.prototype.setFPS 			= function(value)
{
	this._fps = value;
	
	window.requestAnimationFrame = (function()
	{
		
		return  window.requestAnimationFrame       ||  //Chromium 
				window.webkitRequestAnimationFrame ||  //Webkit
				window.mozRequestAnimationFrame    || //Mozilla Geko
				window.oRequestAnimationFrame      || //Opera Presto
				window.msRequestAnimationFrame     || //IE Trident?
				function(callback, element){ //Fallback function
					window.setTimeout(callback, parseInt(1000/value));                
				}
		 
	})();
};
