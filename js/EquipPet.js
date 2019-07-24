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
            ctx.drawImage(this.game.petArray[i].icon, petImageRect[i].x + 20, petImageRect[i].y + 5, 70, 70);
            
            if (this.game.petArray[i].selected) {
                ctx.drawImage(this.crossBtn, petImageRect[i].x + 260, petImageRect[i].y + 15, 30, 30)
            }
        }
    }

    removeOrAddPets(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

        for (let i = 0; i < this.game.petArray.length; i++) {

            if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                    x: petImageRect[i].x + 260,
                    y: petImageRect[i].y + 15
                }, 30, 30) && this.game.petArray[i].selected) {

                this.game.petArray[i].selected = false;
                console.log(this.game.petArray[i].selected + 'selected');
                this.message = "";
            }

            if (isSelected(clickCoordinates.x, clickCoordinates.y, {x: petImageRect[i].x+20, y:petImageRect[i].y+5}, 70, 70)) {

                if (this.detectSelected() >= 1) {
                    this.message = "You cannot equip more than 1 pet at a time!"
                } else {

                    this.game.petArray[i].selected = true;
                    this.game.selectedPet = i;
                    console.log(this.game.petArray[i].selected);
                    this.message = "You equipped "+ this.game.petArray[i].name; 
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
        displayInfo(this.canvas, event, petImageRect, this.petHoverDisplay);
    }

    drawPetInfo(ctx) {
        for (let i = 0; i < this.game.petArray.length; i++) {
            if (this.petHoverDisplay[i] === true) {

                ctx.fillStyle = "#fff";
                ctx.fillRect(petImageRect[i].x + 15 + petImageRect[i].width, petImageRect[i].y, 100, 80);
                ctx.font = "20px Arial bold";
                ctx.fillStyle = "#000";
                ctx.fillText(this.game.petArray[i].name, petImageRect[i].x + petImageRect[i].width + 15, petImageRect[i].y + 15);
                ctx.font = "15px Arial";
                ctx.fillStyle = "#0000FF";
                ctx.fillText("Power:" + " " + this.game.petArray[i].power, petImageRect[i].x + petImageRect[i].width + 15, petImageRect[i].y + 30);
                ctx.fillStyle = "#FF0000";
                ctx.fillText("Accuracy:" + " " + this.game.petArray[i].accuracy, petImageRect[i].x + petImageRect[i].width + 15, petImageRect[i].y + 50);
                ctx.fillStyle = "#000";
                ctx.fillText("Speed:" + " " + this.game.petArray[i].speed, petImageRect[i].x + petImageRect[i].width + 15, petImageRect[i].y + 70);

            }
        }
    }
}
