import Animator from "./Animator.js";
import MovingObject from "./MovingObject.js";

const Player = function(x, y) {
  MovingObject.call(this, x, y, 14, 24);

  Animator.call(this, Player.prototype.frame_sets["idle-left"], 1);

  this.soundMaking = "none";
  this.repeatSound = true;
  this.jumpCount = 0;
  this.direction_x = -1;
  this.velocity_x  = 0;
  this.velocity_y  = 0;
  this.old_velocity = 0;
  this.wallClimbing = false;
  this.isGrounded = true;
  this.lost = false;
  this.appear = false;
};

Player.prototype = {

  frame_sets: {
    "idle-left" : [0, 1, 2, 3, 4, 5, 6, 7 , 8, 9, 10],
    "jump-left" : [47],
    "move-left" : [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    "idle-right": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    "jump-right": [46],
    "move-right": [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
    "double-jump-right": [48, 49, 50, 51, 52, 53],
    "double-jump-left": [54, 55, 56, 57, 58, 59],
    "wall-climbing-right": [60, 61, 62, 63, 64],
    "wall-climbing-left": [65, 66, 67, 68, 69],
    "lose-right": [78, 79, 80, 81, 82, 83, 84, 78, 79,  99, 100, 101, 102, 103, 106],
    "lose-left": [90, 91, 85, 86, 87, 88, 89, 90, 91, 99, 100, 101, 102, 103, 106],
    "appear":     [92, 93, 94, 95, 96, 97, 98],
  },

  jump: function() {

    if (this.jumpCount < 2) {
      this.jumpCount++;
      this.velocity_y = -15;
      if (this.wallClimbing) {
        this.velocity_x = -1 * this.direction_x * 15;
      }
    } 
  },

  moveLeft: function() {
    this.direction_x = -1;
    this.velocity_x -= 2.5;
  },

  moveRight:function(frame_set) {
    this.direction_x = 1;
    this.velocity_x += 2.5;
  },

  updateSound:function(){
    if (this.velocity_y < -13){
      this.soundMaking = "jump";
    } else if (this.isGrounded && (this.velocity_x > 2 || this.velocity_x < -2)) {
      this.soundMaking = "walk";
    } else if (this.lost && this.repeatSound == true){
      this.soundMaking = "enemydamage";
      this.repeatSound = false;
    } else if (this.appear && this.repeatSound == true) {
      this.soundMaking = "coin";
      this.repeatSound = false;
    } else  {
      this.soundMaking = "none";
    }
  },

  updateAnimation:function() {
  
    if (this.wallClimbing){ 

      if (this.direction_x < 0) {
        this.changeFrameSet(this.frame_sets["wall-climbing-left"], 3)
      } else if (this.direction_x > 0) {
        this.changeFrameSet(this.frame_sets["wall-climbing-right"], 3)
      }

    } else if (this.velocity_y < 0) {

      if (this.jumpCount == 1) {
        if (this.direction_x < 0) this.changeFrameSet(this.frame_sets["jump-left"], "playOnce");
        else this.changeFrameSet(this.frame_sets["jump-right"], "playOnce");
      } else if (this.jumpCount == 2) {
        if (this.direction_x < 0) this.changeFrameSet(this.frame_sets["double-jump-right"], 1);
        else this.changeFrameSet(this.frame_sets["double-jump-left"], 1);
      }

    } else if (this.lost){

      if (this.direction_x < 0) {
        this.changeFrameSet(this.frame_sets["lose-left"], 1.5, 0, "playOnce")
      } else {
        this.changeFrameSet(this.frame_sets["lose-right"], 1.5, 0, "playOnce")
      }
    } else if (this.appear) {
      this.changeFrameSet(this.frame_sets["appear"], 2,  0,"playOnce");
    } else if (this.direction_x < 0) {

      if (this.velocity_x < -3) this.changeFrameSet(this.frame_sets["move-left"], 1);
      else this.changeFrameSet(this.frame_sets["idle-left"], 1);
      
    } else if (this.direction_x > 0) {

      if (this.velocity_x > 3) this.changeFrameSet(this.frame_sets["move-right"], 1);
      else this.changeFrameSet(this.frame_sets["idle-right"], 1);

    } 

    this.animate();

  },
  lose:function(){
    this.lost = true;
    this.repeatSound = true;
    /*
    setTimeout(()=>
    {

      setTimeout(()=>{
        this.lost = false;
        this.soundPlayer.play("appear");
      }, 200);
    }, 700);
    */
  },

  setPosition:function(x, y){
    this.x = x;
    this.y = y;
  }, 

  reveal:function(){
    this.lost = false;
    this.appear = true;
    this.repeatSound = true;
    this.soundMaking = "appear";
    setTimeout(()=>{this.appear = false}, 400);
  },

  updatePosition:function(gravity, friction) {
    if (this.lost || this.appear) {
      this.velocity_x = 0;
      this.velocity_y = 0;
      return;      
    }
    this.x_old = this.x;
    this.y_old = this.y;
     
    //if player is attached to wall, slow down fall
    if (this.wallClimbing && this.jumpCount == 2){
        
    } else if (this.wallClimbing) {
      this.velocity_y = .5 +  this.velocity_y * .5;
    } else {
      this.velocity_y += gravity;
    }
    this.velocity_x *= friction;  

    /* Made it so that velocity cannot exceed velocity_max */
    if (Math.abs(this.velocity_x) > this.velocity_x_max)
    this.velocity_x = this.velocity_x_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_y_max)
    this.velocity_y = this.velocity_y_max * Math.sign(this.velocity_y);

   
    this.x    += this.velocity_x;
    this.y    += this.velocity_y;
  }


};

Object.assign(Player.prototype, MovingObject.prototype);
Object.assign(Player.prototype, Animator.prototype);
Player.prototype.constructor = Player;
export default Player;