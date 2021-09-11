import * as dat from "dat.gui";
import { glCapsule } from "./glCapsule";
import fragmentShaderSrc from "./shaders/terrain.glsl";
import { mat4, vec3 } from "gl-matrix";

/**
 * Terrain Ray Marcher
 */
export class Terrain extends glCapsule {
  cameraMatrix: mat4 = mat4.create();

  drawScene(milliseconds: number) {
    if (!this.paused) {
      const primitiveType = this.gl.TRIANGLES;
      const offset = 0;
      const count = 6;

      let m = mat4.create();

      m = mat4.translate(m, m, vec3.fromValues(0, 0, -4));
      let mc = mat4.create();
      console.log(mat4.lookAt(mc, [0, 3, 0], [0, 0, -3], [0, 1, 0]));
      // m = mat4.rotateX(m, m, (Math.PI/6)*Math.sin(milliseconds/1000));

      this.cameraMatrix = m;

      this.gl.clearColor(0, 0, 0, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.useProgram(this.program);
      this.gl.bindVertexArray(this.vao);
      this.gl.drawArrays(primitiveType, offset, count);

      // Aggiorna le variabili uniform
      this.bindUniforms(milliseconds);
    }
    window.requestAnimationFrame((m) => {
      this.drawSceneWithFps(m);
    });
  }

  /**
   * Assegna i valori alle variabili Uniform utilizzate dallo shader
   */
  bindUniforms(milliseconds: number) {
    this.gl.uniform1f(this.uniformLoc("u_time"), milliseconds);
    this.gl.uniform2f(this.uniformLoc("u_mouse"), 0, 0);

    this.gl.uniform2f(
      this.uniformLoc("u_resolution"),
      this.canvas.width,
      this.canvas.height
    );

    this.gl.uniform3f(this.uniformLoc("u_lookfrom"), Math.cos(milliseconds/3000), 5, Math.sin(milliseconds/3000));
    this.gl.uniform3f(this.uniformLoc("u_lookat"), 0, 1+Math.sin(milliseconds/2000), 0);
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
    this.parameters = {
      fullscreen: false,
      pause: false,
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

    this.drawScene(0);

    // Dat.gui
    const gui = new dat.GUI({ name: "Terrain" });

    gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));

    gui.add(this.parameters, "pause").onChange(this.pause.bind(this));

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

    this.drawScene(0);
    console.timeEnd("Init successful");
  }
}
