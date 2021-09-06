#version 300 es

precision highp float;

uniform mat4 u_matrix;
in vec4 coordinates;

void main(void) {
  gl_Position = coordinates;
  gl_PointSize = 4.0;
}