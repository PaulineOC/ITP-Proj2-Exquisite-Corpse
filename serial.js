
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

    //check to see that there's actually a string there:
    if (inString.length > 0 ) {
        var allReadings = split(inString, ',');            // split the string on the commas

        // Keep only the valid readings of format [x,y,buttonInput,playerToken]
        if(allReadings.length === 4 && (allReadings[3] === "P1" || allReadings[3] === "P2" )){
            console.log('here are filtered sensor readings:', allReadings);
            //TODO: handle different game states:
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
