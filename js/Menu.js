class Menu {
    constructor(game) {
        this.game = game;
        this.sasuke_image = document.getElementById("sasuke_menu");
        this.naurto_image = document.getElementById("naruto_menu");
        this.sakura_image = document.getElementById("sakura_menu");

        this.cross = document.getElementById("cross");
        this.gameBackground = document.getElementById('game-background');

        this.currentNinja = 0;

       // this.selectNinja();

        this.imageSize = {
            x: 100,
            y: 327
        }

    }

    draw(ctx) {
        ctx.drawImage(this.gameBackground, 0, 0, 1000, 700);
  
        this.drawNinja(ctx);
    }

    drawNinja(ctx) {
        
        this.crossImage();

        ctx.drawImage(
            this.sasuke_image,
            200,
            200,
            this.imageSize.x,
            this.imageSize.y
        );

        ctx.drawImage(
            this.naurto_image,
            450,
            200,
            this.imageSize.x,
            this.imageSize.y
        );

        ctx.drawImage(
            this.sakura_image,
            700,
            200,
            this.imageSize.x,
            this.imageSize.y
        );

        this.nameImage();

    }

   /* selectCode(event) {
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
                console.log('pressed')
                this.game.ninjaIndex = this.currentNinja;
                this.game.gameState = GAME_STATE.VILLAGE_STATE;
                this.game.village.goToDestination();

            default:
                //pass
        }
    }*/

    selectLeft() {
        if (this.currentNinja !== 0) {
            this.currentNinja--;
        }
    }

    selectRight() {
        if (this.currentNinja !== 2) {
            this.currentNinja++;
        }
    }

    confirmSelection() {
        console.log('pressed')
        this.game.ninjaIndex = this.currentNinja;
        this.game.gameState = GAME_STATE.VILLAGE_STATE;
        this.game.village.goToDestination();
    }

   /* selectNinja() {
        document.addEventListener("keydown", this.selectCode.bind(this));
    }*/

    crossImage() {

        let crossX;
        let crossY = 200;

        let narutoX;
        let narutoY = 250;

        switch (this.currentNinja) {
            case 0:
                crossX = 190;

                break;
            case 1:
                crossX = 441;

                break;
            case 2:
                crossX = 700;

                break;
            default:
                //pass
        }

        ctx.drawImage(
            this.cross,
            crossX,
            crossY,
            150, 150
        );

    }

    nameImage() {

        let narutoX;
        let narutoY = 530;

        switch (this.currentNinja) {
            case 0:
                narutoX = 100;
                this.naruto_name = document.getElementById("sasuke-name");
                break;
            case 1:
                narutoX = 370;
                this.naruto_name = document.getElementById("naruto-name");
                break;
            case 2:
                narutoX = 620;
                this.naruto_name = document.getElementById("sakura-name");
                break;
            default:
                //pass
        }

        ctx.drawImage(
            this.naruto_name,
            narutoX,
            narutoY,
            250,
            70

        );
    }
}
