
import Collider from "./Collider.js";
import Player from "./Player.js";
import TileSet from "./TileSet.js";
import Saw from "./Saw.js";
import Melon from "./Melon.js";
import BigSaw from "./BigSaw.js";

const World = function(friction = 0.85, gravity = 1.2) {
  this.collider     = new Collider();
  this.friction     = friction;
  this.gravity      = gravity;
  this.columns = 40;
  this.rows =30;
  this.tile_set     = new TileSet(19, 32);
  this.player       = new Player();
  this.zone_id      = "1";
  this.saws     = [];
  this.melon;
  this.height       = this.tile_set.tile_size * this.rows;
  this.width        = this.tile_set.tile_size * this.columns;
};

World.prototype = {

  constructor: World,

  collideObject:function(object) {

    
    if      (object.getLeft()   < -32           && this.player.lost == false) {this.playerLost();}
    else if (object.getRight()  > this.width + 32 && this.player.lost == false) {this.playerLost();}
    if      (object.getTop()    < -128           && this.player.lost == false) {this.playerLost();}
    else if (object.getBottom() > this.height + 64 && this.player.lost == false) {this.playerLost();}
    var bottom, left, right, top, value;
    let playerCollided = {
      "left": false,
      "top": false,
      "right": false, 
      "bottom": false
    }
    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size, playerCollided);

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size, playerCollided);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size, playerCollided);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size, playerCollided);
    return playerCollided;
  },

  setup:function(zone) {
    //playerdefault : 21
    //melon default : 306
    this.columns = zone.columns;
    this.rows = zone.rows;
    this.width = this.columns * this.tile_set.tile_size;
    this.height = this.rows * this.tile_set.tile_size;
    let saw = [];
    this.saws = [];

    zone.objects.map((elem, i) => {
      switch (elem){
        case 142:
          this.saws.push(new Saw((i % this.columns) * this.tile_set.tile_size, (Math.ceil((i  / this.columns) + .1) - 1) * this.tile_set.tile_size));
          break;
        case 268:
          this.saws.push(new BigSaw((i % this.columns) * this.tile_set.tile_size, (Math.ceil((i  / this.columns)+ .1) - 1) * this.tile_set.tile_size));
          break;
        case 306:
          this.melon = new Melon((i % this.columns) * this.tile_set.tile_size, (Math.ceil(i  / this.columns) - 1) * this.tile_set.tile_size, zone.nextZone);
          break;
        case 21:
          this.defaultX = (i % this.columns) * this.tile_set.tile_size;
          this.defaultY = (Math.ceil(i  / this.columns) - 2) * this.tile_set.tile_size;
          break;
       }
    });
    this.player.setPosition(this.defaultX, this.defaultY);
    this.collision_map      = zone.map;
    this.graphical_map      = zone.map;
    this.columns            = zone.columns;
    this.rows               = zone.rows;
    this.zone_id            = zone.id;
    
    },

  update:function() {
 
    this.player.updatePosition(this.gravity, this.friction);
    let playerCollided = this.collideObject(this.player);

    for (let i = 0; i < this.saws.length; i++) {

      let saw = this.saws[i];
      saw.animate();

      if (saw.collideObject(this.player) && this.player.lost == false) {
        this.playerLost();
      }

    }

    this.updatePlayer(playerCollided);

    this.melon.animate();
    if (this.melon.collideObject(this.player)){
      this.melon.activate = true;
    }
  },
  playerLost:function(){
    this.player.lose();
      
    setTimeout(
      ()=>{
        this.player.setPosition(this.defaultX, this.defaultY)
        this.player.reveal();
      }, 800);
  },

  updatePlayer:function({left: collidedLeft, top: collidedTop, right: collidedRight, bottom: collidedBottom}){
   
    this.player.updateSound();
    if (collidedLeft){
      if (!collidedBottom){
        this.player.wallClimbing = true;
        this.player.jumpCount = 1;
        this.player.isGrounded = false;
      }
    } else if (collidedTop){
      
    } else if (collidedRight) {
      if (!collidedBottom){
        this.player.wallClimbing = true;
        this.player.jumpCount = 1;
        this.player.isGrounded = false;
      }
    } else if (collidedBottom){
      this.player.wallClimbing = false;
      this.player.jumpCount = 0;
      this.player.isGrounded = true;
    } else {
      this.player.wallClimbing = false;
      this.player.isGrounded = false;
    }
    this.player.updateAnimation();
  }
  
};

export default World;