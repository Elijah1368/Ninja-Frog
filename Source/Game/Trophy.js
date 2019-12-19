import Matter from "./Matter.js";
import Animator from "./Animator.js";

const Trophy = function(x, y, nextZone) {

  Matter.call(this, x, y, 48, 48);
  Animator.call(this, Trophy.prototype.frame_sets["stand"]);
  this.soundMaking = "none";
  this.activate = false;
  this.nextZone = nextZone;
  this.x  = x;
  this.y = y;

};

Trophy.prototype = {
  frame_sets: { "stand":[106] },

};

Object.assign(Trophy.prototype, Animator.prototype);
Object.assign(Trophy.prototype, Matter.prototype);
Trophy.prototype.constructor = Trophy;

export default Trophy;