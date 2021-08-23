import { Mandelbrot } from "./mandelbrot";
import { glCapsule } from "./glCapsule";
import { Raymarcher } from "./raymarcher";

let renderer: glCapsule;

function updateMouseCoords(event:any) {
  if (renderer) {
    renderer.updateMouseCoords(event);
  }
}

// Init the renderer

// renderer = new Mandelbrot();
renderer = new Raymarcher();
renderer.doTheJob();

