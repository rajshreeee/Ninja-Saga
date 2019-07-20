class Academy {
    constructor(game, canvas) {
        this.game = game;
        this.canvas = canvas;
        this.academy_inside = document.getElementById('academy-inside');
        this.learn_button = document.getElementById('learn-button');

        this.academyJutsu = [];

        this.setTrainingJutsu();


        this.academyJutsuRect = [
            {
                x: 140,
                y: 90
            },
            {
                x: 140,
                y: 160
            },
            {
                x: 140,
                y: 230
            },
            {
                x: 140,
                y: 300
            },
            {
                x: 140,
                y: 370
            }
        ];

        this.selectedAcademyJutsu = undefined;

    }

    draw(ctx) {
        ctx.drawImage(this.academy_inside, 0, 0);
        this.drawAcademyJutsu(ctx);
        this.drawDetailImage(ctx);
        this.drawLearnButton(ctx);
        this.game.player.drawGold(ctx);
    }

    drawAcademyJutsu(ctx) {
        for (let i = 0; i < trainingJutsu.length; i++) {
            ctx.rect(this.academyJutsuRect[i].x, this.academyJutsuRect[i].y, 460, 60);
            ctx.strokeStyle = '#68492c';
            ctx.stroke();
            ctx.drawImage(trainingJutsu[i].image, this.academyJutsuRect[i].x + 10, this.academyJutsuRect[i].y + 5);
        }
    }

    drawLearnButton(ctx) {
        if (this.selectedAcademyJutsu != undefined) {
            ctx.drawImage(this.learn_button, 710, 360);
        }
    }

    learnJutsu(event) {
        console.log('what')
        if (this.selectedAcademyJutsu != undefined) {

            let clickCoordinates = getMouseCoordinates(this.canvas, event);

                if (isSelected(clickCoordinates.x, clickCoordinates.y, {x: 710, y: 360}, 124, 42)) {
                    
                    console.log(this.selectedAcademyJutsu + 'learnJutsu')
                    this.game.player.addLearnedJutsu(this.selectedAcademyJutsu);
                }
            }
        
    }

    drawDetailImage(ctx) {
        for (let i = 0; i < this.academyJutsu.length; i++) {
            if (this.academyJutsu[i].renderDetailImage === true) {
                ctx.drawImage(this.academyJutsu[i].detailImage, 613, 76)
            }
        }
    }

    setTrainingJutsu() {
        for (let i = 0; i < trainingJutsu.length; i++) {
            this.academyJutsu.push(trainingJutsu[i]);
        }
    }

    renderDetail(event) {

        let clickCoordinates = getMouseCoordinates(this.canvas, event);
        for (let i = 0; i < this.academyJutsu.length; i++) {

            if (isSelected(clickCoordinates.x, clickCoordinates.y, this.academyJutsuRect[i], 460, 60)) {
                this.academyJutsu[i].renderDetailImage = true;
                this.selectedAcademyJutsu = i;
                console.log(this.selectedAcademyJutsu)
            }
        }
    }
}
