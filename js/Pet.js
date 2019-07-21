class Pet {
    constructor(game, index) {
        this.game = game;
        this.count = 0;
        this.frame = 0;
        
        this.index = index;
        this.setPet();
    }

    draw(ctx, imageIndex, imageSize) {
        this.count++;
        if (this.count % 15 == 0) {
            this.frame = this.frame % 3;
            this.frame += 1;
        }

        ctx.drawImage(this.imageArray[imageIndex].image, this.frame * 30, 0, this.frame * 30, 50, 100, 100, 100, 100);
    }
    
    setPet(){
        this.name = this.game.petArray[this.index].name;
        this.imageArray = this.game.petArray[this.index].imageArray;
        this.power = this.game.petArray[this.index].power;
        this.accuracy = this.game.petArray[this.index].accuracy;
    }

}

//57, 0, 47, 50, 0, 50, 100, 100
//57, 0, 47, 50, 0, 50, 100, 100
 //ctx.drawImage(this.sprite, this.frame * 36, 0,36, 50, 100, 100, 100, 100);