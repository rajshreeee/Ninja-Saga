class Game {
    constructor(canvas, ImageLoader, audioLoader) {
        this.gameState = GAME_STATE.MENU_STATE;

        this.audioLoader = audioLoader;
        this.imageLoader = ImageLoader;

        this.ninjaIndex;
        this.ninjaArray = [0, 1, 2];
        this.player;
        this.enemy;
        this.fight;
        this.playerPositionX = 155;
        this.canvas = canvas;
        new InputHandler(this, this.canvas);

        this.academyInsideImage = this.imageLoader.images.academy_inside;
        this.learnButton = this.imageLoader.images.learn_button;

        this.petShopInsideImage = this.imageLoader.images.petShopInside;
        this.buyBtn = this.imageLoader.images.buyBtn;

        this.equipmentBg = this.imageLoader.images.equipmentBg;
        this.cross = new Cross(this, this.canvas, this.imageLoader);
        this.petArray = [];

        this.enemyPosition = [
            {
                x: 750,
                y: 140
            },

            {
                x: 900,
                y: 190
            },
            {
                x: 900,
                y: 200
            }
        ]

        this.bottomBar = new BottomBar(this, this.imageLoader);

        this.village = new Village(this, this.canvas, this.audioLoader, this.imageLoader);

        this.academy = new Academy(this, this.canvas, this.imageLoader, this.academyInsideImage, this.learnButton, academyJutsuRect, trainingJutsu, this.bottomBar, 0, this.cross);


        this.equipment = new Equipment(this, this.canvas, this.imageLoader, this.cross);

        this.petShop = new PetShop(this, this.canvas, this.imageLoader, this.petShopInsideImage, this.buyBtn, petImageRect, petData, this.bottomBar, 50, this.cross);

        this.equipPet = new EquipPet(this, this.canvas, this.imageLoader, this.bottomBar, this.cross);

        this.menu = new Menu(this, this.audioLoader, this.imageLoader);
        this.transition = new Transition(this, this.canvas, this.audioLoader, this.imageLoader);
        this.selectedPet = undefined;
        //console.log(trainingJutsu)
    }

    setCharacters() {
        this.ninjaArray.splice(this.ninjaIndex, 1);




        this.player = new Player(this, this.ninjaIndex, this.playerPositionX, 190, 1, NinjaData[this.ninjaIndex].imageArray);

    }

    draw(ctx, gameEngine, gameLoop) {

        switch (this.gameState) {
            case GAME_STATE.MENU_STATE:
                this.menu.draw(ctx);
                //this.pet.draw(ctx);
                break;

            case GAME_STATE.VILLAGE_STATE:

                this.village.draw(ctx);
                this.audioLoader.play("intro");

                break;

            case GAME_STATE.SELECT_MISSION_STATE:
                this.audioLoader.stop("intro");

                this.village.drawSelectMission(ctx);
                break;

            case GAME_STATE.FIGHT_STATE:
                this.fight.draw(ctx, gameEngine, gameLoop);
                break;

            case GAME_STATE.ACADEMY_STATE:
                this.academy.draw(ctx);
                this.academy.drawAcademyJutsu(ctx);
                break;
            case GAME_STATE.EQUIPMENT_STATE:
                this.equipment.draw(ctx);
                this.equipment.drawJutsu(ctx);
                break;
            case GAME_STATE.PET_SHOP_STATE:
                this.petShop.draw(ctx);
                this.petShop.drawPets(ctx);
                break;
            case GAME_STATE.EQUIP_PET_STATE:
                this.equipPet.draw(ctx);
                break;
            case GAME_STATE.GAME_VICTORY:
                this.transition.drawVictory(ctx);
                break;
            case GAME_STATE.GAME_DEFEAT:
                this.transition.drawDefeat(ctx);
                break;
        }
    }

    createFightObjects(numberOfEnemies) {
        // console.log('createFightObjects')
        console.log(NinjaData + 'NinjaData');
        console.log(this.ninjaArray);
        console.log(numberOfEnemies)
        if (this.selectedPet != undefined) {
            this.pet = new Pet(this, this.selectedPet);
        }

        this.enemyArray = [];
        if (numberOfEnemies === 5) {

            this.enemyArray.push(new Enemy(this.ninjaIndex, -this.enemyPosition[1].x, this.enemyPosition[1].y, -1, NinjaData[this.ninjaIndex].imageArray));
        } else if (numberOfEnemies === 1) {
            let j = getRandomInt(0, 2);
            console.log(j)
            this.enemyArray.push(new Enemy(this.ninjaArray[j], -this.enemyPosition[1].x, this.enemyPosition[1].y, -1, NinjaData[this.ninjaArray[j]].imageArray));
        } else {
            for (let i = 0; i < numberOfEnemies; i++) {
                this.enemyArray.push(new Enemy(this.ninjaArray[i], -this.enemyPosition[i].x, this.enemyPosition[i].y, -1, NinjaData[this.ninjaArray[i]].imageArray));
            }

        }


        this.fight = new Fight(this, this.player, this.enemyArray, this.canvas, this.pet, this.audioLoader, this.imageLoader, this.bottomBar);

        this.gameState = GAME_STATE.FIGHT_STATE;
    }
}
