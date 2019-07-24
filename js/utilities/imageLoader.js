
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
      
    this.loadImage("petShopInside","./images/shop-bg.png");
    this.loadImage("buyBtn","./images/buy.png");
      
    this.loadImage("crossBtn","./images/cross-round.png");
    this.loadImage("equipBtn","./images/equip-btn.png");
    
    this.loadImage("equipmentBg","./images/equipment-bg.png" );
      
    this.loadImage("waterBurstIcon","./images/waterBurstIcon.png");
      
    this.loadImage("price", "./images/200.PNG");
    this.loadImage("speed", "./images/speed.png");
    this.loadImage("run", "./images/run.PNG");
      
    this.loadImage("ninjaCat_stand", "./images/ninjaCat_stand.png");
    this.loadImage("ninjaCat_attack", "./images/ninjaCat_attack.png");
      
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