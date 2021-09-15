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
uniform float u_seed; // Valore sghembo, preferibilmente sotto 1000
uniform float u_phase; // 0 <-> 2¶
uniform float u_speed;
uniform int u_noise_type;

// Noise types - must match noise.ts
#define NT_VALUE 0
#define NT_GRADIENT 1

/**
 * - 1 sin() call
 * - 1 mod() call
 * - 2 multiplications
 * - 4 add/sub
 */
float random(vec2 st) {
    return fract(sin(u_phase + st.x - st.y + mod((st.x-PI)*st.y, u_seed))*u_seed);
    // return fract(sin(dot(st, vec2(PI * 3.41811, PI * 21.8431))) * 73124.173123);
}

/**
 * Value noise interpolato bilinearmente con smoothstep
 */
float valueNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Quattro cantoni
    float a = random(i);
    float b = random(i + vec2(1., .0));
    float c = random(i + vec2(.0, 1.));
    float d = random(i + vec2(1., 1.));

    vec2 u = smoothstep(.0, 1., f);

    // Bilinear mix
    float q = mix(a, b, u.x);
    float r = mix(c, d, u.x);
    return mix(q, r, u.y);
}


/**
 * Vettore random a 2 dimensioni
 * valori dei componenti: fra -1.0 e 1.0
 */
vec2 random2(vec2 st) {

    // float nx = fract(sin(u_phase + st.x - st.y + mod(st.x*st.y-PI, u_seed))*u_seed);
    // float ny = fract(sin((u_phase - st.x)/17.3412121 + st.y + mod(st.y+PI*st.x, u_seed))*u_seed);
    st = vec2(dot(st, vec2(1.11*u_seed, -34.19243612121)),
              dot(st, vec2(-u_seed/PI, 19.030828012002)));
    return -1.0 + 2.0*fract(sin(st)*u_seed*11.);
}

/**
 * Gradient noise interpolato bilinearmente con smoothstep
 * Restituisce valori fra -1 e 1
 */
float gradientNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Debug: Canton Vicino ;-)
    // int nearest = (f.x<=.5? 
    //                 (f.y<=.5? 0:2):
    //                 (f.y<=.5? 1:3));
    // f = f - (nearest == 0? vec2(0.,0.): (nearest == 1? vec2(1., .0): (nearest==2?vec2(.0, 1.):vec2(1., 1.))));
    // return dot(f, corners[nearest]); // fract(sin(u_phase + st.x - st.y + mod((st.x-3.14)*st.y, u_seed))*u_seed);

    // Quattro cantoni
    float corners[4];
    corners[0] = dot(random2(i), f);
    corners[1] = dot(random2(i + vec2(1.0, 0.0)), f-vec2(1.0, 0.0));
    corners[2] = dot(random2(i + vec2(0.0, 1.0)), f-vec2(0.0, 1.0));
    corners[3] = dot(random2(i + vec2(1.0, 1.0)), f-vec2(1.0, 1.0));
    
    f = smoothstep(vec2(.0,.0), vec2(1.,1.), f);

    // Bilinear mix
    float a = mix(corners[0], corners[1], f.x);
    float b = mix(corners[2], corners[3], f.x);
    return mix(a, b, f.y);
}

void main() {
    vec2 screenCoord = u_scale * gl_FragCoord.xy / u_resolution.x;
    vec2 transformedCoords = screenCoord + vec2(u_time*u_speed/1000.);
    if(u_noise_type == NT_VALUE){
        float n = u_debug_random == 0 ? valueNoise(transformedCoords) : random(transformedCoords);
        outColor = vec4(vec3(n), 1);
    }
    else if (u_noise_type == NT_GRADIENT){
        if(u_debug_random == 0){
            outColor = vec4(vec3(gradientNoise(transformedCoords)*.5+.5),1);
        } else {
            vec2 nz = random2(transformedCoords);
            outColor = vec4(nz.r, .0, nz.g, 1.);
        }
    }
}