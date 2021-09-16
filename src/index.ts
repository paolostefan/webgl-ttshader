import { glCapsule } from "./abstract/glCapsule";
import { Terrain } from "./terrain";

// Init the renderer var with an instance of a glCapsule implementation
let renderer: glCapsule = new Terrain();
// Run it 🏍 🏎
renderer.run();
