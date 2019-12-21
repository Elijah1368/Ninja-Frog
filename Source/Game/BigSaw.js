import Matter from "./Matter.js";
import Animator from "./Animator.js";

const BigSaw = function(x, y) {

  Matter.call(this, x, y, 55, 55);
  Animator.call(this, BigSaw.prototype.frame_sets["run"], 1);

  this.frame_index = Math.floor(Math.random() * 8);
  this.x  = x;
  this.y = y;

};

BigSaw.prototype = {

  frame_sets: { "run":[124, 125, 126, 127, 128, 129, 130, 131] },

};
Object.assign(BigSaw.prototype, Animator.prototype);
Object.assign(BigSaw.prototype, Matter.prototype);
BigSaw.prototype.constructor = BigSaw;

export default BigSaw;