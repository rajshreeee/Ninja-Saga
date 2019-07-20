class Academy {
    constructor(game){
        this.game = game;
        this.academy_inside = document.getElementById('academy-inside');
    }
    
    draw(ctx){
        ctx.drawImage(this.academy_inside, 0,0);
    }
}