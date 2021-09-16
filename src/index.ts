import { glCapsule } from "./abstract/glCapsule";
import { Raymarcher } from "./raymarcher";

// Init the renderer var with an instance of a glCapsule implementation
let renderer: glCapsule = new Raymarcher();
// Run it 🏍 🏎
renderer.run();
