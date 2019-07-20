class Village {
    constructor(game, canvas) {
        this.arenaImage = document.getElementById('arena');
        this.academyImage = document.getElementById('academy');
        this.game = game;

        this.arenaCoordinates = {
            x: 50,
            y: 200
        }
        
        this.academyCoordinates={
            x:750,
            y:200
        }
      
        this.canvas = canvas;
    }

    draw(ctx) {
        ctx.drawImage(this.arenaImage, this.arenaCoordinates.x, this.arenaCoordinates.y, 250, 150);
        
        ctx.drawImage(this.academyImage,this.academyCoordinates.x, this.academyCoordinates.y);
    }

    goToDestination(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);


        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.arenaCoordinates, 250, 150)) {
            this.game.createFightObjects(1);
        }
        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.academyCoordinates, 278, 295)){
            this.game.gameState = GAME_STATE.ACADEMY_STATE;
        }
    }

}
