class Player extends Ninja {
    constructor(ninjaIndex, positionX, positionY, flipH, imageArray) {
        super(ninjaIndex, positionX, positionY, flipH, imageArray);
        this.gold = 0;
        this.goldImage = document.getElementById('gold');
        this.setPlayerJutsu();
        console.log(this.jutsu);
    }

    drawGold(ctx) {
        ctx.drawImage(this.goldImage, 820, 480);
        ctx.font = "19px Arial";
        ctx.fillText(this.gold, 880, 512);
    }

    setPlayerJutsu(){
        for(let i = 0; i < this.jutsu.length; i++){
            this.jutsu[i].selected = true;
        }
    }
    
    addLearnedJutsu(selectedAcademyJutsu){
        this.jutsu.push(trainingJutsu[selectedAcademyJutsu]);
        this.gold -= 200;
        console.log(this.jutsu)
    }
}
