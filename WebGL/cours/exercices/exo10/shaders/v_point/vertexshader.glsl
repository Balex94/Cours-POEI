attribute vec4 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 normalMatrix;
uniform vec3 ambiantColor;
uniform vec3 lightDirection;
uniform vec3 lightColor;

varying vec2 vTextureCoord;
varying float vAlpha;

varying vec3 lightFactor;


void main(void) {
	
	vec3 tmpNormal = ( normalMatrix * aVertexNormal );
	vec4 mvPosition = uMVMatrix * vec4(aVertexPosition.xyz, 1.0);
	vec3 dir = normalize(lightDirection - mvPosition.xyz);
	
	float weight = max( dot( tmpNormal, dir ), 0.0) ;
	lightFactor = ambiantColor + (lightColor * weight);
	
	vTextureCoord = aTextureCoord;
	vAlpha = float(aVertexPosition.w);
	gl_Position = uPMatrix * mvPosition;
	
}