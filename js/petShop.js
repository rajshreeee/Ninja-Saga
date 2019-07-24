class PetShop extends Shop {
    constructor(game, canvas, ImageLoader, bgImage, confirmButton, itemRect, itemDataArray, bottomBar, offSetY, cross) {
        super(game, canvas, ImageLoader, bgImage, confirmButton, itemRect, itemDataArray, bottomBar, offSetY, cross);
        this.message = "Buy a new pet to help you in missions!";
    }

    drawPets(ctx) {
        for (let i = 0; i < this.itemArray.length; i++) {
            ctx.drawImage(   this.itemArray[i].icon,
            this.itemRect[i].x + 24, this.itemRect[i].y + 5,
            70,
           70);
        }


     

    this.drawStats(ctx);
}

buyPet() {
    let clickCoordinates = getMouseCoordinates(this.canvas, event);

    if (isSelected(clickCoordinates.x, clickCoordinates.y, {
            x: 680,
            y: 420
        }, 132, 45)) {

        if (this.selectedItem != undefined && this.game.player.gold >= 200 && this.itemArray.length !=0) {

            this.message = "You bought " + this.itemArray[this.selectedItem].name;
            this.game.petArray.push(this.itemArray[this.selectedItem]);

            this.itemArray.splice(this.selectedItem, 1);
            this.game.player.gold -= 200;

        } else if(this.game.player.gold === 0) {
            this.message = "You don't have enough gold!"
        } else if (this.itemArray.length ===0){
            this.message = "No more pets left!"
        }
    }
}

drawStats(ctx) {
    for (let i = 0; i < this.itemArray.length; i++) {

        if (this.itemArray[i].renderDetailImage === true) {
            ctx.font = "20px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("Name: " + this.itemArray[i].name, this.itemArray[i].detailImagePosX + 50, this.itemArray[i].detailImagePosY + 100);
            ctx.fillText("Power: " + this.itemArray[i].power, this.itemArray[i].detailImagePosX + 50, this.itemArray[i].detailImagePosY + 130);

            ctx.fillText("Accuracy: " + this.itemArray[i].accuracy, this.itemArray[i].detailImagePosX + 50, this.itemArray[i].detailImagePosY + 160);

            ctx.fillText("Speed: " + this.itemArray[i].speed, this.itemArray[i].detailImagePosX + 50, this.itemArray[i].detailImagePosY + 190);
        }
    }
}
}
