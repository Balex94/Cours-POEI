precision mediump float;

uniform sampler2D uSampler;

varying vec2 vTextureCoord;
varying vec3 lightFactor;
varying float vAlpha;

void main(void) 
{
	vec4 tmpColor 	= texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)); 
	tmpColor 		= vec4( tmpColor.rgb * lightFactor, tmpColor.a );
	gl_FragColor 	= vec4( tmpColor.rgb, tmpColor.a * vAlpha );
}