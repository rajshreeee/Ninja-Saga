class ImageLoader {
    constructor() {
        this.images = {};
        this.numberOfImages = 0;
        this.numberOfLoadedImages = 0;
        this.init();
    }

    init() {
        this.loadImage("sasuke_menu", "./images/sasuke.png");
        this.loadImage("naruto_menu", "./images/naruto.png");
        this.loadImage("sakura_menu", "./images/sakura.png");

        this.loadImage("select_mission_bg", "./images/select-mission-bg.png")
        this.loadImage("select_mission_title", "./images/select-mission.png")
        this.loadImage("village_bg", "./images/villageBg.png");
        this.loadImage("lockedMission", "./images/lockedMission.png");

        this.loadImage("victory", "./images/victory.png");
        this.loadImage("defeat", "./images/defeat.png");

        this.loadImage("host", "./images/host.png");
        this.loadImage("bottomBar", "./images/bottomBar.png")

        this.loadImage("academy_inside", "./images/academy-inside.png");
        this.loadImage("learn_button", "./images/learn-button.png");

        this.loadImage("petShopInside", "./images/shop-bg.png");
        this.loadImage("buyBtn", "./images/buy.png");

        this.loadImage("crossBtn", "./images/cross-round.png");
        this.loadImage("equipBtn", "./images/equip-btn.png");

        this.loadImage("equipmentBg", "./images/equipment-bg.png");

        this.loadImage("waterBurstIcon", "./images/waterBurstIcon.png");

        this.loadImage("price", "./images/200.PNG");
        this.loadImage("speed", "./images/speed.png");
        this.loadImage("run", "./images/run.PNG");

        this.loadImage("ninjaCat_stand", "./images/ninjaCat_stand.png");
        this.loadImage("ninjaCat_attack", "./images/ninjaCat_attack.png");

        this.loadImage("kyuubi_walk", "./images/polar_walk2.png")
        this.loadImage("kyuubi_attack", "./images/polar_hunt2.png");

        this.loadImage("arena", "./images/arena.png");
        this.loadImage("academy", "./images/academy.png");
        this.loadImage("equipmentBtn", "./images/jutsu.png");
        this.loadImage("petShop", "./images/pet_shop.png");
        this.loadImage("petsIcon", "./images/pets-icon.png");


        this.loadImage("gradeAMission", "./images/gradeAMission.png");
        this.loadImage("gradeBMission", "./images/gradeBMission.png");
        this.loadImage("gradeCMission", "./images/gradeCMission.png");

        this.loadImage("bg_fight", "./images/fight_bg.png");
        this.loadImage("healthBarOuter", "./images/healthBarOuter.png");
        this.loadImage("healthBarInner", "./images/healthBarInner.png");


        this.loadImage("actionBar", "./images/action-bar.png");
        this.loadImage("dagger", "./images/dagger.png");
        this.loadImage("title_bar", "./images/title-bar.png");

        this.loadImage("naruto_stat", "./images/naruto-stat.png");
        this.loadImage("sakura_stat", "./images/sakura-stat.png");
        this.loadImage("sasuke_stat", "./images/sasuke-stat.png");
        this.loadImage("chakra_stat", "./images/chakraStat.png");
        this.loadImage("chakra_charge", "./images/charge-chakra.png");

        this.loadImage("sasuke_name", "./images/sasuke-name.png");
        this.loadImage("sakura_name", "./images/sakura-name.png");
        this.loadImage("naruto_name", "./images/naruto-name.png");

        this.loadImage("crossIcon", "./images/cross.png");
        this.loadImage("gameBackground", "./images/game_background.png");
        
        this.loadImage("healthCenter", "./images/healthCenter.png");
        
         this.loadImage("kurenai", "./images/weapon.png");
        this.loadImage("ninjaSagaIcon", "./images/ninjaSagaIcon.png");
        this.loadImage("kurenaiM", "./images/kurenaiIcon.png");
        
        this.loadImage("narutoRun", "./images/naruto_run.png");
        this.loadImage("sakuraWalk", "./images/sakura_walk.png");
        this.loadImage("sasukeRun", "./images/sasuke_run.png");
        this.loadImage("ninjaGate", "./images/ninjaGate.png");
        this.loadImage("ninjaGate2", "./images/ninjaGate2.png");
     
        this.numberOfImages = Object.keys(this.images).length;
    }

    loadImage(identifier, source) {
        var that = this;
        let image = new Image();
        image.src = source;
        image.onload = () => that.numberOfLoadedImages++;
        this.images[identifier] = image;
    }

    hasAllImagesLoaded() {
        return this.numberOfLoadedImages == this.numberOfImages ? true : false;
    }
}
