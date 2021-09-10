#version 300 es

precision highp float;
out vec4 outColor;

// Vertical side
uniform float vside;
// Lower left corner coords
uniform vec2 lower_left;

uniform vec3 a, b, c, d;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define PI 3.141592653589
#define MAXITER 512
// Attiva/disattiva l'AA
#define ANTIALIAS 1

// Numero di punti per il calcolo dell'AA
#define SAMPLING_SIZE 4

#define P1X 0.200014062
#define P1Y 0.600042186

#define P2X -0.600042186
#define P2Y 0.200014062

#define P3X -0.200014062
#define P3Y -0.600042186

#define P4X 0.600042186
#define P4Y -0.200014062

int mandel(vec2 c){
  // Check cardioide principale
  float cmod = length(c);
  cmod = cmod*cmod;
  if (cmod*(8.0*cmod -3.0) < 3.0/32.0 - c.x){
    return -1;
  }

  vec2 z = c;
  float zr_tmp;
  for (int i=0; i<MAXITER; i++) {
    zr_tmp = (z.x*z.x) - (z.y*z.y) + c.x;
    z = vec2(zr_tmp, (2.0 * z.x * z.y) + c.y);
    if (length(z) >= 2.0){
      return i;
    }
  }

  return -1;
}

/**
 * Interpola t fra 0 e MAXITER
 *
 * http://192.168.1.2:9966/www/articles/palettes/palettes.htm
 */
vec3 col(int t){
  // vec3 a = vec3(0.5);
  // vec3 b = vec3(0.5);
  // vec3 c = vec3(2.0,1.0,1.2);
  // vec3 d = vec3(0.5, 0.55, 0.35);
  float norm_t = sqrt(float(t)/float(MAXITER));

  return a + b * cos(2.0 * PI * (c * norm_t + d));
}

void main(){
  // vside = vertical dimension
  float scale = vside/u_resolution.y;
  vec2 c;
  int escaped;

#if ANTIALIAS
  vec2 displace[SAMPLING_SIZE];
  displace[0] = vec2(P1X, P1Y);
  displace[1] = vec2(P2X, P2Y);
  displace[2] = vec2(P3X, P3Y);
  displace[3] = vec2(P4X, P4Y);

  vec3 color_ = vec3(.0);

  for(int i=0; i<SAMPLING_SIZE; i++){
    c = lower_left + scale*(gl_FragCoord.xy + displace[i]) + .01*u_mouse/u_resolution;
    escaped = mandel(c);
    if (escaped != -1){
      color_ += col(escaped);
    }
  }
  outColor = vec4(color_/float(SAMPLING_SIZE),1.0);
#else
  c = lower_left + scale*(gl_FragCoord.xy) + .01*u_mouse/u_resolution;
  escaped = mandel(c);
  if (escaped == -1){
    outColor = vec4(vec3(0.0), 1.0);
  } else {
    outColor = vec4(col(escaped), 1.0);
  }
#endif

}