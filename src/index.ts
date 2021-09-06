import { Mandelbrot } from "./mandelbrot";
import { glCapsule } from "./glCapsule";
import { Raymarcher } from "./raymarcher";
import { Pointcloud } from "./pointcloud";

let renderer: glCapsule;

function updateMouseCoords(event:any) {
  if (renderer) {
    renderer.updateMouseCoords(event);
  }
}

// Init the renderer var: create an instance of a glCapsule implementation 

renderer = 
// new Mandelbrot();
//  new Raymarcher();
 new Pointcloud();

renderer.doTheJob();

