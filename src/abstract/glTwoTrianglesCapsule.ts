import { glCapsule } from "./glCapsule";

export abstract class glTwoTrianglesCapsule extends glCapsule {
  initTwoTriangles(fragmentShaderSrc: string) {
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

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());

    const positions = [-1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1];
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW
    );

    this.vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(this.vao);

    const positionAttribLocation = this.gl.getAttribLocation(
      this.program,
      "a_position"
    );
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

    this.gl.viewport(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }

  drawTwoTriangles() {
    const primitiveType = this.gl.TRIANGLES;
    const offset = 0;
    const count = 6;
    this.gl.bindVertexArray(this.vao);
    this.gl.drawArrays(primitiveType, offset, count);
  }

  /**
   * Prototipo di loop
   * @param milliseconds
   */
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
}
