precision mediump float;

varying vec2 vTextureCoord;
varying float vAlpha;

uniform sampler2D uSampler;

void main(void) {
	vec4 tmpColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)); 
	gl_FragColor = vec4( tmpColor.rgb, tmpColor.a * vAlpha );
}