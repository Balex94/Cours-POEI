function Scene(ctx,viewportWidth,viewportHeight)
{
	this.init(ctx,viewportWidth,viewportHeight);
}

Scene.prototype.pointLight 			= null;
Scene.prototype.ambientLight 		= null;
Scene.prototype.camera 				= null;
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
