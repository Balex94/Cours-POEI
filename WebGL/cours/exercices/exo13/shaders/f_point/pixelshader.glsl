precision mediump float;

uniform sampler2D uSampler;
uniform vec3 ambiantColor;
uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform vec3 specularColor;
uniform float uAlpha;
uniform float uShininess;

varying vec2 vTextureCoord;
varying vec4 vPosition;
varying vec3 vNormal;
varying vec4 vCamPosition;

void main(void) {
	
	vec3 dir 			= normalize(lightPosition - vPosition.xyz);
	vec3 normal			= normalize(vNormal);
	vec3 eyedir			= normalize(-vCamPosition.xyz);
	vec3 reflectdir 	= reflect(-dir, normal);
	
	float specular		= pow(max(dot(reflectdir,eyedir),0.0),uShininess);
	float weight 		= max( dot( normal, dir ), 0.0) ;
	float intensity 	= 1.0;
	float alpha			= 1.0;
	
	vec3 lightFactor	= ambiantColor  + (lightColor * weight);
	vec4 tmpColor 		= texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)); 
	
	if( uShininess > 0.0 )
	{
		lightFactor = lightFactor + (specularColor  * specular);
	}
	
	if( uAlpha < 1.0 )
	{
		intensity		= max(lightFactor.r, lightFactor.g);
		intensity		= max(intensity, lightFactor.b);
		alpha			= min(tmpColor.a * uAlpha * intensity, 1.0);
		gl_FragColor 	= vec4( tmpColor.rgb * lightFactor, alpha  );
	}
	else
	{
		gl_FragColor 	= vec4( tmpColor.rgb * lightFactor.rgb, tmpColor.a  );
	}
}