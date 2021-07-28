const dat = require("dat.gui");
import fragmentShaderSrc from "./shaders/mandelbrot-antialias.glsl";

(function () {
  const errorContainer = document.querySelector("#errormsg");
  const canvas = document.querySelector("#c");
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("WebGL2 not available");
    return;
  }
  console.log("Got WebGL2");

  function createShader(type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log("Cannot create WebGL shader");
    displayError("Cannot create shader\n" + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  function createProgram(vertexShader, fragmentShader) {
    const prog = gl.createProgram();
    gl.attachShader(prog, vertexShader);
    gl.attachShader(prog, fragmentShader);
    gl.linkProgram(prog);
    if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      return prog;
    }
    console.log("Cannot create WebGL program", gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
  }

  function displayError(msg) {
    errorContainer.innerHTML = msg;
  }

  function drawScene() {
    gl.clearColor(0.3, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.drawArrays(primitiveType, offset, count);
  }

  function uniformLoc(name) {
    return gl.getUniformLocation(program, name);
  }

  function updateUniform1f(name) {
    return function (value) {
      drawScene();
      gl.uniform1f(gl.getUniformLocation(program, name), value);
    };
  }

  function updateUniform2f(name, jsVar) {
    return function () {
      drawScene();
      gl.uniform2f(gl.getUniformLocation(program, name), jsVar.x, jsVar.y);
    };
  }

  function updateUniform3f(name, jsVar) {
    return function () {
      drawScene();
      gl.uniform3f(
        gl.getUniformLocation(program, name),
        jsVar.x,
        jsVar.y,
        jsVar.z
      );
    };
  }

  const vertexShaderSrc = `#version 300 es
    in vec4 a_position;
    
    void main() {
        gl_Position = a_position;
    }
    `;

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSrc);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);
  if (!vertexShader || !fragmentShader) {
    return;
  }

  console.log("Created vertex and fragment shaders");
  const program = createProgram(vertexShader, fragmentShader);
  if (!program) {
    return;
  }
  console.log("Created program");

  const positionAttribLocation = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [-1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAttribLocation);

  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // the data is 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  let offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttribLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);
  gl.bindVertexArray(vao);

  const res = { vside: 0.176, lower_left: { x: -.681, y: -0.711 } };

  const a = { x: 0.17, y: 0.5, z: 0.5 };
  const b = { x: .83, y: 0.5, z: 0.5 };
  const c = { x: 6, y: 5.4, z: 2.2 };
  const d = { x: 0.46, y: 0.68, z: 0.98 };


  // Starting bind of uniform vars
  gl.uniform2f(uniformLoc("u_resolution"), gl.canvas.width, gl.canvas.height);
  gl.uniform1f(uniformLoc("vside"), res.vside);
  gl.uniform2f(uniformLoc("lower_left"), res.lower_left.x, res.lower_left.y);
  gl.uniform3f(uniformLoc("a"), a.x, a.y, a.z);
  gl.uniform3f(uniformLoc("b"), b.x, b.y, b.z);
  gl.uniform3f(uniformLoc("c"), c.x, c.y, c.z);
  gl.uniform3f(uniformLoc("d"), d.x, d.y, d.z);

  const primitiveType = gl.TRIANGLES;
  offset = 0;
  const count = 6;
  gl.drawArrays(primitiveType, offset, count);

  // Dat.gui
  const gui = new dat.GUI({ name: "Pippo" });

  const folderRes = gui.addFolder("Vertical side screen size");
  folderRes
    .add(res, "vside", 0.001, 4.0, 0.001)
    .onChange(updateUniform1f("vside", res.vside));

  const folderLowerLeft = gui.addFolder("Lower left corner coords");
  folderLowerLeft
    .add(res.lower_left, "x", -2.8, 2.8, 0.001)
    .onChange(updateUniform2f("lower_left", res.lower_left));
  folderLowerLeft
    .add(res.lower_left, "y", -2.8, 2.8, 0.001)
    .onChange(updateUniform2f("lower_left", res.lower_left));

  const folderA = gui.addFolder("a");
  folderA.add(a, "x", 0, 1.0, 0.01).onChange(updateUniform3f("a", a));
  folderA.add(a, "y", 0, 1.0, 0.01).onChange(updateUniform3f("a", a));
  folderA.add(a, "z", 0, 1.0, 0.01).onChange(updateUniform3f("a", a));

  const folderB = gui.addFolder("b");
  folderB.add(b, "x", 0, 1.0, 0.01).onChange(updateUniform3f("b", b));
  folderB.add(b, "y", 0, 1.0, 0.01).onChange(updateUniform3f("b", b));
  folderB.add(b, "z", 0, 1.0, 0.01).onChange(updateUniform3f("b", b));

  const folderC = gui.addFolder("c");
  folderC.add(c, "x", 0, 6.0, 0.2).onChange(updateUniform3f("c", c));
  folderC.add(c, "y", 0, 6.0, 0.2).onChange(updateUniform3f("c", c));
  folderC.add(c, "z", 0, 6.0, 0.2).onChange(updateUniform3f("c", c));

  const folderD = gui.addFolder("d");
  folderD.add(d, "x", 0, 1.0, 0.01).onChange(updateUniform3f("d", d));
  folderD.add(d, "y", 0, 1.0, 0.01).onChange(updateUniform3f("d", d));
  folderD.add(d, "z", 0, 1.0, 0.01).onChange(updateUniform3f("d", d));

  gui.open();
})();
