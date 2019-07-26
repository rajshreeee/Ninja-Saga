class HealthCenter extends Shop {
    constructor(game, canvas, ImageLoader, audioLoader, bgImage, confirmButton, itemRect, itemDataArray, bottomBar, offSetY, cross) {
        super(game, canvas, ImageLoader, audioLoader, bgImage, confirmButton, itemRect, itemDataArray, bottomBar, offSetY, cross);

        this.message = "Buy scrolls to increase your stat points!";

    }
    
    drawScolls(ctx){
        for(let i = 0; i< this.itemArray.length; i++){
            ctx.drawImage(this.itemArray[i].image,  this.itemRect[i].x + 24, this.itemRect[i].y + 5,
                70,
                70);
        }
    }
    
    buyScrolls(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);
        if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                x: 710,
                y: 410
            }, 132, 45)) {
            if (this.selectedItem != undefined && this.game.player.gold >= 200) {
                this.healPlayer(this.selectedItem);
                this.audioLoader.play('charge');
            

            } else if (this.game.player.gold === 0) {
                this.message = "You don't have enough gold!";
            }
        }

    }
    healPlayer() {
        this.game.player.gold -= 200;

        if(this.selectedItem === 0){
            this.game.player.health = 100;
            this.message = "Your HP is 100 now!";
        }
        
        if(this.selectedItem === 1){
            this.game.player.chakra = 100;
            this.message = "Your CP is 100 now!"
        }
    }
    
    
}
