class Equipment {
    constructor(game, canvas){
        this.game = game;
        this.equipment_bg = document.getElementById('equipment-bg');
        
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
                y:450
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
                y:450
            }
        ];

    }
    
    draw(ctx){
        ctx.drawImage(this.equipment_bg, 0 ,0);
        this.drawJutsu(ctx);
    }
    
    drawJutsu(ctx){
        for(let i = 0; i < 6; i++){
            ctx.drawImage(this.game.player.jutsu[i].image, this.equipmentJutsuRect[i].x, this.equipmentJutsuRect[i].y )
        }
        
        if(this.game.player.jutsu.length >6){
            for(let i = 6; i< this.game.player.jutsu.length; i++){
                ctx.drawImage(this.game.player.jutsu[i].image, this.equipmentJutsuRect[i].x, this.equipmentJutsuRect[i].y )
            }
        }
    }
}