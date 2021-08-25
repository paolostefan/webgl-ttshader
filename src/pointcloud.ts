import * as dat from "dat.gui";
import { glCapsule } from "./glCapsule";
import fragmentShaderSrc from "./shaders/pointcloud-fragment.glsl";
import vertexShaderSrc from "./shaders/pointcloud-vertex.glsl";

/**
 * Point cloud
 */

export class Pointcloud extends glCapsule {
  coordinates = [-0.5, 0.5, 0.0, 0.0, 0.5, .0, -0.25, 0.25, 1.0];
  vbo: any;

  drawScene(milliseconds: number) {
    this.gl.useProgram(this.program);

    // Associazione degli shader ai buffer
    // ===================================

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
    const coordAttribLocation = this.gl.getAttribLocation(
      this.program,
      "coordinates"
    );

    const size = 3; // components per iteration
    const type = this.gl.FLOAT; // data type is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0; // start at the beginning of the buffer
    this.gl.vertexAttribPointer(
      coordAttribLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    this.vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(this.vao);
    this.gl.enableVertexAttribArray(coordAttribLocation);

    // Enable depth test (???)
    this.gl.clearColor(0, 0, 0.2, 1);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.bindVertexArray(this.vao);

    const primitiveType = this.gl.POINTS;
    offset = 0;
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

  doTheJob() {
    // Definizione geometria
    // =====================

    // Crea un buffer vuoto
    this.vbo = this.gl.createBuffer();
    // Associa il tipo opportuno al buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
    // Passa i dati
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.coordinates),
      this.gl.STATIC_DRAW
    );
    // Unbind the buffer (non so il motivo, ma va fatto)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

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

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.parameters = {
      fullscreen: false,
    };

    this.drawScene(0);

    // Starting bind of uniform vars
    // this.bindUniforms();

    // Dat.gui
    const gui = new dat.GUI({ name: "Gianfranco" });

    gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));

    gui.open();

    console.log("Init successful");

    // window.requestAnimationFrame((milliseconds) => {
    //   this.drawScene(milliseconds);
    // });
  }
}
