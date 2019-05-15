"use strict";

const PADDLE_HEIGHT = 100;
const FPS = 30;

let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 5;
let ballSpeedY = 4;

let paddle1Y = 250;

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

    canvas.addEventListener("mousemove", function(event){
        const mousePos = calcMousePos(event);
        paddle1Y = mousePos.y;
    });
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
    colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, "white");
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