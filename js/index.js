let canvas = document.getElementById("ninjaSaga");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 700;


let game = new Game(canvas);
console.log("index"+ canvas)
function gameLoop() {
    let gameEngine = requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.draw(ctx, gameEngine, this.gameLoop);
    ctx.imageSmoothingEnabled = false;
}

gameLoop();
