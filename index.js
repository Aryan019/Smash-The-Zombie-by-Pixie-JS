import * as PIXI from "pixi.js";
import Victor from "victor";
//import Matter from "matter-js";
import Player from './player.js';
import Zombie from './zombie.js'
import Spawner from "./spawner.js";
// import { zombies } from "./global.js";
import Weather from "./weather.js";
import {zombies, textStyle, subTextStyle } from "./globals.js";




let canvasSize = 400;
const canvas = document.getElementById("mycanvas");
const app = new PIXI.Application({
  view: canvas,
  width: canvasSize,
  height: canvasSize,
  backgroundColor: 0x312a2b,
  resolution: 2
});

// Configuring the PIXIE for the graphic adjustment 
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;


initGame();

async function initGame(){

  try{
    console.log("Loading Assets Check...")
    await loadAssets();
    app.weather = new Weather({app});

    console.log("Successfully Loaded the Assets :-)")

      let player = new Player({ app });
      let ZSpawner = new Spawner({app, create: ()=> new Zombie({app,player})});

      let gameStartScene = createScene("Smash The Zombies","Click to Start :-|");
      let gameOverScene = createScene("Game Over :-(")

      app.gameStarted = false;

      app.ticker.add((delta)=>{

        gameOverScene.visible = player.dead;

        gameStartScene.visible = !app.gameStarted;

        if(app.gameStarted===false) return;
        player.update(delta);
        // zombie.update(); 
        ZSpawner.spawns.forEach((zombie) => zombie.update(delta));
        bulletHitTest({bullets:player.shooting.bullets,zombies:ZSpawner.spawns,bulletRadius:8,zombieRadius:16});


})

  }

  catch(error){
    console.log(error.message)
    console.log("Load failed")

  }
  
}

function bulletHitTest({bullets,zombies,bulletRadius,zombieRadius}){
  bullets.forEach(bullet => {
    zombies.forEach((zombie,index) =>{
      let dx = zombie.position.x - bullet.position.x;
      let dy = zombie.position.y - bullet.position.y; 
      let distance = Math.sqrt(dx*dx + dy*dy);

      if(distance < bulletRadius + zombieRadius){
        zombies.splice(index,1)
        zombie.kill();
      }
    })
  })
}


function createScene(sceneText, sceneSubText){
  const sceneContainer = new PIXI.Container();
  const text = new PIXI.Text(sceneText, new PIXI.TextStyle(textStyle))
  text.x = app.screen.width/2;
  text.y = 0;
  text.anchor.set(0.5,0);

  const subText = new PIXI.Text(sceneSubText, new PIXI.TextStyle(subTextStyle))
  subText.x = app.screen.width/2;
  subText.y = 50;
  subText.anchor.set(0.5,0);


  sceneContainer.zIndex = 1;
  sceneContainer.addChild(text)
  sceneContainer.addChild(subText)
  app.stage.addChild(sceneContainer);
  return sceneContainer;
}

function startGame(){
  app.gameStarted = true;
  app.weather.enableSound();
}


async function loadAssets(){
  return new Promise ((resolve,reject)=>{
    zombies.forEach(z => PIXI.Loader.shared.add(`assets/${z}.json`));
    PIXI.Loader.shared.add("assets/hero_male.json");
    PIXI.Loader.shared.add("bullet","assets/bullet.png")
    PIXI.Loader.shared.add("rain","assets/rain.png")
    PIXI.Loader.shared.onComplete.add(resolve);
    PIXI.Loader.shared.onError.add(reject);
    PIXI.Loader.shared.load();
  })
}

document.addEventListener("click",startGame);






