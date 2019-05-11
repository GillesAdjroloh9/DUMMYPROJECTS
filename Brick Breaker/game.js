import Paddle from 'paddle.js';
import InputHandler from 'input.js';
import Ball from "ball,js";
import Brick from "brick.js";
import { buildLevel, level1, level2 } from "levels.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU:3,
    GAMEOVER:4,
    NEWLEVEL:5
};

export default class Game {
    constructor (gameWidth, gameHeight) {
        this.gameWidth =gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.lives = 3;
        this.bricks = [];
        this.levels = [level1, level2];
        this.currentLevel = 0;
        this.gameObjects = [];
        new InputHandler(paddle, this);
    }

    start () {
        /*Cause it was restarting everytime spacekey was hit */
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        // for (let i = 0; i < 10; i++) {
        //     bricks.push(new Brick(this, {x: i * 80, y:30}));}
        this.gameObjects = [this.paddle, this.ball];
        this.gamestate = GAMESTATE.RUNNING;
    }


    update (deltaTime) {
        // this.paddle.update(deltaTime);//adds a number to the x position and comes after the drawing
        // this.ball.update(deltaTime);Refactored
        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
        if (
            this.gamestate === GAMESTATE.PAUSED
            || this.gamestate === GAMESTATE.MENU
            || this.gamestate === GAMESTATE.GAMEOVER
            )
            return;
        if (this.bricks.length === 0) {
            // console.log("New Level!");
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }


    draw (ctx) {
        // this.paddle.draw(ctx);
        // this.ball.draw(ctx);
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0,0,gameWidth,gameHeight);
            ctx.fillStyle = "rgba (0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0,0,gameWidth,gameHeight);
            ctx.fillStyle = "rgba (0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to start", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0,0,gameWidth,gameHeight);
            ctx.fillStyle = "rgba (0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
        }
    }


    togglePause() {
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }

}