import * as dat from "dat.gui";
import { glCapsule } from "./glCapsule";
import fragmentShaderSrc from "./shaders/raytracer.glsl";
import { mat4, vec3 } from "gl-matrix";

/**
 * Ray tracer/ ray marcher implementato solo "lato fragment shader" usando due triangoli
 */

export class Raytracer extends glCapsule {
  parameters = {
    fullscreen: false,
    antialiasing: false,
  };

  // Elenco degli oggetti nella scena
  readonly spheres = [
    1, 1, 0, 0.5, 1, -1, 0, 0.66, -1, 1, 0, 0.6, -1, -1, 0, 0.37, 0, 0, 0.5,
    0.1, 0, -2, -3.5, 1,
  ];

  transformMatrix: mat4 = mat4.create();

  drawScene(milliseconds: number) {
    const primitiveType = this.gl.TRIANGLES;
    const offset = 0;
    const count = 6;

    let m = mat4.create();
    m = mat4.translate(m, m, vec3.fromValues(0, 0, -4));
    m = mat4.rotateY(m, m, milliseconds / 2873);
    m = mat4.rotateX(m, m, milliseconds / 3501);

    const scale = 1 + 0.3 * Math.cos(milliseconds / 1977);
    m = mat4.scale(m, m, vec3.fromValues(scale, scale, scale));

    this.transformMatrix = m;

    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);
    this.gl.bindVertexArray(this.vao);
    this.gl.drawArrays(primitiveType, offset, count);

    // Aggiorna le variabili uniform
    this.bindUniforms(milliseconds);

    window.requestAnimationFrame((m) => {
      this.drawSceneWithFps(m);
    });
  }

  /**
   * Assegna i valori iniziali alle variabili Uniform utilizzate dallo shader
   * NB: u_mouse viene aggiornata dalla classe madre glCapsule
   */
  bindUniforms(milliseconds: number) {
    this.gl.uniform1f(this.uniformLoc("u_time"), milliseconds);

    this.gl.uniform2f(
      this.uniformLoc("u_resolution"),
      this.canvas.width,
      this.canvas.height
    );

    this.gl.uniform4fv(
      this.uniformLoc("u_spheres"),
      this.spheres,
      0,
      this.spheres.length
    );

    this.gl.uniformMatrix4fv(
      this.uniformLoc("u_matrix"),
      false,
      this.transformMatrix
    );

    this.gl.uniform1i(
      this.uniformLoc("u_antialiasing"),
      this.parameters.antialiasing ? 1 : 0
    );
  }

  run() {
    const vertexShaderSrc = `#version 300 es
    in vec4 a_position;
    
    void main() {
        gl_Position = a_position;
    }
    `;

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

    const positionAttribLocation = this.gl.getAttribLocation(
      this.program,
      "a_position"
    );
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    const positions = [-1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1];

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW
    );
    this.vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(this.vao);
    this.gl.enableVertexAttribArray(positionAttribLocation);

    const size = 2; // 2 components per iteration
    const type = this.gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0; // start at the beginning of the buffer
    this.gl.vertexAttribPointer(
      positionAttribLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    // Altri valori interessanti
    // res: {
    //   vside: 0.176,
    //   lower_left: { x: -0.681, y: -0.711 },
    // },
    // a: { x: 0.17, y: 0.5, z: 0.5 },
    // b: { x: 0.83, y: 0.5, z: 0.5 },
    // c: { x: 6, y: 5.4, z: 2.2 },
    // d: { x: 0.46, y: 0.68, z: 0.98 },

    this.drawScene(0);

    // Dat.gui
    const gui = new dat.GUI({ name: "Gianfranco" });

    gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));

    gui.add(this.parameters, "antialiasing");

    // const folderA = gui.addFolder("a");
    // folderA
    //   .add(this.parameters.a, "x", 0, 1.0, 0.01)
    //   .onChange(this.updateUniform3f("a"));
    // folderA
    //   .add(this.parameters.a, "y", 0, 1.0, 0.01)
    //   .onChange(this.updateUniform3f("a"));
    // folderA
    //   .add(this.parameters.a, "z", 0, 1.0, 0.01)
    //   .onChange(this.updateUniform3f("a"));

    gui.open();

    window.requestAnimationFrame((milliseconds) => {
      this.drawScene(milliseconds);
    });

    console.log("Init successful");
  }
}
