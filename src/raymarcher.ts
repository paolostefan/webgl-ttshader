import * as dat from "dat.gui";
import { glTwoTrianglesCapsule } from "./abstract/glTwoTrianglesCapsule";
import fragmentShaderSrc from "./shaders/raymarcher.glsl";
/**
 * Ray marcher implementato "lato fragment shader" usando due triangoli
 */
export class Raymarcher extends glTwoTrianglesCapsule {
  parameters = {
    fullscreen: false,
    antialiasing: false,
    pause: false,
    debugRaymarch: false,
  };

  run() {
    this.initGUI();
    this.initTwoTriangles(fragmentShaderSrc);
    this.drawScene(0);
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

    this.gl.uniform1i(
      this.uniformLoc("u_antialiasing"),
      this.parameters.antialiasing ? 1 : 0
    );

    this.gl.uniform1i(
      this.uniformLoc("u_debug_raymarch"),
      this.parameters.debugRaymarch ? 1 : 0
    );
  }

  initGUI() {
    // Dat.gui
    this.gui = new dat.GUI({ name: "Gianfranco" });

    this.gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));
    this.gui.add(this.parameters, "pause").onChange(this.pause.bind(this));

    this.gui.add(this.parameters, "antialiasing");
    this.gui.add(this.parameters, "debugRaymarch");

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

    this.gui.open();
  }
}
