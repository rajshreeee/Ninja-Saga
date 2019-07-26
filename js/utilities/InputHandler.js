class InputHandler {
    constructor(game, canvas) {
        this.game = game;
        this.canvas = canvas;
        document.addEventListener("keydown", event => {
            //event occurs whenever a user presses a key
            switch (event.keyCode) {
                case 13:
                    if (this.game.gameState === GAME_STATE.MENU_STATE) {
                        this.game.menu.confirmSelection();
                    }
                    break;

                case 37:
                    if (this.game.gameState === GAME_STATE.MENU_STATE) {
                        this.game.menu.selectLeft();
                    }
                    break;
                case 39:
                    if (this.game.gameState === GAME_STATE.MENU_STATE) {
                        this.game.menu.selectRight();
                    }
                    break;
                default:
                    //pass
            }
        });

        this.canvas.addEventListener("click", event => {
            switch (this.game.gameState) {
                case GAME_STATE.VILLAGE_STATE:
                    this.game.village.goToDestination(event);
                    break;
                case GAME_STATE.FIGHT_STATE:
                    this.game.fight.selectJutsu(event);
                    this.game.fight.increasePlayerSpeed(event);
                    this.game.fight.run(event);
                    this.game.fight.selectEnemy(event);
                case GAME_STATE.SELECT_MISSION_STATE:
                    this.game.village.selectMission(event);
                    break;
                case GAME_STATE.ACADEMY_STATE:
                    this.game.academy.renderDetail(event);
                    this.game.academy.learnJutsu(event);
                    this.game.cross.leave(event);

                    break;
                case GAME_STATE.EQUIPMENT_STATE:
                    this.game.equipment.removeOrAddJutsu(event);
                    this.game.equipment.equipJutsu(event);
                    this.game.cross.leave(event);
                    break;
                case GAME_STATE.PET_SHOP_STATE:
                    this.game.petShop.renderDetail(event);
                    this.game.petShop.buyPet(event);
                    this.game.cross.leave(event);
                    break;
                case GAME_STATE.EQUIP_PET_STATE:
                    this.game.equipPet.removeOrAddPets(event);
                    this.game.equipPet.equipPlayerPet(event);
                    this.game.cross.leave(event);
                    break;
                case GAME_STATE.HEALTH_CENTER:
                    this.game.healthCenter.renderDetail(event);
                    this.game.healthCenter.buyScrolls(event);
                    this.game.cross.leave(event);
                    break;
                case GAME_STATE.SHOP_STATE:
                    this.game.shop.renderItemDetail(event);
                    break;
                case GAME_STATE.GAME_VICTORY:
                    this.game.transition.goToVillage(event);
                    break;
                case GAME_STATE.GAME_DEFEAT:
                    this.game.transition.goToMenu(event);
                    break;
                default:
                    //pass
            }
        });

        this.canvas.addEventListener("mousemove", event => {
            switch (this.game.gameState) {
                case GAME_STATE.FIGHT_STATE:
                    this.game.fight.displayDetails(event);
                    this.game.fight.displayChargeHover(event);
                    this.game.fight.displayRunHover(event);
                    break;
                case GAME_STATE.VILLAGE_STATE:
                    this.game.village.displayVillageInfo(event);

                    break;
                case GAME_STATE.SELECT_MISSION_STATE:
                    this.game.village.displayMissionInfo(event);
                    break;
                case GAME_STATE.EQUIP_PET_STATE:
                    this.game.equipPet.displayPetInfo(event);
                default:
                    //pass
            }
        });


    }
}
