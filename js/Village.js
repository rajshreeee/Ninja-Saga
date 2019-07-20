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
       // this.canvas.onclick = event => this.goToDestination(event);
    }

    draw(ctx) {
        ctx.drawImage(this.arenaImage, this.arenaCoordinates.x, this.arenaCoordinates.y, 250, 150);
        
        ctx.drawImage(this.academyImage,this.academyCoordinates.x, this.academyCoordinates.y);
    }

    goToDestination(event) {
        let rect = this.canvas.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;

        if (isSelected(clickX, clickY, this.arenaCoordinates, 250, 150)) {
            this.game.createFightObjects(2);
        }
        if (isSelected(clickX, clickY, this.academyCoordinates, 144, 103)){
            this.game.gameState = GAME_STATE.ACADEMY_STATE;
        }
    }

}
