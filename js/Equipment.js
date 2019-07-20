class Equipment {
    constructor(game, canvas) {
        this.game = game;
        this.equipment_bg = document.getElementById('equipment-bg');
        this.cross = document.getElementById('cross-round');
        this.equip_btn = document.getElementById('equip-btn');
        this.canvas = canvas;
        this.equipmentJutsuRect = [
            {
                x: 162,
                y: 65
            },
            {
                x: 162,
                y: 142
            },
            {
                x: 162,
                y: 219
            },
            {
                x: 162,
                y: 296
            },
            {
                x: 162,
                y: 373
            }, {
                x: 162,
                y: 450
            },
            {
                x: 406,
                y: 65
            },
            {
                x: 406,
                y: 142
            },
            {
                x: 406,
                y: 219
            },
            {
                x: 406,
                y: 296
            },
            {
                x: 406,
                y: 373
            }, {
                x: 406,
                y: 450
            }
        ];

    }

    draw(ctx) {
        ctx.drawImage(this.equipment_bg, 0, 0);
        this.drawJutsu(ctx);
        this.drawLearnButton(ctx);
    }

    drawJutsu(ctx) {
        for (let i = 0; i < 6; i++) {
            ctx.drawImage(this.game.player.jutsu[i].image, this.equipmentJutsuRect[i].x, this.equipmentJutsuRect[i].y);
            if (this.game.player.jutsu[i].selected) {
                ctx.drawImage(this.cross, this.equipmentJutsuRect[i].x + 180, this.equipmentJutsuRect[i].y, 30, 30)
            }
        }

        if (this.game.player.jutsu.length > 6) {
            for (let i = 6; i < this.game.player.jutsu.length; i++) {
                ctx.drawImage(this.game.player.jutsu[i].image, this.equipmentJutsuRect[i].x, this.equipmentJutsuRect[i].y);
                if (this.game.player.jutsu[i].selected) {
                    ctx.drawImage(this.cross, this.equipmentJutsuRect[i].x + 180, this.equipmentJutsuRect[i].y, 30, 30)
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

        // console.log(clickCoordinates)
        for (let i = 0; i < 6; i++) {

            if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                    x: this.equipmentJutsuRect[i].x + 180,
                    y: this.equipmentJutsuRect[i].y
                }, 30, 30) && this.game.player.jutsu[i].selected) {

                this.game.player.jutsu[i].selected = false;
                console.log(this.game.player.jutsu[i].selected)
            }

            if (isSelected(clickCoordinates.x, clickCoordinates.y, this.equipmentJutsuRect[i], 50, 50)) {
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
                    x: this.equipmentJutsuRect[i].x + 180,
                    y: this.equipmentJutsuRect[i].y
                }, 30, 30) && this.game.player.jutsu[i].selected) {

                this.game.player.jutsu[i].selected = false;
            }

            if (isSelected(clickCoordinates.x, clickCoordinates.y, this.equipmentJutsuRect[i], 50, 50)) {
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
    
    equipJutsu(event){
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

            if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                    x: 730,
                    y: 380
                }, 105, 33)) {
                console.log('wah')
                setTimeout(function(){
                    this.game.gameState = GAME_STATE.VILLAGE_STATE;
                }.bind(this), 2000);
            }
 
    }

    
}
