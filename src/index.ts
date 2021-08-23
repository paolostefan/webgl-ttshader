import { Mandelbrot } from "./mandelbrot";
import { glCapsule } from "./glCapsule";
import { Raymarcher } from "./raymarcher";

let renderer: glCapsule;

// renderer = new Mandelbrot();
renderer = new Raymarcher();
renderer.doTheJob();
