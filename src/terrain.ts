import * as dat from "dat.gui";
import { glCapsule } from "./glCapsule";
import fragmentShaderSrc from "./shaders/terrain.glsl";

/**
 * Terrain Ray Marcher
 */
export class Terrain extends glCapsule {

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
    
    gl.uniform1f(this.uniformLoc("u_seed"), this.parameters.seed);
    gl.uniform1f(this.uniformLoc("u_phase"), this.parameters.phase);

    gl.uniform2f(
      this.uniformLoc("u_resolution"),
      this.canvas.width,
      this.canvas.height
    );

    gl.uniform3f(
      this.uniformLoc("u_lookfrom"),
      30 + 7 * Math.cos(milliseconds / 3000),
      10,
      4 * Math.sin(milliseconds / 3000)
    );
    gl.uniform3f(this.uniformLoc("u_lookat"), 0, 0, 0);

    // // Tell the shader to get the texture from texture unit 0
    // gl.uniform1i(this.uniformLoc("u_debugTx"), 0);
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
      debugRaymarch: false,
      debugHit: false,
      seed: 839.2121,
      phase: 1.12,
    };

    // this.createDebugTexture();

    this.drawScene(0);

    // Dat.gui
    const gui = new dat.GUI({ name: "Terrain" });

    gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));

    gui.add(this.parameters, "pause").onChange(this.pause.bind(this));
    gui
      .add(this.parameters, "debugRaymarch")
      .onChange(this.updateBooleanUniform("u_debug_raymarch"));
    gui
      .add(this.parameters, "debugHit")
      .onChange(this.updateBooleanUniform("u_debug_hit"));

    gui.add(this.parameters, "seed", 800.1, 160101, 0.11);
    gui.add(this.parameters, "phase", 0, 2 * Math.PI, 0.03);

    gui.open();

    this.drawScene(0);
    console.timeEnd("Init successful");
  }

  // Standby in attesa di capire se e come usare glFramebuffer
  // createDebugTexture() {
  //   const gl = this.gl;
  //   this.debugTex = gl.createTexture();
  //   gl.bindTexture(gl.TEXTURE_2D, this.debugTex);

  //   // Facciamo in modo di non usare mipmaps
  //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  //   gl.texImage2D(
  //     gl.TEXTURE_2D,
  //     0, // mipLevel
  //     gl.LUMINANCE, // internalFormat
  //     this.canvas.clientWidth, // width
  //     this.canvas.clientHeight, // height
  //     0, // border
  //     gl.LUMINANCE, // srcFormat
  //     gl.UNSIGNED_BYTE, //
  //     new Uint8Array(this.canvas.clientWidth * this.canvas.clientHeight)
  //   );
  // }
}
