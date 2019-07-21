class EquipPet {
    constructor(game, canvas) {
        this.game = game;
        this.canvas = canvas;
        this.shop_bg = document.getElementById("shop-bg");
        this.cross = document.getElementById('cross-round');
        this.equip_btn = document.getElementById('equip-btn');

        this.petImageRect = [
            {
                x: 166,
                y: 68
            },
            {
                x: 166,
                y: 232
            }
        ];
    }

    draw(ctx) {
        ctx.drawImage(this.shop_bg, 0, 0);
        this.drawPlayersPets(ctx);
        this.drawEquipBtn(ctx);
    }

    drawPlayersPets(ctx) {
        for (let i = 0; i < this.game.petArray.length; i++) {
            ctx.drawImage(this.game.petArray[i].imageArray[0].image, this.petImageRect[i].x, this.petImageRect[i].y);

            if (this.game.petArray[i].selected) {
                ctx.drawImage(this.cross, this.petImageRect[i].x + 240, this.petImageRect[i].y + 10, 30, 30)
            }
        }
    }

    removeOrAddPets(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

        // console.log(clickCoordinates)
        for (let i = 0; i < this.game.petArray.length; i++) {

            if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                    x: this.petImageRect[i].x + 240,
                    y: this.petImageRect[i].y + 10
                }, 30, 30) && this.game.petArray[i].selected) {

                this.game.petArray[i].selected = false;
                console.log(this.game.petArray[i].selected)
            }

            if (isSelected(clickCoordinates.x, clickCoordinates.y, this.petImageRect[i], 50, 50)) {
                
                    if (this.detectSelected() >= 1) {
                        console.log('no more than 1');
                    } else {

                this.game.petArray[i].selected = true;
                        this.game.selectedPet = i;
                console.log(this.game.petArray[i].selected)
            }

        }
        }
    }

    
 
    detectSelected() {
        let count = 0;
        for (let i = 0; i < this.game.petArray.length; i++) {
            if (this.game.petArray[i].selected === true) {
                count++;
            }

        }
        return count;
    }
    drawEquipBtn(ctx){
         ctx.drawImage(this.equip_btn, 650, 415 );
    }
    
     equipPlayerPet(event){
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

            if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                    x: 650,
                    y: 415
                }, 105, 33)) {
                setTimeout(function(){
                    this.game.gameState = GAME_STATE.VILLAGE_STATE;
                }.bind(this), 2000);
            }
    }
}
