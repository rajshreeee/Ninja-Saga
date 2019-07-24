class Cross{
    constructor(game, canvas, ImageLoader)  {
        this.game = game;
        this.canvas = canvas;
        this.imageLoader = ImageLoader;
        this.crossBtn = this.imageLoader.images.crossBtn;
    }
    draw(ctx){
        ctx.drawImage(this.crossBtn, 910,0 )
    }
    
    leave(event){
        let clickCoordinates = getMouseCoordinates(this.canvas, event);

        if (isSelected(clickCoordinates.x, clickCoordinates.y, {
                x: 910,
                y: 0
            }, 44, 44)) {
            this.game.gameState = GAME_STATE.VILLAGE_STATE;
        }
    }

}
