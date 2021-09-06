import * as dat from "dat.gui";
import { mat4, vec4 } from "gl-matrix";
import { glCapsule } from "./glCapsule";
import fragmentShaderSrc from "./shaders/pointcloud-fragment.glsl";
import vertexShaderSrc from "./shaders/pointcloud-vertex.glsl";

/**
 * Point cloud
 */
export class Pointcloud extends glCapsule {
  // Parameters handled by Dat.gui widgets
  parameters = {
    fullscreen: false,
    // Frustum variables
    F_near: 5.0,
    F_far: 2000.0,
    F_bottom: -3.0,
    F_top: 3.0,
    F_left: -10,
    F_right: 10,
  };

  coordinates = [0.02083333395421505, 16.66666603088379, -160.77694702148438, -150]; // -.1, -.1, 10, 0, .999, 10.5];
  vbo: any;

  projMatrix = mat4.create();

  drawScene(milliseconds: number) {
    this.gl.clearColor(0, 0, 0.2, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.useProgram(this.program);
    this.gl.bindVertexArray(this.vao);

    const primitiveType = this.gl.POINTS;
    const offset = 0;
    // N. di punti
    const count = 1;
    this.gl.drawArrays(primitiveType, offset, count);

    // Aggiorna le variabili uniform
    this.setFrustumMatrix();
    this.gl.uniform1f(this.uniformLoc("u_time"), milliseconds);

    // let testpoint = vec4.fromValues(10, 10, 150, 1);
    // vec4.transformMat4(testpoint, testpoint, this.projMatrix);
    // console.log(testpoint);
    debugger;
    
    window.requestAnimationFrame((m) => {
      this.drawScene(m);
    });
  }

  setFrustumMatrix() {
    this.parameters.F_right =
      (this.canvas.width * (this.parameters.F_top - this.parameters.F_bottom)) /
      2;
    this.parameters.F_left = -this.parameters.F_right;

    this.projMatrix = mat4.frustum(
      this.projMatrix,
      this.parameters.F_left,
      this.parameters.F_right,
      this.parameters.F_bottom,
      this.parameters.F_top,
      this.parameters.F_near,
      this.parameters.F_far
    );

    // console.log(this.projMatrix)
    
    this.gl.uniformMatrix4fv(
      this.uniformLoc("u_matrix"),
      false,
      this.projMatrix
      );
  }

  /**
   * Assegna i valori iniziali alle variabili Uniform utilizzate dallo shader
   */
  bindUniforms() {
    this.gl.uniform1f(this.uniformLoc("u_time"), 0);
    this.gl.uniform2f(this.uniformLoc("u_mouse"), 0, 0);

    this.gl.uniform2f(
      this.uniformLoc("u_resolution"),
      this.canvas.width,
      this.canvas.height
    );
  }

  initGUI() {
    const gui = new dat.GUI({ name: "Point cloud" });

    gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));
    gui
      .add(this.parameters, "F_near", 1, 100)
      .onChange(this.setFrustumMatrix.bind(this));
    gui.add(this.parameters, "F_far", 2, 2000);
    gui.add(this.parameters, "F_bottom", -20, 0);
    gui.add(this.parameters, "F_top", 0, 20);

    gui.open();
  }

  doTheJob() {
    // Creazione degli shader e del programma
    // ======================================

    const vertexShader = this.createShader(
      this.gl.VERTEX_SHADER,
      vertexShaderSrc
    );

    const fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSrc
    );

    console.log("Created vertex and fragment shaders");

    this.program = this.createAndLinkProgram(vertexShader, fragmentShader);

    var positionAttributeLocation = this.gl.getAttribLocation(
      this.program,
      "coordinates"
    );
    var positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    // three 3d points
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.coordinates),
      this.gl.STATIC_DRAW
    );

    this.vao = this.gl.createVertexArray();
    // make 'vao' the current vertex array so that all of our attribute settings will apply to that set of attribute state
    this.gl.bindVertexArray(this.vao);
    this.gl.enableVertexAttribArray(positionAttributeLocation);

    var size = 4; // 3 components per iteration
    var type = this.gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    this.gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    this.initGUI();

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.enable(this.gl.DEPTH_TEST);

    console.log("Init successful");

    window.requestAnimationFrame((milliseconds) => {
      this.drawScene(milliseconds);
    });
  }
}
