#version 300 es

precision highp float;

uniform mat4 u_matrix;
in vec4 coordinates;
out vec4 a_coordinates;

void main(void) {
  a_coordinates = coordinates;
  gl_Position = u_matrix * coordinates;
  gl_PointSize = 1.;
}