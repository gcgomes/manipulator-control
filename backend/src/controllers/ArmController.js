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

module.exports = {
    move(request, response) {
        if (!isReady || isRunning) return response.status(404).send();

        const {shoulder, elbow, pulse} = request.body;

        pulseServo.to(pulse, Math.abs(pulseServo.last.degrees - pulse) > 75 ? 500 : 250);
        elbowServo.to(elbow, Math.abs(elbowServo.last.degrees - elbow) > 75 ? 500 : 250);
        shoulderServo.to(shoulder, Math.abs(shoulderServo.last.degrees - shoulder) > 75 ? 500 : 250);

        response.status(200).send();
    },
    grab(request, response) {
        if (!isReady || isRunning) return response.status(404).send();

        toggleGrab();

        response.status(200).send();
    },
    async savePosition1(request, response) {
        if (!isReady || isRunning) return response.status(404).send();

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
        if (!isReady || isRunning) return response.status(404).send();

        const {shoulder, elbow, pulse} = request.body;

        await connection('positions').insert({
            'id': 2,
            shoulder,
            elbow,
            pulse
        });

        response.status(200).send();
    },
    async play(request, response) {
        if (!isReady || isRunning) return response.status(404).send();

        const point1 = await connection('positions').where('id', 1).first();
        if (!point1) return response.status(204).send();

        const point2 = await connection('positions').where('id', 2).first();
        if (!point2) return response.status(204).send();

        isRunning = true;

        response.status(200).send();

        while(isRunning) {
            shoulderServo.to(point1.shoulder, Math.abs(shoulderServo.last.degrees - point1.shoulder) > 75 ? 500 : 250);
            elbowServo.to(point1.elbow, Math.abs(elbowServo.last.degrees - point1.elbow) > 75 ? 500 : 250);
            pulseServo.to(point1.pulse, Math.abs(pulseServo.last.degrees - point1.pulse) > 75 ? 500 : 250);
            toggleGrab();
            pulseServo.to(point2.pulse, Math.abs(pulseServo.last.degrees - point2.pulse) > 75 ? 500 : 250);
            elbowServo.to(point2.elbow, Math.abs(elbowServo.last.degrees - point2.elbow) > 75 ? 500 : 250);
            shoulderServo.to(point2.shoulder, Math.abs(shoulderServo.last.degrees - point2.shoulder) > 75 ? 500 : 250);
            toggleGrab();
        }
    },
    stop(request, response) {
        if (!isReady) return response.status(404).send();

        isRunning = false;

        response.status(200).send();
    },
};