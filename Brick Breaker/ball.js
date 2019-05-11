import { detectCollusion } from "collusionDetector.js";

export default class Ball {
    constructor (game) {
        this.image = document.getElementById("img_ball");
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.size = 16;
        this.reset;
    }

    reset() {
        this.position = {x: 10, y: 400};
        this.speed = {x: 2, y: -2};
    }

    drawImage (ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);

    }

    update (deltaTime) {
        console.log(this.game.paddle.position.x);
        /*Simple Motion*/
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        /* checks to see if ball hits wall on all sides*/
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0)
            {this.speed = -this.speed;}
        //Wall on top of ball
        if (this.position.y < 0)
            {this.speed = -this.speed;}
        //Bottom of game
        if (this.position.y + this.size > this.gameHeight) {
            this.game.lives--;
            this.reset();//Otherwise the ball stays down
        }

        /*checks to see if ball collides with paddle with bottom of ball and top of padddle. Refactored*/
        // let bottomOfBall = this.position.y + this.size;
        // let topOfPaddle = this.game.paddle.position.y;
        // let leftSideOfPaddle = this.game.paddle.position.x;
        // let rightSideOfPaddle = this.game.paddle.position.x + this.game.paddle.width;

        // if (bottomOfBall >= topOfPaddle
        //     && this.position.x >= leftSideOfPaddle
        //     && this.position.x + this.size <= rightSideOfPaddle)

        if(detectCollusion(this, this.game.paddle))
        {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}