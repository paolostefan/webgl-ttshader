(function () {
  const errorContainer = document.querySelector("#errormsg");
  const canvas = document.querySelector("#c");
  let gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("WebGL2 not available");
    return;
  }

  function displayError(msg) {
    errorContainer.innerHTML = msg;
  }

  console.log("Got WebGL2");

  const vertexShaderSrc = `#version 300 es
    in vec4 a_position;
    
    void main() {
        gl_Position = a_position;
    }
    `;

  const fragmentShaderSrc = `#version 300 es
    precision highp float;
    out vec4 outColor;
    uniform vec3 a, b, c, d;
    uniform vec2 u_resolution;

    void main(){
      float PI = 3.141592653589;
      outColor = vec4(a + b * cos(2.0f*PI*(c*gl_FragCoord.x/u_resolution.x + d)), 1);
      // outColor = vec4(gl_FragCoord.xy/u_resolution, 0,1);
    }
    `;

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

  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution"
  );
  const aUniformLocation = gl.getUniformLocation(program, "a");
  const bUniformLocation = gl.getUniformLocation(program, "b");
  const cUniformLocation = gl.getUniformLocation(program, "c");
  const dUniformLocation = gl.getUniformLocation(program, "d");

  gl.useProgram(program);
  gl.bindVertexArray(vao);
  
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  
  const a = { x: 0.5, y: 0.5, z: 0.5 };
  const b = { x: 1.0, y: 0, z: 0 };
  const c = { x: 0, y: 1.0, z: 0 };
  const d = { x: 0, y: 0, z: 1.0 };
  
  gl.uniform3f(aUniformLocation, a.x, a.y, a.z);
  gl.uniform3f(bUniformLocation, b.x, b.y, b.z);
  gl.uniform3f(cUniformLocation, c.x, c.y, c.z);
  gl.uniform3f(dUniformLocation, d.x, d.y, d.z);
  
  const primitiveType = gl.TRIANGLES;
  offset = 0;
  const count = 6;
  gl.drawArrays(primitiveType, offset, count);

  function updateUniform(glUniform, jsVar) {
    return function(){
      gl.clearColor(.3, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      // !!!!!
      gl.uniform3f(glUniform, jsVar.x, jsVar.y, jsVar.z);
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
      gl.drawArrays(primitiveType, offset, count);
    }
  }
  
  // Dat.gui
  const dat = require("dat.gui");
  const gui = new dat.GUI({ name: "Pippo" });

  const folderA = gui.addFolder("a");
  folderA
    .add(a, "x", 0, 1.0, 0.033333333)
    .onChange(updateUniform(aUniformLocation, a));
  folderA
    .add(a, "y", 0, 1.0, 0.033333333)
    .onChange(updateUniform(aUniformLocation, a));
  folderA
    .add(a, "z", 0, 1.0, 0.033333333)
    .onChange(updateUniform(aUniformLocation, a));

  const folderB = gui.addFolder("b");
  folderB
    .add(b, "x", 0, 1.0, 0.033333333)
    .onChange(updateUniform(bUniformLocation, b));
  folderB
    .add(b, "y", 0, 1.0, 0.033333333)
    .onChange(updateUniform(bUniformLocation, b));
  folderB
    .add(b, "z", 0, 1.0, 0.033333333)
    .onChange(updateUniform(bUniformLocation, b));

  const folderC = gui.addFolder("c");
  folderC
    .add(c, "x", 0, 1.0, 0.033)
    .onChange(updateUniform(cUniformLocation, c));
  folderC
    .add(c, "y", 0, 1.0, 0.033)
    .onChange(updateUniform(cUniformLocation, c));
  folderC
    .add(c, "z", 0, 1.0, 0.033)
    .onChange(updateUniform(cUniformLocation, c));

  const folderD = gui.addFolder("d");
  folderD
    .add(d, "x", 0, 1.0, 0.033)
    .onChange(updateUniform(dUniformLocation, d));
  folderD
    .add(d, "y", 0, 1.0, 0.033)
    .onChange(updateUniform(dUniformLocation, d));
  folderD
    .add(d, "z", 0, 1.0, 0.033)
    .onChange(updateUniform(dUniformLocation, d));

  gui.open();
})();
