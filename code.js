let gameStarted = false;

let s;
let scl = 20;

let food;
let growRate = 1;
let bodyGrow = 0;

let snakeBody, orange, poop, devil, restart;

let devils = [];

const scoreBar = document.getElementById('score-bar');
const foodScore = document.getElementById('food-score');
const devilsScore = document.getElementById('devils-score');
const bodyScore = document.getElementById('body-score');

const startButton = document.getElementById('start');
startButton.onclick = (e) => {
    gameStarted = true;
    startButton.classList.remove('show');
    foodScore.innerText = 0;
    devilsScore.innerText = 0;
    bodyScore.innerText = 0;
    scoreBar.classList.add('show');
    loop();
}

const restartButton = document.getElementById('restart');
restartButton.onclick = (e) => {
    foodScore.innerText = '0';
    devilsScore.innerText = '0';
    bodyScore.innerText = '0';

    s.alive = true;
    s.x = width / 2;
    s.y = height / 2;
    s.poops = [];
    devils = [];
    restartButton.classList.remove('show');

    loop();
}

function preload() {
    snakeBody = loadImage('images/body.png');
    orange = loadImage('images/orange.png');
    poop = loadImage('images/poop.png');
    devil = loadImage('images/devil.png');
    restart = loadImage('images/restart.png');
}

function setup() {
    window.loop = loop;

    const scoreStr = localStorage.getItem('score');
    if (scoreStr) {
        const score = JSON.parse(scoreStr);
        foodScore.innerText = score.food;
        devilsScore.innerText = score.devils;
        bodyScore.innerText = score.body;
        scoreBar.classList.add('show');
    }

    createCanvas(600, 600);
    noLoop();
    startButton.classList.add('show');
    textAlign(CENTER);
    textSize(72);
    s = new Snake();
    frameRate(40);
    pickLocation();
}

function pickLocation() {
    const cols = floor(width / scl);
    const rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function spawnDevil() {
    const spawn = floor(random(4));
    const cols = floor(width / scl);
    const rows = floor(height / scl);
    const randomRow = floor(random(rows));
    const randomCol = floor(random(cols));
    let devilVec;

    switch (spawn) {
        case 0:
            devilVec = createVector(0, randomRow);
            break;
        case 1:
            devilVec = createVector(randomCol, 0);
            break;
        case 2:
            devilVec = createVector(cols, randomRow);
            break;
        case 3:
            devilVec = createVector(randomCol, rows);
            break;
    }

    devilVec.mult(scl);
    devils.push(new Devil(devilVec.x, devilVec.y, spawn));
}

function mousePressed() {
}

function draw() {
    background(51);

    if (!gameStarted) {
        textSize(64);
        fill(240, 248, 255);
        text('Snake Can Poop', width / 2, height / 2);
        return;
    }

    if (s.eat(food)) {
        foodScore.innerText++;
        pickLocation();
    }

    s.death();
    s.update();
    s.show();
    bodyScore.innerText = s.tail.length;


    // Draw food
    image(orange, food.x, food.y, 24, 24);

    // Draw poops
    s.poops.forEach(p => {
        if (p.alive) {
            image(poop, p.x, p.y, 24, 24)
            devils.forEach(d => {
                if (d.death(p)) {
                    devilsScore.innerText++;
                    p.alive = false;
                }
            });
        }
    });
    s.poops = s.poops.filter(p => p.alive);

    while (devils.length < floor(s.total / 2)) {
        spawnDevil();
    }

    // Draw devils
    devils.forEach(d => {
        if (d.alive) {
            image(devil, d.x, d.y, 24, 24)
            d.move();
            if (d.death(s)) {
                s.end();
            }
            s.tail.forEach(t => {
                if (d.death(t)) {
                    s.end();
                } 
            })
            d.far();
        }
    });
    devils = devils.filter(d => d.alive);

    if (!s.alive) {
        background(51);
        textSize(72);
        fill(255, 0, 100);
        text('Game over', width / 2, height / 2);
        noLoop();

        bodyScore.innerText = bodyGrow;

        let maxScore;
        const scoreStr = localStorage.getItem('score');
        if (scoreStr) {
            maxScore = JSON.parse(scoreStr);
        }

        const score = maxScore ? {
            food: Math.max(foodScore.innerText, maxScore.food),
            devils: Math.max(devilsScore.innerText, maxScore.devils),
            body: Math.max(bodyGrow, maxScore.body)
        } : {
            food: foodScore.innerText,
            devils: devilsScore.innerText,
            body: bodyGrow
        };

        const scoreToSave = JSON.stringify(score);
        localStorage.setItem('score', scoreToSave);

        if (!restartButton.classList.contains('show')) {
            restartButton.classList.add('show');
        }
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW && s.xspeed) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW  && s.xspeed) {
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW && s.yspeed) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW && s.yspeed) {
        s.dir(-1, 0);
    } else if (keyCode === 32) {
        s.poop();
    } else if (keyCode === 87) {
        s.total++;
    } else if (keyCode === 83) {
        spawnDevil();
    } 


}