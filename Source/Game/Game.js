import Animator from "./Animator.js";
import Collider from "./Collider.js";
import Frame from "./Frame.js";
import Matter from "./Matter.js";
import Carrot from "./Carrot.js";
import Door from "./Door.js";
import Grass from "./Grass.js";
import MovingObject from "./MovingObject.js";
import Player from "./Player.js";
import TileSet from "./TileSet.js";
import World from "./World.js";

const Game = function() {
  this.world    = new Game.World();
  this.update   = function() {
    this.world.update();
  }
}

Game.Animator = Animator;

Game.Collider = Collider;

Game.Frame = Frame;

Game.Matter = Matter;

Game.MovingObject = MovingObject;

Game.Carrot = Carrot;
Game.Grass = Grass;

Game.Door = Door;

Game.Player = Player;
Game.TileSet = TileSet;
Game.World = World;
export default Game;