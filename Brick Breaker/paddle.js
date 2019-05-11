export default class Paddle () {
    //this declares the values necessary to draw the paddle and move from left to right
    constructor (game) {
        this.gameWidth = game.gameWidth;
        this.width = 150;
        this.height = 30;

        this.maxSpeed =7;
        this.speed = 0;
        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight - this.height - 10,
        }
    }
    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight() {
        this.speed = this.maxSpeed;
    }
    stop () {
        this.speed = 0;
    }
    //This draws the paddle at the middle of the page
    draw (ctx) {
        ctx.fillStyle = '#0ff';
        ctx.fillRect (this.position.x, this.position.y, this.width, this.height);
    }
    //update adds to the position of the paddle and causes it to move
    update(deltaTime) {
        // if (!deltaTime) return;

        this.position += this.speed;

        /*Checks to make sure paddle collides with left and right walls*/
        if(this.position.x < 0) this.position.x = 0;

        if(this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;//cause x is where the paddle begins on the horizontal line

    }
}