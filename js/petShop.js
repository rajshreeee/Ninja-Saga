class PetShop extends Shop {
    constructor(game, canvas, bgImage, confirmButton, itemRect, itemDataArray) {
        super(game, canvas, bgImage, confirmButton, itemRect, itemDataArray);

    }

    drawPets(ctx) {
        for (let i = 0; i < this.itemArray.length; i++) {
            ctx.drawImage(this.itemArray[i].imageArray[0].image, this.itemRect[i].x + 14, this.itemRect[i].y + 8);
        }
    }
  /*  setPets() {
        for (let i = 0; i < petData.length; i++) {
            this.petDataArray.push(petData[i]);
        }
        console.log(this.petDataArray)
    }*/

   /* renderPetDetail(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);
        for (let i = 0; i < petData.length; i++) {

            if (isSelected(clickCoordinates.x, clickCoordinates.y, this.petImageRect[i], this.petImageRect[i].width, this.petImageRect[i].height)) {
                this.petDataArray[i].renderDetail = true;
                this.selectedPet = i;
                console.log(this.selectedPet)
            }
        }
    }*/

 /*   drawPetDetail(ctx) {
        for (let i = 0; i < this.petDataArray.length; i++) {
            if (this.petDataArray[i].renderDetail === true) {
                console.log('selected' + this.selectedPet)
            }
        }
    }*/

    
  /*  drawBuyBtn(ctx){
        if(this.selectedPet != undefined){
            ctx.drawImage(this.buy, 640, 410, 132, 45 );
        }
    }*/
    
    buyPet() {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

        if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                x: 680,
                y: 420
            }, 132, 45)) {

            if (this.selectedItem != undefined && this.game.player.gold >= 200) {

                console.log(this.selectedItem + 'buyPet');
                
                this.game.petArray.push(this.itemArray[this.selectedItem]);
                console.log(this.game.petArray);
                this.itemArray.splice(this.selectedItem,1);
                console.log(this.itemArray + 'change')
                setTimeout(function(){
                    this.game.gameState = GAME_STATE.VILLAGE_STATE;
                }.bind(this), 2000);
            
            } else {
                console.log('you dont have enough gold')
            }
        }
    }
}
