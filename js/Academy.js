class Academy extends Shop{
    constructor(game, canvas, bgImage, confirmButton, itemRect, itemDataArray) {
        super(game, canvas, bgImage, confirmButton, itemRect, itemDataArray);
        
    }

    drawAcademyJutsu(ctx) {
        for (let i = 0; i < this.itemArray.length; i++) {
            ctx.rect(this.itemRect[i].x, this.itemRect[i].y, 460, 60);
            ctx.strokeStyle = '#68492c';
            ctx.stroke();
            ctx.drawImage(this.itemArray[i].image, this.itemRect[i].x + 10, this.itemRect[i].y + 5);
        }
    }
    
    learnJutsu(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);
        console.log()
        if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                x: 710,
                y: 360
            }, 124, 42)) {
            if (this.selectedItem != undefined && this.game.player.gold >= 200) {
        
                console.log(this.selectedItem + 'learnJutsu')
               this.addLearnedJutsu(this.selectedItem);
                console.log(this.itemArray[this.selectedItem])
                this.itemArray.splice(this.selectedItem, 1);
                console.log(this.itemArray)
            } else {
                console.log('you dont have enough gold')
            }
        }

    }
      addLearnedJutsu() {
        this.game.player.jutsu.push(this.itemArray[this.selectedItem]);
        this.game.player.gold -= 200;
        console.log(this.game.player.jutsu);
        setTimeout(function () {
            this.game.gameState = GAME_STATE.VILLAGE_STATE;
        }.bind(this), 2000)
    }
    
}
