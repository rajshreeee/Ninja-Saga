class Pet {
    constructor(game, index) {
        this.game = game;
        this.count = 0;
        this.frame = 0;

        this.index = index;
        this.setPet();
        this.positionX = 130;
        this.positionY = 320;
    }

    draw(ctx, imageIndex, imageSize) {

        this.count++;
        if (this.count % 10 == 0) {
            this.frame = this.frame % this.imageArray[imageIndex].length;
            this.frame += 1;
        }

       ctx.drawImage(this.imageArray[imageIndex].image, this.frame * this.imageArray[imageIndex].width, 0,this.imageArray[imageIndex].width, 50, this.positionX, this.positionY, imageSize, imageSize);

    }
    
      drawActionBarPet(ctx, imageIndex, imageSize, x, y){
        ctx.drawImage(this.imageArray[imageIndex].image, 0, 0, this.imageArray[imageIndex].width, 50, x, y, imageSize, imageSize);
    }
    

    setPet() {
        this.name = this.game.petArray[this.index].name;
        this.imageArray = this.game.petArray[this.index].imageArray;
        this.power = this.game.petArray[this.index].power;
        this.accuracy = this.game.petArray[this.index].accuracy;
        this.speed = this.game.petArray[this.index].speed;
    }

}

