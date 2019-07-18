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
        this.attackImageSize = 50;
        this.canvas = canvas;
        this.playerSpeed = this.player.speed;
        this.selectedEnemy = 0;

        //this.enemySpeed = this.enemy.speed;  
        this.enemySpeedArray = [];
        this.enemyAttackTimeArray = [];
        this.enemyImageIndexArray = [];
        this.enemyOpacityArray = [];

        for (let i = 0; i < this.enemyArray.length; i++) {
            this.enemySpeedArray.push(this.enemyArray[i].speed);
            this.enemyAttackTimeArray.push(true);
            this.enemyImageIndexArray.push(0);
            this.enemyOpacityArray.push(1);
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

        /* this.actionBarEnemy1Coordinates = {
             x: 200,
             y: 380
         };

         this.actionBarEnemy2Coordinates = {
             x: 200,
             y: 380
         };*/

        this.totalHealth = 100;
        this.jutsuIndex = 0;

        canvas.onclick = event => this.selectJutsu(event);

        document.onclick = event => this.selectEnemy(event);

        this.playerImageIndex = 0;
        // this.enemyImageIndex = 0;

        this.clicked = false;

        this.selectJutsuenabled = false;

    }


    draw(ctx) {
        this.drawFightBackground(ctx);
        this.player.draw(ctx, this.playerImageIndex, 100, this.playerOpacity);
        ctx.drawImage(
        this.dagger,
            this.enemyDaggerPosition[this.selectedEnemy].x,
            this.enemyDaggerPosition[this.selectedEnemy].y
        )
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
        this.drawActionBar(ctx);
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


        //this.enemyArray[0].drawActionBarNinja(ctx, 0, 50, this.actionBarEnemy1Coordinates.x, this.actionBarEnemy1Coordinates.y);

        //this.actionBarEnemy1Coordinates.x += this.enemyArray[0].speed;

        //this.enemyArray[1].drawActionBarNinja(ctx, 0, 50, this.actionBarEnemy2Coordinates.x, this.actionBarEnemy2Coordinates.y);
        //this.actionBarEnemy2Coordinates.x += this.enemyArray[1].speed;


        if (this.actionBarPlayerCoordinates.x >= 800 && this.clicked === false) {
            this.actionBarPlayerCoordinates.x = 800;
            this.selectJutsuenabled = true;
            for (let i = 0; i < this.enemyArray.length; i++) {
                this.enemyArray[i].speed = 0;
            }
        }




        /*if (this.actionBarEnemy1Coordinates.x >= 800) {
            this.actionBarEnemy1Coordinates.x = 800;

            this.player.speed = 0;
            this.enemyArray[1].speed = 0;
            if (this.enemyAttackTime === true) {
                this.enemyAttack();
            }
        }


        if (this.actionBarEnemy2Coordinates.x >= 800) {
            this.actionBarEnemy2Coordinates.x = 800;
            this.player.speed = 0;
            this.enemyArray[0].speed = 0;
            if (this.enemy2AttackTime === true) {
                console.log(this.enemy2Attack())
                this.enemy2Attack();
            }
        } */
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
        /* else if (this.isSelected(clickX, clickY, this.game) && this.clicked === false) {
                        this.clicked = true;
                        console.log('i am 2')
                        this.jutsuIndex = 1;
                        this.playerImageIndex = this.jutsuIndex;
                        this.playerAttack();
                    }*/
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
        let i = 1;
        // if (dodge < this.player.jutsu[this.jutsuIndex].accuracy) {
        let damage = computeDamage(this.player, this.enemyArray[this.selectedEnemy], this.jutsuIndex);
        this.enemyArray[this.selectedEnemy].health -= damage;
        this.enemyImageIndexArray[this.selectedEnemy] = this.enemyArray[this.selectedEnemy].imageArray.length - 1;

        //   for(let i=0;i< 2; i++){
        //console.log(this.enemyArray)
        //     let damage = computeDamage(this.player, this.enemy, //this.jutsuIndex);
        //}

        //   } else {
        //     console.log('dodged');
        //    }
        console.log('enemy health' + this.enemyArray[0].health)
        setTimeout(function () {
            this.enemyImageIndexArray[this.selectedEnemy] = 0;
            this.playerImageIndex = 0;
            if (this.enemyArray[0].health < 0) {
                console.log('we win');
                this.enemyArray.shift();
            } else {
                console.log('player game continues')
                
                for(let i = 0; i< this.enemyArray.length; i++){
                    this.enemyArray[i].speed = this.enemySpeedArray[i];
                }
                this.actionBarPlayerCoordinates.x = 200;
            }
            this.clicked = false;
            this.selectJutsuenabled = false;
        }.bind(this), 2000);
    }

    enemyAttack(i) {
        //this.playerOpacity = 0.4;
        this.playerImageIndex = this.player.imageArray.length - 1;
        let jutsuIndexEnemy = getRandomInt(0, 2);
        this.enemyImageIndexArray[i] = jutsuIndexEnemy+1;
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
            if (this.player.health < 0) {
                console.log('enemy wins')
            } else {
                console.log('enemy game continues')
                this.actionBarEnemyCoordinates[i].x = 200;
                this.player.speed = this.playerSpeed;

                for (let k = 0; k < this.enemyArray.length; k++) {
                    this.enemyArray[k].speed = this.enemySpeedArray[k];
                }
            }
            this.enemyAttackTimeArray[i] = true;
        }.bind(this), 2000);

    }

    /*  enemyAttack() {
          //this.selectJutsuenabled=false;
          console.log('I am enemy Attack')

          let dodge = getRandomInt(0, 2);
          //if (dodge < this.player.jutsu[this.jutsuIndex].accuracy) {
          let jutsuIndexEnemy = getRandomInt(0, 2);
          let damage = computeDamage(this.enemyArray[0], this.player, jutsuIndexEnemy);
          console.log(damage + 'damage');
          this.player.health -= damage;
          //  }
          //      } else {
          //    console.log('dodged');

          this.calculatHealthPercentage(this.player);
          console.log('player health' + this.player.health)
          this.enemyAttackTime = false;
          setTimeout(function () {
              if (this.player.health < 0) {
                  console.log('enemy wins')
              } else {
                  console.log('enemy game continues')
                  this.actionBarEnemy1Coordinates.x = 200;
                  this.player.speed = this.playerSpeed;
                  this.enemyArray[1].speed = 1;
              }
              this.enemyAttackTime = true;
          }.bind(this), 2000);
      }*/



    calculatHealthPercentage(player) {
        return ((player.health / this.totalHealth) * 100);
    }

}
