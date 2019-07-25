class Academy extends Shop {
    constructor(game, canvas, ImageLoader, audioLoader, bgImage, confirmButton, itemRect, itemDataArray, bottomBar, offSetY, cross) {
        super(game, canvas, ImageLoader, audioLoader, bgImage, confirmButton, itemRect, itemDataArray, bottomBar, offSetY, cross);

        this.message = "Buy jutsus that can help you in missions!";

    }

    drawAcademyJutsu(ctx) {
        for (let i = 0; i < this.itemArray.length; i++) {

            ctx.rect(this.itemRect[i].x, this.itemRect[i].y, 460, 60);
            ctx.strokeStyle = '#68492c';
            ctx.stroke();
            ctx.drawImage(this.itemArray[i].image, this.itemRect[i].x + 10, this.itemRect[i].y + 5, 50, 50);
        }
    }

    learnJutsu(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);
        console.log()
        if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                x: 710,
                y: 360
            }, 124, 42)) {
            if (this.selectedItem != undefined && this.game.player.gold >= 200 && this.itemArray.length != 0) {
                this.addLearnedJutsu(this.selectedItem);
                this.audioLoader.play('cash');
                this.message = "You bought " + this.itemArray[this.selectedItem].name;
                this.itemArray.splice(this.selectedItem, 1);

            } else if (this.game.player.gold === 0) {
                this.message = "You don't have enough gold!";
            } else if (this.itemArray.length === 0) {
                this.message = "No more jutsus left!";
            }
        }

    }
    addLearnedJutsu() {
        this.game.player.jutsu.push(this.itemArray[this.selectedItem]);
        this.game.player.gold -= 200;
        console.log(this.game.player.jutsu)

    }

}
