precision mediump float;

uniform sampler2D uSampler;
uniform vec3 ambiantColor;
uniform vec3 lightDirection;
uniform vec3 lightColor;

varying vec2 vTextureCoord;
varying float vAlpha;
varying vec4 vPosition;
varying vec3 vNormal;

void main(void) {
	
	vec3 dir 		= normalize(lightDirection - vPosition.xyz);
	float weight 	= max( dot( vNormal, dir ), 0.0) ;
	vec3 lightFactor= ambiantColor + (lightColor * weight);
	
	vec4 tmpColor 	= texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)); 
	tmpColor 		= vec4( tmpColor.rgb * lightFactor, tmpColor.a );
	
	gl_FragColor = vec4( tmpColor.rgb, tmpColor.a * vAlpha );
}