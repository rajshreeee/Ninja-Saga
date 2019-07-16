class Menu {
    constructor(game, ctx) {
        this.game = game;
        this.sasuke_image = document.getElementById("sasuke_menu");
        this.naurto_image = document.getElementById("naruto_menu");
        this.sakura_image = document.getElementById("sakura_menu");
        this.cross = document.getElementById("cross");

        this.currentNinja = 0;

        this.selectNinja();

        this.imageSize = {
            x: 100,
            y: 327
        }
    }

    draw(ctx) {
        this.drawNinja(ctx);
    }

    drawNinja(ctx) {
        this.crossImage();

        ctx.drawImage(
            this.sasuke_image,
            100,
            300,
            this.imageSize.x,
            this.imageSize.y
        );

        ctx.drawImage(
            this.naurto_image,
            450,
            300,
            this.imageSize.x,
            this.imageSize.y
        );

        ctx.drawImage(
            this.sakura_image,
            800,
            300,
            this.imageSize.x,
            this.imageSize.y
        );


    }

    selectNinja() {
        document.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 37: //keyCode for left
                    if (this.currentNinja !== 0) {
                        this.currentNinja--;
                    }
                    break;
                case 39: //keyCode for right
                    if (this.currentNinja !== 2) {
                        this.currentNinja++;
                    }
                    break;
                case 13:
                    this.game.ninjaIndex = this.currentNinja;
                    this.game.createFightObjects();
                default:
                    //pass
            }
        });
    }

    crossImage() {

        let crossX;
        let crossY = 300;
        switch (this.currentNinja) {
            case 0:
                crossX = 100;
               
                break;
            case 1:
                crossX = 450;
                break;
            case 2:
                crossX = 800;
                break;
            default:
                //pass
        }

        ctx.drawImage(
            this.cross,
            crossX,
            crossY,
            100, 100
        );
    }


}
