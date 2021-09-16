import * as dat from "dat.gui";
import { glCapsule } from "./abstract/glCapsule";
import fragmentShaderSrc from "./shaders/noise.glsl";

/**
 * Noise generator
 */
export class Noise extends glCapsule {
  parameters = {
    fullscreen: false,
    pause: false,
    debugRandom: false,
    scale: 40.0,
    seed: 839.2121,
    phase: Math.PI,
    speed: 2, // velocità del movimento (unità/secondo)
    noiseType: '1', // velocità del movimento (unità/secondo)
  };

  drawScene(milliseconds: number) {
    if (!this.paused) {
      const primitiveType = this.gl.TRIANGLES;
      const offset = 0;
      const count = 6;

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
    const gl = this.gl;
    gl.uniform1f(this.uniformLoc("u_time"), milliseconds);
    gl.uniform2f(this.uniformLoc("u_mouse"), 0, 0);
    gl.uniform2f(
      this.uniformLoc("u_resolution"),
      this.canvas.width,
      this.canvas.height
    );

    gl.uniform1f(this.uniformLoc("u_scale"), this.parameters.scale);
    gl.uniform1f(this.uniformLoc("u_seed"), this.parameters.seed);
    gl.uniform1f(this.uniformLoc("u_phase"), this.parameters.phase);
    gl.uniform1f(this.uniformLoc("u_speed"), this.parameters.speed);
    gl.uniform1i(
      this.uniformLoc("u_debug_random"),
      this.parameters.debugRandom ? 1 : 0
    );
    gl.uniform1i(
      this.uniformLoc("u_noise_type"),
      parseInt(this.parameters.noiseType)
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

    // Dat.gui
    const gui = new dat.GUI({ name: "Noise" });

    gui.add(this.parameters, "noiseType", {
      'Value noise':'0',
      'Gradient noise':'1',
    });
    gui.add(this.parameters, "scale", 1, 2000, 0.1);
    gui.add(this.parameters, "seed", 800.1, 160101, 0.11);
    gui.add(this.parameters, "phase", 0, 2*Math.PI, 0.03);
    gui.add(this.parameters, "speed", 0, 30, 0.1);
    gui.add(this.parameters, "debugRandom");
    
    gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));

    gui.add(this.parameters, "pause").onChange(this.pause.bind(this));

    gui.open();

    this.drawScene(0);
    console.timeEnd("Init successful");
  }
}
