class Village {
    constructor(game, canvas) {
        this.arenaImage = document.getElementById('arena');
        this.academyImage = document.getElementById('academy');
        this.equipmentImage = document.getElementById('equipment-btn');
        
        this.game = game;

        this.arenaCoordinates = {
            x: 50,
            y: 200
        }

        this.academyCoordinates = {
            x: 750,
            y: 200
        }
        
        this.equipmentCoordinates = {
            x: 900,
            y: 20
        }

        this.canvas = canvas;
    }

    draw(ctx) {
        ctx.drawImage(this.arenaImage, this.arenaCoordinates.x, this.arenaCoordinates.y, 250, 150);

        ctx.drawImage(this.academyImage, this.academyCoordinates.x, this.academyCoordinates.y);
        
        ctx.drawImage(this.equipmentImage, this.equipmentCoordinates.x, this.equipmentCoordinates.y);
    }

    goToDestination(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);


        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.arenaCoordinates, 250, 150)) {
            this.game.createFightObjects(1);
        }
        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.academyCoordinates, 278, 295)) {
            if (this.game.player.gold >= 200) {
                this.game.gameState = GAME_STATE.ACADEMY_STATE;
            }
        }
        
        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.equipmentCoordinates, 50, 51)) {
                this.game.gameState = GAME_STATE.EQUIPMENT_STATE;
        }
        
    }

}
