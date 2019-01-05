let s;
let scl = 20;

let food;
let growRate = 1;

let snakeBody, orange, poop, devil, restart;

let devils = [];

const restartButton = document.getElementById('restart');
restartButton.onclick = (e) => {
    s.alive = true;
    restartButton.classList.remove('show');
}

function preload() {
    snakeBody = loadImage('images/body.png');
    orange = loadImage('images/orange.png');
    poop = loadImage('images/poop.png');
    devil = loadImage('images/devil.png');
    restart = loadImage('images/restart.png');
}

function setup() {
    createCanvas(600, 600);
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
    console.log(restartButton);
}

function draw() {
    background(51);

    if (s.eat(food)) {
        pickLocation();
    }

    s.death();
    s.update();
    s.show();

    fill(255, 0, 100);

    // Draw food
    image(orange, food.x, food.y, 24, 24);

    // Draw poops
    s.poops.forEach(p => {
        if (p.alive) {
            image(poop, p.x, p.y, 24, 24)
            devils.forEach(d => {
                if (d.death(p)) {
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
        text('Game over', width / 2, height / 2);
        if (!restartButton.classList.contains('show')) {
            restartButton.classList.add('show');
        }
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    } else if (keyCode === 32) {
        s.poop();
    } else if (keyCode === 87) {
        s.total++;
    } else if (keyCode === 83) {
        spawnDevil();
    } 


}