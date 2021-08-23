export abstract class glCapsule {
  public errorContainer: any;
  protected canvas: any;
  public gl;
  public parameters: { [key: string]: any };

  protected program: any;
  protected vao: any;

  abstract doTheJob(): void;

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

    this.canvas.addEventListener("mousemove", this.updateMouseCoords.bind(this));
  }

  displayError(msg: string) {
    this.errorContainer.innerHTML = msg;
  }

  updateMouseCoords(event: { clientX: number; clientY: number }) {
    this.gl.uniform2f(
      this.uniformLoc("u_mouse"),
      event.clientX,
      event.clientY
    );
  }

  uniformLoc(name: string) {
    return this.gl.getUniformLocation(this.program, name);
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
    if (fs) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    } else {
      this.canvas.width = 800;
      this.canvas.height = 600;
    }
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.uniform2f(
      this.uniformLoc("u_resolution"),
      this.canvas.width,
      this.canvas.height
    );
  }
}
