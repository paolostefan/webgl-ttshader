#version 300 es

precision highp float;

in mat4 u_matrix;
in vec4 coordinates;

void main(void) {
  gl_Position = u_matrix * coordinates;
  gl_PointSize = 4.0;
}