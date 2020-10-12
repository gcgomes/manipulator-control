const connection = require('../database/connection');
const arduino = require('johnny-five');

let board = new arduino.Board();
let isReady = false;
let isOn = false;
let shoulderServo;
let elbowServo;
let pulseServo;
let grabServo;

board.on('ready', function() {
    shoulderServo = new arduino.Servo({
        pin: 9,
        type: "standard",
        range: [0, 180],
        fps: 100,
        center: true,
    });

    elbowServo = new arduino.Servo({
        pin: 10,
        type: "standard",
        range: [0, 180],
        fps: 100,
        center: true,
    });

    pulseServo = new arduino.Servo({
        pin: 11,
        type: "standard",
        range: [0, 180],
        fps: 100,
        center: true,
    });

    grabServo = new arduino.Servo({
        pin: 11,
        type: "standard",
        range: [0, 180],
        fps: 100,
        center: true,
    });

    board.repl.inject({
        servo: shoulderServo
    });

    board.repl.inject({
        servo: elbowServo
    });

    board.repl.inject({
        servo: pulseServo
    });

    board.repl.inject({
        servo: grabServo
    });

    isReady = true;
});

function toggleGrab() {
    if (!isReady) {
        console.log('Erro!');
        return;
    }

    if (isOn) {
        grabServo.to(180);
        isOn = false;
    } else {
        grabServo.to(0);
        isOn = true;
    }
}

module.exports = {
    move(request, response) {
        const {shoulder, elbow, pulse} = request.body;

        shoulderServo.to(shoulder, Math.abs(shoulderServo.last.degrees - shoulder) > 75 ? 500 : 250);
        elbowServo.to(elbow, Math.abs(elbowServo.last.degrees - elbow) > 75 ? 500 : 250);
        pulseServo.to(pulse, Math.abs(pulseServo.last.degrees - pulse) > 75 ? 500 : 250);
    },
    grab(request, response) {
        toggleGrab();
    }
};