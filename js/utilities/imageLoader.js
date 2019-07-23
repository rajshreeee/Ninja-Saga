
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
    this.loadImage("village_bg", "./images/arena-Background.png");
    this.loadImage("lockedMission", "./images/lockedMission.png");

    this.loadImage("victory", "./images/victory.png");
    this.loadImage("defeat", "./images/defeat.png");
      
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