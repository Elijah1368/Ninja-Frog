
const Matter = function(x, y, width, height) {

 this.height = height;
 this.width  = width;
 this.x      = x;
 this.y      = y;

};

Matter.prototype = {

  constructor:Matter,

  /* Now does rectangular collision detection. */
  collideObject:function(Matter) {

    if (this.getRight()  < Matter.getLeft()  ||
        this.getBottom() < Matter.getTop()   ||
        this.getLeft()   > Matter.getRight() ||
        this.getTop()    > Matter.getBottom()) return false;

    return true;

  },

  /* Does rectangular collision detection with the center of the Matter. */
  collideObjectCenter:function(Matter) {

    let center_x = Matter.getCenterX();
    let center_y = Matter.getCenterY();

    if (center_x < this.getLeft() || center_x > this.getRight() ||
        center_y < this.getTop()  || center_y > this.getBottom()) return false;

    return true;

  },

  getBottom : function()  { return this.y + this.height;       },
  getCenterX: function()  { return this.x + this.width  * 0.5; },
  getCenterY: function()  { return this.y + this.height * 0.5; },
  getLeft   : function()  { return this.x;                     },
  getRight  : function()  { return this.x + this.width;        },
  getTop    : function()  { return this.y;                     },
  setBottom : function(y) { this.y = y - this.height;          },
  setCenterX: function(x) { this.x = x - this.width  * 0.5;    },
  setCenterY: function(y) { this.y = y - this.height * 0.5;    },
  setLeft   : function(x) { this.x = x;                        },
  setRight  : function(x) { this.x = x - this.width;           },
  setTop    : function(y) { this.y = y;                        }

};

export default Matter;