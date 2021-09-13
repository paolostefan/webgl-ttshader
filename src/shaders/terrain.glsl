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

// Mostra un gradiente nero (zero step) - rosso (MAX_RAYMARCH) che indica il numero di passi di raymarching eseguiti
uniform int u_debug_raymarch;
// Mostra una sagoma verde senza shading dov'è il terreno 
uniform int u_debug_hit;

#define PI 3.141592653589
#define VP_HEIGHT 2.0
#define FOCAL_LENGTH 1.0

#define MAX_RAYMARCH 550.

const float terrainLevel = 0.;
const float terrainNoiseAmp = .45;

const vec4 baseColor = vec4(0.94, 0.78, 0.42, 1);
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

float terrain(vec2 pt) {
  return terrainLevel + terrainNoiseAmp * sin(pt.x) * sin(pt.y);
}

#define USE_CENTRAL_DIFFERENCES 0

vec3 terrainNormal(vec2 pt) {
  #if USE_CENTRAL_DIFFERENCES

  const float epsilon = 0.01;
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

  const float tMin = 1.;
  const float tMax = 500.;
  float dt = .1;
  rayMarchSteps = .0;

  // Aumenta il passo dt in funzione della distanza dall'osservatore
  for(t = tMin, dt = .01 * t; t < tMax; t += dt, dt = .01 * t) {
    vec3 point = rayOrigin + rayDir * t;
    if(point.y <= terrain(point.xz)) {
      t = t - dt * .5;
      return true;
    }

    if(++rayMarchSteps > MAX_RAYMARCH){
      break;
    }
  }

  return false;
}


// Fattore di attenuazione dell'Ambient Occlusion
const float AOfactor = .2;

vec4 calcShading(vec3 origin, vec3 direction) {

  float t;
  float steps;

  if(!rayHit(origin, direction, t, steps)) {
    return sky(direction);
  }

  if(u_debug_raymarch!=0){
    // Mostra il "numero" di passi in rosso
    return vec4(pow(steps / MAX_RAYMARCH, 2.), 0., 0., 1.);
  }

  if(u_debug_hit!=0){
    return vec4(0., 1., 0., 1.);
  }
  
  vec3 normal = terrainNormal((origin + direction * t).xz);
  float lambert = dot(normal, sunDirection);
  vec4 color = lambert >= .0 ? vec4(lambert * baseColor.xyz, 1) : vec4(vec3(0), 1);
  
  color = color + AOfactor * sky(normal);
  return color;
}

// void worldMoveObjects(){
//   for(int i=0; i<NUM_SPHERES; i++){
//     vec4 center = u_matrix * vec4(u_spheres[i].xyz,1.);
//     spheres[i] = vec4(center.xyz, u_spheres[i].w);
//   }
// }

void main() {
  float aspect = u_resolution.x / u_resolution.y;
  float vp_width = VP_HEIGHT * aspect;

  vec3 origin = u_lookfrom;

  // https://raytracing.github.io/books/RayTracingInOneWeekend.html#positionablecamera
  vec3 w = normalize(u_lookfrom - u_lookat);
  vec3 u = normalize(cross(up, w));
  vec3 v = normalize(cross(w, u));

  vec3 right = vp_width * u;
  vec3 high = VP_HEIGHT * v;
  vec3 lowerLeft = vec3(origin - right / 2.0 - high / 2.0 - w);

  vec2 screenCoord = gl_FragCoord.xy / u_resolution;

  vec3 rayDir = normalize(lowerLeft + screenCoord.x * right + screenCoord.y * high - origin);

  outColor = calcShading(origin, rayDir);
}