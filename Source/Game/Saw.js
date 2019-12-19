import Matter from "./Matter.js";
import Animator from "./Animator.js";

const Saw = function(x, y) {

  Matter.call(this, x, y, 32, 32);
  Animator.call(this, Saw.prototype.frame_sets["run"], 1);

  this.frame_index = Math.floor(Math.random() * 8);
  this.x  = x;
  this.y = y;

};

Saw.prototype = {

  frame_sets: { "run":[70, 71, 72, 73, 74, 75, 76, 77] },

};
Object.assign(Saw.prototype, Animator.prototype);
Object.assign(Saw.prototype, Matter.prototype);
Saw.prototype.constructor = Saw;

export default Saw;