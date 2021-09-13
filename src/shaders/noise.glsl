#version 300 es

precision highp float;
out vec4 outColor;

uniform float u_scale;
uniform vec2 u_resolution;

// Tempo in millisecondi
uniform float u_time;
// Coordinate in pixel del puntatore
uniform vec2 u_mouse;

// Mostra i valori restituiti da random()
uniform int u_debug_random;

#define PI 3.141592653589
#define FREQ 428789.3631

float random(vec2 st) {
    vec2 f = fract(st);
    //return abs(cos(f.x*f.y*FREQ*PI)*sin((f.x+f.y)*73128.12));
    // return 4.*abs(.5-f.x)*abs(.5-f.y));
    return .5+.5*sin(f.x*10221122. + f.y*765463.23);
    // return fract(sin(dot(st, vec2(PI * 3.41811, PI * 21.8431))) * 73124.173123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Quattro cantoni
    float a = random(i);
    float b = random(i + vec2(1., .0));
    float c = random(i + vec2(.0, 1.));
    float d = random(i + vec2(1., 1.));

    vec2 u = f; //smoothstep(.0, 1., f);

    float q = mix(a, b, u.x);
    float r = mix(c, d, u.x);
    return mix(q, r, u.y);
}

void main() {
    vec2 screenCoord = gl_FragCoord.xy / u_resolution;
    vec2 transformedCoords = u_scale * screenCoord + vec2(u_time / 1000.);
    float n = u_debug_random == 0 ? noise(transformedCoords) : random(transformedCoords);
    outColor = vec4(vec3(n), 1);
}