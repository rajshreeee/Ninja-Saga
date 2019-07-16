class Fight {
    constructor(player, enemy, canvas) {
        this.player = player;
        this.enemy = enemy;
        this.backgroundImage = document.getElementById("bg_fight");
        this.attackImage = document.getElementById("rasengan");
        this.healthBarOuter = document.getElementById("healthBarOuter");
        this.healthBarInner = document.getElementById("healthBarInner");
        this.attackImageSize = 50;
        this.canvas = canvas;
        this.jutsu1Coordinates = {
            x: 200,
            y: 450
        }

        this.jutsu2Coordinates = {
            x: 350,
            y: 450
        }

        this.healthBarCoordinates = {
            x: 150,
            y: 300
        }

        this.totalHealth = 100;
        this.jutsuIndex=0;

        if (this.player.speed > this.enemy.speed) {
            console.log('speed')
            this.currentState = BATTLE_STATE.INPUT_STATE;
        } else {
            this.currentState = BATTLE_STATE.ENEMY_ATTACK;
        }

        this.update();
        this.playerTurn = true;
        canvas.onclick = event => this.selectJutsu(event);
        
        this.playerImageIndex = 0;
        this.enemyImageIndex = 0;

    }

    update() {
        console.log('update')
        console.log(this.currentState)
        switch (this.currentState) {
            case BATTLE_STATE.PLAYER_ATTACK:
                console.log('player attack')
                this.playerAttack();
                break;
            case BATTLE_STATE.ENEMY_ATTACK:
                console.log('enemy attack')
                this.enemyAttack();
                break;
        }
    }

    draw(ctx) {
        this.drawFightBackground(ctx);
        this.player.draw(ctx,this.playerImageIndex);
        this.enemy.draw(ctx,this.enemyImageIndex);
        this.drawPlayerHealthBar(ctx);
        this.drawEnemyHealthBar(ctx);
        if (this.playerTurn === true) {
            this.renderPlayerTurn(ctx);
        }
    }

    drawPlayerHealthBar(ctx) {
       let Healthwidth = this.calculatHealthPercentage(this.player);
        if(Healthwidth < 0){
            Healthwidth = 0;
        }
        ctx.drawImage(
            this.healthBarOuter,
            this.healthBarCoordinates.x,
            this.healthBarCoordinates.y,
            100+6,
            10
        )

        ctx.drawImage(
            this.healthBarInner,
            this.healthBarCoordinates.x + 3,
            this.healthBarCoordinates.y + 1,
            Healthwidth,
            6
        )
    }
    
    drawEnemyHealthBar(ctx) {
       let Healthwidth = this.calculatHealthPercentage(this.enemy);
         if(Healthwidth < 0){
            Healthwidth = 0;
        }
        ctx.drawImage(
            this.healthBarOuter,
            this.healthBarCoordinates.x+700,
            this.healthBarCoordinates.y,
            100+6,
            10
        )

        ctx.drawImage(
            this.healthBarInner,
            this.healthBarCoordinates.x + 3+700,
            this.healthBarCoordinates.y + 1,
            Healthwidth,
            6
        )
    }

    drawFightBackground(ctx) {
        ctx.drawImage(
            this.backgroundImage,
            0,
            0,
            1000,
            500
        )
    }

    drawPlayerAttacks(ctx) {
        ctx.drawImage(
            this.attackImage,
            this.jutsu1Coordinates.x, this.jutsu1Coordinates.y, this.attackImageSize, this.attackImageSize
        );

        ctx.drawImage(
            this.attackImage,
            this.jutsu2Coordinates.x, this.jutsu2Coordinates.y, this.attackImageSize, this.attackImageSize
        );

    }

    renderPlayerTurn(ctx) {
        this.drawPlayerAttacks(ctx);
    }

    selectJutsu(event) {
        let rect = this.canvas.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;
        if (this.isSelected(clickX, clickY, this.jutsu1Coordinates)) {
            console.log(this.player.jutsu[0]);
            this.jutsuIndex = 0;
            this.playerImageIndex = this.jutsuIndex;
            console.log(this.playerImageIndex)
            console.log('i am selectjutsu')
            this.currentState = BATTLE_STATE.PLAYER_ATTACK;
            this.update();
            this.playerTurn = false;
        } else if (this.isSelected(clickX, clickY, this.jutsu2Coordinates)) {
            console.log(this.player.jutsu[1]);
            this.jutsuIndex = 1;
            this.playerImageIndex = this.jutsuIndex;
            console.log('i am selectjutsu')
            this.currentState = BATTLE_STATE.PLAYER_ATTACK;
            this.update();
            this.playerTurn = false;
        }
    }

    isSelected(clickX, clickY, jutsuCoordinates) {
        if (
            clickX >= jutsuCoordinates.x &&
            clickX <= jutsuCoordinates.x + this.attackImageSize &&
            clickY >= jutsuCoordinates.y &&
            clickY <= jutsuCoordinates.y + this.attackImageSize
        ) {
            return true;
        }
    }

    playerAttack() {
        console.log('I am player Attack')
        let dodge = getRandomInt(0, 2);
        if (dodge < this.player.jutsu[this.jutsuIndex].accuracy) {
            let damage = computeDamage(this.player, this.enemy, this.jutsuIndex);
            this.enemy.health -= damage;

        } else {
            console.log('dodged');
        }

        console.log('enemy health' + this.enemy.health)
        setTimeout(function () {
            if (this.enemy.health < 0) {
                console.log('we win');
            } else {
                console.log('player game continues')
                this.currentState = BATTLE_STATE.ENEMY_ATTACK;
                this.update();
            }
        }.bind(this), 2000);
    }

    enemyAttack() {
        console.log('I am enemy Attack')
                this.playerImageIndex = 0;

        let dodge = getRandomInt(0, 2);
        if (dodge < this.player.jutsu[this.jutsuIndex].accuracy) {
            let jutsuIndexEnemy = getRandomInt(0, 2);
            let damage = computeDamage(this.enemy, this.player, jutsuIndexEnemy);
            this.player.health -= damage;
        } else {
            console.log('dodged');
        }
        this.calculatHealthPercentage(this.player);
        console.log('player health' + this.player.health)
        setTimeout(function () {
            if (this.player.health < 0) {
                console.log('enemy wins')
            } else {
                console.log('enemy game continues')
                this.playerTurn = true;
            }
        }.bind(this), 2000);
    }

    calculatHealthPercentage(player) {
        return( (player.health / this.totalHealth) * 100);
    }

}
