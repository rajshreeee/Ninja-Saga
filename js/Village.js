class Village {
    constructor(game, canvas, audioLoader, ImageLoader) {

        this.audioLoader = audioLoader;
        this.imageLoader = ImageLoader;

        this.game = game;

        this.arenaCoordinates = {
            x: 420,
            y: 250,
            width: 250,
            height: 150,
            message: "Fight ninjas",
            scaled_width: 260,
            scaled_height: 160,
            original_width: 250,
            original_height: 150
        };

        this.academyCoordinates = {
            x: 160,
            y: 410,
            width: 159,
            height: 125,
            message: "Learn jutsus",
            scaled_width: 169,
            scaled_height: 135,
            original_width: 159,
            original_height: 125
        };

        this.equipmentCoordinates = {
            x: 900,
            y: 20,
            width: 50,
            height: 51,
            message: "Equip jutsus",
            scaled_width: 60,
            scaled_height: 61,
            original_width: 50,
            original_height: 51
        };

        this.petShopCoordinates = {
            x: 730,
            y: 250,
            width: 150,
            height: 100,
            message: "Buy a pet",
            scaled_width: 160,
            scaled_height: 110,
            original_width: 150,
            original_height: 100
        };

        this.petsIconCoordinates = {
            x: 800,
            y: 25,
            width: 45,
            height: 45,
            message: "Equip pets",
            scaled_width: 55,
            scaled_height: 55,
            original_width: 45,
            original_height: 45
        };

        this.healthCenterCoordinates = {
            x: 400,
            y: 420,
            width: 146,
            height: 128,
            message: "Buy Scrolls",
            scaled_width: 156,
            scaled_height: 138,
            original_width: 146,
            original_height: 128
        }

        this.villageItemCoordinates = [
            this.arenaCoordinates, this.academyCoordinates, this.equipmentCoordinates, this.petShopCoordinates, this.petsIconCoordinates, this.healthCenterCoordinates
        ];

        this.canvas = canvas;

        this.displayHoverInfo = [false, false, false, false, false, false];
        this.displaySelectMissionInfo = [false, false, false];
    }

    draw(ctx) {

        ctx.drawImage(this.imageLoader.images.village_bg, 0, 0);


        ctx.drawImage(this.imageLoader.images.arena, this.arenaCoordinates.x, this.arenaCoordinates.y, this.arenaCoordinates.width, this.arenaCoordinates.height);

        ctx.drawImage(this.imageLoader.images.academy, this.academyCoordinates.x, this.academyCoordinates.y, this.academyCoordinates.width, this.academyCoordinates.height);

        ctx.drawImage(this.imageLoader.images.equipmentBtn, this.equipmentCoordinates.x, this.equipmentCoordinates.y, this.equipmentCoordinates.width, this.equipmentCoordinates.height);

        ctx.drawImage(this.imageLoader.images.petShop, this.petShopCoordinates.x, this.petShopCoordinates.y, this.petShopCoordinates.width, this.petShopCoordinates.height);

        ctx.drawImage(this.imageLoader.images.petsIcon, this.petsIconCoordinates.x, this.petsIconCoordinates.y, this.petsIconCoordinates.width, this.petsIconCoordinates.height);

        ctx.drawImage(this.imageLoader.images.healthCenter, this.healthCenterCoordinates.x, this.healthCenterCoordinates.y, this.healthCenterCoordinates.width, this.healthCenterCoordinates.height);



        this.drawVillageInfo(ctx);


    }

    goToDestination(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);


        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.arenaCoordinates, 250, 150)) {
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

        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.healthCenterCoordinates, 146, 128)) {
            this.game.gameState = GAME_STATE.HEALTH_CENTER;
        }

    }

    drawSelectMission(ctx) {
        ctx.drawImage(this.imageLoader.images.select_mission_bg, 0, 0);
        ctx.drawImage(this.imageLoader.images.select_mission_title, 120, 30);

        if (this.game.player.level >= 2) {
            this.gradeA = this.imageLoader.images.gradeAMission;
        } else {
            this.gradeA = this.imageLoader.images.lockedMission;
        }

        if (this.game.player.level >= 1) {
            this.gradeB = this.imageLoader.images.gradeBMission;
        } else {
            this.gradeB = this.imageLoader.images.lockedMission;
        }


        ctx.drawImage(this.gradeA, missionCoordinates[0].x, missionCoordinates[0].y);
        ctx.drawImage(this.gradeB, missionCoordinates[1].x, missionCoordinates[1].y);
        ctx.drawImage(this.imageLoader.images.gradeCMission, missionCoordinates[2].x, missionCoordinates[2].y);
        this.drawMissionInfo(ctx);

    }



    selectMission(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);


        if (isSelected(clickCoordinates.x, clickCoordinates.y, missionCoordinates[2], 313, 71)) {

            this.game.createFightObjects(1);
        }

        if (isSelected(clickCoordinates.x, clickCoordinates.y, missionCoordinates[1], 313, 71)) {
            if (this.game.player.level >= 1) {
                this.game.createFightObjects(2);

            } else {
                console.log('not enough level')
            }
        }

        if (isSelected(clickCoordinates.x, clickCoordinates.y, missionCoordinates[0], 313, 71)) {
            if (this.game.player.level >= 2) {
                this.game.createFightObjects(5);

            } else {
                console.log('not enough level')
            }
        }



    }

    displayVillageInfo(event) {
        displayInfo(this.canvas, event, this.villageItemCoordinates, this.displayHoverInfo);

    }

    displayMissionInfo(event) {

        displayInfo(this.canvas, event, missionCoordinates, this.displaySelectMissionInfo);

    }

    drawMissionInfo(event) {
        for (let i = 0; i < this.displaySelectMissionInfo.length; i++) {
            if (this.displaySelectMissionInfo[i] === true) {

                ctx.fillStyle = "#fff";
                ctx.fillRect(missionCoordinates[i].x, missionCoordinates[i].y, 300, 30);
                ctx.font = "15px Arial";
                ctx.fillStyle = "#000";
                ctx.fillText(missionCoordinates[i].message, missionCoordinates[i].x + 10, missionCoordinates[i].y + 20);

            }
        }
    }

    drawVillageInfo(ctx) {
        for (let i = 0; i < this.displayHoverInfo.length; i++) {
            if (this.displayHoverInfo[i] === true) {

                ctx.fillStyle = "#fff";
                ctx.fillRect(this.villageItemCoordinates[i].x, this.villageItemCoordinates[i].y, 100, 30);
                ctx.font = "15px Arial";
                ctx.fillStyle = "#000";
                ctx.fillText(this.villageItemCoordinates[i].message, this.villageItemCoordinates[i].x + 10, this.villageItemCoordinates[i].y + 20);
                this.villageItemCoordinates[i].width = this.villageItemCoordinates[i].scaled_width;
                this.villageItemCoordinates[i].height = this.villageItemCoordinates[i].scaled_height;
            } else {
                this.villageItemCoordinates[i].height = this.villageItemCoordinates[i].original_height;
                this.villageItemCoordinates[i].width = this.villageItemCoordinates[i].original_width;
            }
        }
    }




}
