class Village {
    constructor(game, canvas) {
        this.arenaImage = document.getElementById('arena');
        this.academyImage = document.getElementById('academy');
        this.equipmentImage = document.getElementById('equipment-btn');
        this.petShopImage = document.getElementById('pet-shop');
        this.petsIcon = document.getElementById('pets-icon');
        this.shopImage = document.getElementById('shop');

        this.lockedMissionImage = document.getElementById('locked-mission');
        this.gradeAMissionImage = document.getElementById('grade-a-mission');
        this.gradeBMissionImage = document.getElementById('grade-b-mission');
        this.gradeCMissionImage = document.getElementById('grade-c-mission');
        this.game = game;

        this.arenaCoordinates = {
            x: 50,
            y: 200
        };

        this.academyCoordinates = {
            x: 750,
            y: 200
        };

        this.equipmentCoordinates = {
            x: 900,
            y: 20
        };

        this.petShopCoordinates = {
            x: 100,
            y: 400
        };

        this.petsIconCoordinates = {
            x: 800,
            y: 25
        };

        this.shopCoordinates = {
            x: 440,
            y: 280
        };

        
        /*this.missionRect = [
            {
                x: 0,
                y:10
            },{
                x: 0,
                y: 200
            },
            {
                x:0,
                y: 400
            }
        ]*/
        
        this.canvas = canvas;
    }

    draw(ctx) {
        ctx.drawImage(this.arenaImage, this.arenaCoordinates.x, this.arenaCoordinates.y, 250, 150);

        ctx.drawImage(this.academyImage, this.academyCoordinates.x, this.academyCoordinates.y);

        ctx.drawImage(this.equipmentImage, this.equipmentCoordinates.x, this.equipmentCoordinates.y);

        ctx.drawImage(this.petShopImage, this.petShopCoordinates.x, this.petShopCoordinates.y);

        ctx.drawImage(this.petsIcon, this.petsIconCoordinates.x, this.petsIconCoordinates.y);

        ctx.drawImage(this.shopImage, this.shopCoordinates.x, this.shopCoordinates.y);
    }

    goToDestination(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);


        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.arenaCoordinates, 250, 150)) {
            //this.game.createFightObjects(1);
            this.game.gameState = GAME_STATE.SELECT_MISSION_STATE;
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

        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.shopCoordinates, 146, 128)) {
            this.game.gameState = GAME_STATE.SHOP_STATE;
        }



    }

    drawSelectMission(ctx) {
        ctx.drawImage(this.gradeAMissionImage, 0, 10);
        ctx.drawImage(this.gradeBMissionImage, 0, 200);
        ctx.drawImage(this.gradeCMissionImage, 0, 400);
    }

    selectMission(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);
  

        if (isSelected(clickCoordinates.x, clickCoordinates.y, {x:0, y:10}, 313, 71)) {
               
                this.game.createFightObjects(1);
            } 
      
      if (isSelected(clickCoordinates.x, clickCoordinates.y, {x:0, y:200}, 313, 71)) {
               if(this.game.player.level >=1){
                                   this.game.createFightObjects(2);

               }else{
                   console.log('not enough level')
               }
            }
       
    }

}
