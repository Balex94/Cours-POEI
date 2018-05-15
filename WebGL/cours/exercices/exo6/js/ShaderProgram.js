function ShaderProgram(ctx)
{
	this.init(ctx);
}

ShaderProgram.prototype._ctx 					= null;
ShaderProgram.prototype._program 				= null;
ShaderProgram.prototype.pMatrixUniform 			= null;
ShaderProgram.prototype.uSamplerUniform 		= null;
ShaderProgram.prototype.mvMatrixUniform 		= null;
ShaderProgram.prototype.vertexCoordsAttribute 	= null;
ShaderProgram.prototype.vertexPositionAttribute = null;

ShaderProgram.prototype.init = function(ctx)
{
	this._ctx = ctx;
	this._program = this._ctx.createProgram();
	
	var fragmentShader 	= this.getShader("shaders/pixelshader.glsl", this._ctx.FRAGMENT_SHADER);
	var vertexShader 	= this.getShader("shaders/vertexshader.glsl", this._ctx.VERTEX_SHADER);

	this._program = this._ctx.createProgram();
	this._ctx.attachShader(this._program, vertexShader);
	this._ctx.attachShader(this._program, fragmentShader);
	this._ctx.linkProgram(this._program);

	if (!this._ctx.getProgramParameter(this._program, this._ctx.LINK_STATUS)) 
	{
		alert("Could not initialise shaders");
	}

	this._ctx.useProgram(this._program);

	this.vertexPositionAttribute = this._ctx.getAttribLocation(this._program, "aVertexPosition");
	this._ctx.enableVertexAttribArray(this.vertexPositionAttribute);
	
	this.vertexCoordsAttribute = this._ctx.getAttribLocation(this._program, "aTextureCoord");
	this._ctx.enableVertexAttribArray(this.vertexCoordsAttribute);

	this.pMatrixUniform 	= this._ctx.getUniformLocation(this._program, "uPMatrix");
	this.mvMatrixUniform 	= this._ctx.getUniformLocation(this._program, "uMVMatrix");
	this.uSamplerUniform 	= this._ctx.getUniformLocation(this._program, "uSampler");
};

ShaderProgram.prototype.getShader 	= function(srcURL, type)
{
	var str = null;
	var shader = this._ctx.createShader(type);
	var http = new XMLHttpRequest();
	
	http.open("GET",srcURL, false); // synchronous call
	http.send();
	
	str = http.responseText;
	
	this._ctx.shaderSource(shader, str);
	this._ctx.compileShader(shader);

	if (!this._ctx.getShaderParameter(shader, this._ctx.COMPILE_STATUS)) 
	{
		alert(this._ctx.getShaderInfoLog(shader));
		return null;
	}

	return shader;
};

