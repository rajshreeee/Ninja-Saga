class Village {
    constructor(game) {
        this.arenaImage = document.getElementById('arena');
        this.game = game;


    }

    draw(ctx) {
        ctx.drawImage(this.arenaImage, 0, 0);


    }

    goToDestination() {
        /* document.addEventListener('click', function create(){
             this.game.createFightObjects();
             document.removeEventListener('click', create);
         }.bind(this))*/

        setTimeout(function () {
            this.game.createFightObjects(2);

        }.bind(this), 2000)

    }



}
