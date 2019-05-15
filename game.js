"use strict";

let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 5;
let ballSpeedY = 4;

window.onload = function () {
    console.log('js loaded');
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    const fps = 30;
    setInterval(function () { moveEverything(); drawEverything(); }, 1000 / fps);
}

function moveEverything() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX > canvas.width || ballX < 0) {
        ballSpeedX = ballSpeedX * -1;
    }
    if (ballY > canvas.height || ballY < 0) {
        ballSpeedY = ballSpeedY * -1;
    }
}

function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, "black");
    colorRect(0, 200, 10, 100, "white");
    colorCircle(ballX, ballY, 10, "white");
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