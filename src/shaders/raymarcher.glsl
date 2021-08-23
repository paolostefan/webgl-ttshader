#version 300 es

precision highp float;
out vec4 outColor;

// Vertical side
uniform float vside;
// Lower left corner coords
uniform vec2 lower_left;

uniform vec3 a, b, c, d;
uniform vec2 u_resolution;
uniform vec2 mouse;

#define PI 3.141592653589


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
  vec3 color_ = vec3(0.0);
  for(int i=0; i<SAMPLING_SIZE; i++){
    c = lower_left + scale*vec2(gl_FragCoord.x + displace[i].x, gl_FragCoord.y + displace[i].y);
    escaped = mandel(c);
    if (escaped != -1){
      color_ += col(escaped);
    }
  }
  outColor = vec4(color_/float(SAMPLING_SIZE),1.0);
#else
  c = lower_left + vec2(scale*gl_FragCoord);
  escaped = mandel(c);
  if (escaped == -1){
    outColor = vec4(vec3(0.0), 1.0);
  } else {
    outColor = vec4(col(escaped), 1.0);
  }
#endif

}