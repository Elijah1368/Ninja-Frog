import Matter from "./Matter.js";
import MovingObject from "./MovingObject.js";
import Animator from "./Animator.js";

const Carrot = function(x, y) {

  Matter.call(this, x, y, 7, 14);
  Animator.call(this, Carrot.prototype.frame_sets["twirl"], 15);

  this.frame_index = Math.floor(Math.random() * 2);

  /* base_x and base_y are the point around which the carrot revolves. position_x
  and y are used to track the vector facing away from the base point to give the carrot
  the floating effect. */
  this.base_x     = x;
  this.base_y     = y;
  this.position_x = Math.random() * Math.PI * 2;
  this.position_y = this.position_x * 2;

};
Carrot.prototype = {

  frame_sets: { "twirl":[12, 13] },

  updatePosition:function() {

    this.position_x += 0.1;
    this.position_y += 0.2;

    this.x = this.base_x + Math.cos(this.position_x) * 2;
    this.y = this.base_y + Math.sin(this.position_y);

  }

};
Object.assign(Carrot.prototype, Animator.prototype);
Object.assign(Carrot.prototype, Matter.prototype);
Carrot.prototype.constructor = Carrot;

export default Carrot;