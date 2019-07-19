class Fight {
    constructor(game, player, enemyArray, canvas, pet) {
        this.game = game;
        this.player = player;
        this.enemyArray = enemyArray;
        this.pet = pet || null;

        this.backgroundImage = document.getElementById("bg_fight");
        this.healthBarOuter = document.getElementById("healthBarOuter");
        this.healthBarInner = document.getElementById("healthBarInner");
        this.actionBar = document.getElementById("actionBar");
        this.dagger = document.getElementById('dagger');
        this.defeat = document.getElementById('defeat');
        this.victory = document.getElementById('victory');
        this.title_bar = document.getElementById('title-bar');
        this.naruto_stat = document.getElementById('naruto-stat');
        this.sakura_stat = document.getElementById('sakura-stat');
        this.sasuke_stat = document.getElementById('sasuke-stat');
        this.chakra_stat = document.getElementById('chakra-stat');
        this.chakra_charge = document.getElementById('chakra-charge');

        this.attackImageSize = 40;
        this.canvas = canvas;
        this.playerSpeed = this.player.speed;
        this.selectedEnemy = 0;

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

        this.selectJutsuenabled = false;

        this.jutsuCoordinates = [
            {
                x: 300,
                y: 325
        }, {
                x: 375,
                y: 325
        }, {
                x: 450,
                y: 325
        }, {
                x: 525,
                y: 325
        }, {
                x: 600,
                y: 325
        },
            {
                x: 675,
                y: 325
        }

        ];

        this.statBarArray = [
            this.sasuke_stat,
            this.naruto_stat,
            this.sakura_stat
        ]

        this.jutsuOpacity = [];

        for (let i = 0; i < this.player.jutsu.length; i++) {
            this.jutsuOpacity.push(1);
        }

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

        this.enemyCoordinates = [
            {
                x: 650,
                y: 140
            },

            {
                x: 800,
                y: 140
            }
        ];

        this.playerOpacity = 1;


        this.totalHealth = 100;
        this.jutsuIndex = 0;

        canvas.onclick = event => this.selectJutsu(event);

        document.onclick = event => this.selectEnemy(event);

        this.playerImageIndex = 0;

        this.clicked = false;

        this.selectJutsuenabled = false;

        this.startFrame = true;

        this.playerDefeat = false;

        this.playerVictory = false;

        this.playerTitleBar = false;

        this.renderPlayerAttacks = false;

        this.count = 0;


    }


    draw(ctx, gameEngine, gameLoop) {
        console.log(this.player.chakra+'please')

        if (this.cancelFrame === false) {
            this.drawFightBackground(ctx);
            this.player.draw(ctx, this.playerImageIndex, 100, this.playerOpacity);

            ctx.drawImage(
                this.dagger,
                this.enemyDaggerPosition[this.selectedEnemy].x,
                this.enemyDaggerPosition[this.selectedEnemy].y
            );

            for (let i = 0; i < this.enemyArray.length; i++) {
                this.enemyArray[i].draw(ctx, this.enemyImageIndexArray[i], 100, this.enemyOpacityArray[i]);
                this.drawEnemyHealthBar(ctx);
            }

            this.drawPlayerHealthBar(ctx);

            if (this.renderPlayerAttacks === true) {
                this.drawPlayerAttacks(ctx);
            }
            this.drawActionBar(ctx, gameEngine);

            this.drawPlayerStatBar(ctx);
        }


        if (this.cancelFrame === true && this.playerDefeat === true) {
            this.drawFightBackground(ctx);
            ctx.drawImage(this.defeat, 300, 100, 500, 300);

        }

        if (this.cancelFrame === true && this.playerVictory === true) {
            this.drawFightBackground(ctx);
            ctx.drawImage(this.victory, 300, 100, 500, 300);
        }

        if (this.playerTitleBar === true) {
            ctx.drawImage(this.title_bar, 0, 20, 1000, 64);
            ctx.font = "30px Arial";
            ctx.fillText(this.player.jutsu[this.jutsuIndex].name, 500, 60);
        }
    }

    drawPlayerStatBar(ctx) {
        let statHealthWidth = (this.HealthWidth * 187) / 100;

        if (statHealthWidth < 0) {
            statHealthWidth = 0;
        }

        let chakraWidth = this.calculateChakraPercentage(this.player);

        let chakraStat = (chakraWidth * 187) / 100;

        ctx.drawImage(this.statBarArray[this.game.ninjaIndex], 0, 0, 300, 70);
        ctx.drawImage(
            this.healthBarInner,
            100,
            26,
            statHealthWidth,
            12
        )

        ctx.drawImage(
            this.chakra_stat,
            100,
            40,
            chakraStat,
            12
        )
    }

    drawPlayerHealthBar(ctx) {
        this.HealthWidth = this.calculatHealthPercentage(this.player);

        if (this.HealthWidth < 0) {
            this.HealthWidth = 0;
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
            this.HealthWidth,
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
            this.renderPlayerAttacks = true;

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

        for (let i = 0; i < this.player.jutsu.length; i++) {
            if (this.player.jutsu[i].chakraLoss > this.player.chakra) {
                //pass
                this.jutsuOpacity[i] = 0.4;
            }else{
                this.jutsuOpacity[i] = 1;
            }
            ctx.save();
            ctx.globalAlpha = this.jutsuOpacity[i];
            ctx.drawImage(
                this.player.jutsu[i].image,
                this.jutsuCoordinates[i].x, this.jutsuCoordinates[i].y, 50, 50
            );
            ctx.restore();
        }
        ctx.drawImage(this.chakra_charge, 800, 0);

    }



    selectJutsu(event) {
        if (this.selectJutsuenabled === true) {
            let rect = this.canvas.getBoundingClientRect();
            let clickX = event.clientX - rect.left;
            let clickY = event.clientY - rect.top;



            for (let i = 0; i < this.player.jutsu.length; i++) {
                if (this.player.jutsu[i].chakraLoss > this.player.chakra) {
                    //pass
                    // this.jutsuOpacity[i] = 0.4;
                } else {
                    if (isSelected(clickX, clickY, this.jutsuCoordinates[i], 50, 50) && this.clicked === false) {
                        this.clicked = true;
                        this.renderPlayerAttacks = false;
                        this.jutsuIndex = i;
                        this.playerImageIndex = this.jutsuIndex + 1;
                        this.playerAttack();
                    } else if (isSelected(clickX, clickY, {
                            x: 800,
                            y: 0
                        }, 63, 54) && this.clicked === false) {
                        this.clicked = true;
                        this.renderPlayerAttacks = false;

                        this.player.chakra += 40;
                        if (this.player.chakra > 100) {
                            this.player.chakra = 100;

                        }

                        setTimeout(function () {

                            for (let i = 0; i < this.enemyArray.length; i++) {
                                this.enemyArray[i].speed = this.enemySpeedArray[i];
                            }
                            this.actionBarPlayerCoordinates.x = 200;

                            console.log(this.player.chakra + 'chakra');
                            this.clicked = false;
                            this.selectJutsuenabled = false;
                        }.bind(this), 500);

                    }
                }


            }
        }

    }

    selectEnemy(event) {
        let rect = this.canvas.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;

        for (let i = 0; i < this.enemyCoordinates.length; i++) {
            if (isSelected(clickX, clickY, this.enemyCoordinates[i], 100, 100)) {
                this.selectedEnemy = i;
            }
        }

    }


    playerAttack() {
        let dodge = getRandomInt(0, 2);
        this.playerTitleBar = true;

        // if (dodge < this.player.jutsu[this.jutsuIndex].accuracy) {
        let damage = computeDamage(this.player, this.enemyArray[this.selectedEnemy], this.jutsuIndex);
        this.enemyArray[this.selectedEnemy].health -= damage;
        this.enemyImageIndexArray[this.selectedEnemy] = this.enemyArray[this.selectedEnemy].imageArray.length - 1;

        this.player.chakra -= this.player.jutsu[this.jutsuIndex].chakraLoss;

        //console.log('enemy health' + this.enemyArray[0].health)
        setTimeout(function () {
            this.playerTitleBar = false;
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
                    this.enemyCoordinates.splice(k, 1);
                    this.enemyDaggerPosition.splice(k, 1);

                }
            }
            if (this.enemyArray.length === 0) {
                this.cancelFrame = true;
                this.playerVictory = true;
            } else {

                for (let i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].speed = this.enemySpeedArray[i];

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
        this.player.health -= damage;
        this.calculatHealthPercentage(this.player);
        this.enemyAttackTimeArray[i] = false;
        setTimeout(function () {
            //this.playerOpacity = 1;
            this.playerImageIndex = 0;
            this.enemyImageIndexArray[i] = 0;
            if (this.player.health <= 0) {
                this.playerImageIndex = 3;
                this.cancelFrame = true;
                this.playerDefeat = true;

            } else {
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

    calculateChakraPercentage(player) {
        let totalChakra = 100;
        return ((player.chakra / totalChakra) * 100);
    }

}
