import * as dat from "dat.gui";
import { glTwoTrianglesCapsule } from "./abstract/glTwoTrianglesCapsule";
import fragmentShaderSrc from "./shaders/noise.glsl";

/**
 * Noise generator
 */
export class Noise extends glTwoTrianglesCapsule {
  parameters = {
    fullscreen: false,
    pause: false,
    debugRandom: false,
    scale: 40.0,
    seed: 839.2121,
    phase: Math.PI,
    speed: 2, // velocità del movimento (unità/secondo)
    noiseType: "1", // velocità del movimento (unità/secondo)
  };

  run() {
    this.initTwoTriangles(fragmentShaderSrc);
    this.initGUI();
    this.drawScene(0);
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
      this.canvas.clientWidth,
      this.canvas.clientHeight
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

  initGUI() {
    // Dat.gui
    const gui = new dat.GUI({ name: "Noise" });

    gui.add(this.parameters, "noiseType", {
      "Value noise": "0",
      "Gradient noise": "1",
    });
    gui.add(this.parameters, "scale", 1, 2000, 0.1);
    gui.add(this.parameters, "seed", 800.1, 160101, 0.11);
    gui.add(this.parameters, "phase", 0, 2 * Math.PI, 0.03);
    gui.add(this.parameters, "speed", 0, 30, 0.1);
    gui.add(this.parameters, "debugRandom");

    gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));

    gui.add(this.parameters, "pause").onChange(this.pause.bind(this));

    gui.open();

    this.gui = gui;
  }
}
