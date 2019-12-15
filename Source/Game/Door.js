import Matter from "./Matter.js";

const Door = function(door) {

 Matter.call(this, door.x, door.y, door.width, door.height);

 this.destination_x    = door.destination_x;
 this.destination_y    = door.destination_y;
 this.destination_zone = door.destination_zone;

};

Door.prototype = {};
Object.assign(Door.prototype, Matter.prototype);
Door.prototype.constructor = Door;

export default Door;