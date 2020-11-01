class Game{
	prevGameState = gameStates.INTRO;
	gameState = gameStates.INTRO;
	isPlayer1 = true;
	cursorX = width/2;
	cursorY = 0;
	accelerationY = 5;
	currScreenChunk = 0;
	originalCanvasHeight;
	finalHeight;

	allPoints = [];
	currPoints = [];

	rounds;
	roundTime = 7000;

	constructor(height){
		this.originalCanvasHeight = height;
		this.rounds = 4;
	}


	drawIntro(){
		// some intro instructions?
	}

	handleGameTimer(){
		if(this.gameState === gameStates.IN_PROGRESS){
			this.isPlayer1=!this.isPlayer1;
			this.rounds--;
			// if(this.rounds <= 0){
			// 	this.prevGameState = gameStates.IN_PROGRESS;
			// 	this.gameState = gameStates.END;
			// }
		}
		return;
	}

	drawGame() {
		if(this.prevGameState === gameStates.INTRO && this.gameState === gameStates.IN_PROGRESS){
			background(YELLOW);
		}
		this.renderProperties();
		ellipse(this.cursorX,this.cursorY, ELLIPSE_RADIUS,ELLIPSE_RADIUS);
		this.outofBounds();
		this.prevGameState = this.gameState;
	}

	outofBounds(){
		if(this.cursorX > width){
			this.cursorX = width;
		}
		if(this.cursorX < 0){
			this.cursorX = 0;
		}
		if(this.cursorY < 0){
			this.cursorY = 0;
		}
		if(this.cursorY > height){
			this.resetCanvas();
		}
	}

	resetCanvas(){
		this.currScreenChunk++;
		background(YELLOW);
		this.cursorY = 0;
		console.log();
	}

	drawResults(){
		if(this.prevGameState === gameStates.IN_PROGRESS && this.gameState === gameStates.END){
			console.log('IN END');
			background(GRAY);
			this.mapFinalYCoords();
			this.finalHeight = (this.currScreenChunk + 1) * this.originalCanvasHeight;
			resizeCanvas(width, this.finalHeight);
		}
		for(let i = 0;i<this.currPoints.length;i++){
			let currX =  this.currPoints[i]['x'];
			let currY = this.currPoints[i]['y'];
			// if(this.prevGameState === gameStates.IN_PROGRESS && this.gameState === gameStates.END){
			// 	console.log('currX:', currX);
			// 	console.log('currY:', currY);
			// }
			fill(PURPLE);
			stroke(PURPLE);
			ellipse(currX, currY, ELLIPSE_RADIUS);
		}
		this.prevGameState = this.gameState;
	}

	mapFinalYCoords(){
		for(let i=0;i<this.currPoints.length;i++){
			if(this.currPoints[i]['screenChunk']>0){
				this.currPoints[i]['y'] = this.currPoints[i]['y'] + (this.currPoints[i]['screenChunk'] * this.originalCanvasHeight);
			}
		}
	}

	renderProperties(){
		if(this.gameState === gameStates.END){
			stroke(BLACK);
			noFill();
		}
		if(this.isPlayer1){
			stroke(RED);
			fill(RED);
		}
		else{
			fill(BLUE);
			stroke(BLUE);
		}
	}
}


