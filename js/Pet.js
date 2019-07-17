class Pet {
    constructor() {
        this.image = document.getElementById('pet');
        this.count = 0;
        this.frame = 0;
    }

    draw(ctx) {
        this.count++;
        if (this.count % 15 == 0) {
            this.frame = this.frame % 2;
            this.frame += 1;
        }

        ctx.drawImage(this.image, this.frame * 320, 0, this.frame * 320, 215, 100, 300, 75, 75);
    }

}
