#version 300 es

precision highp float;

in vec4 a_coordinates;
uniform float u_time;
out vec4 outColor;


void main(void){
  outColor = vec4(vec3(1)-abs(a_coordinates.xyz),1);
}