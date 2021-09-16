import * as dat from "dat.gui";

export abstract class glCapsule {
  
  protected canvas:any = document.getElementById("c");
  public errorContainer = document.getElementById("errormsg");
  private fpsContainer = document.getElementById("fps");

  public gl: WebGL2RenderingContext;
  protected program: WebGLProgram;
  protected vao: WebGLVertexArrayObject;
  
  protected gui: dat.GUI;

  public parameters: { [key: string]: any };
  private lastMilliseconds = 0;
  private fps = 0;

  protected paused: boolean;

  abstract run(): void;
  abstract drawScene(milliseconds: number): void;

  constructor() {
    console.time("Got WebGL2 context");
    
    this.gl = this.canvas.getContext("webgl2");
    if (!this.gl) {
      const msg =
        "Fatal error: WebGL2 not available. Please check your browser's compatibility.";
      alert("WebGL2 not available");
      this.displayError(msg);
      throw new Error(msg);
    }

    console.timeEnd("Got WebGL2 context");

    this.canvas.addEventListener(
      "mousemove",
      this.updateMouseCoords.bind(this)
    );
  }

  displayError(msg: string) {
    this.errorContainer.innerHTML = msg;
  }

  updateMouseCoords(event: { clientX: number; clientY: number }) {
    this.gl.uniform2f(this.uniformLoc("u_mouse"), event.clientX, event.clientY);
  }

  uniformLoc(name: string) {
    return this.gl.getUniformLocation(this.program, name);
  }

  createShader(type: number, src: string) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, src);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const msg =
        `Cannot create shader of type ${type}\n` +
        this.gl.getShaderInfoLog(shader);
      this.displayError(msg);
      this.gl.deleteShader(shader);
      throw new Error(msg);
    }
    return shader;
  }

  /**
   * Utile come callback di gui.onChange
   */
  updateUniform1f(name: string) {
    return (value: number) => {
      this.gl.uniform1f(this.uniformLoc(name), value);
    };
  }

  updateUniform2f(name: string) {
    return () => {
      this.gl.uniform2f(
        this.uniformLoc(name),
        this.parameters[name].x,
        this.parameters[name].y
      );
    };
  }

  updateUniform3f(name: string) {
    return () => {
      this.gl.uniform3f(
        this.uniformLoc(name),
        this.parameters[name].x,
        this.parameters[name].y,
        this.parameters[name].z
      );
    };
  }

  updateBooleanUniform(name: string) {
    return (value: boolean) => {
      this.gl.uniform1i(this.uniformLoc(name), !!value ? 1 : 0);
    };
  }

  createAndLinkProgram(vertexShader: any, fragmentShader: any) {
    console.time("WebGL2 program created and linked without errors");
    const prog = this.gl.createProgram();
    this.gl.attachShader(prog, vertexShader);
    this.gl.attachShader(prog, fragmentShader);
    this.gl.linkProgram(prog);
    if (!this.gl.getProgramParameter(prog, this.gl.LINK_STATUS)) {
      const msg =
        "Cannot create WebGL2 program\n" + this.gl.getProgramInfoLog(prog);
      this.displayError(msg);
      this.gl.deleteProgram(prog);
      throw new Error(msg);
    }

    console.timeEnd("WebGL2 program created and linked without errors");

    return prog;
  }

  toggleFullscreen(fs: boolean) {
    this.canvas.width = fs ? window.innerWidth : 800;
    this.canvas.height = fs ? window.innerHeight : 600;

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.uniform2f(
      this.uniformLoc("u_resolution"),
      this.canvas.width,
      this.canvas.height
    );
  }

  updateFps(milliseconds: number) {
    // console.debug("updateFps(%d)", milliseconds);
    if (milliseconds - this.lastMilliseconds >= 1000 && !!this.fpsContainer) {
      this.fpsContainer.innerHTML = (this.fps + 1).toString();
      this.lastMilliseconds = milliseconds;
      this.fps = 0;
    } else {
      this.fps++;
    }
  }

  // Shortcut
  drawSceneWithFps(milliseconds: number) {
    this.drawScene(milliseconds);
    this.updateFps(milliseconds);
  }

  pause(p: boolean) {
    this.paused = p;
  }

  // Override in children classes
  initGUI(){
    this.gui = new dat.GUI({ name: "glCapsule" });

    this.gui.add(this.parameters, "pause").onChange(this.pause.bind(this));
    this.gui
      .add(this.parameters, "fullscreen")
      .onChange(this.toggleFullscreen.bind(this));

    this.gui.open();
  }
}
