Battle = function(playerObj, gameObj, preloader) {
  battleBackground = preloader.getImage('battleBackground');
  hpOpponent = preloader.getImage('hpOpponent');
  hpPlayer = preloader.getImage('hpPlayer');
  attackBackground = preloader.getImage('attackBackground');
  attackBtn = preloader.getImage('attackBtn');
  const battleBackgrd = {
    x: 270,
    y: 10,
    width: 712,
    height: 420
  };
  const catchButton = {
    x: 350,
    y: 490,
    width: 120,
    height: 34
  };
  const returnButton = {
    x: 485,
    y: 490,
    width: 120,
    height: 34
  };
  const buttonOne = {
    x: 660,
    y: 450,
    width: 120,
    height: 34
  };
  const buttonTwo = {
    x: 806,
    y: 450,
    width: 120,
    height: 34
  };
  const buttonThree = {
    x: 660,
    y: 490,
    width: 120,
    height: 34
  };
  const buttonFour = {
    x: 806,
    y: 490,
    width: 120,
    height: 34
  };
  const messageBox = {
    x: 270,
    y: 430,
    width: 712,
    height: 113
  };
  const attactFirstText = {
    x: 674,
    y: 470
  };

  const attackSecondText = {
    x: 820,
    y: 470
  };

  const attackThirdText = {
    x: 674,
    y: 512
  };

  const attackFourthText = {
    x: 820,
    y: 512
  };
  const messageText = {
    x: 350,
    y: 474
  };
  const playerBox = {
    x: 654,
    y: 310,
    width: 268,
    height: 83
  };
  const opponentBox = {
    x: 294,
    y: 150,
    width: 249,
    height: 83
  };
  var hpOpponentIndicator = {
    x: 398,
    y: 206,
    width: 100,
    height: 9
  };
  var hpPlayerIndicator = {
    x: 808,
    y: 354,
    width: playerObj.pokemon.hp,
    height: 7
  };
  const playerText = {
    x: 696,
    y: 338,
    levelx: 734
  };
  const opponentText = {
    x: 298,
    y: 178,
    levelx: 324
  };
  const totalHpWildPokemon = 100;
  const percentage = 100;
  const totalHpPokemon = playerObj.pokemon.hp;
  var isPlayerTurn = true;
  var isFinished = false;
  this.transitionToBattle = function() {
    var that = this;
    this.opacity = 0;
    const hold = setInterval(function() {
      that.opacity += 0.1;
      ctx.fillStyle = 'rgba(0,0,0,' + that.opacity + ')';
      ctx.fillRect(0, 0, width, height);
      if (that.opacity >= 1) {
        clearInterval(hold);
        ctx.clearRect(0, 0, width, height);
        that.createBattle();
      }
    }, 200);
  };

  drawImages = function() {
    ctx.drawImage(battleBackground, battleBackgrd.x, battleBackgrd.y, battleBackgrd.width, battleBackgrd.height);
    playerObj.pokemon.drawPokemon(114);
    playerObj.wildPokemon.drawPokemon(0);
    ctx.drawImage(hpPlayer, playerBox.x, playerBox.y, playerBox.width, playerBox.height);
    ctx.drawImage(hpOpponent, opponentBox.x, opponentBox.y, opponentBox.width, opponentBox.height);
    ctx.font = '13px Comic Sans MS';
    ctx.fillStyle = 'black';
    ctx.fillText('Opponent : ' + playerObj.wildPokemon.name, opponentText.x, opponentText.y);
    ctx.fillText('Player : ' + playerObj.pokemon.name, playerText.x, playerText.y);
    ctx.fillText(playerObj.wildPokemon.level, opponentBox.levelx, opponentBox.y);
    ctx.fillText(playerObj.pokemon.level, playerBox.levelx, playerBox.y);
    ctx.fillStyle = 'green';
    ctx.fillRect(hpPlayerIndicator.x, hpPlayerIndicator.y, hpPlayerIndicator.width, hpPlayerIndicator.height);
    ctx.fillRect(hpOpponentIndicator.x, hpOpponentIndicator.y, hpOpponentIndicator.width, hpOpponentIndicator.height);
  };

  this.createBattle = function() {
    drawImages();
    ctx.drawImage(attackBackground, messageBox.x, messageBox.y, messageBox.width, messageBox.height);
    ctx.drawImage(attackBtn, buttonOne.x, buttonOne.y, buttonOne.width, buttonOne.height);
    ctx.drawImage(attackBtn, buttonTwo.x, buttonTwo.y, buttonTwo.width, buttonTwo.height);
    ctx.drawImage(attackBtn, buttonThree.x, buttonThree.y, buttonThree.width, buttonThree.height);
    ctx.drawImage(attackBtn, buttonFour.x, buttonFour.y, buttonFour.width, buttonFour.height);
    ctx.fillStyle = 'black';
    ctx.font = '22px Comic Sans MS';
    ctx.fillText('What will ' + playerObj.pokemon.name + ' do ?', messageText.x, messageText.y);
    ctx.font = '15px Comic Sans MS';
    ctx.fillText(Object.keys(playerObj.pokemon.attacks)[0], attactFirstText.x, attactFirstText.y);
    ctx.fillText(Object.keys(playerObj.pokemon.attacks)[1], attackSecondText.x, attackSecondText.y);
    ctx.fillText(Object.keys(playerObj.pokemon.attacks)[2], attackThirdText.x, attackThirdText.y);
    ctx.fillText(Object.keys(playerObj.pokemon.attacks)[3], attackFourthText.x, attackFourthText.y);
  };

  drawHpOppnonet = function(selectedAttack) {
    let counter = 0;
    var intervalMovement = setInterval(function() {
      counter++;
      ctx.clearRect(battleBackgrd.x, battleBackgrd.y, battleBackgrd.width, battleBackgrd.height);
      drawImages();
      playerObj.pokemon.animatePokemon();
      if (counter > 20) {
        clearInterval(intervalMovement);
      }
    }, 50);
    this.hpWildPokemon = parseInt(playerObj.wildPokemon.hp);
    this.hpWildPokemon -= parseInt(selectedAttack);
    playerObj.wildPokemon.hp = this.hpWildPokemon;
    hpOpponentIndicator.width = Math.floor((this.hpWildPokemon / totalHpWildPokemon) * percentage);
    setTimeout(function() {
      if (!isFinished) {
        drawHpPlayer();
      }
    }, 2500);
    if (this.hpWildPokemon < 10) {
      winMessage('You Win !!!');
    }

    if (hpOpponentIndicator.width < 0) {
      hpOpponentIndicator.width = 1;
    }
  };

  drawHpPlayer = function() {
    let counter = 0;
    var intervalMovement = setInterval(function() {
      counter++;
      ctx.clearRect(battleBackgrd.x, battleBackgrd.y, battleBackgrd.width, battleBackgrd.height);
      drawImages();
      playerObj.wildPokemon.animatePokemon();
      if (counter > 20) {
        clearInterval(intervalMovement);
      }
    }, 50);

    var randomindex = Math.floor(Math.random() * (3 - 0) + 0);
    var opponentAttack = Object.entries(playerObj.wildPokemon.attacks)[randomindex];
    this.hpPlayerPokemon = parseInt(playerObj.pokemon.hp);
    this.hpPlayerPokemon -= parseInt(opponentAttack[1]);
    playerObj.pokemon.hp = this.hpPlayerPokemon;
    hpPlayerIndicator.width = Math.floor((this.hpPlayerPokemon / totalHpPokemon) * percentage);
    ctx.clearRect(battleBackgrd.x, battleBackgrd.y, battleBackgrd.width, battleBackgrd.height);
    drawImages();
    isPlayerTurn = true;
    if (this.hpPlayerPokemon < 10) {
      winMessage('You Lose !!!');
    }
    if (this.hpPlayerPokemon < 0) {
      this.hpPlayerPokemon = 1;
    }
  };

  function winMessage(message) {
    isFinished = true;
    ctx.drawImage(attackBackground, messageBox.x, messageBox.y, messageBox.width, messageBox.height);
    ctx.drawImage(attackBtn, returnButton.x, returnButton.y, returnButton.width, returnButton.height);
    ctx.fillStyle = 'black';
    ctx.font = '18px Cursive';
    if (message === 'You Win !!!') {
      ctx.font = '13px Comic Sans MS';
      ctx.drawImage(attackBtn, catchButton.x, catchButton.y, catchButton.width, catchButton.height);
      ctx.fillText('Catch pokemon', catchButton.x + 15, catchButton.y + 20);
    }
    ctx.font = '13px Comic Sans MS';
    ctx.fillText('Return to Game', returnButton.x + 15, returnButton.y + 20);
    ctx.font = '18px Cursive';
    ctx.fillText(message, messageText.x, messageText.y);
  }

  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
  }

  catchPokemon = function() {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(battleBackground, battleBackgrd.x, battleBackgrd.y, battleBackgrd.width, battleBackgrd.height);
    playerObj.wildPokemon.drawPokemon(0);
    playerObj.pokemonArray.push(playerObj.wildPokemon);
    ctx.drawImage(attackBackground, messageBox.x, messageBox.y, messageBox.width, messageBox.height);
    ctx.drawImage(attackBtn, returnButton.x, returnButton.y, returnButton.width, returnButton.height);
    ctx.fillStyle = 'black';
    ctx.font = '13px Comic Sans MS';
    ctx.fillText('Return to Game', returnButton.x + 15, returnButton.y + 20);
    ctx.font = '18px Cursive';
    ctx.fillText('Congratulations !!! You have catched ' + playerObj.wildPokemon.name, messageText.x, messageText.y);
    console.log('pokemonplayers', playerObj.pokemonArray);
  };

  returnToGame = function() {
    isBattleOn = false;
    canvas.removeEventListener('click', battleListener);
    gameObj.loop();
  };
  function battleListener(evt) {
    var mousePos = getMousePos(canvas, evt);
    console.log(isFinished);
    if (isPlayerTurn && !isFinished) {
      if (isInside(mousePos, buttonTwo)) {
        drawHpOppnonet(Object.values(playerObj.pokemon.attacks)[1]);
        isPlayerTurn = false;
      }
      if (isInside(mousePos, buttonOne)) {
        drawHpOppnonet(Object.values(playerObj.pokemon.attacks)[0]);
        isPlayerTurn = false;
      }
      if (isInside(mousePos, buttonThree)) {
        drawHpOppnonet(Object.values(playerObj.pokemon.attacks)[2]);
        isPlayerTurn = false;
      }
      if (isInside(mousePos, buttonFour)) {
        drawHpOppnonet(Object.values(playerObj.pokemon.attacks)[3]);
        isPlayerTurn = false;
      }
    }
    if (isFinished) {
      if (isInside(mousePos, catchButton)) {
        catchPokemon();
      }
      if (isInside(mousePos, returnButton)) {
        returnToGame();
      }
    }
  }
  canvas.addEventListener('click', battleListener);
};