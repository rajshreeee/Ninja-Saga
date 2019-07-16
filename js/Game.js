class Game {
    constructor(canvas) {
        this.gameState = GAME_STATE.MENU_STATE;

        this.menu = new Menu(this, ctx);
        this.ninjaIndex;
        this.ninjaArray = [0, 1, 2];
      
        this.playerPositionX = 100;
        this.enemyPositionX = 900;
        this.canvas = canvas;
       
        console.log(ninjaImageArray)
        console.log(NinjaData)
    }

    draw(ctx) {
        switch (this.gameState) {
            case GAME_STATE.MENU_STATE:
                this.menu.draw(ctx);
                break;
                
            case GAME_STATE.FIGHT_STATE:
                this.fight.draw(ctx);
                break;
        }
    }

    createFightObjects() {
        console.log('createFightObjects')
        this.ninjaArray.splice(this.ninjaIndex, 1);
        let randomIndex = this.ninjaArray[Math.floor(Math.random() * this.ninjaArray.length)];
        this.enemy = new Enemy(randomIndex, -this.enemyPositionX, -1, NinjaData[randomIndex].imageArray);
        this.player = new Player(this.ninjaIndex, this.playerPositionX, 1, NinjaData[this.ninjaIndex].imageArray);
        this.fight = new Fight(this.player, this.enemy, this.canvas);
        this.gameState = GAME_STATE.FIGHT_STATE;
    }
}
