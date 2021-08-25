#version 300 es

precision highp float;
out vec4 outColor;

uniform float u_time;

void main(void){
  outColor = vec4(vec3(fract(u_time/1500.)), 1.);
}