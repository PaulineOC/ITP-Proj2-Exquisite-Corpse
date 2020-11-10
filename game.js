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

	currPoints = [];
	currScreenChunkHeights = [0];

	rounds;
	roundTime = 4000;

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
			if(this.rounds > 0){
				this.resetCanvas();
			}
			else{
				this.prevGameState = gameStates.IN_PROGRESS;
				this.gameState = gameStates.END;
			}
		}
		return;
	}

	drawGame() {
		if(this.prevGameState === gameStates.INTRO && this.gameState === gameStates.IN_PROGRESS){
			background(YELLOW);
		}
		this.renderProperties();
		ellipse(this.cursorX,this.cursorY, ELLIPSE_RADIUS,ELLIPSE_RADIUS);
		this.outOfBounds();
		this.prevGameState = this.gameState;
	}

	outOfBounds(){
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
		background(YELLOW);
		this.currScreenChunkHeights.push(this.cursorY);
		this.currScreenChunk++;
		this.cursorY = 0;
	}

	drawResults(){
		if(this.prevGameState === gameStates.IN_PROGRESS && this.gameState === gameStates.END){
			this.mapFinalYCoords();
			this.finalHeight = this.calculateFinalScreenSize();
			resizeCanvas(width, this.finalHeight);
		}
		background(GRAY);
		for(let i = 0;i<this.currPoints.length;i++){
			let currX =  this.currPoints[i]['x'];
			let currY = this.currPoints[i]['y'];
			fill(PURPLE);
			stroke(PURPLE);
			ellipse(currX, currY, ELLIPSE_RADIUS);
		}
		this.prevGameState = this.gameState;
	}

	mapFinalYCoords(){
		let currYHeight = 0;
		for(let i=0;i<this.currPoints.length;i++){
			// Check if we are on a new screen chunk
			if(i > 0 && this.currPoints[i-1].screenChunk !== this.currPoints[i].screenChunk) {
				// Increase the height to match the new screen chunk
				currYHeight += this.currScreenChunkHeights[this.currPoints[i].screenChunk];
			}
			this.currPoints[i]['y'] = this.currPoints[i]['y'] + currYHeight;
		}
	}

	calculateFinalScreenSize(){
		return _.sum(this.currScreenChunkHeights) +  this.cursorY;
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


