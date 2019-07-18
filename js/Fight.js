class Fight {
    constructor(game, player, enemyArray, canvas, pet) {
        this.game = game;
        this.player = player;
        this.enemyArray = enemyArray;
        this.pet = pet || null;
        //  console.log(this.pet)
        this.backgroundImage = document.getElementById("bg_fight");
        this.attackImage = document.getElementById("rasengan");
        this.healthBarOuter = document.getElementById("healthBarOuter");
        this.healthBarInner = document.getElementById("healthBarInner");
        this.actionBar = document.getElementById("actionBar");
        this.dagger = document.getElementById('dagger');
        this.defeat = document.getElementById('defeat');
        this.victory = document.getElementById('victory');
        this.attackImageSize = 50;
        this.canvas = canvas;
        this.playerSpeed = this.player.speed;
        this.selectedEnemy = 0;

        //this.enemySpeed = this.enemy.speed;  
        this.enemySpeedArray = [];
        this.enemyAttackTimeArray = [];
        this.enemyImageIndexArray = [];
        this.enemyOpacityArray = [];

        this.cancelFrame = false;

        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemySpeedArray.push(this.enemyArray[i].speed);
            this.enemyAttackTimeArray.push(true);
            this.enemyImageIndexArray.push(0);
            //this.enemyOpacityArray.push(1);
        };

        // this.enemyAttackTime = true;
        //this.enemy2AttackTime = true;

        this.selectJutsuenabled = false;

        this.jutsu1Coordinates = {
            x: 200,
            y: 450
        };

        this.jutsu2Coordinates = {
            x: 350,
            y: 450
        };

        this.healthBarCoordinates = {
            x: 150,
            y: 300
        };

        this.enemyHealthBarCoordinates = [
            {
                x: 650,
                y: 250
            },
            {
                x: 800,
                y: 300
            }
        ];

        this.enemyDaggerPosition = [
            {
                x: 700,
                y: 70
            },
            {
                x: 840,
                y: 130
            }
        ];
        this.actionBarPlayerCoordinates = {
            x: 200,
            y: 380
        }

        this.actionBarEnemyCoordinates = [
            {
                x: 200,
                y: 380
        }, {
                x: 200,
                y: 380
        }
        ];

        this.playerOpacity = 1;


        this.totalHealth = 100;
        this.jutsuIndex = 0;

        canvas.onclick = event => this.selectJutsu(event);

        document.onclick = event => this.selectEnemy(event);

        this.playerImageIndex = 0;
        // this.enemyImageIndex = 0;

        this.clicked = false;

        this.selectJutsuenabled = false;

        this.startFrame = true;
        
        this.playerDefeat = false;
        
        this.playerVictory = false;

    }


    draw(ctx, gameEngine, gameLoop) {

        if (this.cancelFrame === false) {
            this.drawFightBackground(ctx);
            this.player.draw(ctx, this.playerImageIndex, 100, this.playerOpacity);
            ctx.drawImage(
                this.dagger,
                this.enemyDaggerPosition[this.selectedEnemy].x,
                this.enemyDaggerPosition[this.selectedEnemy].y
            );
            //this.enemy.draw(ctx, this.enemyImageIndex, 100);

            for (let i = 0; i < this.enemyArray.length; i++) {
                this.enemyArray[i].draw(ctx, this.enemyImageIndexArray[i], 100, this.enemyOpacityArray[i]);
                this.drawEnemyHealthBar(ctx);
            }

            this.drawPlayerHealthBar(ctx);
            //this.pet.draw(ctx);

            //  this.drawEnemyHealthBar(ctx);
            //   if (this.playerTurn === true) {
            this.renderPlayerTurn(ctx);
            // }
            this.drawActionBar(ctx, gameEngine);
        }


        if (this.cancelFrame === true && this.playerDefeat === true) {
            this.drawFightBackground(ctx);
            ctx.drawImage(this.defeat, 300, 100, 500, 300);

        }

                if (this.cancelFrame === true && this.playerVictory === true) {
            this.drawFightBackground(ctx);
            ctx.drawImage(this.victory, 300, 100, 500, 300);

        }
    }

    drawPlayerHealthBar(ctx) {
        let Healthwidth = this.calculatHealthPercentage(this.player);
        if (Healthwidth < 0) {
            Healthwidth = 0;
        }
        ctx.drawImage(
            this.healthBarOuter,
            this.healthBarCoordinates.x,
            this.healthBarCoordinates.y,
            100 + 6,
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

    drawActionBar(ctx) {
        ctx.drawImage(this.actionBar, 200, 400);

        this.player.drawActionBarNinja(ctx, 0, 50, this.actionBarPlayerCoordinates.x, this.actionBarPlayerCoordinates.y);

        if (!this.selectJutsuenabled) {
            this.actionBarPlayerCoordinates.x += this.player.speed;
        }


        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemyArray[i].drawActionBarNinja(ctx, 0, 50, this.actionBarEnemyCoordinates[i].x, this.actionBarEnemyCoordinates[i].y);
            this.actionBarEnemyCoordinates[i].x += this.enemyArray[i].speed;

            if (this.actionBarEnemyCoordinates[i].x >= 800) {
                this.actionBarEnemyCoordinates[i].x = 800;
                this.player.speed = 0;
                if (this.enemyArray.length === 1) {
                    if (this.enemyAttackTimeArray[i] === true) {
                        this.enemyAttack(i);
                    }
                } else {
                    for (let j = 0; j < this.enemyArray.length; j++) {
                        if (i != j) {
                            this.enemyArray[j].speed = 0;
                            if (this.enemyAttackTimeArray[i] === true) {
                                this.enemyAttack(i);
                            }
                        }
                    }
                }

            }
        }


        if (this.actionBarPlayerCoordinates.x >= 800 && this.clicked === false) {
            this.actionBarPlayerCoordinates.x = 800;
            this.selectJutsuenabled = true;
            for (let i = 0; i < this.enemyArray.length; i++) {
                this.enemyArray[i].speed = 0;
            }
        }

    }

    drawEnemyHealthBar(ctx) {
        var Healthwidth = [];
        for (let i = 0; i < this.enemyArray.length; i++) {
            Healthwidth[i] = this.calculatHealthPercentage(this.enemyArray[i]);

            if (Healthwidth[i] < 0) {
                Healthwidth[i] = 0;
            }
            ctx.drawImage(
                this.healthBarOuter,
                this.enemyHealthBarCoordinates[i].x,
                this.enemyHealthBarCoordinates[i].y,
                100 + 6,
                10
            )

            ctx.drawImage(
                this.healthBarInner,
                this.enemyHealthBarCoordinates[i].x + 3,
                this.enemyHealthBarCoordinates[i].y + 1,
                Healthwidth[i],
                6
            )
        }
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
        if (this.selectJutsuenabled === true) {
            let rect = this.canvas.getBoundingClientRect();
            let clickX = event.clientX - rect.left;
            let clickY = event.clientY - rect.top;

            if (this.isSelected(clickX, clickY, this.jutsu1Coordinates, this.attackImageSize) && this.clicked === false) {
                this.clicked = true;
                console.log('i am 1')
                this.jutsuIndex = 0;
                this.playerImageIndex = this.jutsuIndex + 1;
                this.playerAttack();

            } else if (this.isSelected(clickX, clickY, this.jutsu2Coordinates, this.attackImageSize) && this.clicked === false) {
                this.clicked = true;
                console.log('i am 2')
                this.jutsuIndex = 1;
                this.playerImageIndex = this.jutsuIndex + 1;
                this.playerAttack();
            }
        }

    }

    selectEnemy(event) {
        let rect = this.canvas.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;

        if (this.isSelected(clickX, clickY, {
                x: 650,
                y: 140
            }, 100)) {

            this.selectedEnemy = 0;
        }

        if (this.isSelected(clickX, clickY, {
                x: 800,
                y: 140
            }, 100)) {

            this.selectedEnemy = 1;
        }
        console.log(this.selectedEnemy)

    }

    isSelected(clickX, clickY, jutsuCoordinates, size) {
        if (
            clickX >= jutsuCoordinates.x &&
            clickX <= jutsuCoordinates.x + size &&
            clickY >= jutsuCoordinates.y &&
            clickY <= jutsuCoordinates.y + size
        ) {
            return true;
        }
    }


    playerAttack() {
        console.log('I am player Attack')
        let dodge = getRandomInt(0, 2);
        console.log(this.selectedEnemy)
        console.log(this.enemyArray[this.selectedEnemy])
        // if (dodge < this.player.jutsu[this.jutsuIndex].accuracy) {
        let damage = computeDamage(this.player, this.enemyArray[this.selectedEnemy], this.jutsuIndex);
        this.enemyArray[this.selectedEnemy].health -= damage;
        this.enemyImageIndexArray[this.selectedEnemy] = this.enemyArray[this.selectedEnemy].imageArray.length - 1;

        //console.log('enemy health' + this.enemyArray[0].health)
        setTimeout(function () {
            this.enemyImageIndexArray[this.selectedEnemy] = 0;
            this.playerImageIndex = 0;

            for (let k = 0; k < this.enemyArray.length; k++) {
                if (this.enemyArray[k].health <= 0) {
                    this.enemyArray.splice(k, 1);
                    this.enemySpeedArray.splice(k, 1);
                    this.enemyAttackTimeArray.splice(k, 1);
                    this.enemyImageIndexArray.splice(k, 1);
                    this.enemyHealthBarCoordinates.splice(k, 1);
                    this.actionBarEnemyCoordinates.splice(k, 1);
                }
            }
            console.log(this.enemyArray)
            if (this.enemyArray.length === 0) {
                console.log('we win');
                this.cancelFrame = true;
                this.playerVictory = true;
            } else {
                console.log('player game continues')

                for (let i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].speed = this.enemySpeedArray[i];
                    console.log(this.enemyArray[i])
                    console.log(this.enemySpeedArray[i])
                }
                this.actionBarPlayerCoordinates.x = 200;
            }
            this.clicked = false;
            this.selectJutsuenabled = false;
        }.bind(this), 500);
    }

    enemyAttack(i) {
        //this.playerOpacity = 0.4;
        this.playerImageIndex = this.player.imageArray.length - 1;
        let jutsuIndexEnemy = getRandomInt(0, 2);
        this.enemyImageIndexArray[i] = jutsuIndexEnemy + 1;
        let damage = computeDamage(this.enemyArray[i], this.player, jutsuIndexEnemy);
        console.log(damage + 'damage');
        this.player.health -= damage;
        this.calculatHealthPercentage(this.player);
        console.log('player health' + this.player.health)
        this.enemyAttackTimeArray[i] = false;
        setTimeout(function () {
            //this.playerOpacity = 1;
            this.playerImageIndex = 0;
            this.enemyImageIndexArray[i] = 0;
            console.log(this.player.imageArray.length - 2)
            if (this.player.health <= 0) {
                this.playerImageIndex = 3;
                console.log('enemy wins');
                this.cancelFrame = true;
                this.playerDefeat = true;

            } else {
                console.log('enemy game continues')
                this.actionBarEnemyCoordinates[i].x = 200;
                this.player.speed = this.playerSpeed;

                for (let k = 0; k < this.enemyArray.length; k++) {
                    this.enemyArray[k].speed = this.enemySpeedArray[k];
                }
            }
            this.enemyAttackTimeArray[i] = true;
        }.bind(this), 500);

    }

    calculatHealthPercentage(player) {
        return ((player.health / this.totalHealth) * 100);
    }

}
