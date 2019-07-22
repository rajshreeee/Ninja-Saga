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
            y: 200,
            width: 250,
            height: 150,
            message: "Fight ninjas"
        };

        this.academyCoordinates = {
            x: 750,
            y: 200,
            width: 159,
            height: 125,
            message: "Learn jutsus"
        };

        this.equipmentCoordinates = {
            x: 900,
            y: 20,
            width: 50,
            height: 51,
            message: "Equip jutsus"
        };

        this.petShopCoordinates = {
            x: 100,
            y: 400,
            width: 150,
            height: 100,
            message: "Buy a pet"
        };

        this.petsIconCoordinates = {
            x: 800,
            y: 25,
            width: 45,
            height: 45,
            message: "Equip pets"
        };

        this.villageItemCoordinates = [
            this.arenaCoordinates, this.academyCoordinates, this.equipmentCoordinates, this.petShopCoordinates, this.petsIconCoordinates
        ]


    
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

        this.displayHoverInfo = [false, false, false, false, false];
    }

    draw(ctx) {
        ctx.drawImage(this.arenaImage, this.arenaCoordinates.x, this.arenaCoordinates.y, 250, 150);

        ctx.drawImage(this.academyImage, this.academyCoordinates.x, this.academyCoordinates.y);

        ctx.drawImage(this.equipmentImage, this.equipmentCoordinates.x, this.equipmentCoordinates.y);

        ctx.drawImage(this.petShopImage, this.petShopCoordinates.x, this.petShopCoordinates.y);

        ctx.drawImage(this.petsIcon, this.petsIconCoordinates.x, this.petsIconCoordinates.y);


        this.drawVillageInfo(ctx);

    }

    goToDestination(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);


        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.arenaCoordinates, 250, 150)) {
            //this.game.createFightObjects(1);
            this.game.gameState = GAME_STATE.SELECT_MISSION_STATE;
        }
        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.academyCoordinates, 159, 125)) {
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

    drawSelectMission(ctx) {
        ctx.drawImage(this.gradeAMissionImage, 0, 10);
        ctx.drawImage(this.gradeBMissionImage, 0, 200);
        ctx.drawImage(this.gradeCMissionImage, 0, 400);

        //this.drawVillageHover(ctx);
    }

    selectMission(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);


        if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                x: 0,
                y: 10
            }, 313, 71)) {

            this.game.createFightObjects(1);
        }

        if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                x: 0,
                y: 200
            }, 313, 71)) {
            if (this.game.player.level >= 1) {
                this.game.createFightObjects(2);

            } else {
                console.log('not enough level')
            }
        }

    }

    displayVillageInfo(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);


        for (let i = 0; i < this.villageItemCoordinates.length; i++) {
            // console.log(this.jutsuCoordinates)

            if (isSelected(clickCoordinates.x, clickCoordinates.y, this.villageItemCoordinates[i], this.villageItemCoordinates[i].width, this.villageItemCoordinates[i].height)) {

                this.displayHoverInfo[i] = true;
            }

            if (!isSelected(clickCoordinates.x, clickCoordinates.y, this.villageItemCoordinates[i], this.villageItemCoordinates[i].width, this.villageItemCoordinates[i].height)) {
                this.displayHoverInfo[i] = false;
            }

            //  console.log(this.displayHoverInfo)
        }

        /* 
         if (isSelected(clickCoordinates.x, clickCoordinates.y, this.arenaCoordinates, 250, 150)) {
             console.log('what')
             this.displayHoverInfo[0] = true;
         }

         if (isSelected(clickCoordinates.x, clickCoordinates.y, this.academyCoordinates, 159, 125)) {
             this.displayHoverInfo[1] = true;

         }

         if (isSelected(clickCoordinates.x, clickCoordinates.y, this.equipmentCoordinates, 50, 51)) {
             this.displayHoverInfo[2] = true;


         }

         if (isSelected(clickCoordinates.x, clickCoordinates.y, this.petShopCoordinates, 150, 100)) {
             this.displayHoverInfo[3] = true;


         }

         if (isSelected(clickCoordinates.x, clickCoordinates.y, this.petsIconCoordinates, 45, 45)) {
             console.log('select pet')
             this.displayHoverInfo[4] = true;


         }*/
    }


    drawVillageInfo(ctx) {
        for (let i = 0; i < this.displayHoverInfo.length; i++) {
            if (this.displayHoverInfo[i] === true) {

                ctx.fillStyle = "#fff";
                ctx.fillRect(this.villageItemCoordinates[i].x, this.villageItemCoordinates[i].y, 100, 30);
                ctx.font = "15px Arial";
                ctx.fillStyle = "#000";
                ctx.fillText(this.villageItemCoordinates[i].message, this.villageItemCoordinates[i].x+10, this.villageItemCoordinates[i].y+20);
            }
        }
    }




}
