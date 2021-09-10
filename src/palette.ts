import * as dat from "dat.gui";
import { glCapsule } from "./glCapsule";
import fragmentShaderSrc from "./shaders/palette.glsl";

/**
 * Palette ciclica
 */

export class Palette extends glCapsule {
parameters = {
    a: { r: 0.55, g: 0.4, b: 0.23 },
    b: { r: 0.44, g: 0.58, b: 0.77 },
    c: { r: 2.1, g: 2.9, b: 2.2 },
    d: { r: 0.44, g: 0.52, b: 0.92 },
    };
    
    // Altri valori interessanti
    // a: { r: 0.17, g: 0.5, b: 0.5 },
    // b: { r: 0.83, g: 0.5, b: 0.5 },
    // c: { r: 6, g: 5.4, b: 2.2 },
    // d: { r: 0.46, g: 0.68, b: 0.98 },

  drawScene(milliseconds: number) {
    const primitiveType = this.gl.TRIANGLES;
    const offset = 0;
    const count = 6;
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);
    this.gl.bindVertexArray(this.vao);
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

    this.gl.uniform3f(
      this.uniformLoc("a"),
      this.parameters.a.r,
      this.parameters.a.g,
      this.parameters.a.b
    );
    this.gl.uniform3f(
      this.uniformLoc("b"),
      this.parameters.b.r,
      this.parameters.b.g,
      this.parameters.b.b
    );
    this.gl.uniform3f(
      this.uniformLoc("c"),
      this.parameters.c.r,
      this.parameters.c.g,
      this.parameters.c.b
    );
    this.gl.uniform3f(
      this.uniformLoc("d"),
      this.parameters.d.r,
      this.parameters.d.g,
      this.parameters.d.b
    );
  }

  run() {
    console.time("Init successful");

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


    this.drawScene(0);

    // Starting bind of uniform vars
    this.bindUniforms();

    // Dat.gui
    const gui = new dat.GUI({ name: "Gianfranco" });

    const folderA = gui.addFolder("a");
    folderA
      .add(this.parameters.a, "r", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("a"));
    folderA
      .add(this.parameters.a, "g", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("a"));
    folderA
      .add(this.parameters.a, "b", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("a"));

    const folderB = gui.addFolder("b");
    folderB
      .add(this.parameters.b, "r", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("b"));
    folderB
      .add(this.parameters.b, "g", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("b"));
    folderB
      .add(this.parameters.b, "b", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("b"));

    const folderC = gui.addFolder("c");
    folderC
      .add(this.parameters.c, "r", 0, 10, .1)
      .onChange(this.updateUniform3f("c"));
    folderC
      .add(this.parameters.c, "g", 0, 10, .1)
      .onChange(this.updateUniform3f("c"));
    folderC
      .add(this.parameters.c, "b", 0, 10, .1)
      .onChange(this.updateUniform3f("c"));

    const folderD = gui.addFolder("d");
    folderD
      .add(this.parameters.d, "r", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("d"));
    folderD
      .add(this.parameters.d, "g", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("d"));
    folderD
      .add(this.parameters.d, "b", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("d"));

    gui.open();

    window.requestAnimationFrame((milliseconds) => {
      this.drawScene(milliseconds);
    });

    console.timeEnd("Init successful");
  }

  updateUniform3f(name: string) {
    return () => {
      this.gl.uniform3f(
        this.uniformLoc(name),
        this.parameters[name].r,
        this.parameters[name].g,
        this.parameters[name].b
      );
    };
  }
}
