#version 300 es

precision highp float;
out vec4 outColor;

uniform vec2 u_resolution;

// Tempo in millisecondi
uniform float u_time;
// Coordinate in pixel del puntatore
uniform vec2 u_mouse;
// Matrice di trasformazione del mondo
uniform mat4 u_matrix;

#define PI 3.141592653589
#define VP_HEIGHT 2.0
#define FOCAL_LENGTH 1.0

// Numero massimo di rimbalzi di un raggio. Sopra questa profondità calcShading restituisce (0,0,0)
#define MAX_RECURSION 32

vec3 bounces[MAX_RECURSION];
vec3 directions[MAX_RECURSION];

// 0: nessuna riflessione a parte il cielo
// 1: riflessioni ricorsive fino a un massimo di MAX_RECURSION
// Qualsiasi altro valore: una sola riflessione
#define RECURSE_REFLECTIONS 1

#define NUM_SPHERES 6
uniform vec4 u_spheres[NUM_SPHERES]; // xyz: center coords; w: radius
vec4 spheres[NUM_SPHERES]; // xyz: center coords; w: radius


// Sfera cromata perfetta
const float reflectionAmount = .88;

/**
 * Colore del cielo
 */
const vec3 horizon = vec3(.99, .97, .97);
const vec3 zenit = vec3(.44, .7, 1.0);
const vec3 nadir = vec3(.5, .3, .0);

vec4 sky(vec3 direction) {
  vec3 normal = normalize(direction);
  return normal.y >= 0.0 ? vec4(mix(horizon, zenit, normal.y), 1) : vec4(mix(horizon, nadir, -normal.y), 1);
}

/**
 * Restituisce true se il raggio interseca la sfera, e in tal caso imposta t al valore del parametro a cui avviene l'intersezione
 *
 * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects/shadingwithsurfacenormals
 */
bool hitSphere(vec4 sphere, vec3 origin, vec3 direction, out float t) {
  float radius = sphere.w;
  vec3 oc = origin - sphere.xyz;
  float a = dot(direction, direction);
  float half_b = dot(oc, direction);
  float c = dot(oc, oc) - radius * radius;

  float discriminant = half_b * half_b - a * c;
  if(discriminant >= 0.) {
    t = (-half_b - sqrt(discriminant)) / a;
  }
  return (discriminant >= 0.);
}

bool rayHit(vec3 rayOrigin, vec3 rayDir, int depth, out int sphereNo, out vec3 reflectionPt, out vec3 reflectionDir) {

  if(depth >= MAX_RECURSION - 1) {
    return false;
  }

  float tmin = 10000.;
  float t = 10000.;

  for(int i = 0; i < NUM_SPHERES; i++) {
    // determina l'oggetto intersecato più vicino
    if(hitSphere(spheres[i], rayOrigin, rayDir, t) && t > .0 && t < tmin) {
      tmin = t;
      sphereNo = i;
    }
  }

  if(tmin < 10000.) {
    reflectionPt = rayOrigin + tmin * rayDir;
    vec3 normal = normalize(reflectionPt - spheres[sphereNo].xyz);
    reflectionDir = reflect(reflectionPt, normal);
    return true;
  }

  return false;
}

vec4 calcShading(vec3 origin, vec3 direction) {

  int sphereNo = -1;
  vec3 reflectionPt;
  vec3 reflectionDir;

  if(!rayHit(origin, direction, 0, sphereNo, reflectionPt, reflectionDir)) {
    return sky(direction);
  }

  vec4 ptColor;

#if RECURSE_REFLECTIONS == 1
  int maxBounce = 0;
  bounces[0] = reflectionPt;
  directions[0] = reflectionDir;
  origin = reflectionPt;
  direction = reflectionDir;
  bool recurse;

  for(int bounceCount = 1; bounceCount < MAX_RECURSION; bounceCount++) {
    recurse = rayHit(origin, direction, bounceCount, sphereNo, reflectionPt, reflectionDir);
    if(recurse) {
      maxBounce = bounceCount;
      bounces[bounceCount] = reflectionPt;
      directions[bounceCount] = reflectionDir;
      origin = reflectionPt;
      direction = reflectionDir;
    }
  }

  if(maxBounce == MAX_RECURSION) {
    return vec4(vec3(0.), 1.);
  }

  ptColor = sky(directions[maxBounce--]);
  // svuota la pila 
  for(; maxBounce >= 0; maxBounce--) {
    ptColor = vec4(ptColor.xyz * reflectionAmount, 1);
  }
#elif RECURSE_REFLECTIONS == 0
  ptColor = vec4(reflectionAmount * sky(reflectionDir).xyz, 1);
#else
  // una doppia riflessione al massimo
  vec3 lastDir = reflectionDir;
  vec3 refPt2, refDir2;
  if(rayHit(reflectionPt, reflectionDir, 1, sphereNo, refPt2, refDir2)) {
    // c'è una doppia riflessione
    ptColor = vec4(reflectionAmount * reflectionAmount * sky(refDir2).xyz, 1);
  } else {
    ptColor = vec4(reflectionAmount * sky(lastDir).xyz, 1);
  }
#endif

  return ptColor;
}

void worldMoveObjects(){
  for(int i=0; i<NUM_SPHERES; i++){
    vec4 center = u_matrix * vec4(u_spheres[i].xyz,1.);
    spheres[i] = vec4(center.xyz, u_spheres[i].w);
  }
}

void main() {
  // https://raytracing.github.io/books/RayTracingInOneWeekend.html#rays,asimplecamera,andbackground/sendingraysintothescene
  float aspect = u_resolution.x / u_resolution.y;
  float vp_width = VP_HEIGHT * aspect;

  vec3 origin = vec3(0, 0, 0);
  vec3 right = vec3(vp_width, 0, 0);
  vec3 high = vec3(0, VP_HEIGHT, 0);
  vec3 lower_left = origin - right / 2.0 - high / 2.0 - vec3(0, 0, FOCAL_LENGTH);

  vec2 screenCoord = gl_FragCoord.xy / u_resolution;

  vec3 rayDir = lower_left + screenCoord.x * right + screenCoord.y * high - origin;

  worldMoveObjects();

  outColor = calcShading(origin, rayDir);
}