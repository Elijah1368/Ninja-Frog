
const Collider = function() {

  /* I changed this so all the checks happen in y first order. */
  this.collide = function(value, object, tile_x, tile_y, tile_size, playerCollided) {
    switch(value) {

      case  34:     this.collidePlatformTop    (object, tile_y, playerCollided            ); break;
      case  54:     this.collidePlatformRight  (object, tile_x + tile_size, playerCollided); break;
      case  35: if (this.collidePlatformTop    (object, tile_y, playerCollided            )) break;
                   this.collidePlatformRight  (object, tile_x + tile_size, playerCollided); break;
      case  72:     this.collidePlatformBottom (object, tile_y + tile_size, playerCollided); break;
      case  5: if (this.collidePlatformTop    (object, tile_y, playerCollided            )) break;
                   this.collidePlatformBottom (object, tile_y + tile_size, playerCollided); break;
      case  73: if (this.collidePlatformRight  (object, tile_x + tile_size, playerCollided)) break;
                   this.collidePlatformBottom (object, tile_y + tile_size, playerCollided); break;
      case  7: if (this.collidePlatformTop    (object, tile_y, playerCollided            )) break;
               if (this.collidePlatformBottom (object, tile_y + tile_size, playerCollided)) break;
                   this.collidePlatformRight  (object, tile_x + tile_size, playerCollided); break;
      case  52:     this.collidePlatformLeft   (object, tile_x, playerCollided            ); break;
      case  33: if (this.collidePlatformTop    (object, tile_y, playerCollided            )) break;
                   this.collidePlatformLeft   (object, tile_x , playerCollided           ); break;
      case 10: if (this.collidePlatformLeft   (object, tile_x, playerCollided            )) break;
                   this.collidePlatformRight  (object, tile_x + tile_size, playerCollided); break;
      case 11: if (this.collidePlatformTop    (object, tile_y  , playerCollided          )) break;
               if (this.collidePlatformLeft   (object, tile_x , playerCollided           )) break;
                   this.collidePlatformRight  (object, tile_x + tile_size, playerCollided); break;
      case 71: if (this.collidePlatformBottom (object, tile_y + tile_size, playerCollided)) break;
                   this.collidePlatformLeft   (object, tile_x , playerCollided           ); break;  
      case 13: if (this.collidePlatformTop    (object, tile_y  , playerCollided          )) break;
               if (this.collidePlatformBottom (object, tile_y + tile_size, playerCollided)) break;
                   this.collidePlatformLeft   (object, tile_x   , playerCollided         ); break;
      case 14: if (this.collidePlatformBottom (object, tile_y + tile_size, playerCollided)) break;
               if (this.collidePlatformLeft   (object, tile_x , playerCollided           )) break;
                   this.collidePlatformRight  (object, tile_x + tile_size, playerCollided); break;
      case 15: if (this.collidePlatformTop    (object, tile_y  , playerCollided          )) break;
               if (this.collidePlatformBottom (object, tile_y + tile_size, playerCollided)) break;
               if (this.collidePlatformLeft   (object, tile_x , playerCollided           )) break;
                   this.collidePlatformRight  (object, tile_x + tile_size, playerCollided); break;
    }
  }

};

Collider.prototype = {

  constructor: Collider,

  collidePlatformBottom:function(object, tile_bottom, playerCollided) {

    if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
      object.setTop(tile_bottom);
      object.velocity_y = 0;
      playerCollided.top = true;
      return true;
    } 
    
    return false;

  },

  collidePlatformLeft:function(object, tile_left, playerCollided) {

    if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {

      object.setRight(tile_left - 0.01);
      object.velocity_x = 0;
      playerCollided.right = true;
      return true;

    } 
    
    return false;

  },

  collidePlatformRight:function(object, tile_right, playerCollided) {

    if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {

      object.setLeft(tile_right);
      object.velocity_x = 0;
      playerCollided.left = true;
      return true;

    } 
    return false;

  },

  collidePlatformTop:function(object, tile_top, playerCollided) {

    if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {

      object.setBottom(tile_top - 0.01);
      object.velocity_y = 0;
      playerCollided.bottom = true;
      return true;

    } return false;

  }

 };

 export default Collider;