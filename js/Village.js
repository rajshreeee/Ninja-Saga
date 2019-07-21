class Village {
    constructor(game, canvas) {
        this.arenaImage = document.getElementById('arena');
        this.academyImage = document.getElementById('academy');
        this.equipmentImage = document.getElementById('equipment-btn');
        this.petShopImage = document.getElementById('pet-shop');
        this.petsIcon = document.getElementById('pets-icon');
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

        this.petShopCoordinates = {
            x: 100,
            y: 400
        }
        
        this.petsIconCoordinates = {
            x: 800,
            y: 25
        }
        
        this.canvas = canvas;
    }

    draw(ctx) {
        ctx.drawImage(this.arenaImage, this.arenaCoordinates.x, this.arenaCoordinates.y, 250, 150);

        ctx.drawImage(this.academyImage, this.academyCoordinates.x, this.academyCoordinates.y);
        
        ctx.drawImage(this.equipmentImage, this.equipmentCoordinates.x, this.equipmentCoordinates.y);
        
        ctx.drawImage(this.petShopImage,this.petShopCoordinates.x, this.petShopCoordinates.y );
        
        ctx.drawImage(this.petsIcon, this.petsIconCoordinates.x, this.petsIconCoordinates.y);
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
        
        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.petShopCoordinates, 150, 100)) {
                this.game.gameState = GAME_STATE.PET_SHOP_STATE;
        }
        
          if (isSelected(clickCoordinates.x, clickCoordinates.y, this.petsIconCoordinates, 45, 45)) {
                this.game.gameState = GAME_STATE.EQUIP_PET_STATE;
        }
        
        
    }

}
