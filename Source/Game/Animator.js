

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
    if (this.mode == "loop"){
      this.loop();
    } else if (this.mode == "playOnce"){
      this.playOnce();
    }
  },

  loop:function(){
    this.count ++;

    while(this.count > this.delay) {
  
      this.count -= this.delay;
  
      this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;
  
      this.frame_value = this.frame_set[this.frame_index];
    }
  },

  playOnce:function(){
    this.count ++;

    while(this.count > this.delay) {
  
      this.count -= this.delay;
      
      if (this.frame_index + 1 > this.frame_set.length -1) {
        break;
      } else {
        this.frame_index++;
      }
  
      this.frame_value = this.frame_set[this.frame_index];
    }
  },


  changeFrameSet(frame_set, delay = 1, frame_index = 0, mode = "loop") {

   if (this.frame_set === frame_set) { return; }

   this.count       = 0;
   this.delay       = delay;
   this.frame_set   = frame_set;
   this.frame_index = frame_index;
   this.frame_value = frame_set[frame_index];
   this.mode = mode;
  },


};


export default Animator;