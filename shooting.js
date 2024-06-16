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
        if(this.bullets.length>=this.maxBullets){
            let b = this.bullets.shift();
            this.app.stage.removeChild(b);
        }

        this.bullets.forEach((b)=>this.app.stage.removeChild(b)); 

        this.bullets = this.bullets.filter(
            b=>
                Math.abs(b.position.x) < this.app.screen.width && 
            Math.abs(b.position.y) < this.app.screen.height
        );

        this.bullets.forEach((b)=>this.app.stage.addChild(b)); 

        // The initial testing blue animation
        // const bullet = new PIXI.Graphics();
        // bullet.position.set(this.player.position.x, this.player.position.y);
        // bullet.beginFill(0x0000ff,1);
        // bullet.drawCircle(0,0,this.bulletRadius);
        // bullet.endFill();

        const bullet = new PIXI.Sprite(PIXI.Loader.shared.resources["bullet"].texture);

        bullet.anchor.set(0.5);
        bullet.scale.set(0.2)
        bullet.position.set(this.player.position.x, this.player.position.y);
        bullet.rotation = this.player.rotation;

        let angle = this.player.rotation - Math.PI / 2;
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

    update(delta){
        this.bullets.forEach(b=>
            b.position.set(b.position.x + b.velocity.x * delta, b.position.y + b.velocity.y * delta)
    )
    }
}