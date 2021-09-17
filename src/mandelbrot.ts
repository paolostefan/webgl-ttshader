import * as dat from "dat.gui";
import { glTwoTrianglesCapsule } from "./abstract/glTwoTrianglesCapsule";
import fragmentShaderSrc from "./shaders/mandelbrot-antialias.glsl";

export class Mandelbrot extends glTwoTrianglesCapsule {
  parameters = {
    fullscreen: false,
    vside: 0.035,
    lower_left: { x: -1.179, y: -0.293 },
    a: { x: 0.55, y: 0.4, z: 0.23 },
    b: { x: 0.44, y: 0.58, z: 0.77 },
    c: { x: 2.1, y: 2.9, z: 2.2 },
    d: { x: 0.44, y: 0.52, z: 0.92 },
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

  run() {
    console.time("Init successful");
    this.initTwoTriangles(fragmentShaderSrc);
    this.drawScene(0);
    this.initGUI();
    console.timeEnd("Init successful");

    this.drawScene(0);

    this.initGUI();

    window.requestAnimationFrame((milliseconds) => {
      this.drawScene(milliseconds);
    });

    console.log("Init successful");
  }

  bindUniforms(_milliseconds: number) {
    // Starting bind of uniform vars
    this.gl.uniform2f(
      this.uniformLoc("u_resolution"),
      this.canvas.width,
      this.canvas.height
    );
    this.gl.uniform1f(this.uniformLoc("vside"), this.parameters.vside);
    this.gl.uniform2f(
      this.uniformLoc("lower_left"),
      this.parameters.lower_left.x,
      this.parameters.lower_left.y
    );
    this.gl.uniform3f(
      this.uniformLoc("a"),
      this.parameters.a.x,
      this.parameters.a.y,
      this.parameters.a.z
    );
    this.gl.uniform3f(
      this.uniformLoc("b"),
      this.parameters.b.x,
      this.parameters.b.y,
      this.parameters.b.z
    );
    this.gl.uniform3f(
      this.uniformLoc("c"),
      this.parameters.c.x,
      this.parameters.c.y,
      this.parameters.c.z
    );
    this.gl.uniform3f(
      this.uniformLoc("d"),
      this.parameters.d.x,
      this.parameters.d.y,
      this.parameters.d.z
    );
  }

  initGUI() {
    const gui = new dat.GUI({ name: "Benoit" });

    gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));

    const folderRes = gui.addFolder("Vertical side screen size");
    folderRes
      .add(this.parameters, "vside", 0.001, 4.0, 0.001)
      .onChange(this.updateUniform1f("vside"));

    const folderLowerLeft = gui.addFolder("Lower left corner coords");
    folderLowerLeft
      .add(this.parameters.lower_left, "x", -2.8, 2.8, 0.001)
      .onChange(this.updateUniform2f("lower_left"));
    folderLowerLeft
      .add(this.parameters.lower_left, "y", -2.8, 2.8, 0.001)
      .onChange(this.updateUniform2f("lower_left"));

    const folderA = gui.addFolder("a");
    folderA
      .add(this.parameters.a, "x", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("a"));
    folderA
      .add(this.parameters.a, "y", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("a"));
    folderA
      .add(this.parameters.a, "z", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("a"));

    const folderB = gui.addFolder("b");
    folderB.add(this.parameters.b, "x", 0, 1.0, 0.01);
    folderB.add(this.parameters.b, "y", 0, 1.0, 0.01);
    folderB.add(this.parameters.b, "z", 0, 1.0, 0.01);

    const folderC = gui.addFolder("c");
    folderC
      .add(this.parameters.c, "x", 0, 6.0, 0.1)
      .onChange(this.updateUniform3f("c"));
    folderC
      .add(this.parameters.c, "y", 0, 6.0, 0.1)
      .onChange(this.updateUniform3f("c"));
    folderC
      .add(this.parameters.c, "z", 0, 6.0, 0.1)
      .onChange(this.updateUniform3f("c"));

    const folderD = gui.addFolder("d");
    folderD
      .add(this.parameters.d, "x", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("d"));
    folderD
      .add(this.parameters.d, "y", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("d"));
    folderD
      .add(this.parameters.d, "z", 0, 1.0, 0.01)
      .onChange(this.updateUniform3f("d"));

    gui.open();
    this.gui = gui;
  }
}
