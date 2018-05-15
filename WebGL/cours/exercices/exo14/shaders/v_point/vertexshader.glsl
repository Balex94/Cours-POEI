attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform float uAlpha;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 normalMatrix;
uniform vec3 ambiantColor;
uniform vec3 lightPosition;
uniform vec3 lightColor;

varying vec2 vTextureCoord;
varying vec3 lightFactor;
varying float vAlpha;


void main(void) 
{
	vec3 tmpNormal 	= ( normalMatrix * aVertexNormal );
	vec4 mvPosition = uMVMatrix * vec4(aVertexPosition.xyz, 1.0);
	vec3 dir 		= normalize(lightPosition - mvPosition.xyz);
	float weight 	= max( dot( tmpNormal, dir ), 0.0) ;
	float intensity	= 1.0;
	lightFactor 	= ambiantColor + (lightColor * weight);
	
	
	if( uAlpha < 1.0 )
	{
		intensity		= max(lightFactor.r, lightFactor.g);
		intensity		= max(intensity, lightFactor.b);
		vAlpha			= min(uAlpha * intensity, 1.0);
	}
	else
	{
		vAlpha 			= uAlpha;
	}
	
	vTextureCoord 	= aTextureCoord;
	gl_Position 	= uPMatrix * mvPosition;
}