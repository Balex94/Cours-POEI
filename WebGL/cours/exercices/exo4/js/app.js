function Main(){}
	
Main.prototype._ctx			= null;
Main.prototype._prgm		= null;
Main.prototype._mvMatrix 	= null;
Main.prototype._pMatrix 	= null;
Main.prototype._buffer		= null;
Main.prototype._indexBuffer	= null;
Main.prototype._uvBuffer	= null;
Main.prototype._texture		= null;
Main.prototype._image		= null;
Main.prototype._custom		= null;

Main.prototype.initGL 		= function(canvas) 
{
	this._ctx = canvas.getContext("experimental-webgl");
	this._custom.viewportWidth = canvas.width;
	this._custom.viewportHeight = canvas.height;
}

Main.prototype.getShader 	= function(srcURL, type)
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

Main.prototype.initShaders 	= function() 
{
	var fragmentShader 	= this.getShader("shaders/pixelshader.glsl", this._ctx.FRAGMENT_SHADER);
	var vertexShader 	= this.getShader("shaders/vertexshader.glsl", this._ctx.VERTEX_SHADER);

	this._prgm = this._ctx.createProgram();
	this._ctx.attachShader(this._prgm, vertexShader);
	this._ctx.attachShader(this._prgm, fragmentShader);
	this._ctx.linkProgram(this._prgm);

	if (!this._ctx.getProgramParameter(this._prgm, this._ctx.LINK_STATUS)) 
	{
		alert("Could not initialise shaders");
	}

	this._ctx.useProgram(this._prgm);

	this._custom.vertexPositionAttribute = this._ctx.getAttribLocation(this._prgm, "aVertexPosition");
	this._ctx.enableVertexAttribArray(this._custom.vertexPositionAttribute);
	
	this._custom.vertexCoordsAttribute = this._ctx.getAttribLocation(this._prgm, "aTextureCoord");
	this._ctx.enableVertexAttribArray(this._custom.vertexCoordsAttribute);

	this._custom.pMatrixUniform 	= this._ctx.getUniformLocation(this._prgm, "uPMatrix");
	this._custom._mvMatrixUniform 	= this._ctx.getUniformLocation(this._prgm, "uMVMatrix");
	this._custom._uSamplerUniform 	= this._ctx.getUniformLocation(this._prgm, "uSampler");
};

Main.prototype.initTexture = function() 
{
	this._image	 = document.getElementById("texture");
	this._texture = this._ctx.createTexture();
	this._ctx.bindTexture(this._ctx.TEXTURE_2D, this._texture);
	this._ctx.pixelStorei(this._ctx.UNPACK_FLIP_Y_WEBGL, true);
	this._ctx.texImage2D(this._ctx.TEXTURE_2D, 0, this._ctx.RGBA, this._ctx.RGBA, this._ctx.UNSIGNED_BYTE, this._image);
	this._ctx.texParameteri(this._ctx.TEXTURE_2D, this._ctx.TEXTURE_MAG_FILTER, this._ctx.NEAREST);
	this._ctx.texParameteri(this._ctx.TEXTURE_2D, this._ctx.TEXTURE_MIN_FILTER, this._ctx.NEAREST);
	this._ctx.bindTexture(this._ctx.TEXTURE_2D, null);
};

Main.prototype.initBuffers 	= function() 
{
	var vertices = [
		//face 1
		0.0, 1.0, 0.0,
		1.0, 1.0, 0.0,
		0.0, 0.0, 0.0,
		1.0, 0.0, 0.0
	];
	
	var uvs = [		0.0, 1.0,  	// vertex 1
					1.0, 1.0,	// vertex 2
					0.0, 0.0,	// vertex 3
					1.0, 0.0	// vertex 4
	]; 
	
	var indices = [0,1,2,2,1,3]; // on réutilise 2 vertices pour créer une face
	
	this._buffer = this._ctx.createBuffer();
	this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._buffer);
	this._ctx.bufferData(this._ctx.ARRAY_BUFFER, new Float32Array(vertices), this._ctx.STATIC_DRAW);
	this._custom.itemSize = 3;
	this._custom.numItems = vertices.length / 3;
	
	this._uvBuffer = this._ctx.createBuffer();
	this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._uvBuffer);
	this._ctx.bufferData(this._ctx.ARRAY_BUFFER, new Float32Array(uvs), this._ctx.STATIC_DRAW);
	this._custom.coordItemSize = 2;
	this._custom.coordNumItems = uvs.length / indices.length;
	
	this._indexBuffer = this._ctx.createBuffer();
	this._ctx.bindBuffer(this._ctx.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	this._ctx.bufferData(this._ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this._ctx.STATIC_DRAW);
	this._custom.indexItemSize = 1;
	this._custom.indexNumItems = indices.length;
};

Main.prototype.drawScene 	= function() 
{
	this._ctx.viewport(0, 0, this._custom.viewportWidth, this._custom.viewportHeight);
	this._ctx.clear(this._ctx.COLOR_BUFFER_BIT | this._ctx.DEPTH_BUFFER_BIT);

	mat4.perspective(45, this._custom.viewportWidth / this._custom.viewportHeight, 0.1, 100.0, this._pMatrix);
	mat4.identity(this._mvMatrix);
	mat4.translate(this._mvMatrix, [-1.5, 0.0, -7.0]);
	
	this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._buffer);
	this._ctx.vertexAttribPointer(this._custom.vertexPositionAttribute, this._custom.itemSize, this._ctx.FLOAT, false, 0, 0);
	
	this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._uvBuffer);
	this._ctx.vertexAttribPointer(this._custom.vertexCoordsAttribute, this._custom.coordItemSize, this._ctx.FLOAT, false, 0, 0);
	
	this._ctx.bindBuffer(this._ctx.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
	
	this._ctx.activeTexture(this._ctx.TEXTURE0);
    this._ctx.bindTexture(this._ctx.TEXTURE_2D, this._texture);
    this._ctx.uniform1i(this._custom._uSamplerUniform, 0);
	
	this._ctx.uniformMatrix4fv(this._custom.pMatrixUniform, false, this._pMatrix);
	this._ctx.uniformMatrix4fv(this._custom._mvMatrixUniform, false, this._mvMatrix);
	
	this._ctx.drawElements(this._ctx.TRIANGLES, this._custom.indexNumItems, this._ctx.UNSIGNED_SHORT, 0);
};

Main.prototype.init 		= function() 
{
	var canvas 		= document.getElementById("canvas");
	
	this._custom	= new Object();
	this._mvMatrix 	= mat4.create(); // create identity matrix
	this._pMatrix 	= mat4.create(); // create identity matrix
	
	this.initGL(canvas);
	this.initTexture();
	this.initShaders();
	this.initBuffers();
	this._ctx.clearColor(0.0, 0.0, 0.0, 1.0);
	this._ctx.enable(this._ctx.DEPTH_TEST);
	this.drawScene();
}

window.onload = function()
{
	var main = new Main();
	main.init();
};