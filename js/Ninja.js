class Ninja {
    constructor(ninjaDataIndex, positionX, positionY, flipH, imageArray) {
        this.ninja_info = NinjaData[ninjaDataIndex];
        this.count = 0;
        this.frame = 0;
        this.naruto_sprite = document.getElementById("naruto_sprite");
        this.positionX = positionX;
        this.positionY = positionY;
        this.flipH = flipH;
        this.setNinja();
        this.imageArray = imageArray;
    }

    draw(ctx, imageIndex, imageSize) {
        this.count++;
        if (this.count % 15 == 0) {
            this.frame = this.frame % this.imageArray[imageIndex].length;
            this.frame += 1;
        }

        ctx.save();
        ctx.scale(this.flipH,1);
        ctx.drawImage(this.imageArray[imageIndex].image, this.frame * this.imageArray[imageIndex].width, 0, this.imageArray[imageIndex].width, 50, this.positionX, this.positionY, imageSize, imageSize);
        ctx.restore();
    }
    
    drawActionBarNinja(ctx, imageIndex, imageSize, x, y){
        ctx.drawImage(this.imageArray[imageIndex].image, 0, 0, this.imageArray[imageIndex].width, 50, x, y, imageSize, imageSize);
    }
    
    setNinja(){
        this.name = this.ninja_info.name;
        this.health = this.ninja_info.health;
        this.chakra = this.ninja_info.chakra;
        this.defense = this.ninja_info.defense;
        this.jutsu = this.ninja_info.jutsu;
        this.speed = this.ninja_info.speed;
    }
}
