attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uWorldMatrix;
uniform mat4 uPMatrix;
uniform mat3 normalMatrix;

varying vec2 vTextureCoord;
varying vec4 vPosition;
varying vec3 vNormal;
varying vec4 vCamPosition;


void main(void) {
	
	vNormal 		= normalMatrix * aVertexNormal;
	vPosition 		= uMVMatrix * vec4(aVertexPosition.xyz, 1.0);
	vCamPosition 	= vPosition * uWorldMatrix;
	
	vTextureCoord 	= aTextureCoord;
	gl_Position 	= uPMatrix * uWorldMatrix * vPosition;
	
}