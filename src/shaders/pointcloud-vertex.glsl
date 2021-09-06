#version 300 es

precision highp float;

uniform mat4 u_matrix;
in vec4 coordinates;
out vec4 o_color;

void main(void) {
  gl_Position = u_matrix * coordinates;
  float zNorm = gl_Position.z/gl_Position.w;
  gl_PointSize = 1.5 + .5*zNorm;
  o_color = vec4(.5 - .5*zNorm);
}