function Scene(ctx,viewportWidth,viewportHeight)
{
	this.init(ctx,viewportWidth,viewportHeight);
}

Scene.prototype.pointLightPosition 	= [0,0,0];
Scene.prototype.pointLightColor 	= [1.0,1.0,1.0];
Scene.prototype.ambiantLightColor 	= [0.2,0.2,0.2];
Scene.prototype.camera 				= null;
Scene.prototype._renderer 			= null;
Scene.prototype._context 			= null;
Scene.prototype.meshes 				= null;

Scene.prototype.init = function(ctx,viewportWidth,viewportHeight)
{
	this.camera 	= new Camera();
	this.meshes 	= new Array();
	this._context 	= ctx;
	this._renderer 	= new Renderer(ctx, viewportWidth,viewportHeight);
};

Scene.prototype.sortBackToFront	= function(meshA, meshB)
{
	var distA = Utils.distanceFromCamera(meshA, this.camera);
	var distB = Utils.distanceFromCamera(meshB, this.camera);
	
	return ( distA > distB ) ? -1 : 1;
};

Scene.prototype.render = function()
{
	var i = 0;
	var max = this.meshes.length;
	
	this.camera.update();
	this._renderer.clear(this._context);
	
	for( i = 0; i < max; i++ )
	{
		this._renderer.render(this, this.meshes[i],this._context);
	}
};
