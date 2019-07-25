  class Transition {
      constructor(game, canvas, audioLoader, imageLoader) {
          this.game = game;
          this.canvas = canvas;
          this.audioLoader = audioLoader;
          this.imageLoader = imageLoader;
          this.victoryImage = this.imageLoader.images.victory;
          this.defeatImage = this.imageLoader.images.defeat;

          this.opacity = 1;
          this.checkMarkCoordinates = {
              x: 626,
              y: 426,
              width: 54,
              height: 55
          }
      }
      drawVictory(ctx) {
          ctx.fillStyle = "#cc9e71";
          ctx.fillRect(0, 0, 1000, 700);
          ctx.drawImage(this.victoryImage, 300, 100);

          ctx.font = "bold 35px Arial";
          ctx.fillStyle = "#fdd124";
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 1;
          ctx.fillText(this.game.player.gold, 580, 270);
          ctx.strokeText(this.game.player.gold, 580, 270);


          ctx.font = "bold 30px Arial ";
          ctx.fillStyle = "#3ee041";
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 1;
          ctx.fillText("Level", 450, 330);
          ctx.strokeText("Level", 450, 330);

          ctx.font = "bold 35px Arial ";
          ctx.fillStyle = "#3ee041";
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 1;
          ctx.fillText(this.game.player.level, 580, 330);
          ctx.strokeText(this.game.player.level, 580, 330);
      }

      goToVillage(event) {
          let clickCoordinates = getMouseCoordinates(this.canvas, event);


          if (isSelected(clickCoordinates.x, clickCoordinates.y, this.checkMarkCoordinates, this.checkMarkCoordinates.width, this.checkMarkCoordinates.height)) {
              this.game.gameState = GAME_STATE.VILLAGE_STATE;
          }

      }

      drawDefeat(ctx) {
          ctx.fillStyle = "#cc9e71";
          ctx.fillRect(0, 0, 1000, 700);
          ctx.drawImage(this.defeatImage, 300, 100);


          ctx.font = "bold 35px Arial";
          ctx.fillStyle = "#fdd124";
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 1;
          ctx.fillText(0, 580, 270);
          ctx.strokeText(0, 580, 270);
      }


      goToMenu(event) {
          let clickCoordinates = getMouseCoordinates(this.canvas, event);


          if (isSelected(clickCoordinates.x, clickCoordinates.y, this.checkMarkCoordinates, this.checkMarkCoordinates.width, this.checkMarkCoordinates.height)) {
              this.game.ninjaArray = [0, 1, 2];
              this.game.ninjaArray.splice(this.game.ninjaIndex, 1);
              this.game.gameState = GAME_STATE.VILLAGE_STATE;
          }

      }

      drawIntro(ctx) {
          ctx.drawImage(this.imageLoader.images.ninjaSagaIcon, 360, 100, 290, 213);
          ctx.drawImage(this.imageLoader.images.kurenai, 400, 300, 200, 200);
          ctx.drawImage(this.imageLoader.images.kurenaiM, 400, 300, 200, 200);
          
      }

  }
