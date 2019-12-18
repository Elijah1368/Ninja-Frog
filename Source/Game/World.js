
import Collider from "./Collider.js";
import Player from "./Player.js";
import TileSet from "./TileSet.js";
import Saw from "./Saw.js";

const World = function(soundPlayer, friction = 0.85, gravity = 1.5) {
  this.soundPlayer = soundPlayer;
  this.collider     = new Collider();

  this.friction     = friction;
  this.gravity      = gravity;

  this.columns      = 20;
  this.rows         = 15;

  //20 is column, 32 is the pixel size
  this.tile_set     = new TileSet(19, 32);

  //players default place 32 76
  this.player       = new Player(soundPlayer, 32, 76);

  this.zone_id      = "00";

  this.saws     = [];// the array of saws in this zone;
  this.saw_count = 0;// the number of saws you have.
  this.doors        = [];
  this.door         = undefined;

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

    let saw = [];
    zone.saw.map((elem, i) => {if (elem == 142) saw.push(i)});
    this.collision_map      = zone.map;
    this.graphical_map      = zone.map;
    this.columns            = zone.columns;
    this.rows               = zone.rows;
    this.zone_id            = zone.id;

    for (let i = 0; i < saw.length; i++){
      let index = saw[i];
      this.saws.push(new Saw((index % this.columns) * this.tile_set.tile_size, (Math.ceil(index  / this.columns) - 1) * this.tile_set.tile_size));
     // debugger;
    }
/*
    for (let index = zone.saws.length - 1; index > -1; -- index) {

      let saw = zone.saws[index];
      this.saws[index] = new saw(saw[0] * this.tile_set.tile_size + 5, saw[1] * this.tile_set.tile_size - 2);

    }

    for (let index = zone.doors.length - 1; index > -1; -- index) {

      let door = zone.doors[index];
      this.doors[index] = new Door(door);

    }

    for (let index = zone.grass.length - 1; index > -1; -- index) {

      let grass = zone.grass[index];
      this.grass[index] = new Grass(grass[0] * this.tile_set.tile_size, grass[1] * this.tile_set.tile_size + 12);

    }

    if (this.door) {

      if (this.door.destination_x != -1) {

        this.player.setCenterX   (this.door.destination_x);
        this.player.setOldCenterX(this.door.destination_x);// It's important to reset the old position as well.

      }

      if (this.door.destination_y != -1) {

        this.player.setCenterY   (this.door.destination_y);
        this.player.setOldCenterY(this.door.destination_y);

      }

      this.door = undefined;// Make sure to reset this.door so we don't trigger a zone load.

    }*/

  },

  update:function() {
 
    this.player.updatePosition(this.gravity, this.friction);
    let playerCollided = this.collideObject(this.player);
    this.updatePlayer(playerCollided);

    for (let i = 0; i < this.saws.length; i++) {

      let saw = this.saws[i];
      saw.animate();

      if (saw.collideObject(this.player) && this.player.lost == false) {
        this.player.lose();
      }

    }

    for(let index = this.doors.length - 1; index > -1; -- index) {

      let door = this.doors[index];

      if (door.collideObjectCenter(this.player)) {

        this.door = door;

      };

    }


    this.player.updateAnimation();

  },

  updatePlayer:function({left: collidedLeft, top: collidedTop, right: collidedRight, bottom: collidedBottom}){
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
  }
};

export default World;