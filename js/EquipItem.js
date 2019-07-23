class EquipItem {
    constructor(game, canvas, imageLoader, bgImage, itemImageRect, cutOff, gameArray) {
        this.game = game;
        this.canvas = canvas;
        this.imageLoader = imageLoader;
        this.bgImage = bgImage;
        this.itemImageRect = itemImageRect;
        this.cross = this.imageLoader.images.crossBtn;
        this.equip_btn = this.imageLoader.images.equipBtn;
        this.cutOff = cutOff;
        this.gameArray = gameArray;
    }
    
    draw(ctx) {
        ctx.drawImage(this.bgImage, 0, 0);
        //this.drawJutsu(ctx);
        //this.drawLearnButton(ctx);
    }

   /* drawJutsu(ctx) {
        for (let i = 0; i < 6; i++) {
            ctx.drawImage(this.game.player.jutsu[i].image, this.equipmentJutsuRect[i].x, this.equipmentJutsuRect[i].y);
            if (this.game.player.jutsu[i].selected) {
                ctx.drawImage(this.cross, this.equipmentJutsuRect[i].x + 180, this.equipmentJutsuRect[i].y, 30, 30)
            }
        }

        if (this.game.player.jutsu.length > 6) {
            for (let i = 6; i < this.game.player.jutsu.length; i++) {
                ctx.drawImage(this.game.player.jutsu[i].image, this.equipmentJutsuRect[i].x, this.equipmentJutsuRect[i].y);
                if (this.game.player.jutsu[i].selected) {
                    ctx.drawImage(this.cross, this.equipmentJutsuRect[i].x + 180, this.equipmentJutsuRect[i].y, 30, 30)
                }
            }
        }
    }*/

     drawConfirmBtn(ctx) {
        if (this.detectSelected() === this.cutOff) {
            ctx.drawImage(this.equip_btn, 730, 380);
        }
    }
    
    
    detectSelected() {
        let count = 0;
        for (let i = 0; i < this.gameArray.length; i++) {
            if (this.gameArray[i].selected === true) {
                count++;
            }

        }
        return count;
    }
    
    equipJutsu(event){
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

            if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                    x: 730,
                    y: 380
                }, 105, 33)) {
                setTimeout(function(){
                    this.game.gameState = GAME_STATE.VILLAGE_STATE;
                }.bind(this), 2000);
            }
    }

    


}
