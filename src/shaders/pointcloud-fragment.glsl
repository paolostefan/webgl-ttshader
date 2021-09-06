#version 300 es

precision highp float;

in vec4 o_color;
uniform float u_time;
out vec4 outColor;


void main(void){
  outColor = o_color;
}