class Village {
    constructor(game, canvas, audioLoader, ImageLoader) {

        this.audioLoader = audioLoader;
        this.imageLoader = ImageLoader;


        this.arenaImage = document.getElementById('arena');
        this.academyImage = document.getElementById('academy');
        this.equipmentImage = document.getElementById('equipment-btn');
        this.petShopImage = document.getElementById('pet-shop');
        this.petsIcon = document.getElementById('pets-icon');
        this.shopImage = document.getElementById('shop');

        //this.lockedMissionImage = document.getElementById('locked-mission');
        this.gradeAMissionImage = document.getElementById('grade-a-mission');
        this.gradeBMissionImage = document.getElementById('grade-b-mission');
        this.gradeCMissionImage = document.getElementById('grade-c-mission');
        this.lockedMissionImage = this.imageLoader.images.lockedMission;


        this.selectMissionBg = this.imageLoader.images.select_mission_bg;
        this.selectMissionTitle = this.imageLoader.images.select_mission_title;
        this.villageBg = this.imageLoader.images.village_bg;
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

        this.missionCoordinates = [
            {
                x: 300,
                y: 200,
                message: "Only level 2+ can accept these missions!",
                width: 313,
                height: 71
        }, {
                x: 300,
                y: 400,
                message: "Only level 1+ can accept these missions!",
                width: 313,
                height: 71
        },
            {
                x: 300,
                y: 600,
                message: "Basic mission that can be accepted by all",
                width: 313,
                height: 71
        }
    ];

        this.villageItemCoordinates = [
            this.arenaCoordinates, this.academyCoordinates, this.equipmentCoordinates, this.petShopCoordinates, this.petsIconCoordinates
        ];

        this.canvas = canvas;

        this.displayHoverInfo = [false, false, false, false, false];
        this.displaySelectMissionInfo = [false, false, false];
    }

    draw(ctx) {

        ctx.drawImage(this.villageBg, 0, 0);


        ctx.drawImage(this.arenaImage, this.arenaCoordinates.x, this.arenaCoordinates.y, this.arenaCoordinates.width, this.arenaCoordinates.height);

        ctx.drawImage(this.academyImage, this.academyCoordinates.x, this.academyCoordinates.y, this.academyCoordinates.width, this.academyCoordinates.height);

        ctx.drawImage(this.equipmentImage, this.equipmentCoordinates.x, this.equipmentCoordinates.y, this.equipmentCoordinates.width, this.equipmentCoordinates.height);

        ctx.drawImage(this.petShopImage, this.petShopCoordinates.x, this.petShopCoordinates.y, this.petShopCoordinates.width, this.petShopCoordinates.height);

        ctx.drawImage(this.petsIcon, this.petsIconCoordinates.x, this.petsIconCoordinates.y, this.petsIconCoordinates.width, this.petsIconCoordinates.height);



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

    }

    drawSelectMission(ctx) {
        ctx.drawImage(this.selectMissionBg, 0, 0);
        ctx.drawImage(this.selectMissionTitle, 120, 30);

        if (this.game.player.level >= 2) {
            this.gradeA = this.gradeAMissionImage;
        } else {
            this.gradeA = this.lockedMissionImage;
        }

        if (this.game.player.level >= 1) {
            this.gradeB = this.gradeBMissionImage;
        } else {
            this.gradeB = this.lockedMissionImage;
        }


        ctx.drawImage(this.gradeA, this.missionCoordinates[0].x, this.missionCoordinates[0].y);
        ctx.drawImage(this.gradeB, this.missionCoordinates[1].x, this.missionCoordinates[1].y);
        ctx.drawImage(this.gradeCMissionImage, this.missionCoordinates[2].x, this.missionCoordinates[2].y);
        this.drawMissionInfo(ctx);

    }



    selectMission(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);


        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.missionCoordinates[2], 313, 71)) {

            this.game.createFightObjects(1);
        }

        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.missionCoordinates[1], 313, 71)) {
            if (this.game.player.level >= 1) {
                this.game.createFightObjects(2);

            } else {
                console.log('not enough level')
            }
        }

        if (isSelected(clickCoordinates.x, clickCoordinates.y, this.missionCoordinates[0], 313, 71)) {
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

        displayInfo(this.canvas, event, this.missionCoordinates, this.displaySelectMissionInfo);

    }

    drawMissionInfo(event) {
        for (let i = 0; i < this.displaySelectMissionInfo.length; i++) {
            if (this.displaySelectMissionInfo[i] === true) {

                ctx.fillStyle = "#fff";
                ctx.fillRect(this.missionCoordinates[i].x, this.missionCoordinates[i].y, 300, 30);
                ctx.font = "15px Arial";
                ctx.fillStyle = "#000";
                ctx.fillText(this.missionCoordinates[i].message, this.missionCoordinates[i].x + 10, this.missionCoordinates[i].y + 20);

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
