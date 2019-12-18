import Animator from "./Animator.js";
import MovingObject from "./MovingObject.js";

const Player = function(soundPlayer, x, y) {
  this.soundPlayer = soundPlayer;
  MovingObject.call(this, x, y, 14, 24);

  Animator.call(this, Player.prototype.frame_sets["idle-left"], 1);

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
    "lose-right": [78, 79, 80, 81, 82, 83, 84, 78, 79, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105],
    "lose-left": [90, 91, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105],
    "appear": [99, 100, 101, 102, 103, 104, 105]
  },

  jump: function() {

    /* Made it so you can only jump if you aren't falling faster than 10px per frame. */
    if (this.jumpCount < 2) {
      this.jumpCount++
      this.velocity_y = -15;
      if (this.wallClimbing) {
        this.velocity_x = -1 * this.direction_x * 10;
      }
      this.soundPlayer.play("music");
      this.soundPlayer.play("jump");
    } 


  },

  moveLeft: function() {
    this.direction_x = -1;
    this.velocity_x -= 2;
    this.soundPlayer.play("music");
    if(this.isGrounded) this.soundPlayer.play("walk");
  },

  moveRight:function(frame_set) {
    this.direction_x = 1;
    this.velocity_x += 2;
    this.soundPlayer.play("music");
    if(this.isGrounded) this.soundPlayer.play("walk");
  },

  updateAnimation:function() {
  
    if (this.lost){
      if (this.direction_x < 0) {
        this.changeFrameSet(this.frame_sets["lose-left"], 2)
      } else {
        this.changeFrameSet(this.frame_sets["lose-right"], 2)
      }
    } else if (this.wallClimbing){ 
      if (this.direction_x < 0) {
        this.changeFrameSet(this.frame_sets["wall-climbing-left"], 3)
      } else if (this.direction_x > 0) {
  
        this.changeFrameSet(this.frame_sets["wall-climbing-right"], 3)
      }
    } else if (this.velocity_y < 0) {

      if (this.jumpCount == 1) {
        if (this.direction_x < 0) this.changeFrameSet(this.frame_sets["jump-left"]);
        else this.changeFrameSet(this.frame_sets["jump-right"]);
      } else if (this.jumpCount == 2) {
        if (this.direction_x < 0) this.changeFrameSet(this.frame_sets["double-jump-right"], 1);
        else this.changeFrameSet(this.frame_sets["double-jump-left"], 1);
      }

    } else if (this.direction_x < 0) {

      if (this.velocity_x < -0.1) this.changeFrameSet(this.frame_sets["move-left"], 1);
      else this.changeFrameSet(this.frame_sets["idle-left"], 1);
      
    } else if (this.direction_x > 0) {

      if (this.velocity_x > 0.1) this.changeFrameSet(this.frame_sets["move-right"], 1);
      else this.changeFrameSet(this.frame_sets["idle-right"], 1);
    }

    this.animate();

  },
  lose:function(){
    this.lost = true;
    this.soundPlayer.play("enemydamage");

    setTimeout(()=>
    {
      this.x  = 32;
      this.y = 76;
      setTimeout(()=>{
        this.lost = false;
        this.soundPlayer.play("appear");
      }, 200);
    }, 700);
  },

  updatePosition:function(gravity, friction) {
    if (this.lost) {
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