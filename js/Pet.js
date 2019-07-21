class Pet {
    constructor(game, index) {
        this.game = game;
        this.image = document.getElementById('pet');
        this.count = 0;
        this.frame = 0;
        
        this.index = index;
        this.setPet();
    }

    draw(ctx) {
        this.count++;
        if (this.count % 15 == 0) {
            this.frame = this.frame % 2;
            this.frame += 1;
        }

        ctx.drawImage(this.image, this.frame * 320, 0, this.frame * 320, 215, 100, 300, 75, 75);
    }
    
    setPet(){
        this.name = this.game.petArray[this.index].name;
        this.imageArray = this.game.petArray[this.index].imageArray;
        this.power = this.game.petArray[this.index].power;
        this.accuracy = this.game.petArray[this.index].accuracy;
    }

}
