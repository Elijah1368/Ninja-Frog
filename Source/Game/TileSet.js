import Frame from "./Frame.js";
const TileSet = function(columns, tile_size) {

  this.columns    = columns;
  this.tile_size  = tile_size;

  let f = Frame;

  this.frames = [new f(115,  96, 13, 16, 0, -4), // idle-left
                 new f( 50,  96, 13, 16, 0, -4), // jump-left
                 new f(102,  96, 13, 16, 0, -4), new f(89, 96, 13, 16, 0, -4), new f(76, 96, 13, 16, 0, -4), new f(63, 96, 13, 16, 0, -4), // walk-left
                 new f(  0, 112, 13, 16, 0, -4), // idle-right
                 new f( 65, 112, 13, 16, 0, -4), // jump-right
                 new f( 13, 112, 13, 16, 0, -4), new f(26, 112, 13, 16, 0, -4), new f(39, 112, 13, 16, 0, -4), new f(52, 112, 13, 16, 0, -4), // walk-right
                 new f( 81, 112, 14, 16), new f(96, 112, 16, 16), // carrot
                 new f(112, 115, 16,  4), new f(112, 124, 16, 4), new f(112, 119, 16, 4) // grass
                ];

};
TileSet.prototype = { constructor: TileSet };
export default TileSet;