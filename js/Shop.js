class Shop {
    constructor(game, canvas, bgImage, confirmButton, itemRect, itemDataArray) {
        this.game = game;
        this.canvas = canvas;
        
        this.bgImage = bgImage;
        this.confirmButton = confirmButton;
        this.itemRect = itemRect;
        this.itemDataArray = itemDataArray;
        

        this.itemArray = [];

        this.setItem();

        this.selectedItem = undefined;
        console.log(itemDataArray)
    }

    draw(ctx) {
        ctx.drawImage(this.bgImage, 0, 0);
       // this.drawAcademyJutsu(ctx);
        this.drawDetailImage(ctx);
        this.drawConfirmButton(ctx);
        this.game.player.drawGold(ctx);
    }

   /* drawAcademyJutsu(ctx) {
        for (let i = 0; i < this.academyJutsu.length; i++) {
            ctx.rect(this.academyJutsuRect[i].x, this.academyJutsuRect[i].y, 460, 60);
            ctx.strokeStyle = '#68492c';
            ctx.stroke();
            ctx.drawImage(trainingJutsu[i].image, this.academyJutsuRect[i].x + 10, this.academyJutsuRect[i].y + 5);
        }
    }*/

    drawConfirmButton(ctx) {
        if (this.selectedItem != undefined) {
            ctx.drawImage(this.confirmButton, 710, 360);
        }
    }

    

    drawDetailImage(ctx) {
        for (let i = 0; i < this.itemArray.length; i++) {
            if (this.itemArray[i].renderDetailImage === true) {
                ctx.drawImage(this.itemArray[i].detailImage, this.itemArray[i].detailImagePosX,this.itemArray[i].detailImagePosY )
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
                this.selectedItem = i;
                console.log(this.selectedItem)
            }
        }
    }
}
