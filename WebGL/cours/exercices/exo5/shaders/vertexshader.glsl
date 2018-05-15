attribute vec4 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
varying float vAlpha;


void main(void) {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.xyz, 1.0);
	vTextureCoord = aTextureCoord;
	vAlpha = float(aVertexPosition.w);
}