let serial;
let portName = '/dev/cu.usbmodem14201';  // fill in your serial port name here
let game;

let canvas;
let mainTimer;
function setup(){
  //createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(500, 400);
  //serial = new p5.SerialPort();
  // serialSetup(serial);
  game = new Game(height);

  mainTimer = setInterval(game.handleGameTimer.bind(game), game.roundTime);
  background(GRAY);
}

function draw() {
  switch(game.gameState){
    case gameStates.INTRO:
      game.drawIntro();
      break;
    case gameStates.IN_PROGRESS:
      game.drawGame();
      break;
    case gameStates.END:
      game.drawResults();
      clearInterval(mainTimer);
  }
}

function keyPressed() {
  if(keyCode === ENTER && game.gameState === gameStates.INTRO ){
    game.gameState = gameStates.IN_PROGRESS;
  }
  //a
  if (keyCode === 65 && game.gameState === gameStates.IN_PROGRESS ) {
    game.cursorX -= 5;
    game.currPoints.push({x: game.cursorX, y: game.cursorY, screenChunk: game.currScreenChunk});
  }
  //d
  else if (keyCode === 68 && game.gameState === gameStates.IN_PROGRESS) {
    game.cursorX +=5 ;
    game.currPoints.push({x: game.cursorX, y: game.cursorY, screenChunk: game.currScreenChunk});
  }
  //w
  else if (keyCode === 87 && game.gameState === gameStates.IN_PROGRESS) {
    game.cursorY-=5;
    game.currPoints.push({x: game.cursorX, y: game.cursorY, screenChunk: game.currScreenChunk});
  }
  //s
  else if (keyCode === 83  && game.gameState === gameStates.IN_PROGRESS) {
    game.cursorY+=5;
    game.currPoints.push({x: game.cursorX, y: game.cursorY, screenChunk: game.currScreenChunk});
  }

  else if (keyCode === 81  && game.gameState === gameStates.IN_PROGRESS) {
    game.gameState = gameStates.END;
  }
}
