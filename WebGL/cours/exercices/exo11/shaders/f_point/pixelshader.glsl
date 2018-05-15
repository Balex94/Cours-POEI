precision mediump float;

uniform sampler2D uSampler;
uniform vec3 ambiantColor;
uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform float uAlpha;

varying vec2 vTextureCoord;
varying vec4 vPosition;
varying vec3 vNormal;

void main(void) {
	
	vec3 dir 		= normalize(lightPosition - vPosition.xyz);
	float weight 	= max( dot( vNormal, dir ), 0.0) ;
	float intensity = 1.0;
	float alpha		= 1.0;
	
	vec3 lightFactor= ambiantColor + (lightColor * weight);
	vec4 tmpColor 	= texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)); 
	
	if( uAlpha < 1.0 )
	{
		intensity		= max(lightFactor.r, lightFactor.g);
		intensity		= max(intensity, lightFactor.b);
		alpha			= min(tmpColor.a * uAlpha * intensity, 1.0);
		gl_FragColor 	= vec4( tmpColor.rgb * lightFactor, alpha  );
	}
	else
	{
		gl_FragColor 	= vec4( tmpColor.rgb * lightFactor, 1.0  );
	}
}