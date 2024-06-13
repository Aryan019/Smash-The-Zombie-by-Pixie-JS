import * as PIXI from "pixi.js";
import Victor from "victor";


export default class Shooting{

    constructor({app,player}){
        this.app = app;
        this.player = player;
        this.bulletSpeed = 4;
        this.bullets = []; 

        this.bulletRadius = 8;
        this.maxBullets = 3;

    }

    fire(){
        const bullet = new PIXI.Graphics();
        bullet.position.set(this.player.position.x, this.player.position.y);
        bullet.beginFill(0x0000ff,1);
        bullet.drawCircle(0,0,this.bulletRadius);
        bullet.endFill();

        let angle = this.player.player.rotation - Math.PI / 2;
        bullet.velocity = new Victor(
            Math.cos(angle),
            Math.sin(angle)
        ).multiplyScalar(this.bulletSpeed);
        this.bullets.push(bullet);
        this.app.stage.addChild(bullet)
         
    }

    set shoot(shooting){
        if(shooting) {
            this.fire();
            this.interval = setInterval(()=>this.fire(),500);
        }else{
            clearInterval(this.interval);
        }
    }

    update(){
        this.bullets.forEach(b=>
            b.position.set(b.position.x + b.velocity.x, b.position.y + b.velocity.y)
    )
    }
}