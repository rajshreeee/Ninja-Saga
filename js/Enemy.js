class Enemy extends Ninja{
    constructor( ninjaIndex, positionX, positionY, flipH, imageArray){
        super(game, ninjaIndex, positionX, positionY, flipH, imageArray);
        
        this.game = game;
        this.speed += 0.5;
        this.defense -= 0.2;
        this.setNinja();
    }
}