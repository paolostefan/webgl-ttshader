#version 300 es

precision highp float;

in vec3 coordinates;

void main(void) {
  gl_Position = vec4(coordinates, 1.0);
  gl_PointSize = 4.0;
}