import * as PIXI from "pixi.js";
import Victor from "victor";

export default class Zombie{
    constructor({app,player}){
      this.app = app;
      this.player = player;
  
      let radius = 16;
      this.speed = 1;
      this.zombie= new PIXI.Graphics();
      let r = this.randomSpawnPoint();
      this.zombie.position.set(r.x,r.y);
      this.zombie.beginFill(0xff0000,1);
      this.zombie.drawCircle(0,0,radius)
      this.zombie.endFill();
      app.stage.addChild(this.zombie);
  
    }
    update(){
        
  let e = new Victor(this.zombie.position.x,this.zombie.position.y);
  let s = new Victor(this.player.position.x,this.player.position.y)

  if(e.distance(s) < this.player.width/2){
    let r = this.randomSpawnPoint();
    this.zombie.position.set(r.x, r.y);
    return; 
  }

  let d = s.subtract(e);
  let v = d.normalize().multiplyScalar(this.speed)
  this.zombie.position.set(this.zombie.position.x+ v.x,this.zombie.position.y+ v.y)
    }

    kill(){
        this.app.stage.removeChild(this.zombie);
    }

    get position(){
        return this.zombie.position;

    }


    // Function to render the zombies 
    randomSpawnPoint(){
    let edge = Math.floor(Math.random()*4);
    let spawnPoint = new Victor(0,0)
    let canvasSize = this.app.screen.width;
    switch(edge){
      //top
      case 0:
        spawnPoint.x = canvasSize * Math.random();
        break;
      //right
      case 1:
        spawnPoint.x = canvasSize;
        spawnPoint.y = canvasSize * Math.random();
        break;
      //bottom  
      case 2:
        spawnPoint.x = canvasSize * Math.random();
        spawnPoint.y = canvasSize
        break;
      //left     
      default:
        spawnPoint.x = 0;
        spawnPoint.y = canvasSize * Math.random();
        break;
  
    }
    return spawnPoint;
  }
    
  }