class PetShop {
    constructor(game, canvas) {
        this.game = game;
        this.canvas = canvas;
        this.shop_bg = document.getElementById("shop-bg");
        this.buy = document.getElementById('buy');

        this.petDataArray = [];

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

        this.setPets();

        this.selectedPet = undefined;
    }

    draw(ctx) {
        ctx.drawImage(this.shop_bg, 0, 0);
        this.drawPets(ctx);
        this.drawBuyBtn(ctx);
    }



    drawPets(ctx) {
        for (let i = 0; i < this.petDataArray.length; i++) {
            ctx.drawImage(this.petDataArray[i].imageArray[0].image, this.petImageRect[i].x + 14, this.petImageRect[i].y + 8);
        }
    }
    setPets() {
        for (let i = 0; i < petData.length; i++) {
            this.petDataArray.push(petData[i]);
        }
        console.log(this.petDataArray)
    }

    renderPetDetail(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);
        for (let i = 0; i < petData.length; i++) {

            if (isSelected(clickCoordinates.x, clickCoordinates.y, this.petImageRect[i], 300, 80)) {
                this.petDataArray[i].renderDetail = true;
                this.selectedPet = i;
                console.log(this.selectedPet)
            }
        }
    }

    drawPetDetail(ctx) {
        for (let i = 0; i < this.petDataArray.length; i++) {
            if (this.petDataArray[i].renderDetail === true) {
                console.log('selected' + this.selectedPet)
            }
        }
    }

    
    drawBuyBtn(ctx){
        if(this.selectedPet != undefined){
            ctx.drawImage(this.buy, 640, 410, 132, 45 );
        }
    }
    
    buyPet() {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

        if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                x: 680,
                y: 420
            }, 132, 45)) {

            if (this.selectedPet != undefined && this.game.player.gold >= 200) {

                console.log(this.selectedPet + 'buyPet');
                
                this.game.petArray.push(this.petDataArray[this.selectedPet]);
                console.log(this.game.petArray);
                this.petDataArray.splice(this.selectedPet,1);
                console.log(this.petDataArray + 'change')
                setTimeout(function(){
                    this.game.gameState = GAME_STATE.VILLAGE_STATE;
                }.bind(this), 2000);
               // this.game.player.addLearnedJutsu(this.selectedAcademyJutsu);
                //this.academyJutsu.splice(this.selectedAcademyJutsu, 1);
                //console.log(this.academyJutsu)
            } else {
                console.log('you dont have enough gold')
            }
        }
    }
}
