class Game {
    constructor(canvas) {
        this.gameState = GAME_STATE.MENU_STATE;
        this.ninjaIndex;
        this.ninjaArray = [0, 1, 2];
        this.player;
        this.enemy;
        this.fight;
        this.playerPositionX = 100;
        this.canvas = canvas;
        new InputHandler(this, this.canvas);

        this.petArray = [];

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


        this.village = new Village(this, this.canvas);
        this.academy = new Academy(this, this.canvas, this.player);
        this.equipment = new Equipment(this, this.canvas);
        this.petShop = new PetShop(this, this.canvas);
        this.equipPet = new EquipPet(this, this.canvas);

        this.audioLoader = new AudioLoader();

        this.menu = new Menu(this, this.audioLoader);

        this.selectedPet = undefined;
    }

    setCharacters() {
        this.ninjaArray.splice(this.ninjaIndex, 1);




        this.player = new Player(this, this.ninjaIndex, this.playerPositionX, 200, 1, NinjaData[this.ninjaIndex].imageArray);

    }

    draw(ctx, gameEngine, gameLoop) {

        switch (this.gameState) {
            case GAME_STATE.MENU_STATE:
                this.menu.draw(ctx);
                //this.pet.draw(ctx);
                break;

            case GAME_STATE.VILLAGE_STATE:

                this.village.draw(ctx);
                this.audioLoader.play("finalRoad");

                break;

            case GAME_STATE.SELECT_MISSION_STATE:
                this.audioLoader.stop("finalRoad");

                this.village.drawSelectMission(ctx);
                break;

            case GAME_STATE.FIGHT_STATE:
                this.fight.draw(ctx, gameEngine, gameLoop);
                break;

            case GAME_STATE.ACADEMY_STATE:
                this.academy.draw(ctx);
                break;
            case GAME_STATE.EQUIPMENT_STATE:
                this.equipment.draw(ctx);
                break;
            case GAME_STATE.PET_SHOP_STATE:
                this.petShop.draw(ctx);
                break;
            case GAME_STATE.EQUIP_PET_STATE:
                this.equipPet.draw(ctx);
                break;
            case GAME_STATE.SHOP_STATE:
                this.shop.draw(ctx);
                //console.log('what')
                break;
        }
    }

    createFightObjects(numberOfEnemies) {
        // console.log('createFightObjects')

        if (this.selectedPet != undefined) {
            this.pet = new Pet(this, this.selectedPet);
        }

        this.enemyArray = [];
        for (let i = 0; i < numberOfEnemies; i++) {
            this.enemyArray.push(new Enemy(this.ninjaArray[i], -this.enemyPosition[i].x, this.enemyPosition[i].y, -1, NinjaData[this.ninjaArray[i]].imageArray));
        }
        this.fight = new Fight(this, this.player, this.enemyArray, this.canvas, this.pet);

        this.gameState = GAME_STATE.FIGHT_STATE;
    }
}
