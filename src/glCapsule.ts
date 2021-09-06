export abstract class glCapsule {
  public errorContainer: any;
  protected canvas: any;
  public gl: WebGL2RenderingContext; // TODO : fare meglio
  public parameters: { [key: string]: any };

  protected program: any;
  protected vao: any;
  private lastMilliseconds = 0;
  private fps = 0;

  abstract doTheJob(): void;
  abstract drawScene(milliseconds: number): void;

  constructor() {
    this.errorContainer = document.querySelector("#errormsg");
    this.canvas = document.querySelector("#c");
    this.gl = this.canvas.getContext("webgl2");
    if (!this.gl) {
      const msg =
        "Fatal error: WebGL2 not available. Please check your browser's compatibility.";
      alert("WebGL2 not available");
      this.displayError(msg);
      throw new Error(msg);
    }
    console.log("Got WebGL2");

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

  createAndLinkProgram(vertexShader: any, fragmentShader: any) {
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

    console.log("WebGL2 program created and linked without errors");

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
    if (milliseconds - this.lastMilliseconds >= 1000) {
      document.getElementById("fps").innerHTML = (this.fps+1).toString();
      this.lastMilliseconds = milliseconds;
      this.fps = 0;
    } else {
      this.fps++;
    }
  }
}
