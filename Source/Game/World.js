
import Collider from "./Collider.js";
import Player from "./Player.js";
import TileSet from "./TileSet.js";

const World = function(friction = 0.4, gravity = 2) {

  this.collider     = new Collider();

  this.friction     = friction;
  this.gravity      = gravity;

  this.columns      = 20;
  this.rows         = 15;

  //20 is column, 32 is the pixel size
  this.tile_set     = new TileSet(19, 32);

  //players default place 32 76
  this.player       = new Player(32, 76);

  this.zone_id      = "00";

  this.carrots      = [];// the array of carrots in this zone;
  this.carrot_count = 0;// the number of carrots you have.
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

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

  },

  setup:function(zone) {

    this.carrots            = new Array();
    this.doors              = new Array();
    this.grass              = new Array();
    this.collision_map      = zone.map;
    this.graphical_map      = zone.map;
    this.columns            = zone.columns;
    this.rows               = zone.rows;
    this.zone_id            = zone.id;
/*
    for (let index = zone.carrots.length - 1; index > -1; -- index) {

      let carrot = zone.carrots[index];
      this.carrots[index] = new Carrot(carrot[0] * this.tile_set.tile_size + 5, carrot[1] * this.tile_set.tile_size - 2);

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
    this.coll
    this.collideObject(this.player);

    for (let index = this.carrots.length - 1; index > -1; -- index) {

      let carrot = this.carrots[index];

      carrot.updatePosition();
      carrot.animate();

      if (carrot.collideObject(this.player)) {

        this.carrots.splice(this.carrots.indexOf(carrot), 1);
        this.carrot_count ++;

      }

    }

    for(let index = this.doors.length - 1; index > -1; -- index) {

      let door = this.doors[index];

      if (door.collideObjectCenter(this.player)) {

        this.door = door;

      };

    }

    for (let index = this.grass.length - 1; index > -1; -- index) {

      let grass = this.grass[index];

      grass.animate();

    }

    this.player.updateAnimation();

  }

};

export default World;