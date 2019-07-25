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

        this.cross = new Cross(this, this.canvas, this.imageLoader);
        this.petArray = [];

        this.bottomBar = new BottomBar(this, this.imageLoader);

        this.village = new Village(this, this.canvas, this.audioLoader, this.imageLoader);

        this.academy = new Academy(this, this.canvas, this.imageLoader, this.audioLoader, this.imageLoader.images.academy_inside, this.imageLoader.images.learn_button, academyJutsuRect, trainingJutsu, this.bottomBar, 0, this.cross);


        this.equipment = new Equipment(this, this.canvas, this.imageLoader, this.cross);

        this.petShop = new PetShop(this, this.canvas, this.imageLoader, this.audioLoader, this.imageLoader.images.petShopInside, this.imageLoader.images.buyBtn, petImageRect, petData, this.bottomBar, 50, this.cross);

        this.equipPet = new EquipPet(this, this.canvas, this.imageLoader, this.bottomBar, this.cross);

        this.healthCenter = new HealthCenter(this, this.canvas, this.imageLoader, this.audioLoader, this.imageLoader.images.petShopInside, this.imageLoader.images.buyBtn, petImageRect, healthCenterData, this.bottomBar, 50, this.cross);
        
        this.menu = new Menu(this, this.audioLoader, this.imageLoader);
        this.transition = new Transition(this, this.canvas, this.audioLoader, this.imageLoader);
        this.selectedPet = undefined;
    }

    setCharacters() {
        this.ninjaArray.splice(this.ninjaIndex, 1);

        this.player = new Player(this, this.ninjaIndex, this.playerPositionX, 190, 1, NinjaData[this.ninjaIndex].imageArray);

    }

    draw(ctx, gameEngine, gameLoop) {

        switch (this.gameState) {
            case GAME_STATE.MENU_STATE:
                this.menu.draw(ctx);
                break;

            case GAME_STATE.VILLAGE_STATE:
                this.audioLoader.play("intro");
                this.village.draw(ctx);
                break;

            case GAME_STATE.SELECT_MISSION_STATE:
                this.audioLoader.stop("intro");
                this.village.drawSelectMission(ctx);
                break;

            case GAME_STATE.FIGHT_STATE:
                this.audioLoader.play("fight");
                this.fight.draw(ctx, gameEngine, gameLoop);
                break;

            case GAME_STATE.ACADEMY_STATE:
                this.audioLoader.stop("intro");
                this.academy.draw(ctx);
                this.academy.drawAcademyJutsu(ctx);
                break;

            case GAME_STATE.EQUIPMENT_STATE:
                this.audioLoader.stop("intro");
                this.equipment.draw(ctx);
                this.equipment.drawJutsu(ctx);
                break;

            case GAME_STATE.PET_SHOP_STATE:
                this.audioLoader.stop("intro");
                this.petShop.draw(ctx);
                this.petShop.drawPets(ctx);
                break;

            case GAME_STATE.EQUIP_PET_STATE:
                this.audioLoader.stop("intro");
                this.equipPet.draw(ctx);
                break;
            
            case GAME_STATE.HEALTH_CENTER:
                this.audioLoader.stop("intro");
                this.healthCenter.draw(ctx);
                this.healthCenter.drawScolls(ctx);
                break;

            case GAME_STATE.GAME_VICTORY:
                this.audioLoader.stop("fight");
                this.transition.drawVictory(ctx);
                break;

            case GAME_STATE.GAME_DEFEAT:
                this.audioLoader.stop("fight");

                this.transition.drawDefeat(ctx);
                break;
            default:
                //pass
        }
    }

    createFightObjects(numberOfEnemies) {

        if (this.selectedPet != undefined) {
            this.pet = new Pet(this, this.selectedPet);
        }

        this.enemyArray = [];
        if (numberOfEnemies === 5) {

            this.enemyArray.push(new Enemy(this.ninjaIndex, -enemyPosition[1].x, enemyPosition[1].y, -1, NinjaData[this.ninjaIndex].imageArray));
        } else if (numberOfEnemies === 1) {
            let j = getRandomInt(0, 2);
            this.enemyArray.push(new Enemy(this.ninjaArray[j], -enemyPosition[1].x, enemyPosition[1].y, -1, NinjaData[this.ninjaArray[j]].imageArray));
        } else {
            for (let i = 0; i < numberOfEnemies; i++) {
                this.enemyArray.push(new Enemy(this.ninjaArray[i], -enemyPosition[i].x, enemyPosition[i].y, -1, NinjaData[this.ninjaArray[i]].imageArray));
            }

        }


        this.fight = new Fight(this, this.player, this.enemyArray, this.canvas, this.pet, this.audioLoader, this.imageLoader, this.bottomBar);

        this.gameState = GAME_STATE.FIGHT_STATE;
    }
}
