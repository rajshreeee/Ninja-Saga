class Player extends Ninja {
    constructor(game,ninjaIndex, positionX, positionY, flipH, imageArray) {
        super(game, ninjaIndex, positionX, positionY, flipH, imageArray);
        this.game = game;
        this.gold = 0;
        this.goldImage = document.getElementById('gold');
        this.setPlayerJutsu();
        console.log(this.jutsu);
    }

    drawGold(ctx) {
        ctx.drawImage(this.goldImage, 820, 480);
        ctx.font = "19px Arial";
        ctx.fillText(this.gold, 880, 512);
    }

    setPlayerJutsu(){
        for(let i = 0; i < this.jutsu.length; i++){
            this.jutsu[i].selected = true;
        }
    }
    
    addLearnedJutsu(selectedAcademyJutsu){
        this.jutsu.push(trainingJutsu[selectedAcademyJutsu]);
        this.gold -= 200;
        console.log(this.jutsu);
        setTimeout(function(){
            this.game.gameState = GAME_STATE.VILLAGE_STATE;
        }.bind(this), 2000)
    }
}
