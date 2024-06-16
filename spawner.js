import * as PIXI from "pixi.js";
import Victor from "victor";

export default class Spawner{
    constructor({app, create}){
        this.app = app;
        const spawnInterval = 1000;
        this.maxSpawns = 10;
        this.create = create;
        this.spawns = [];
        setInterval(()=>this.spawn(),spawnInterval)
    }

    spawn(){
        if(this.app.gameStarted === false) return;
        if(this.spawns.length>=this.maxSpawns) return;
        let s = this.create();
        this.spawns.push(s);
    }
}