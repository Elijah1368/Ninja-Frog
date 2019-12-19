
import Collider from "./Collider.js";
import Player from "./Player.js";
import TileSet from "./TileSet.js";
import Saw from "./Saw.js";
import Trophy from "./Trophy.js";


const World = function(friction = 0.85, gravity = 1.5) {
  this.collider     = new Collider();
  this.friction     = friction;
  this.gravity      = gravity;
  this.columns = 40;
  this.rows = 30;
  this.tile_set     = new TileSet(19, 32);
  this.player       = new Player(32, 76);
  this.zone_id      = "2";
  this.saws     = [];
  this.trophy;
  this.height       = this.tile_set.tile_size * this.rows;
  this.width        = this.tile_set.tile_size * this.columns;
};

World.prototype = {

  constructor: World,

  collideObject:function(object) {

    /* I got rid of the world boundary collision. Now it's up to the tiles to keep
    the player from falling out of the world. */

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
    this.columns = zone.columns;
    this.rows = zone.rows;
    this.width = this.columns * this.tile_set.tile_size;
    this.height = this.rows * this.tile_set.tile_size;
    let saw = [];
    this.saws = [];
    this.player.setPosition(zone.playerStartX, zone.playerStartY);
    zone.objects.map((elem, i) => {
      if (elem == 142) { 
        saw.push(i)
      } else if (elem == 366) {
        this.trophy = new Trophy((i % this.columns) * this.tile_set.tile_size, (Math.ceil(i  / this.columns) - 2) * this.tile_set.tile_size, zone.nextZone);
      }
    });

    this.collision_map      = zone.map;
    this.graphical_map      = zone.map;
    this.columns            = zone.columns;
    this.rows               = zone.rows;
    this.zone_id            = zone.id;
    
  
    for (let i = 0; i < saw.length; i++){
      let index = saw[i];
      this.saws.push(new Saw((index % this.columns) * this.tile_set.tile_size, (Math.ceil(index  / this.columns) - 1) * this.tile_set.tile_size));
    }

    },

  update:function() {
 
    this.player.updatePosition(this.gravity, this.friction);
    let playerCollided = this.collideObject(this.player);

    for (let i = 0; i < this.saws.length; i++) {

      let saw = this.saws[i];
      saw.animate();

      if (saw.collideObject(this.player) && this.player.lost == false) {
        this.player.lose();
      
        setTimeout(
          ()=>{
            this.player.setPosition(32, 76)
            this.player.reveal();
          }, 1200);
      }

    }
    this.updatePlayer(playerCollided);
    if (this.trophy.collideObject(this.player)){
      this.trophy.activate = true;
      this.trophy.soundMaking = "win";
    }
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