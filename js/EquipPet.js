class EquipPet {
    constructor(game, canvas, ImageLoader, bottomBar, cross) {
        this.game = game;
        this.canvas = canvas;
        this.imageLoader = ImageLoader;
        this.bottomBar = bottomBar;
        this.shop_bg = document.getElementById("shop-bg");
        this.cross = cross;
        this.crossBtn = document.getElementById('cross-round');
        this.equip_btn = document.getElementById('equip-btn');

        this.petImageRect = [
            {
                x: 166,
                y: 68,
                width: 320,
                height: 80
            },
            {
                x: 166,
                y: 232,
                width: 320,
                height: 80
            },
            {
                x: 166,
                y: 404,
                width: 320,
                height: 80
            }
        ];

        this.message = "Equip a pet to help you in your missions!"
        this.petHoverDisplay = [false, false, false];
    }

    draw(ctx) {
        ctx.drawImage(this.shop_bg, 0, 0);
        this.cross.draw(ctx);
        this.drawPlayersPets(ctx);
        this.drawEquipBtn(ctx);
        this.drawPetInfo(ctx);
        this.bottomBar.drawBottom(ctx, this.message);
    }

    drawPlayersPets(ctx) {
        for (let i = 0; i < this.game.petArray.length; i++) {
            ctx.drawImage(this.game.petArray[i].imageArray[0].image, this.petImageRect[i].x + 20, this.petImageRect[i].y + 20);

            if (this.game.petArray[i].selected) {
                ctx.drawImage(this.crossBtn, this.petImageRect[i].x + 260, this.petImageRect[i].y + 15, 30, 30)
            }
        }
    }

    removeOrAddPets(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

        // console.log(clickCoordinates)
        for (let i = 0; i < this.game.petArray.length; i++) {

            if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                    x: this.petImageRect[i].x + 260,
                    y: this.petImageRect[i].y + 15
                }, 30, 30) && this.game.petArray[i].selected) {

                this.game.petArray[i].selected = false;
                console.log(this.game.petArray[i].selected)
            }

            if (isSelected(clickCoordinates.x, clickCoordinates.y, this.petImageRect[i], 50, 50)) {

                if (this.detectSelected() >= 1) {
                    console.log('no more than 1');
                } else {

                    this.game.petArray[i].selected = true;
                    this.game.selectedPet = i;
                    console.log(this.game.petArray[i].selected)
                }

            }
        }
    }


    detectSelected() {
        let count = 0;
        for (let i = 0; i < this.game.petArray.length; i++) {
            if (this.game.petArray[i].selected === true) {
                count++;
            }

        }
        return count;
    }
    drawEquipBtn(ctx) {
        ctx.drawImage(this.equip_btn, 710, 415);
    }

    equipPlayerPet(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

        if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                x: 710,
                y: 415
            }, 105, 33)) {
            this.message = "Done!";
        }
    }

    displayPetInfo(event) {
        displayInfo(this.canvas, event, this.petImageRect, this.petHoverDisplay);
    }

    drawPetInfo(ctx) {
        for (let i = 0; i < this.game.petArray.length; i++) {
            if (this.petHoverDisplay[i] === true) {

                ctx.fillStyle = "#fff";
                ctx.fillRect(this.petImageRect[i].x + 100, this.petImageRect[i].y + 55, 125, 80);
                ctx.font = "20px Arial bold";
                ctx.fillStyle = "#000";
                ctx.fillText(this.game.petArray[i].name, this.petImageRect[i].x + 110, this.petImageRect[i].y + 70);
                ctx.font = "15px Arial";
                ctx.fillStyle = "#0000FF";
                ctx.fillText("Power:" + " " + this.game.petArray[i].power, this.petImageRect[i].x + 110, this.petImageRect[i].y + 90);
                ctx.fillStyle = "#FF0000";
                ctx.fillText("Accuracy:" + " " + this.game.petArray[i].accuracy, this.petImageRect[i].x + 110, this.petImageRect[i].y + 105);
                ctx.fillStyle = "#000";
                ctx.fillText("Speed:" + " " + this.game.petArray[i].speed, this.petImageRect[i].x + 110, this.petImageRect[i].y + 120);

            }
        }
    }
}
