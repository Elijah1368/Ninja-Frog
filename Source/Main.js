import World from "./Game/World.js";
import Display from "./Display.js";
import Controller from "./Controller.js";
import Engine from "./Engine.js";
import SoundPlayer from "./SoundPlayer.js";
import ViewPort from "./Viewport.js";

window.addEventListener("load", function(event) {

  "use strict";
  const ZONE_PREFIX = "Zones/zone";
  const ZONE_SUFFIX = ".json";
  const AssetsManager = function() {

    this.tile_set_image = undefined;
    this.audio_urls = ["Assets/Sound/Music.mp3", "Assets/Sound/EnemyDamage.mp3", "Assets/Sound/Walk.mp3",
                "Assets/Sound/Jump.mp3", "Assets/Sound/Lose.mp3", "Assets/Sound/Win.mp3", 
                "Assets/Sound/PlayerDamage.mp3", "Assets/Sound/Coin.mp3"];
  };

  AssetsManager.prototype = {

    constructor: AssetsManager,


    requestJSON:function(url, callback) {
      
      let request = new XMLHttpRequest();
      request.addEventListener("load", function(event) {
        
        callback(JSON.parse(this.responseText));

      }, { once:true });

      request.open("GET", url);
      request.send();

    },

  
    requestImage:function(url, callback) {

      let image = new Image();

      image.addEventListener("load", function(event) {

        callback(image);

      }, { once:true });

      image.src = url;

    },

    loadAudioFiles:function(){
      let audioFiles = {};
      for (let url of this.audio_urls){
        let name = url.match(/(\w*)\.mp3/)[1].toLowerCase();
        let audio = new Audio(url);
        audioFiles[name] = audio;
      }

      let soundPlayer = new SoundPlayer(audioFiles);
      soundPlayer.adjustSpeed("walk", 2.5);
      soundPlayer.adjustVolume("walk", .8);
      soundPlayer.adjustSpeed("music", 1.2);
      soundPlayer.adjustVolume("music", .8);
      soundPlayer.adjustVolume("jump", .8);
      soundPlayer.adjustSpeed("enemydamage", 1.3);
      return soundPlayer;
    }

  };



  var keyDownUp = function(event) {

    controller.keyDownUp(event.type, event.keyCode);

  };


  var resize = function(event) {

    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, viewport.height / viewport.width);
    display.render();
    var rectangle = display.context.canvas.getBoundingClientRect();

  };

 
  var render = function() {


    var frame = undefined;
    
    
    display.drawMap   (assets_manager.tile_set_image,
    world.tile_set.columns, world.graphical_map, world.columns,  world.tile_set.tile_size);

    for (let i = 0; i < world.saws.length; i++) {

      let saw = world.saws[i];
      frame = world.tile_set.frames[saw.frame_value];

      display.drawObject(assets_manager.tile_set_image,
        frame.x, frame.y,
        saw.x,
        saw.y, frame.width, frame.height);

    }
    
    let melon = world.melon;
    frame = world.tile_set.frames[melon.frame_value];
    display.drawObject(assets_manager.tile_set_image,
      frame.x, frame.y,
      melon.x,
      melon.y, frame.width, frame.height);
  
    frame = world.tile_set.frames[world.player.frame_value];

    display.drawObject(assets_manager.tile_set_image,
    frame.x, frame.y,
    world.player.x + Math.floor(world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
    world.player.y + frame.offset_y, frame.width, frame.height);

    display.render();

  };

  var update = function() {

    if (controller.left.active ) { 
      soundPlayer.play("music");
      world.player.moveLeft ();
    }
    if (controller.right.active) {
      soundPlayer.play("music"); 
      world.player.moveRight();
    }
    if (controller.up.active) { 
      soundPlayer.play("music");
      world.player.jump();
      controller.up.active = false;
    }

    world.update();

    viewport.setCenterX(world.player.x);
    viewport.setCenterY(world.player.y);

    soundPlayer.play(world.player.soundMaking);

    if (world.melon.activate) {
      soundPlayer.play("win");
      engine.stop();
      display.reset();

      assets_manager.requestJSON(ZONE_PREFIX + world.melon.nextZone + ZONE_SUFFIX, (zone) => {
        world.setup(zone);
        display.buffer.canvas.height = world.height;
        display.buffer.canvas.width  = world.width;
        viewport.setup(world.player.x, world.player.y, world.width, world.height);
        engine.start();
      });

      return;

    }

  };


  var assets_manager = new AssetsManager();
  var soundPlayer = assets_manager.loadAudioFiles();
  var controller     = new Controller();
  var world         = new World();
  var viewport = new ViewPort();
  var display        = new Display(document.querySelector("canvas"), viewport);
  var engine         = new Engine(1000/30, render, update);

  assets_manager.requestJSON(ZONE_PREFIX + world.zone_id + ZONE_SUFFIX, (zone) => {

    world.setup(zone);
    
  display.buffer.canvas.height = world.height;
  display.buffer.canvas.width  = world.width;
  display.buffer.imageSmoothingEnabled = false;
  viewport.setup(world.player.x, world.player.y, world.width, world.height);
    assets_manager.requestImage("./Assets/SpriteSheet3.png", (image) => {

      assets_manager.tile_set_image = image;
      resize();
      engine.start();

    });

  });

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup"  , keyDownUp);
  window.addEventListener("resize" , resize);

});
