import Game from "game.js";

let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, 800, 600);

const GAME_WIDTH = 800;

const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH,GAME_HEIGHT);


let lastTime = 0;


/* */
function gameLoop (timestamp) {
    let deltaTime = timestamp - lastTime;//calculates the time since previous frame
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);


    requestAnimationFrame(gameLoop);
    /*very important makes the change to the paddle with each new frame by calling gameLoop.
    Gives the illusion of moving but just swapping frames with different x positions.
    if x = 325 at start, when left key pressed x becomes 315, 305, 295 ,...till 0.same for
        the right key*/

}

requestAnimationFrame(gameLoop);/*request a frame at timestamp  and provides gameLoop() with
a valid timestamp*/

