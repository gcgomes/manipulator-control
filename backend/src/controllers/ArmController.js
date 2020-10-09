const connection = require('../database/connection');
const arduino = require('johnny-five');

let board = new arduino.Board();

module.exports = {
    async move(request) {
        const {shoulder, elbow, pulse} = request.body;

        board.on('ready', function () {
            let led = new arduino.Led(8);
            if (shoulder > 50) {
                led.blink(1000);
            }
            else {
                led.stop();
            }
        });

        console.log([shoulder, elbow, pulse]);
    }
};