class Player extends Ninja {
    constructor(ninjaIndex, positionX, positionY, flipH, imageArray) {
        super(ninjaIndex, positionX, positionY, flipH, imageArray);
        this.gold = 0;
        this.goldImage = document.getElementById('gold');
    }

    drawGold(ctx) {
        ctx.drawImage(this.goldImage, 820, 480);
        ctx.font = "19px Arial";
        ctx.fillText(this.gold, 880, 512);
    }

}
