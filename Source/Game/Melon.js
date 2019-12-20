import Matter from "./Matter.js";
import Animator from "./Animator.js";

const Melon = function(x, y, nextZone) {

  Matter.call(this, x, y, 32, 32);
  Animator.call(this, Melon.prototype.frame_sets["stand"], 1.1);
  this.soundMaking = "none";
  this.activate = false;
  this.nextZone = nextZone;
  this.x  = x;
  this.y = y;

};

Melon.prototype = {
  frame_sets: { "stand":[ 107, 108, 109, 110, 111, 112, 113,
                          114, 115, 116, 117, 118, 119, 120, 
                          121, 122, 123] },

};

Object.assign(Melon.prototype, Animator.prototype);
Object.assign(Melon.prototype, Matter.prototype);
Melon.prototype.constructor = Melon;

export default Melon;