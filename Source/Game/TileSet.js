import Frame from "./Frame.js";
const TileSet = function(columns, tile_size) {

  this.columns    = columns;
  this.tile_size  = tile_size;

  let f = Frame;

  this.frames = [];
  //idle left
  let offset = -7;
  for (let i = 1; i <= 11; i++){
    this.frames.push(new f(32 * i, 64, 32, 32, 0, offset));
  } 
  //idle right 
  for (let i = 1; i <= 11; i++){
    this.frames.push(new f(32 * i, 32, 32, 32, 0, offset));
  }
  //walk right
  for (let i = 1; i <= 12; i++){
    this.frames.push(new f(32 * i, 96, 32, 32, 0, offset));
  } 
  //walk left
  for (let i = 1; i <= 12; i++){
    this.frames.push(new f(32 * i, 128, 32, 32, 0, offset));
  } 

  this.frames.push(new f(32, 32 * 6, 32, 32, 0, offset));
  this.frames.push(new f(64, 32 * 6, 32, 32, 0, offset));

  //djump right
  for (let i = 1; i <= 6; i++){
    this.frames.push(new f(32 * i, 32 * 9, 32, 32, 0, offset));
  } 

  //djump left
  for (let i = 1; i <= 6; i++){
    this.frames.push(new f(32 * i, 32 * 10, 32, 32, 0, offset));
  } 

  //wallclimbright
  for (let i = 1; i <= 5; i++){
    this.frames.push(new f(32 * i, 32 * 5, 32, 32, 0, offset));
  } 
  //wallclimbleft
  for (let i = 1; i <= 5; i++){
    this.frames.push(new f(32 * i + 160, 32 * 5, 32, 32, 0, offset));
  } 
};
TileSet.prototype = { constructor: TileSet };
export default TileSet;