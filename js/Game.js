class Game {
    constructor(canvas) {
        this.gameState = GAME_STATE.MENU_STATE;
        this.menu = new Menu(this);
        this.ninjaIndex;
        this.ninjaArray = [0, 1, 2];

        this.playerPositionX = 100;
        this.canvas = canvas;

        this.enemyPosition = [
            {
                x: 750,
                y: 140
            },

            {
                x: 900,
                y: 195
            },
            {
                x: 900,
                y: 200
            }
        ]


        this.village = new Village(this, this.canvas, this.ctx);
        this.pet = new Pet();
    }

    draw(ctx, gameEngine, gameLoop) {
        switch (this.gameState) {
            case GAME_STATE.MENU_STATE:
                this.menu.draw(ctx);
                //this.pet.draw(ctx);
                break;

            case GAME_STATE.VILLAGE_STATE:

                this.village.draw(ctx);
                break;

            case GAME_STATE.FIGHT_STATE:
                this.fight.draw(ctx, gameEngine, gameLoop);
                break;

        }
    }

    createFightObjects(numberOfEnemies) {
        // console.log('createFightObjects')
        this.ninjaArray.splice(this.ninjaIndex, 1);

        this.enemyArray = [];
        for (let i = 0; i < numberOfEnemies; i++) {
            this.enemyArray.push(new Enemy(this.ninjaArray[i], -this.enemyPosition[i].x, this.enemyPosition[i].y, -1, NinjaData[this.ninjaArray[i]].imageArray));
        }


        this.player = new Player(this.ninjaIndex, this.playerPositionX, 200, 1, NinjaData[this.ninjaIndex].imageArray);

        this.fight = new Fight(this, this.player, this.enemyArray, this.canvas, this.pet);

        this.gameState = GAME_STATE.FIGHT_STATE;
    }
}
