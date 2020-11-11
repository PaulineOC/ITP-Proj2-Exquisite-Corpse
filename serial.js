
function serialSetup(serial){
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen);        // callback for the port opening
    serial.on('data', serialEvent);     // callback for when new data arrives
    serial.on('error', serialError);    // callback for errors
    serial.on('close', portClose);      // callback for the port closing
    serial.open(portName);              // open a serial port
}


function serialEvent() {
    var inString = serial.readStringUntil('\r\n');
    if (inString.length > 0 ) {
        var allReadings = split(inString, ',');

        // Keep only the valid readings of format [x,y,buttonInput,playerToken]
        if(allReadings.length === 4 && (allReadings[3] === "P1" || allReadings[3] === "P2" )){
            switch(game.gameState){
                case gameStates.INTRO:
                    if(allReadings[2]=== "1"){
                        game.gameState = gameStates.IN_PROGRESS;
                    }
                    break;
                case gameStates.END:
                    if(allReadings[2]=== "1" && allReadings[3] === "P2" && !game.hasSavedPhoto){
                        game.hasSavedPhoto = true;
                        saveCanvas();
                    }
                    break;
                case gameStates.IN_PROGRESS: game.handlePhysicalInput(allReadings); break;
            }
        }
    }
}

function serverConnected() {
    console.log('connected to server.');
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portOpen() {
    console.log('the serial port opened.')
}

function portClose() {
    console.log('The serial port closed.');
}
