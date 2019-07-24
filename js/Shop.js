class Shop {
    constructor(game, canvas, ImageLoader, bgImage, confirmButton, itemRect, itemDataArray, bottomBar, offSetY, cross) {
        this.game = game;
        this.canvas = canvas;
        this.bottomBar = bottomBar;
        this.bgImage = bgImage;
        this.confirmButton = confirmButton;
        this.itemRect = itemRect;
        this.itemDataArray = itemDataArray;
        this.cross = cross;
        this.imageLoader = ImageLoader
        this.itemArray = [];

        this.offSetY = offSetY;

        this.setItem();

        this.selectedItem = undefined;

        this.priceImage = this.imageLoader.images.price;
        this.crossImage = this.imageLoader.images.crossBtn;

    }

    draw(ctx) {
        ctx.fillStyle = "#5a442f";
        ctx.fillRect(0, 0, 1000, 700);
        ctx.drawImage(this.bgImage, 0, 0);
        this.drawDetailImage(ctx);
        this.drawConfirmButton(ctx);
        this.game.player.drawGold(ctx);
        this.drawPrice(ctx);
        this.cross.draw(ctx);
        this.bottomBar.drawBottom(ctx, this.message);
    }

    drawCrossIcon(ctx) {
        ctx.drawImage(this.crossImage, 910, 0)
    }


    drawPrice(ctx) {
        for (let i = 0; i < this.itemArray.length; i++) {
            ctx.drawImage(this.priceImage, this.itemRect[i].x + 220, this.itemRect[i].y + 15)
        }
    }

    drawConfirmButton(ctx) {

        if (this.selectedItem != undefined) {
            ctx.drawImage(this.confirmButton, 710, 360 + this.offSetY);
        }
    }



    drawDetailImage(ctx) {
        for (let i = 0; i < this.itemArray.length; i++) {
            if (this.itemArray[i].renderDetailImage === true) {
                ctx.drawImage(this.itemArray[i].detailImage, this.itemArray[i].detailImagePosX, this.itemArray[i].detailImagePosY)

               
            }
        }
    }

    setItem() {
        for (let i = 0; i < this.itemDataArray.length; i++) {
            this.itemArray.push(this.itemDataArray[i]);
            
        }
    }

    renderDetail(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);
        for (let i = 0; i < this.itemArray.length; i++) {
            
            if (isSelected(clickCoordinates.x, clickCoordinates.y, this.itemRect[i], this.itemRect[i].width, this.itemRect[i].height)) {
                this.itemArray[i].renderDetailImage = true;
                for (let j = 0; j < this.itemArray.length; j++) {
                    if (i != j) {

                        this.itemArray[j].renderDetailImage = false;
                    }
                }
                this.selectedItem = i;
            }
        }
    }
}
