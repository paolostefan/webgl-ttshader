#version 300 es

precision highp float;
out vec4 outColor;

uniform vec2 u_resolution;

// Tempo in millisecondi
uniform float u_time;

// Coordinate in pixel del puntatore
uniform vec2 u_mouse;

uniform int u_antialiasing;
uniform int u_debug_raymarch;

#define PI 3.141592653589
#define VP_HEIGHT 2.0
#define FOCAL_LENGTH 1.0

#define MAX_RAYMARCH 2048
#define MAX_DIST 1000.

#define RANDOM_SEED 839.2121

// Numero di campioni *per lato* nell'anti-aliasing (il numero di campioni è questo valore al quadrato!)
#define ANTIALIAS_SQRT_SAMPLES 3

/**
 * - 1 sin() call
 * - 1 mod() call
 * - 2 multiplications
 * - 4 add/sub
 */
float random(vec2 st) {
  return fract(sin(1.3256 + st.x - st.y + mod((st.x - PI) * st.y, RANDOM_SEED)) * RANDOM_SEED);
}

/**
 * Colore del cielo
 */
const vec3 horizonColor = vec3(0.69, 0.8, 0.87);
const vec3 zenithColor = vec3(0.02, 0.41, 0.86);
const vec3 nadirColor = vec3(0.44, 0.34, 0.19);

/**
 * @param direction normalized direction vector
 */
vec3 sky(vec3 direction) {
  return direction.y >= 0.0 ? mix(horizonColor, zenithColor, direction.y) : mix(horizonColor, nadirColor, -direction.y);
}

// Distanza di un punto p da una sfera di centro O e raggio r
float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

/**
 * Distanza di un punto p da un piano
 *
 * @param p punto di cui calcolare la distanza
 * @param n vec4 in cui n.xyz = normale al piano; n.w = distanza del piano da O.

 * In altre parole l'equazione cartesiana del piano è:
 * n.x * x + n.y * y + n.z * z - n.w = 0
 */
float sdPlane(vec3 p, vec4 n) {
  return (dot(p, n.xyz) - n.w) / length(n.xyz);
}

/**
 * Distanza da un cilindro di asse y centrato in O
 *
 * @param cyl vec2 in cui cyl.r = raggio del cilindro; cyl.y = semi-altezza del cilindro
 */
float sdCylinder(vec3 p, vec2 cyl){
  return length(vec2(length(p.xz)-cyl.r, max(abs(p.y)-cyl.y, 0.)));
}

float sdf(vec3 pos) {

  vec4 spheres[4];
  spheres[0] = vec4(0, 0, 10, 3);

  float d = 1000.0;

  d = min(d, sdCylinder(pos - vec3(-4,.5,10), vec2(.2, 1)));
  d = min(d, sdSphere(pos - spheres[0].xyz, spheres[0].w));
  d = min(d, sdPlane(pos, vec4(0, 1, 0, -3.)));

  return d;
}

vec3 getCameraRayDir(vec2 uv, vec3 cameraPos, vec3 cameraTarget) {
  // Base ortonormale
  vec3 camFwd = normalize(cameraTarget - cameraPos);
  const vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 camRight = normalize(cross(up, camFwd));
  vec3 camUp = normalize(cross(camFwd, camRight));

  float fPersp = 2.0;

  return normalize(uv.x * camRight + uv.y * camUp + camFwd * fPersp);
}

bool castRay(vec3 rayOrigin, vec3 rayDir, out float t, out float dist, out int i) {
  t = 0.0;
  for(i = 0; i < MAX_RAYMARCH; i++) {
    dist = sdf(rayOrigin + rayDir * t);
    if(dist <= .00001*t) {
      // that's a hit!
      return true;
    }
    t += dist;

    if(t > MAX_DIST){
      return false;
    }
  }

  return false;
}

/**
 * Normale alla superficie nel punto di contatto
 */
vec3 calcNormal(vec3 pos, float central_t) {
  // float central_t = sdf(pos);
  const float eps = 0.001;
  // Central difference
  vec3 grad = vec3(sdf(pos + vec3(eps, 0, 0)), sdf(pos + vec3(0, eps, 0)), sdf(pos + vec3(0, 0, eps))) - central_t;

  return normalize(grad);
}

/**
 * Calcola il colore del punto 
 */
vec3 render(vec3 rayOrigin, vec3 rayDir) {
  float t;
  float lastSdf;
  int raymarchSteps;
  vec3 col;
  bool hit = castRay(rayOrigin, rayDir, t, lastSdf, raymarchSteps);

  if(u_debug_raymarch != 0) {
    return vec3(float(raymarchSteps) / float(MAX_RAYMARCH), 0., 0.);
  }

  if(!hit) {
    return sky(rayDir);
  }

  vec3 pos = rayOrigin + rayDir * t;

  vec3 normal = calcNormal(pos, lastSdf);

  // Debugging normals
  // col = normal * vec3(0.5) + 0.5;

  //
  const vec3 objSurfaceColor = vec3(0.4, 0.8, 0.4);
  const vec3 lightColor = vec3(1.8, 1.27, .99);

  vec3 lightPosition = normalize(vec3(2., 2., -2. + sin(u_time / 1000.)));
  float surfaceIllumination = max(dot(normal, lightPosition), 0.0);
  vec3 lDirectional = lightColor * surfaceIllumination;
  const vec3 lAmbientColor = vec3(0.03, 0.04, 0.1);
  vec3 diffuse = objSurfaceColor * (lDirectional + lAmbientColor);

  col = diffuse;

  /**
   To calculate shadows, we can fire a ray starting at the point we intersected 
   the scene and going in the direction of the light source.
   If this ray march results in us hitting something, then we know the light 
   will also be obstructed and so this pixel is in shadow.
   */
  float shadow = 0.0;
  const float shadowRayCount = 1.0;

  // ! TODO soft shadows così come sono non funzionano
  const vec3 shadow_falloff = vec3(.1, .2, .05);
  for(float s = 0.0; s < shadowRayCount; s++) {
    vec3 shadowRayOrigin = pos + normal * 0.001;
    float rand = random(s * rayDir.xy) * 2.0 - 1.0;
    vec3 shadowRayDir = lightPosition + shadow_falloff * rand;
    if(castRay(shadowRayOrigin, shadowRayDir, t, lastSdf, raymarchSteps)) {
      shadow += 1.0;
    }
  }

  // The shadowed zone has .2 times the brightness of the lit one
  col = mix(col, col * 0.2, shadow / shadowRayCount);

  return col;
}

vec2 normalizeScreenCoords(vec2 screenCoord) {
  float aspect = u_resolution.x / u_resolution.y;
  vec2 result = 2. * (screenCoord / u_resolution - .5);
  result.x *= aspect;
  return result;
}

void main() {
  vec3 camPos = vec3(0, 1, -1);
  vec3 camTarget = vec3(0, 0, 10);

  vec2 uv = normalizeScreenCoords(gl_FragCoord.xy);
  vec3 rayDir = getCameraRayDir(uv, camPos, camTarget);
  vec3 col = render(camPos, rayDir);

  // Gamma correction
  col = pow(col, vec3(0.4545));

  outColor = vec4(col, 1);
}