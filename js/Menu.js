class Menu {
    constructor(game, audioLoader, ImageLoader) {
        this.game = game;
        this.audioLoader = audioLoader;
        this.imageLoader = ImageLoader;
       
        this.cross = document.getElementById("cross");
        this.gameBackground = document.getElementById('game-background');

        this.currentNinja = 0;

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
            this.imageLoader.images.sasuke_menu,
            200,
            200,
            this.imageSize.x,
            this.imageSize.y
        );

        ctx.drawImage(
            this.imageLoader.images.naruto_menu,
            450,
            200,
            this.imageSize.x,
            this.imageSize.y
        );

        ctx.drawImage(
           this.imageLoader.images.sakura_menu,
            700,
            200,
            this.imageSize.x,
            this.imageSize.y
        );

        this.nameImage();

    }

    selectLeft() {
        if (this.currentNinja !== 0) {
            this.currentNinja--;
        }
        this.audioLoader.play("beep");

    }

    selectRight() {
        if (this.currentNinja !== 2) {
            this.currentNinja++;
        }
        this.audioLoader.play("beep");

    }

    confirmSelection() {
        console.log('pressed')
        this.game.ninjaIndex = this.currentNinja;
        this.game.setCharacters();
        console.log(this.game.ninjaIndex + 'menu')
        this.game.gameState = GAME_STATE.VILLAGE_STATE;
        this.audioLoader.play("beep");
        console.log(this.currentNinja)

    }

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
