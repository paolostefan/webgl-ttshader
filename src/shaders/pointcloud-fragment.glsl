#version 300 es

precision highp float;

in float zNorm;
uniform float u_time;
out vec4 outColor;


void main(void){
  outColor = vec4(1.-zNorm/2.);
}