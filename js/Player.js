class Player extends Ninja {
    constructor(game, ninjaIndex, positionX, positionY, flipH, imageArray) {
        super(game, ninjaIndex, positionX, positionY, flipH, imageArray);
        this.gold = 2000;
        this.goldImage = document.getElementById('gold');
        this.level = 0;
        this.setPlayerJutsu();
        console.log(this.jutsu);
        console.log(ninjaIndex + 'player')
    }

    drawGold(ctx) {
        ctx.drawImage(this.goldImage, 820, 480);
        ctx.font = "19px Arial";
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#fff";
        ctx.fillText(this.gold, 900, 512);
    }

    setPlayerJutsu() {
        for (let i = 0; i < this.jutsu.length; i++) {
            this.jutsu[i].selected = true;
        }
    }

  
}
