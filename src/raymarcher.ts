import * as dat from "dat.gui";
import { mat4, vec3 } from "gl-matrix";
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
  };

  // Elenco degli oggetti nella scena
  readonly spheres = [
    1, 1, 0, 0.5, 1, -1, 0, 0.66, -1, 1, 0, 0.6, -1, -1, 0, 0.37, 0, 0, 0.5,
    0.1, 0, -2, -3.5, 1,
  ];

  transformMatrix: mat4 = mat4.create();

  drawScene(milliseconds: number) {
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
    this.drawTwoTriangles();
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
    this.initGUI();
    this.initTwoTriangles(fragmentShaderSrc);
    this.drawScene(0);
    window.requestAnimationFrame((milliseconds) => {
      this.drawScene(milliseconds);
    });

    console.log("Init successful");
  }

  initGUI() {
    // Dat.gui
    this.gui = new dat.GUI({ name: "Gianfranco" });

    this.gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));

    this.gui.add(this.parameters, "antialiasing");
    this.gui.add(this.parameters, "pause").onChange(this.pause.bind(this));

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
