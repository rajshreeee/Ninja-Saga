class Shop {
    constructor(game, canvas) {
        this.game = game;
        this.canvas = canvas;
        this.shop_bg = document.getElementById("shop-bg");
        this.buy = document.getElementById('buy');
        this.healingScrollImage = document.getElementById('healing-scroll');
        this.chakraScrollImage = document.getElementById('chakra-scroll');
        this.tenGold = document.getElementById('ten-gold');

        this.shopDataArray = [];

        this.itemImageRect = [
            {
                x: 166,
                y: 68
            },
            {
                x: 166,
                y: 232
            }
        ];
        
        this.setItems();
        
        this.selectedItem = undefined;
    }


    draw(ctx) {
        ctx.drawImage(this.shop_bg, 0, 0);
        this.drawItems(ctx);
        // this.drawBuyBtn(ctx);
    }

    drawItems(ctx) {
        // console.log(shopData)
        for (let i = 0; i < this.shopDataArray.length; i++) {
            ctx.drawImage(this.shopDataArray[i].image, this.itemImageRect[i].x + 14, this.itemImageRect[i].y + 8, 50, 50);
            ctx.drawImage(this.tenGold, this.itemImageRect[i].x + 180, this.itemImageRect[i].y + 20);
        }
    }

    setItems() {
        for (let i = 0; i < shopData.length; i++) {
            this.shopDataArray.push(shopData[i]);
        }
        console.log(this.shopDataArray + 'setItems');
    }

    renderItemDetail(event) {
        let clickCoordinates = getMouseCoordinates(this.canvas, event);
        for (let i = 0; i < this.shopDataArray.length; i++) {

            if (isSelected(clickCoordinates.x, clickCoordinates.y, this.itemImageRect[i], 300, 80)) {
                this.shopDataArray[i].renderDetail = true;
                this.selectedItem = i;
                console.log(this.selectedItem)
            }
        }
    }

}
