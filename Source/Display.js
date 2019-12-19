
const Display = function(canvas, viewPort) {
  this.bufferCanvas = document.createElement("canvas");
  this.buffer  = this.bufferCanvas.getContext("2d"),
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.viewPort = viewPort;

  this.reset = function(){
    this.buffer.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  this.drawMap = function(image, image_columns, map, map_columns, tile_size) {
  
    for (let index = map.length - 1; index > -1; -- index) {

      let value         = map[index] - 1;
      let source_x      =           (value % image_columns) * tile_size;
      let source_y      = Math.floor(value / image_columns) * tile_size;

      let destination_x =           (index % map_columns  ) * tile_size;
      let destination_y = Math.floor(index / map_columns  ) * tile_size;

      this.buffer.drawImage(image, source_x, source_y, tile_size, tile_size, destination_x, destination_y, tile_size, tile_size);

    }
    


  };

  this.drawObject = function(image, source_x, source_y, destination_x, destination_y, width, height) {
  
    this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);

  };

  this.resize = function(width, height, height_width_ratio) {

    if (height / width > height_width_ratio) {

      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width  = width;

    } else {

      this.context.canvas.height = height;
      this.context.canvas.width  = height / height_width_ratio;

    }

    this.context.imageSmoothingEnabled = false;

  };

};

Display.prototype = {

  constructor : Display,

  render:function() { 
     
    this.context.drawImage(this.buffer.canvas, this.viewPort.getLeft(), this.viewPort.getTop(), this.viewPort.width, this.viewPort.height, 0, 0, this.context.canvas.width, this.context.canvas.height); 

  },

  addViewPort:function(viewPort){
    this.viewPort = viewPort;
  }

};

export default Display;