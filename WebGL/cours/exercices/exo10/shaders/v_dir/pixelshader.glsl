precision mediump float;

varying vec2 vTextureCoord;
varying float vAlpha;

uniform sampler2D uSampler;

varying vec3 lightFactor;

void main(void) {
	vec4 tmpColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)); 
	tmpColor = vec4( tmpColor.rgb * lightFactor, tmpColor.a );
	
	gl_FragColor = vec4( tmpColor.rgb, tmpColor.a * vAlpha );
}