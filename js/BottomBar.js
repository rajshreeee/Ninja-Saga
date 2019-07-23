class BottomBar {
    constructor(game, audioLoader, imageLoader) {
        this.game = game;
        this.audioLoader = audioLoader;
        this.imageLoader = imageLoader;
        this.host = this.imageLoader.images.host;
        this.bottomBar = this.imageLoader.images.bottomBar;
    }

    drawBottom(ctx, hostMessage) {
        ctx.drawImage(this.bottomBar, 0, 540);
        ctx.drawImage(this.host, 100, 570);
        ctx.font = "35px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText( hostMessage, 300, 620);
    }
}
