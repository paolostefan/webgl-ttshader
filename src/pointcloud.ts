import * as dat from "dat.gui";
import { glCapsule } from "./glCapsule";
import fragmentShaderSrc from "./shaders/pointcloud-fragment.glsl";
import vertexShaderSrc from "./shaders/pointcloud-vertex.glsl";

/**
 * Point cloud
 */
export class Pointcloud extends glCapsule {
  coordinates = [-0.5, 0.5, 0.0, 0.0, 0.9, 0.0, -0.25, -0.9, 0.0];
  vbo: any;

  drawScene(milliseconds: number) {
    this.gl.clearColor(0, 0, 0.2, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.useProgram(this.program);
    this.gl.bindVertexArray(this.vao);

    const primitiveType = this.gl.POINTS;
    const offset = 0;
    const count = 3;
    this.gl.drawArrays(primitiveType, offset, count);

    // Aggiorna le variabili uniform
    this.gl.uniform1f(this.uniformLoc("u_time"), milliseconds);

    window.requestAnimationFrame((m) => {
      this.drawScene(m);
    });
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
    // Dat.gui
    this.parameters = {
      fullscreen: false,
    };
    const gui = new dat.GUI({ name: "Gianfranco" });

    gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));

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

    this.initGUI();

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    console.log("Init successful");

    window.requestAnimationFrame((milliseconds) => {
      this.drawScene(milliseconds);
    });
  }
}
