const connection = require('../database/connection');
const arduino = require('johnny-five');

let board = new arduino.Board();
let isReady = false;
let isRunning = false;
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
        pin: 6,
        type: "standard",
        range: [60, 90],
        fps: 100,
        inverse: true,
        startAt: 60,
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
    if (isOn) {
        grabServo.min();
        isOn = false;
    } else {
        grabServo.max();
        isOn = true;
    }
}

function moveArm(shoulder, elbow, pulse) {
    pulseServo.to(pulse, Math.abs(pulseServo.last.degrees - pulse) > 75 ? 500 : 250);
    elbowServo.to(elbow, Math.abs(elbowServo.last.degrees - elbow) > 75 ? 500 : 250);
    shoulderServo.to(shoulder, Math.abs(shoulderServo.last.degrees - shoulder) > 75 ? 500 : 250);
}

module.exports = {
    move(request, response) {
        if (!isReady || isRunning) return;

        const {shoulder, elbow, pulse} = request.body;

        moveArm(shoulder, elbow, pulse);

        response.status(200).send();
    },
    grab(request, response) {
        if (!isReady || isRunning) return;

        toggleGrab();

        response.status(200).send();
    },
    async savePosition1(request, response) {
        if (!isReady || isRunning) return;

        const {shoulder, elbow, pulse} = request.body;

        await connection('positions').insert({
            'id': 1,
            shoulder,
            elbow,
            pulse
        });

        response.status(200).send();
    },
    async savePosition2(request, response) {
        if (!isReady || isRunning) return;

        const {shoulder, elbow, pulse} = request.body;

        await connection('positions').insert({
            'id': 2,
            shoulder,
            elbow,
            pulse
        });

        response.status(200).send();
    },
    play(request, response) {
        if (!isReady || isRunning) return;

        isRunning = true;

        // while(isRunning) {
        //     moveArm();
        // }

        response.status(200).send();
    },
    stop(request, response) {
        if (!isReady) return;

        isRunning = false;

        response.status(200).send();
    },
};