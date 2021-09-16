#version 300 es

precision highp float;
out vec4 outColor;

uniform vec2 u_resolution;

// Tempo in millisecondi
uniform float u_time;
// Coordinate in pixel del puntatore
uniform vec2 u_mouse;

uniform int u_antialiasing;

#define PI 3.141592653589
#define VP_HEIGHT 2.0
#define FOCAL_LENGTH 1.0

#define MAX_RAYMARCH 64

// Numero di campioni *per lato* nell'anti-aliasing (il numero di campioni è questo valore al quadrato!)
#define ANTIALIAS_SQRT_SAMPLES 3

/**
 * Colore del cielo
 */
const vec3 horizonColor = vec3(0.69, 0.8, 0.87);
const vec3 zenithColor = vec3(0, 0.31, 0.67);
const vec3 nadirColor = vec3(.5, .3, .0);

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

// Distanza di un punto p da un piano orizzontale passante per O
float sdPlane(vec3 p) {
  return p.y;
}

float sdf(vec3 pos) {

  vec4 spheres[4];
  spheres[0] = vec4(0, 0, 10, 3);

  float t = sdSphere(pos - spheres[0].xyz, spheres[0].w);

  return t;
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

bool castRay(vec3 rayOrigin, vec3 rayDir, out float t, out float dist) {
  t = .00001;
  for(int i = 0; i < MAX_RAYMARCH; i++) {
    dist = sdf(rayOrigin + rayDir * t);
    if(dist <= (.00001 * t)) {
      // that's a hit!
      return true;
    }
    t += dist;
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
  if(!castRay(rayOrigin, rayDir, t, lastSdf)) {
    return sky(rayDir);
  }

  vec3 col;
  vec3 pos = rayOrigin + rayDir * t;
  vec3 normal = calcNormal(pos, lastSdf);

  // Debugging normals
  // col = normal * vec3(0.5) + 0.5;

  //
  const vec3 objSurfaceColor = vec3(0.4, 0.8, 0.4);
  const vec3 lightColor = vec3(1.8, 1.27, .99);

  const vec3 lightPosition = normalize(vec3(5, 6, -2));
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
  vec3 shadowRayOrigin = pos + normal*0.001;
  vec3 shadowRayDir = lightPosition;
  if(castRay(shadowRayOrigin, shadowRayDir, t, lastSdf)){
    shadow = 1.0;
  }

  // The shadowed zone has .2 times the brightness of the lit one
  col = mix(col, col*0.2, shadow);

  return col;
}

vec2 normalizeScreenCoords(vec2 screenCoord) {
  float aspect = u_resolution.x / u_resolution.y;
  vec2 result = 2. * (screenCoord / u_resolution - .5);
  result.x *= aspect;
  return result;
}

void main() {
  vec3 camPos = vec3(0, 0, -1);
  vec3 camTarget = vec3(0, 0, 0);

  vec2 uv = normalizeScreenCoords(gl_FragCoord.xy);
  vec3 rayDir = getCameraRayDir(uv, camPos, camTarget);
  vec3 col = render(camPos, rayDir);

  // Gamma correction
  col = pow(col, vec3(0.4545));

  outColor = vec4(col, 1);
}