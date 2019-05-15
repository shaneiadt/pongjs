"use strict";

const CANVAS_COLOR = "black";
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const PADDLE_COLOR = "white";
const BALL_COLOR = "white";
const FPS = 60;

let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 5;
let ballSpeedY = 4;

let paddle1Y = 250;
let paddle2Y = 250;

let player1Score = 0;
let player2Score = 0;

function calcMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    const mouseX = event.clientX - rect.left - root.scrollLeft;
    const mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    }
}

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    setInterval(function () { moveEverything(); drawEverything(); }, 1000 / FPS);

    canvas.addEventListener("mousemove", function (event) {
        const mousePos = calcMousePos(event);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });
}

function ballReset() {
    ballSpeedX = ballSpeedX * -1;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function cpuMovement() {
    const paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y += 6;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 6;
    }
}

function moveEverything() {
    cpuMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = ballSpeedX * -1;
        } else {
            ballReset();
            player1Score++;
        }
    } else if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = ballSpeedX * -1;
        } else {
            ballReset();
            player2Score++;
        }
    }
    if (ballY > canvas.height || ballY < 0) {
        ballSpeedY = ballSpeedY * -1;
    }
}

function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, CANVAS_COLOR);
    colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_COLOR);
    colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_COLOR);
    colorCircle(ballX, ballY, 10, BALL_COLOR);

    canvasContext.fillStyle = "white";
    canvasContext.font = "16px Arial";
    canvasContext.fillText(`${player1Score} - ${player2Score}`, (canvas.width / 2) - 15, 15);
}

function colorRect(x, y, w, h, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, w, h);
}

function colorCircle(x, y, r, c) {
    canvasContext.fillStyle = c;
    canvasContext.beginPath();
    canvasContext.arc(x, y, r, 0, Math.PI * 2, true);
    canvasContext.fill();
}