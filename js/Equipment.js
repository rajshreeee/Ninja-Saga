class Equipment {
    constructor(game, canvas, ImageLoader, cross) {
        this.game = game;
        this.imageLoader = ImageLoader;
        this.equipment_bg = document.getElementById('equipment-bg');
        this.crossBtn = document.getElementById('cross-round');
        this.cross = cross;
        this.equip_btn = document.getElementById('equip-btn');
        this.canvas = canvas;
        this.bottomBar = new BottomBar(this.game, this.imageLoader);
        this.message = "Select 6 jutsus to equip in battle!";

    }

    draw(ctx) {
        ctx.drawImage(this.equipment_bg, 0, 0);
        this.drawJutsu(ctx);
        this.drawLearnButton(ctx);
        this.bottomBar.drawBottom(ctx, this.message);
        this.cross.draw(ctx);
    }

 
    drawJutsu(ctx) {
        for (let i = 0; i < 6; i++) {
            ctx.drawImage(this.game.player.jutsu[i].image, equipmentJutsuRect[i].x, equipmentJutsuRect[i].y, 50, 50);

            ctx.font = "15px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText(this.game.player.jutsu[i].name, equipmentJutsuRect[i].x + 60, equipmentJutsuRect[i].y + 15);

            ctx.font = "12px Arial";
            ctx.fillText("Power: " + this.game.player.jutsu[i].power, equipmentJutsuRect[i].x + 60, equipmentJutsuRect[i].y + 31);

            ctx.fillText("ChakraLoss: " + this.game.player.jutsu[i].chakraLoss, equipmentJutsuRect[i].x + 60, equipmentJutsuRect[i].y + 49);

            if (this.game.player.jutsu[i].selected) {
                ctx.drawImage(this.crossBtn, equipmentJutsuRect[i].x + 180, equipmentJutsuRect[i].y, 30, 30)
            }
        }

        if (this.game.player.jutsu.length > 6) {
            for (let i = 6; i < this.game.player.jutsu.length; i++) {
                ctx.drawImage(this.game.player.jutsu[i].image, equipmentJutsuRect[i].x, equipmentJutsuRect[i].y, 50, 50);
                if (this.game.player.jutsu[i].selected) {
                    ctx.drawImage(this.crossBtn, equipmentJutsuRect[i].x + 180, equipmentJutsuRect[i].y, 30, 30)
                }

                ctx.font = "15px Arial";
                ctx.fillStyle = "#fff";
                ctx.fillText(this.game.player.jutsu[i].name, equipmentJutsuRect[i].x + 60, equipmentJutsuRect[i].y + 15);

                ctx.font = "12px Arial";
                ctx.fillText("Power: " + this.game.player.jutsu[i].power, equipmentJutsuRect[i].x + 60, equipmentJutsuRect[i].y + 31);

                ctx.fillText("ChakraLoss: " + this.game.player.jutsu[i].chakraLoss, equipmentJutsuRect[i].x + 60, equipmentJutsuRect[i].y + 49);

                if (this.game.player.jutsu[i].selected) {
                    ctx.drawImage(this.crossBtn, equipmentJutsuRect[i].x + 180, equipmentJutsuRect[i].y, 30, 30)
                }
            }
        }
    }

    drawLearnButton(ctx) {
        if (this.detectSelected() === 6) {
            ctx.drawImage(this.equip_btn, 730, 380);
        }
    }

    removeOrAddJutsu(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

        for (let i = 0; i < 6; i++) {

            if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                    x: equipmentJutsuRect[i].x + 180,
                    y: equipmentJutsuRect[i].y
                }, 30, 30) && this.game.player.jutsu[i].selected) {

                this.game.player.jutsu[i].selected = false;
                console.log(this.game.player.jutsu[i].selected)
            }

            if (isSelected(clickCoordinates.x, clickCoordinates.y, equipmentJutsuRect[i], 50, 50)) {
                let x = this.detectSelected();
                console.log(x)

                if (this.detectSelected() >= 6) {
                    console.log('no more than 6');
                } else {

                    this.game.player.jutsu[i].selected = true;
                    console.log(this.game.player.jutsu[i].selected)
                }

            }


        }
        for (let i = 6; i < this.game.player.jutsu.length; i++) {

            if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                    x: equipmentJutsuRect[i].x + 180,
                    y: equipmentJutsuRect[i].y
                }, 30, 30) && this.game.player.jutsu[i].selected) {

                this.game.player.jutsu[i].selected = false;
            }

            if (isSelected(clickCoordinates.x, clickCoordinates.y, equipmentJutsuRect[i], 50, 50)) {
                let x = this.detectSelected();
                console.log(x)

                if (this.detectSelected() >= 6) {
                    this.message = "You cannot select more than 6!"
                } else {
                    this.game.player.jutsu[i].selected = true;
                    console.log(this.game.player.jutsu[i].selected)
                }
            }

        }
    }

    detectSelected() {
        let count = 0;
        for (let i = 0; i < this.game.player.jutsu.length; i++) {
            if (this.game.player.jutsu[i].selected === true) {
                count++;
            }

        }
        return count;
    }

    equipJutsu(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

        if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                x: 730,
                y: 380
            }, 105, 33)) {
            this.message = "You have equipped 6 jutsus!";
        }
    }




}
