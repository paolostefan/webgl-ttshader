#version 300 es

precision highp float;
out vec4 outColor;

uniform vec2 u_resolution;
// Tempo in millisecondi
uniform float u_time;
uniform vec2 u_mouse;

#define PI 3.141592653589
#define VP_HEIGHT 2.0
#define FOCAL_LENGTH 1.0

/**
 * @see https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects/shadingwithsurfacenormals
 */
float hit_sphere(vec3 center, float radius, vec3 origin, vec3 direction){
  vec3 oc = origin - center;
  float a = dot(direction,direction);
  float half_b = dot(oc, direction);
  float c = dot(oc, oc) - radius * radius;

  float discriminant = half_b*half_b - a*c;

  return discriminant < 0. ? -1. : (-half_b-sqrt(discriminant))/a;
}

/**
 * Colore del cielo
 */
vec3 horizon = vec3(.99,.97,.97);
vec3 zenit = vec3(.44,.7,1.0);
vec3 nadir = vec3(.5,.3,.0);

vec4 sky(vec3 direction) {
  vec3 normal = normalize(direction); 
  return normal.y>=0.0? vec4(mix(horizon, zenit, normal.y), 1): vec4(mix(horizon, nadir, -normal.y), 1);
}

vec4 calcShading(vec3 origin, vec3 direction) {
  // Sfera cromata perfetta
  vec3 sphereCenter =  vec3(0.,.1,-1.);
  float sphereRadius =  .4;
  float reflectionAmount =  .91;

  float t = hit_sphere(sphereCenter, sphereRadius, origin, direction);
  if(t > 0.){
    vec3 rayAtT = origin + t * direction;
    vec3 normal = normalize(rayAtT-sphereCenter);
    // return vec4( 0.5*(normal + vec3(1,1,1)), 1);
    return reflectionAmount * sky( reflect(rayAtT, normal));
  }

  return sky(direction);
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

  vec3 ray_dir = lower_left + screenCoord.x * right + screenCoord.y * high - origin;

  outColor = calcShading(origin, ray_dir);
}