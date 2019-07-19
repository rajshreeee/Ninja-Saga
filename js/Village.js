class Village {
    constructor(game, canvas) {
        this.arenaImage = document.getElementById('arena');
        this.game = game;

        this.arenaCoordinates = {
            x: 200,
            y: 200
        }

        this.canvas=canvas;
        //document.addEventListener('click', this.goToDestination.bind(this));
        this.canvas.onclick = event => this.goToDestination(event);
    }

    draw(ctx) {
        ctx.drawImage(this.arenaImage, this.arenaCoordinates.x, this.arenaCoordinates.y, 250, 150);
    }

    goToDestination(event) {
        let rect = this.canvas.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;

        if (isSelected(clickX, clickY, this.arenaCoordinates, 250, 150)) {
            this.game.createFightObjects(2);

        }
    }

}
