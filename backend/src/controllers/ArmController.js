const connection = require('../database/connection');
const arduino = require('johnny-five');

let board = new arduino.Board();
let isReady = false;
let isOn = false;
let led;

board.on('ready', function() {
    led = new arduino.Led(8);
    led.off();
    isReady = true;
});

function toggleLed() {
    if (!isReady) {
        console.log('Erro!');
        return;
    }

    if (isOn) {
        led.off();
        isOn = false;
    } else {
        led.on();
        isOn = true;
    }
}

module.exports = {
    async move(request) {
        const {shoulder, elbow, pulse} = request.body;

        toggleLed();

        console.log([shoulder, elbow, pulse]);
    }
};