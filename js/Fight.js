class Fight {
    constructor(game, player, enemyArray, canvas, pet) {
        this.game = game;
        this.player = player;
        this.enemyArray = enemyArray;
        this.pet = pet;
        //console.log(this.pet)
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
        if (this.pet != undefined) {
            this.petSpeed = this.pet.speed;

        }
        this.selectedEnemy = 0;

        this.enemySpeedArray = [];
        this.enemyAttackTimeArray = [];
        this.enemyImageIndexArray = [];
        this.enemyOpacityArray = [];
        this.displayHoverItem = [];
        this.enemyDodged = [];

        this.cancelFrame = false;
        //keep in enemy class
        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemySpeedArray.push(this.enemyArray[i].speed);
            this.enemyAttackTimeArray.push(true);
            this.enemyImageIndexArray.push(0);
            this.displayHoverItem.push(false);
            this.enemyDodged.push(false);
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

        // this.canvas.addEventListener("mousemove", //this.displayDetails.bind(this), false)

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

        this.enemyDaggerFixedPosition = [{
                top: 60,
                bottom: 90
        },
            {
                top: 120,
                bottom: 150
             }
            ];

        this.actionBarPlayerCoordinates = {
            x: 200,
            y: 380
        };

        this.actionBarPetCoordinates = {
            x: 200,
            y: 400
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

        this.petImageIndex = 0;
        this.totalHealth = 100;
        this.jutsuIndex = 0;

        canvas.onclick = event => this.selectJutsu(event);
        // canvas.onmouseover = event => this.displayDetails(event);


        document.onclick = event => this.selectEnemy(event);

        this.playerImageIndex = 0;

        this.clicked = false;

        this.selectJutsuenabled = false;

        this.startFrame = true;

        this.playerDefeat = false;

        this.playerVictory = false;

        this.playerTitleBar = false;

        this.renderPlayerAttacks = false;

        this.dodged = false;

        this.count = 0;

        this.speed = 1;
        
        this.petAttackTime = true;

        this.originalJutsuArray = this.player.jutsu;
        for (let j = 0; j < this.originalJutsuArray.length; j++) {
            console.log(this.originalJutsuArray[j].selected + 'constructor oa');

        }
        this.player.jutsu = this.player.jutsu.filter(attack => attack.selected === true);

        for (let i = 0; i < this.player.jutsu.length; i++) {
            console.log(this.player.jutsu[i] + 'constructor jutsu');

        }

        for (let j = 0; j < this.originalJutsuArray.length; j++) {
            console.log(this.originalJutsuArray[j].selected + 'constructor oa');

        }

    }

    drawDagger(ctx) {
        ctx.drawImage(
            this.dagger,
            this.enemyDaggerPosition[this.selectedEnemy].x,
            this.enemyDaggerPosition[this.selectedEnemy].y
        );
    }


    updateDagger() {


        this.enemyDaggerPosition[this.selectedEnemy].y += this.speed;
        if (this.enemyDaggerPosition[this.selectedEnemy].y <= this.enemyDaggerFixedPosition[this.selectedEnemy].top || this.enemyDaggerPosition[this.selectedEnemy].y >= this.enemyDaggerFixedPosition[this.selectedEnemy].bottom) {
            this.speed = -this.speed;
        }
    }

    draw(ctx, gameEngine, gameLoop) {
        if (this.cancelFrame === false) {
            this.drawFightBackground(ctx);
            this.player.draw(ctx, this.playerImageIndex, 100);

            this.drawDagger(ctx);
            this.updateDagger();
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

            this.drawAttackHoverInfo(ctx);


            if (this.pet != undefined) {
                this.pet.draw(ctx, this.petImageIndex, 100);
            }


            if (this.dodged === true) {
                ctx.font = "30px Arial";
                ctx.fillText('dodged', 120, 60);
            }

            for (let i = 0; i < this.enemyDodged.length; i++) {
                if (this.enemyDodged[i] === true) {
                    ctx.font = "30px Arial";
                    ctx.fillText('dodged', 700, 100);
                }
            }

            this.player.drawGold(ctx);


        }


        if (this.cancelFrame === true && this.playerDefeat === true) {
            this.drawFightBackground(ctx);
            ctx.drawImage(this.defeat, 300, 100, 500, 300);

        }

        if (this.cancelFrame === true && this.playerVictory === true) {
            this.drawFightBackground(ctx);
            ctx.drawImage(this.victory, 300, 100, 500, 300);
            setTimeout(function () {
                this.game.gameState = GAME_STATE.VILLAGE_STATE;
            }.bind(this), 2000);
        }

        if (this.playerTitleBar === true) {
            ctx.drawImage(this.title_bar, 0, 20, 1000, 64);
            ctx.font = "30px Arial";
            ctx.fillText(this.player.jutsu[this.jutsuIndex].name, 500, 60);
        }
        /*
                if (this.displayHoverItem === true) {
                    ctx.font = "30px Arial";
                    ctx.fillText("Hello World", 10, 50);
                }*/

    }


    drawAttackHoverInfo(ctx) {
        for (let i = 0; i < this.player.jutsu.length; i++) {
            if (this.displayHoverItem[i] === true) {
                ctx.font = "30px Arial";
                ctx.fillText(this.player.jutsu[i].name, this.jutsuCoordinates[i].x, this.jutsuCoordinates[i].y);
            }
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

        if (this.pet != undefined) {
            this.pet.drawActionBarPet(ctx, 0, 50, this.actionBarPetCoordinates.x, this.actionBarPetCoordinates.y);

            this.actionBarPetCoordinates.x += this.pet.speed;

            if (this.actionBarPetCoordinates.x >= 800) {
                this.actionBarPetCoordinates.x = 800;
                this.player.speed = 0;
                for (let i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].speed = 0;
                }
                if (this.petAttackTime === true) {
                        this.petAttack();
                    }

            }

        }

        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemyArray[i].drawActionBarNinja(ctx, 0, 50, this.actionBarEnemyCoordinates[i].x, this.actionBarEnemyCoordinates[i].y);
            this.actionBarEnemyCoordinates[i].x += this.enemyArray[i].speed;

            if (this.actionBarEnemyCoordinates[i].x >= 800) {
                this.actionBarEnemyCoordinates[i].x = 800;
                this.player.speed = 0;
                if (this.pet != undefined) {
                    this.pet.speed = 0;

                }
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
            if (this.pet != undefined) {
                this.pet.speed = 0;
            }
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
            if (this.player.jutsu[i].chakraLoss > this.player.chakra ||
                this.player.jutsu[i].count != 0
            ) {
                //pass
                this.jutsuOpacity[i] = 0.4;
            } else {
                this.jutsuOpacity[i] = 1;
            }
            ctx.save();
            ctx.globalAlpha = this.jutsuOpacity[i];
            ctx.drawImage(
                this.player.jutsu[i].image,
                this.jutsuCoordinates[i].x, this.jutsuCoordinates[i].y, 50, 50
            );
            ctx.restore();

            if (this.player.jutsu[i].count != 0) {
                ctx.font = "15px Arial";
                ctx.fillText(this.player.jutsu[i].count, this.jutsuCoordinates[i].x + 40, this.jutsuCoordinates[i].y + 45);
            }

        }
        ctx.drawImage(this.chakra_charge, 800, 0);

    }


    displayDetails(event) {

        if (this.selectJutsuenabled === true) {
            let clickCoordinates = getMouseCoordinates(this.canvas, event);

            for (let i = 0; i < this.player.jutsu.length; i++) {
                // console.log(this.jutsuCoordinates)

                if (isSelected(clickCoordinates.x, clickCoordinates.y, this.jutsuCoordinates[i], 50, 50)) {

                    this.displayHoverItem[i] = true;
                }

                if (!isSelected(clickCoordinates.x, clickCoordinates.y, this.jutsuCoordinates[i], 50, 50)) {
                    this.displayHoverItem[i] = false;
                }
            }
        }
    }

    selectJutsu(event) {
        if (this.selectJutsuenabled === true) {


            for (let i = 0; i < this.displayHoverItem.length; i++) {
                this.displayHoverItem[i] = false;
            }
            let clickCoordinates = getMouseCoordinates(this.canvas, event);


            for (let i = 0; i < this.player.jutsu.length; i++) {

                if (isSelected(clickCoordinates.x, clickCoordinates.y, this.jutsuCoordinates[i], 50, 50) && this.clicked === false && this.player.jutsu[i].count === 0) {
                    if (this.player.jutsu[i].chakraLoss <= this.player.chakra) {

                        this.player.jutsu[i].count = 4;

                        for (let j = 0; j < this.player.jutsu.length; j++) {
                            if (i != j) {
                                if (this.player.jutsu[j].count != 0) {
                                    this.player.jutsu[j].count--;
                                }
                            }

                        }

                        this.clicked = true;
                        this.renderPlayerAttacks = false;
                        this.jutsuIndex = i;
                        this.playerImageIndex = this.jutsuIndex + 1;
                        this.playerAttack();
                    }
                } else if (isSelected(clickCoordinates.x, clickCoordinates.y, {
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



    selectEnemy(event) {

        let clickCoordinates = getMouseCoordinates(this.canvas, event);
        for (let i = 0; i < this.enemyCoordinates.length; i++) {
            if (isSelected(clickCoordinates.x, clickCoordinates.y, this.enemyCoordinates[i], 100, 100)) {
                this.selectedEnemy = i;
            }
        }

    }


    playerAttack() {
        this.playerTitleBar = true;

        let dodge = getRandomInt(0, 2);

        if (dodge < this.player.jutsu[this.jutsuIndex].accuracy) {
            // if (dodge < this.enemy.jutsu[].accuracy) {
            let damage = computeDamage(this.player, this.enemyArray[this.selectedEnemy], this.jutsuIndex);
            this.enemyArray[this.selectedEnemy].health -= damage;
        } else {
            console.log('enemy dodged');
            this.enemyDodged[this.selectedEnemy] = true;
            console.log(this.enemyDodged)
            //this.dodged = true;

            setTimeout(function () {
                this.enemyDodged[this.selectedEnemy] = false;
            }.bind(this), 1000)

        }
        this.enemyImageIndexArray[this.selectedEnemy] = this.enemyArray[this.selectedEnemy].imageArray.length - 1;

        this.player.chakra -= this.player.jutsu[this.jutsuIndex].chakraLoss;

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
                this.player.gold += 200;
                this.player.jutsu = this.originalJutsuArray;

                console.log(this.player.gold);
            } else {

                for (let i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].speed = this.enemySpeedArray[i];

                }
                if (this.pet != undefined) {
                    this.pet.speed = this.petSpeed;

                }
                this.actionBarPlayerCoordinates.x = 200;
            }
            this.clicked = false;
            this.selectJutsuenabled = false;
        }.bind(this), 500);
    }

    petAttack() {
        this.petImageIndex = 1;
        let damage = (this.pet.power / this.enemyArray[0].defense) * this.pet.accuracy;
        this.enemyArray[0].health -= damage;
        this.enemyImageIndexArray[0] = this.enemyArray[0].imageArray.length - 1;
        this.petAttackTime = false;
        setTimeout(function () {
            this.petImageIndex = 0;
            this.enemyImageIndexArray[0] = 0;
           // this.playerImageIndex = 0;
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
                this.player.gold += 200;
                this.player.jutsu = this.originalJutsuArray;

                console.log(this.player.gold);
            } else {

                for (let i = 0; i < this.enemyArray.length; i++) {
                    this.enemyArray[i].speed = this.enemySpeedArray[i];

                }
                    this.player.speed = this.playerSpeed;

            
                this.actionBarPetCoordinates.x = 200;
            }
            this.petAttackTime = true;
           
        }.bind(this), 500);

    }
    enemyAttack(i) {
        //this.playerOpacity = 0.4;
        this.playerImageIndex = this.player.imageArray.length - 1;

        let jutsuIndexEnemy = getRandomInt(0, 2);


        this.enemyImageIndexArray[i] = jutsuIndexEnemy + 1;

        let dodge = getRandomInt(0, 2);
        if (dodge < this.enemyArray[i].jutsu[jutsuIndexEnemy].accuracy) {
            let damage = computeDamage(this.enemyArray[i], this.player, jutsuIndexEnemy);
            this.player.health -= damage;
        } else {
            console.log('player dodged');
            this.dodged = true;
            setTimeout(function () {
                this.dodged = false;
            }.bind(this), 1000)
        }

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
                this.player.jutsu = this.originalJutsuArray;


            } else {
                this.actionBarEnemyCoordinates[i].x = 200;
                this.player.speed = this.playerSpeed;
                if (this.pet != undefined) {
                    this.pet.speed = this.petSpeed;

                }
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
