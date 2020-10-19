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
let runFunction;
const timeout = 1000;

board.on('ready', function() {
    grabServo = new arduino.Servo({
        pin: 6,
        type: "standard",
        range: [60, 90],
        fps: 100,
        inverse: true,
        startAt: 60,
    });

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
        startAt: 150,
    });

    pulseServo = new arduino.Servo({
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
    if (isOn) {
        grabServo.to(60, 500);
        isOn = false;
    } else {
        grabServo.to(90, 500);
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

        await connection('positions')
          .where('id', '=', 1)
          .update({shoulder, elbow, pulse});

        response.status(200).send();
    },
    async savePosition2(request, response) {
        if (!isReady || isRunning) return response.status(404).send();

        const {shoulder, elbow, pulse} = request.body;

        await connection('positions')
          .where('id', '=', 2)
          .update({shoulder, elbow, pulse});

        response.status(200).send();
    },
    async play(request, response) {
        if (!isReady || isRunning) return response.status(404).send();

        const point1 = await connection('positions').where('id', 1).first();
        if (!point1) return response.status(204).send();

        const point2 = await connection('positions').where('id', 2).first();
        if (!point2) return response.status(204).send();

        isRunning = true;

        shoulderServo.to(point1.shoulder, timeout);
        setTimeout(function() {
            elbowServo.to(point1.elbow, timeout);
        }, 1000);
        setTimeout(function() {
            pulseServo.to(point1.pulse, timeout);
        }, 2000);
        setTimeout(function() {
            toggleGrab();
        }, 3500);
        setTimeout(function() {
            pulseServo.to(point2.pulse, timeout);
        }, 4000);
        setTimeout(function() {
            elbowServo.to(point2.elbow, timeout);
        }, 5000);
        setTimeout(function() {
            shoulderServo.to(point2.shoulder, timeout);
        }, 6000);
        setTimeout(function() {
            toggleGrab();
        }, 7500);

        runFunction = setInterval(() => {
            shoulderServo.to(point1.shoulder, timeout);
            setTimeout(function() {
                elbowServo.to(point1.elbow, timeout);
            }, 1000);
            setTimeout(function() {
                pulseServo.to(point1.pulse, timeout);
            }, 2000);
            setTimeout(function() {
                toggleGrab();
            }, 3500);
            setTimeout(function() {
                pulseServo.to(point2.pulse, timeout);
            }, 4000);
            setTimeout(function() {
                elbowServo.to(point2.elbow, timeout);
            }, 5000);
            setTimeout(function() {
                shoulderServo.to(point2.shoulder, timeout);
            }, 6000);
            setTimeout(function() {
                toggleGrab();
            }, 7500);
        }, 9000);

        response.status(200).send();
    },
    stop(request, response) {
        if (!isReady) return response.status(404).send();

        isRunning = false;
        clearInterval(runFunction);

        response.status(200).send();
    },
};