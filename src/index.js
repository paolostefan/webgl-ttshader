const dat = require("dat.gui");
import fragmentShaderSrc from "./shaders/mandelbrot-antialias.glsl";

(function () {
  function createShader(type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const msg = "Cannot create shader\n" + gl.getShaderInfoLog(shader);
      displayError(msg);
      gl.deleteShader(shader);
      throw new Error(msg);
    }
    return shader;
  }

  function createProgram(vertexShader, fragmentShader) {
    const prog = gl.createProgram();
    gl.attachShader(prog, vertexShader);
    gl.attachShader(prog, fragmentShader);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      const msg =
        "Cannot create WebGL2 program\n" + gl.getShaderInfoLog(shader);
      displayError(msg);
      gl.deleteProgram(prog);
      throw new Error(msg);
    }
    return prog;
  }

  function displayError(msg) {
    errorContainer.innerHTML = msg;
  }

  function uniformLoc(name) {
    return gl.getUniformLocation(program, name);
  }

  function updateUniform1f(name) {
    return function (value) {
      gl.uniform1f(uniformLoc(name), value);
    };
  }

  function updateUniform2f(name) {
    return function () {
      gl.uniform2f(uniformLoc(name), parameters[name].x, parameters[name].y);
    };
  }

  function updateUniform3f(name) {
    return function () {
      gl.uniform3f(
        uniformLoc(name),
        parameters[name].x,
        parameters[name].y,
        parameters[name].z
      );
    };
  }

  function drawScene(milliseconds) {
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 6;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.drawArrays(primitiveType, offset, count);

    window.requestAnimationFrame(function (milliseconds) {
      drawScene(milliseconds);
    });
  }

  const errorContainer = document.querySelector("#errormsg");
  const canvas = document.querySelector("#c");
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    const msg =
      "Fatal error: WebGL2 not available. Please check your browser's compatibility.";
    alert("WebGL2 not available");
    displayError(msg);
    throw new Error(msg);
  }

  console.log("Got WebGL2");

  const vertexShaderSrc = `#version 300 es
    in vec4 a_position;
    
    void main() {
        gl_Position = a_position;
    }
    `;

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSrc);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);

  console.log("Created vertex and fragment shaders");

  const program = createProgram(vertexShader, fragmentShader);

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
  const offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttribLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  const parameters = {
    vside: 0.035,
    lower_left: { x: -1.179, y: -0.293 },
    a: { x: 0.55, y: 0.4, z: 0.23 },
    b: { x: 0.44, y: 0.58, z: 0.77 },
    c: { x: 2.1, y: 2.9, z: 2.2 },
    d: { x: 0.44, y: 0.52, z: 0.92 },
  };

  // Altri valori interessanti
  // res: {
  //   vside: 0.176,
  //   lower_left: { x: -0.681, y: -0.711 },
  // },
  // a: { x: 0.17, y: 0.5, z: 0.5 },
  // b: { x: 0.83, y: 0.5, z: 0.5 },
  // c: { x: 6, y: 5.4, z: 2.2 },
  // d: { x: 0.46, y: 0.68, z: 0.98 },

  drawScene(0);

  // Starting bind of uniform vars
  gl.uniform2f(uniformLoc("u_resolution"), gl.canvas.width, gl.canvas.height);
  gl.uniform1f(uniformLoc("vside"), parameters.vside);
  gl.uniform2f(
    uniformLoc("lower_left"),
    parameters.lower_left.x,
    parameters.lower_left.y
  );
  gl.uniform3f(uniformLoc("a"), parameters.a.x, parameters.a.y, parameters.a.z);
  gl.uniform3f(uniformLoc("b"), parameters.b.x, parameters.b.y, parameters.b.z);
  gl.uniform3f(uniformLoc("c"), parameters.c.x, parameters.c.y, parameters.c.z);
  gl.uniform3f(uniformLoc("d"), parameters.d.x, parameters.d.y, parameters.d.z);

  // Dat.gui
  const gui = new dat.GUI({ name: "Gianfranco" });

  const folderRes = gui.addFolder("Vertical side screen size");
  folderRes
    .add(parameters, "vside", 0.001, 4.0, 0.001)
    .onChange(updateUniform1f("vside"));

  const folderLowerLeft = gui.addFolder("Lower left corner coords");
  folderLowerLeft
    .add(parameters.lower_left, "x", -2.8, 2.8, 0.001)
    .onChange(updateUniform2f("lower_left"));
  folderLowerLeft
    .add(parameters.lower_left, "y", -2.8, 2.8, 0.001)
    .onChange(updateUniform2f("lower_left"));

  const folderA = gui.addFolder("a");
  folderA.add(parameters.a, "x", 0, 1.0, 0.01).onChange(updateUniform3f("a"));
  folderA.add(parameters.a, "y", 0, 1.0, 0.01).onChange(updateUniform3f("a"));
  folderA.add(parameters.a, "z", 0, 1.0, 0.01).onChange(updateUniform3f("a"));

  const folderB = gui.addFolder("b");
  folderB.add(parameters.b, "x", 0, 1.0, 0.01).onChange(updateUniform3f("b"));
  folderB.add(parameters.b, "y", 0, 1.0, 0.01).onChange(updateUniform3f("b"));
  folderB.add(parameters.b, "z", 0, 1.0, 0.01).onChange(updateUniform3f("b"));

  const folderC = gui.addFolder("c");
  folderC.add(parameters.c, "x", 0, 6.0, 0.1).onChange(updateUniform3f("c"));
  folderC.add(parameters.c, "y", 0, 6.0, 0.1).onChange(updateUniform3f("c"));
  folderC.add(parameters.c, "z", 0, 6.0, 0.1).onChange(updateUniform3f("c"));

  const folderD = gui.addFolder("d");
  folderD.add(parameters.d, "x", 0, 1.0, 0.01).onChange(updateUniform3f("d"));
  folderD.add(parameters.d, "y", 0, 1.0, 0.01).onChange(updateUniform3f("d"));
  folderD.add(parameters.d, "z", 0, 1.0, 0.01).onChange(updateUniform3f("d"));

  gui.open();

  window.requestAnimationFrame(function (milliseconds) {
    drawScene(milliseconds);
  });

  console.log("Init successful");
})();
