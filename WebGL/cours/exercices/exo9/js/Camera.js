function Camera()
{
	this.init();
}


Camera.prototype.x 				= 0.0; 
Camera.prototype.y 				= 0.0; 
Camera.prototype.z 				= 0.0; 
Camera.prototype.rotX 			= 0.0; 
Camera.prototype.rotY 			= 0.0; 
Camera.prototype.rotZ 			= 0.0; 
Camera.prototype.matrix 		= null;


Camera.prototype.init		= function()
{
	this.matrix = mat4.create();
	this.normalMatrix = mat4.create();
	this.update();
};

Camera.prototype.update		= function()
{
	var degtorad = Math.PI / 180;
	mat4.identity(this.matrix);
	mat4.translate(this.matrix,[this.x,this.y,this.z]);
	
	if( this.rotX != 0 )
		mat4.rotateX(this.matrix,this.rotX * degtorad );
		
	if( this.rotY != 0 )
		mat4.rotateY(this.matrix,this.rotY * degtorad );
		
	if( this.rotZ != 0 )
		mat4.rotateZ(this.matrix,this.rotZ * degtorad );
		
	mat4.inverse(this.matrix);
};

Camera.prototype.getNormalMatrix	 = function()
{
	
	var n = mat3.create();
	var degtorad = Math.PI / 180;
	var mat = mat4.create();
	
	//mat4.toInverseMat3(this.matrix, n);
	mat4.toMat3(this.matrix, n);
	mat3.transpose(n);
	
	return n;
};