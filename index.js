import * as PIXI from "pixi.js";
import Victor from "victor";
//import Matter from "matter-js";
import Player from './player.js';
import Zombie from './zombie.js'
import Spawner from "./spawner.js";



let canvasSize = 512;
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
  view: canvas,
  width: canvasSize,
  height: canvasSize,
  backgroundColor: 0x5c812f
});

let player = new Player({ app });
let ZSpawner = new Spawner({create: ()=> new Zombie({app,player})});



app.ticker.add((delta)=>{
  player.update();
  // zombie.update(); 
  ZSpawner.spawns.forEach(zombie => zombie.update());
})














