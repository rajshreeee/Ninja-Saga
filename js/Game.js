class Game {
    constructor(canvas) {
        this.gameState = GAME_STATE.MENU_STATE;

        this.menu = new Menu(this, ctx);
        this.ninjaIndex;
        this.ninjaArray = [0, 1, 2];
        
        this.playerPositionX = 100;
        this.canvas = canvas;
        
        this.enemyPosition =[
            {
                x: 750,
                y:140
            },
            
            {
                x:900,
                y:195
            },
            {
                x: 900,
                y:200
            }
        ]
        
        
        this.village = new Village(this);
        this.pet = new Pet();
    }

    draw(ctx) {
        switch (this.gameState) {
            case GAME_STATE.MENU_STATE:
                this.menu.draw(ctx);
                //this.pet.draw(ctx);
                break;
       
            
            case GAME_STATE.VILLAGE_STATE:
                
                this.village.draw(ctx);
                console.log(this.ninjaIndex)
                break;
                
                         
            case GAME_STATE.FIGHT_STATE:
                this.fight.draw(ctx);
                break;
        }
    }

    createFightObjects(numberOfEnemies) {
        console.log('figth'+this.ninjaIndex)
       // console.log('createFightObjects')
        this.ninjaArray.splice(this.ninjaIndex, 1);
        
       // let randomIndex = this.ninjaArray[Math.floor(Math.random() * this.ninjaArray.length)];
        
        /*this.enemy1 = new Enemy(1, -750, 140, -1, NinjaData[1].imageArray);
        this.enemy2 = new Enemy(2, -900, 195, -1, NinjaData[2].imageArray);
        
        this.enemyArray = [this.enemy1, this.enemy2];
        console.log(this.enemyArray)*/
       
        this.enemyArray = [];
        for(let i = 0; i< numberOfEnemies; i++){
            this.enemyArray.push( new Enemy(this.ninjaArray[i], -this.enemyPosition[i].x, this.enemyPosition[i].y, -1, NinjaData[this.ninjaArray[i]].imageArray));
        }
        
        console.log(this.enemyArray)
        
        this.player = new Player(this.ninjaIndex, this.playerPositionX, 200, 1, NinjaData[this.ninjaIndex].imageArray);
        
        this.fight = new Fight(this, this.player, this.enemyArray, this.canvas, this.pet);
        
        this.gameState = GAME_STATE.FIGHT_STATE;
    }
}
