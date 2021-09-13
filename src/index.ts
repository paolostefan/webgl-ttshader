import { glCapsule } from "./glCapsule";
import { Noise } from "./noise";

// Init the renderer var with an instance of a glCapsule implementation
let renderer: glCapsule = new Noise();
// Run it 🏍 🏎
renderer.run();
