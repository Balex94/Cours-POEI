attribute vec3 aVertexPosition;
attribute mat4 testMatrix;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;


void main(void) 
{
	gl_Position = uPMatrix * uMVMatrix * testMatrix * vec4(aVertexPosition, 1.0);
}