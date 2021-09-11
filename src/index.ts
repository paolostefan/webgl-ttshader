import { glCapsule } from "./glCapsule";
import { Raytracer } from "./raytracer";

// Init the renderer var with an instance of a glCapsule implementation
let renderer: glCapsule = new Raytracer();
// Run it
renderer.run();
