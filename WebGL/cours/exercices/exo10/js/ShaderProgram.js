function ShaderProgram(ctx, vertexShaderSrcURL, pixelShaderSrcURL)
{
	this.init(ctx, vertexShaderSrcURL, pixelShaderSrcURL);
}

ShaderProgram.prototype._ctx 					= null;
ShaderProgram.prototype._program 				= null;
ShaderProgram.prototype.pMatrixUniform 			= null;
ShaderProgram.prototype.uSamplerUniform 		= null;
ShaderProgram.prototype.mvMatrixUniform 		= null;
ShaderProgram.prototype.vertexCoordsAttribute 	= null;
ShaderProgram.prototype.vertexPositionAttribute = null;
ShaderProgram.prototype.vertexNormalAttribute 	= null;
ShaderProgram.prototype.lightPositionUniform 	= null;
ShaderProgram.prototype.ambiantColorUniform 	= null;
ShaderProgram.prototype.worldMatrixUniform 		= null;

ShaderProgram.prototype.init 		= function(ctx, vertexShaderSrcURL, pixelShaderSrcURL)
{
	this._program = ctx.createProgram();
	
	var fragmentShader 	= this.getShader(ctx,pixelShaderSrcURL, ctx.FRAGMENT_SHADER);
	var vertexShader 	= this.getShader(ctx,vertexShaderSrcURL, ctx.VERTEX_SHADER);

	ctx.attachShader(this._program, vertexShader);
	ctx.attachShader(this._program, fragmentShader);
	ctx.linkProgram(this._program);

	if (!ctx.getProgramParameter(this._program, ctx.LINK_STATUS)) 
	{
		alert("Could not initialise shaders");
	}
};

ShaderProgram.prototype.reset		= function(ctx)
{
	ctx.linkProgram(this._program);
	ctx.useProgram(this._program);

	this.vertexPositionAttribute = ctx.getAttribLocation(this._program, "aVertexPosition");
	ctx.enableVertexAttribArray(this.vertexPositionAttribute);
	
	this.vertexNormalAttribute = ctx.getAttribLocation(this._program, "aVertexNormal");
	ctx.enableVertexAttribArray(this.vertexNormalAttribute);
	
	this.vertexCoordsAttribute = ctx.getAttribLocation(this._program, "aTextureCoord");
	ctx.enableVertexAttribArray(this.vertexCoordsAttribute);

	this.pMatrixUniform 		= ctx.getUniformLocation(this._program, "uPMatrix");
	this.worldMatrixUniform 	= ctx.getUniformLocation(this._program, "uWorldMatrix");
	this.mvMatrixUniform 		= ctx.getUniformLocation(this._program, "uMVMatrix");
	this.normalMatrixUniform 	= ctx.getUniformLocation(this._program, "normalMatrix");
	this.uSamplerUniform 		= ctx.getUniformLocation(this._program, "uSampler");
	this.lightPositionUniform 	= ctx.getUniformLocation(this._program, "lightPosition");
	this.lightColorUniform 		= ctx.getUniformLocation(this._program, "lightColor");
	this.ambiantColorUniform 	= ctx.getUniformLocation(this._program, "ambiantColor");
};

ShaderProgram.prototype.getShader 	= function(ctx,srcURL, type)
{
	var str = null;
	var shader = ctx.createShader(type);
	var http = new XMLHttpRequest();
	
	http.open("GET",srcURL, false); // synchronous call
	http.send();
	
	str = http.responseText;

	
	ctx.shaderSource(shader, str);
	ctx.compileShader(shader);

	if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) 
	{
		alert(ctx.getShaderInfoLog(shader));
		return null;
	}

	return shader;
};

