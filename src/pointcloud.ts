import * as dat from "dat.gui";
import { mat4, vec3 } from "gl-matrix";
import { glCapsule } from "./glCapsule";
import fragmentShaderSrc from "./shaders/pointcloud-fragment.glsl";
import vertexShaderSrc from "./shaders/pointcloud-vertex.glsl";

/**
 * "Point cloud", cioè un semplice mucchio di punti che ruotano sull'asse verticale
 */

const POINT_COUNT = 15000;

export class Pointcloud extends glCapsule {
  // Parameters handled by Dat.gui widgets
  parameters = {
    fullscreen: false,
    // Frustum variables
    F_near: 10.0,
    F_far: 250.0,
    F_bottom: -6.0,
    F_top: 6.0,
    F_left: 0, // Left e Right vengono impostati automaticamente da setMatrix
    F_right: 0,
    scale: 9,
    translate: -20,
    rotateX: 0,
  };

  // Cubo di lato 2 centrato in zero
  // coordinates = [0.02083333395421505, 16.66666603088379, -160.77694702148438, -150]; // -.1, -.1, 10, 0, .999, 10.5];

  coordinates = new Array<number>(POINT_COUNT * 3);
  vbo: any;

  projMatrix: mat4;

  drawScene(milliseconds: number) {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.useProgram(this.program);
    this.gl.bindVertexArray(this.vao);

    const offset = 0;
    // N. di punti
    const count = POINT_COUNT;
    this.gl.drawArrays(this.gl.POINTS, offset, count);

    // Aggiorna le variabili uniform
    this.setMatrix(milliseconds);
    this.gl.uniform1f(this.uniformLoc("u_time"), milliseconds);

    window.requestAnimationFrame((m) => {
      this.drawScene(m);
      this.updateFps(m);
    });
  }

  /**
   * Imposta la matrice di trasformazione
   * @param milliseconds 
   */
  setMatrix(milliseconds?: number) {
    const m = mat4.create();

    mat4.translate(m, m, vec3.fromValues(0, 0, this.parameters.translate));

    mat4.scale(
      m,
      m,
      vec3.fromValues(
        this.parameters.scale,
        this.parameters.scale,
        this.parameters.scale
      )
    );

    mat4.rotateX(m, m, this.parameters.rotateX);
    mat4.rotateY(m, m, milliseconds / 3000);

    this.projMatrix = mat4.create();

    mat4.frustum(
      this.projMatrix,
      this.parameters.F_left,
      this.parameters.F_right,
      this.parameters.F_bottom,
      this.parameters.F_top,
      this.parameters.F_near,
      this.parameters.F_far
    );

    this.projMatrix = mat4.multiply(this.projMatrix, this.projMatrix, m);

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

    // this.gl.uniform2f(
    //   this.uniformLoc("u_resolution"),
    //   this.canvas.width,
    //   this.canvas.height
    // );
  }

  initGUI() {
    const gui = new dat.GUI({ name: "Point cloud" });

    gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));
    gui
      .add(this.parameters, "F_near", 1, 100)
      .onChange(this.setMatrix.bind(this));
    gui.add(this.parameters, "F_far", 1.9, 2000);
    gui.add(this.parameters, "F_bottom", -20, 0);
    gui.add(this.parameters, "F_top", 0, 20);
    gui.add(this.parameters, "scale", 3, 100);
    gui.add(this.parameters, "translate", -300, -1);
    gui.add(this.parameters, "rotateX", -Math.PI, Math.PI, 0.005);

    gui.open();
  }

  run() {
    // Creazione degli shader e del programma
    // ======================================

    console.time("Created vertex and fragment shaders");
    const vertexShader = this.createShader(
      this.gl.VERTEX_SHADER,
      vertexShaderSrc
    );

    const fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSrc
    );

    console.timeEnd("Created vertex and fragment shaders");

    this.program = this.createAndLinkProgram(vertexShader, fragmentShader);

    var positionAttributeLocation = this.gl.getAttribLocation(
      this.program,
      "coordinates"
    );

    console.time("Initialized array of random points");
    for (let i = 0; i < POINT_COUNT; i++) {
      const radius = Math.pow(Math.random(), 5);
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      this.coordinates[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      this.coordinates[i * 3 + 1] = radius * Math.sin(phi);
      this.coordinates[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

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

    var size = 3; // 3 components per iteration
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
    console.timeEnd("Initialized array of random points");

    this.initGUI();

    this.gl.viewport(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this.parameters.F_right =
      (this.canvas.clientWidth *
        (this.parameters.F_top - this.parameters.F_bottom)) /
      (this.canvas.clientHeight * 2);
    this.parameters.F_left = -this.parameters.F_right;

    this.gl.enable(this.gl.DEPTH_TEST);

    console.log("Init successful");

    window.requestAnimationFrame((milliseconds) => {
      this.drawScene(milliseconds);
    });
  }

  toggleFullscreen(fs: boolean) {
    super.toggleFullscreen(fs);
    this.parameters.F_right =
      (this.canvas.clientWidth *
        (this.parameters.F_top - this.parameters.F_bottom)) /
      (this.canvas.clientHeight * 2);
    this.parameters.F_left = -this.parameters.F_right;
  }
}
