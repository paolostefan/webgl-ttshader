import * as dat from "dat.gui";
import { glCapsule } from "./abstract/glCapsule";
import { glTwoTrianglesCapsule } from "./abstract/glTwoTrianglesCapsule";
import fragmentShaderSrc from "./shaders/terrain.glsl";

/**
 * Terrain Ray Marcher
 */
export class Terrain extends glTwoTrianglesCapsule {
  parameters = {
    fullscreen: false,
    pause: false,
    debugRaymarch: false,
    debugHit: false,
    seed: 839.2121,
    phase: 1.12,
  };

  drawScene(milliseconds: number) {
    if (!this.paused) {
      this.gl.clearColor(0, 0, 0, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.useProgram(this.program);
      this.drawTwoTriangles();

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
    gl.uniform1i(
      this.uniformLoc("u_debug_hit"),
      this.parameters.debugHit ? 1 : 0
    );
    gl.uniform1i(
      this.uniformLoc("u_debug_raymarch"),
      this.parameters.debugRaymarch ? 1 : 0
    );

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
    this.initTwoTriangles(fragmentShaderSrc);

    // this.createDebugTexture();

    this.drawScene(0);

    // Dat.gui
    this.initGUI();

    this.drawScene(0);
    console.timeEnd("Init successful");
  }

  initGUI() {
    this.gui = new dat.GUI({ name: "Terrain" });

    this.gui.add(this.parameters, "pause").onChange(this.pause.bind(this));
    this.gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));

    this.gui
      .add(this.parameters, "debugRaymarch")
      .onChange(this.updateBooleanUniform("u_debug_raymarch"));
    this.gui
      .add(this.parameters, "debugHit")
      .onChange(this.updateBooleanUniform("u_debug_hit"));

    const folderF = this.gui.addFolder("Fractal params")
    folderF.add(this.parameters, "seed", 800.1, 160101, 0.11);
    folderF.add(this.parameters, "phase", 0, 2 * Math.PI, 0.03);

    this.gui.open();

    this.drawScene(0);
    console.timeEnd("Init successful");

    this.gui.open();
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
