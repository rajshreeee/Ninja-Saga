
class ImageLoader {
  constructor() {
    this.images = {};
    this.numberOfImages = 0;
    this.numberOfLoadedImages = 0;
    this.init();
  }

  init() {
    this.loadImage("gateTileSheet", "images/gate-tileset.png");
    this.loadImage("garyTile", "images/gary-tile.png");
    this.loadImage("garyBattle", "images/gary-battle.png");

    this.loadImage("loreleiTileSheet", "images/lorelei-tileset.png");
    this.loadImage("loreleiTile", "images/lorelei-tile.png");
    this.loadImage("loreleiBattle", "images/lorelei-battle.png");

    this.loadImage("brunoTileSheet", "images/bruno-tileset.png");
    this.loadImage("brunoTile", "images/bruno-tile.png");
    this.loadImage("brunoBattle", "images/bruno-battle.png");

    this.loadImage("agathaTileSheet", "images/agatha-tileset.png");
    this.loadImage("agathaTile", "images/agatha-tile.png");
    this.loadImage("agathaBattle", "images/agatha-battle.png");

    this.loadImage("lanceTileSheet", "images/lance-tileset.png");
    this.loadImage("lanceTile", "images/lance-tile.png");
    this.loadImage("lanceBattle", "images/lance-battle.png");

    this.loadImage("playerSpriteSheet", "images/player.png");
    this.loadImage("playerBattle", "images/player-battle.png");

    this.loadImage("pokeball", "images/pokeball.png");

    this.loadImage("battleBackground", "images/battle-background.png");
    this.loadImage("battleDialogue", "images/battle-dialogue.png");
    this.loadImage("battleMoves", "images/battle-moves.png");
    this.loadImage("battleInfoBar", "images/battle-info-bar.png");
    this.loadImage("battleHPIndicator", "images/battle-hitpoints.png");

    
    this.loadImage("worldDialogue", "images/world-dialogue.png");
    

    this.loadImage("Charizard", "images/Charizard.png");
    this.loadImage("Blastoise", "images/Blastoise.png");
    this.loadImage("Venusaur", "images/Venusaur.png");
    this.loadImage("Jynx", "images/Jynx.png");
    this.loadImage("Machamp", "images/Machamp.png");
    this.loadImage("Gengar", "images/Gengar.png");
    this.loadImage("Dragonite", "images/Dragonite.png");

    
    this.loadImage("logo", "images/logo.png");
    this.loadImage("choosePokemon", "images/choosepokemon.png");
    this.loadImage("control", "images/control.png");
    this.loadImage("gameOver", "images/gameover.png");
    

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