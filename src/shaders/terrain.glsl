#version 300 es

precision highp float;
out vec4 outColor;

uniform vec3 u_lookfrom;
uniform vec3 u_lookat;
const vec3 up = vec3(0, 1, 0);

uniform vec2 u_resolution;

// Tempo in millisecondi
uniform float u_time;
// Coordinate in pixel del puntatore
uniform vec2 u_mouse;

uniform float u_seed; // Valore sghembo, preferibilmente sotto 1000
uniform float u_phase; // 0 <-> 2¶

// Mostra un gradiente nero (zero step) - rosso (MAX_RAYMARCH) che indica il numero di passi di raymarching eseguiti
uniform int u_debug_raymarch;
// Mostra una sagoma verde senza shading dov'è il terreno 
uniform int u_debug_hit;

#define PI 3.141592653589
#define VP_HEIGHT 2.0
#define FOCAL_LENGTH 1.0

#define MAX_RAYMARCH 450.

const float terrainLevel = .5;
const float terrainNoiseAmp = 4.5;
// Fattore di attenuazione dell'Ambient Occlusion
const float AOfactor = .4;

const vec4 baseColor = vec4(0.87, 0.72, 0.4, 1);
const vec3 sunDirection = normalize(vec3(-1, 1, -.5));

/**
 * Colore del cielo
 */
const vec3 horizonColor = vec3(0.84, 0.92, 0.97);
const vec3 zenitColor = vec3(0.18, 0.53, 0.93);
const vec3 nadirColor = vec3(0.18, 0.53, 0.93);

vec4 sky(vec3 direction) {
  vec3 normal = normalize(direction);
  return vec4(normal.y >= 0.0 ? mix(horizonColor, zenitColor, normal.y) : mix(horizonColor, nadirColor, -normal.y), 1);
}

/**
 * Vettore random a 2 dimensioni
 * valori dei componenti: fra -1.0 e 1.0
 */
vec2 random2(vec2 st) {

    // float nx = fract(sin(u_phase + st.x - st.y + mod(st.x*st.y-PI, u_seed))*u_seed);
    // float ny = fract(sin((u_phase - st.x)/17.3412121 + st.y + mod(st.y+PI*st.x, u_seed))*u_seed);
  st = vec2(dot(st, vec2(1.11 * u_seed, -34.19243612121)), dot(st, vec2(-u_seed / PI, 19.030828012002)));
  return -1.0 + 2.0 * fract(sin(st + vec2(u_phase)) * u_seed * 11.);
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
  corners[1] = dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  corners[2] = dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  corners[3] = dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));

  f = smoothstep(vec2(.0, .0), vec2(1., 1.), f);

    // Bilinear mix
  float a = mix(corners[0], corners[1], f.x);
  float b = mix(corners[2], corners[3], f.x);
  return mix(a, b, f.y);
}

float terrain(vec2 pt) {
  pt /= 3.;
  return terrainLevel + terrainNoiseAmp *(
     gradientNoise(pt) +
     .5*gradientNoise(2.*pt) +
     .25*gradientNoise(4.*pt) +
     .125*gradientNoise(8.*pt) +
     .0625*gradientNoise(16.*pt) 
     );
}

#define USE_CENTRAL_DIFFERENCES 1

vec3 terrainNormal(vec2 pt) {
  #if USE_CENTRAL_DIFFERENCES

  const float epsilon = 0.001;
  return normalize(vec3(terrain(vec2(pt.x + epsilon, pt.y)) - terrain(vec2(pt.x - epsilon, pt.y)), 2. * epsilon, terrain(vec2(pt.x, pt.y + epsilon)) - terrain(vec2(pt.x, pt.y - epsilon))));

  #else

  // normale = gradiente: nel caso di terreni definiti come y = f(x,z) il gradiente ha componente y = 1
  // il perché non mi è matematicamente chiarissimo
  return normalize(vec3(terrainNoiseAmp * cos(pt.x) * sin(pt.y), 1, terrainNoiseAmp * sin(pt.x) * cos(pt.y)));

  #endif
}

/**
 * inspired by Inigo (forever)
 * https://iquilezles.org/www/articles/terrainmarching/terrainmarching.htm
 */
bool rayHit(vec3 rayOrigin, vec3 rayDir, out float t, out float rayMarchSteps) {

  const float tMin = 10.;
  const float tMax = 400.;
  float dt;
  rayMarchSteps = .0;

  // Aumenta il passo dt in funzione della distanza dall'osservatore
  for(t = tMin, dt = .01 * t; t < tMax; t += dt, dt = .01 * t) {
    vec3 point = rayOrigin + rayDir * t;
    if(point.y <= terrain(point.xz)) {
      t = t - dt * .5;
      return true;
    }

    if(++rayMarchSteps > MAX_RAYMARCH) {
      break;
    }
  }

  return false;
}



vec4 calcShading(vec3 origin, vec3 direction) {

  float t;
  float steps;

  if(!rayHit(origin, direction, t, steps)) {
    return sky(direction);
  }

  if(u_debug_raymarch != 0) {
    // Mostra il "numero" di passi in rosso
    return vec4(pow(steps / MAX_RAYMARCH, 2.), 0., 0., 1.);
  }

  if(u_debug_hit != 0) {
    return vec4(0., 1., 0., 1.);
  }

  vec3 normal = terrainNormal((origin + direction * t).xz);
  float lambert = dot(normal, sunDirection);
  vec4 color = lambert >= .0 ? vec4(lambert * baseColor.xyz, 1) : vec4(vec3(0), 1);

  return color + AOfactor * sky(normal);
}

void main() {
  float aspect = u_resolution.x / u_resolution.y;
  float vp_width = VP_HEIGHT * aspect;
  vec3 offset = vec3(0., 0., u_time/1000.);
  vec3 origin = u_lookfrom + offset;

  // https://raytracing.github.io/books/RayTracingInOneWeekend.html#positionablecamera
  vec3 w = normalize(u_lookfrom - u_lookat);
  vec3 u = normalize(cross(up, w));
  vec3 v = normalize(cross(w, u));

  vec3 right = vp_width * u;
  vec3 high = VP_HEIGHT * v;
  vec3 lowerLeft = vec3(origin - right / 2.0 - high / 2.0 - w);

  vec2 screenCoord = gl_FragCoord.xy / u_resolution;

  vec3 rayDir = normalize(lowerLeft + screenCoord.x * right + screenCoord.y * high - origin);

  if(u_debug_raymarch != 0) {
    outColor = vec4(vec2(1., 1.) + random2(screenCoord*100.), 0., 1.);
  } else {
    outColor = calcShading(origin, rayDir);
  }
}