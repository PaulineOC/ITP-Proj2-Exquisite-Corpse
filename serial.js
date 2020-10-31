
function serialSetup(serial){
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen);        // callback for the port opening
    serial.on('data', serialEvent);     // callback for when new data arrives
    serial.on('error', serialError);    // callback for errors
    serial.on('close', portClose);      // callback for the port closing
    serial.list();                      // list the serial ports
    serial.open(portName);              // open a serial port
}


function serialEvent() {
    let inString = serial.readLine();
    if (inString.length > 0 ) {
        console.log('here is the data:', inString);
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
