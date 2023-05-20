precision highp float;
precision highp int;

uniform float time;

varying vec2 vUv;

//gradient noise functions provided bv Mark Doughty - CGP3018M Graphics Workshop Week 5

float random(vec2 UV)
{
    vec2 k = vec2(23.1406926327792690,2.6651441426902251); //psuedo random number vector
    return fract(sin(UV.x * 1928.0 + UV.y * 3456.0) * dot(UV, k)); //returns a fractional part of sin((UV.x * 1928.0 + UV.y * 3456.0) * dot(UV, k)) as the random number
}

vec2 hash( vec2 u)
{
   vec2 h[4]; //array of 4 vectors
   
   //these arrays contain coordinates with relate to the 4 corners of the plane mesh
   h[0] = vec2(0.0, 0.0);
   h[1] = vec2(1.0, 0.0);
   h[2] = vec2(0.0, 1.0);
   h[3] = vec2(1.0, 1.0);
   
   int value = int(random(u)*4.0); //value is put into the random function as UV and multiplied by 4 to get a desired result
   
   //returns following vectors based on the int value
   
   if(value == 0)
   { 
       return h[0];
   }
   if(value == 1)
   { 
       return h[1];
   }
   if(value == 2)
   { 
       return h[2];
   }
   if(value == 3)
   { 
       return h[3];
   }
}

float fade(float t)
{
    //return t = t*t*(3.0-2.0*t); //
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); //returns a Quintic interpolation curve
}

//gradient noise function (example of perlin noise)

float gradientNoise(vec2 u)
{
    vec2 f = smoothstep(0.0, 1.0, fract(u)); //vec2 f is fract(u) after is has been passed into a smoothstep function which interpolates between 0 and 1
    vec2 i = floor(u); //vec2 i is the floor of u

    vec2 f00 = hash(i); //performs normal hash function (which returns (i + vec2 (0.0, 0.0))
    vec2 f10 = hash(i + vec2(1.0, 0.0)); //following vec2's hash i + another vec2 which is applied to each corner of the vertex
    vec2 f01 = hash(i + vec2(0.0, 1.0));
    vec2 f11 = hash(i + vec2(1.0, 1.0));
    
    float h = u.x - i.x; //h equal to x value of U vector minus x value of I vector
    float fadeH = fade(h);
    float v = u.y - i.y; //h equal to y value of U vector minus y value of I vector
    float fadeV = fade(v);
    
    float top = (1.0-fadeH)*dot(f00, (u - i)) + fadeH*dot(f10, (u-(i+vec2(1.0, 0.0)))); //calculates distance between the top corners
    float bottom = (1.0-fadeH)*dot(f01, (u - (i+vec2(0.0, 1.0)))) + fadeH*dot(f11, (u-(i+vec2(1.0, 1.0)))); //calculates distance between the bottom corners
    
   
    return (1.0 - fadeV)*top + fadeV*bottom; //calculates vertical distance between top and bottom corners
}

void main() 
{
    vec2 uv3 = vUv;
    
    //mix colour change gradient values
    float mixWeight = 0.5; //weight value for mix function
    vec3 color1 = vec3(uv3.x,uv3.y,abs(sin(time * 2.5))); //positions of ux.xy and the absolute value of sin(time * 2.5)
	vec3 color2 = vec3(0.1, 0.5, 0.9) * cos(time*2.5); //outputs a light blue color which is then later mixed
	vec3 color3 = vec3(color2) * sin(time * 2.5); //color2 multiplied by the sin value of time * 3.5.
	vec3 mixedColor = mix(color1, color3, mixWeight); //colors are then mixed according to the weight value
    
    
    //gradient noise is gradually applied
    float gn = gradientNoise(uv3*4.0);
    gn += gradientNoise(uv3*8.0)*0.5;
    //gn += gradientNoise(uv3*16.0)*0.25;
    //gn += gradientNoise(uv3*32.0)*0.125;
    //gn += gradientNoise(uv3*64.0)*0.0625;
    //gn += gradientNoise(uv3*128.0)*0.03125;
    gn /= 0.1;
    
    
    gl_FragColor = vec4( mixedColor * gn, 1.0); //displays the colour passed into the fragColor function
}