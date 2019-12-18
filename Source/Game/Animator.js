

const Animator = function(frame_set, delay = 3, mode = "loop") {

 this.count       = 0;
 this.delay       = delay;
 this.frame_set   = frame_set;
 this.frame_index = 0;
 this.frame_value = frame_set[0];
 this.mode        = mode;

};

Animator.prototype = {

 constructor:Animator,

 animate:function() {


  this.count ++;

  while(this.count > this.delay) {

    this.count -= this.delay;

    this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;

    this.frame_value = this.frame_set[this.frame_index];
  }

 },



 changeFrameSet(frame_set, delay = 1, frame_index = 0) {

   if (this.frame_set === frame_set) { return; }

   this.count       = 0;
   this.delay       = delay;
   this.frame_set   = frame_set;
   this.frame_index = frame_index;
   this.frame_value = frame_set[frame_index];

 },


};


export default Animator;