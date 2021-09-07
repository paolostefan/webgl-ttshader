#version 300 es

precision highp float;

uniform mat4 u_matrix;
in vec4 coordinates;
out float zNorm;

void main(void) {
  gl_Position = u_matrix * coordinates;
  zNorm = gl_Position.z/gl_Position.w;
  gl_PointSize = .5 + 3.5*abs(zNorm);
}