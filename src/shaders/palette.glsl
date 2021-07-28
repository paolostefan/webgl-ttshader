#version 300 es
precision lowp float;
out vec4 outColor;
uniform vec3 a, b, c, d;
uniform vec2 u_resolution;

void main(){
  float PI = 3.141592653589;
  outColor = vec4(a + b * cos(2.0f*PI*(c*gl_FragCoord.x/u_resolution.x + d)), 1);
  // outColor = vec4(gl_FragCoord.xy/u_resolution, 0,1);
}