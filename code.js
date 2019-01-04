let s;
let scl = 20;

let food;
let growRate = 1;

let snakeBody, orange, poop, devil;

let devils = [];
// let devilsTotal = 0

function preload() {
    snakeBody = loadImage('images/body.png')
    orange = loadImage('images/orange.png')
    poop = loadImage('images/poop.png')
    devil = loadImage('images/devil.png')
}

function setup() {
    createCanvas(600, 600);
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
    const cols = floor(width / scl);
    const rows = floor(height / scl);
    devilVec = createVector(0, floor(random(rows)));
    devilVec.mult(scl);
    devils.push(new Devil(devilVec.x, devilVec.y));
}

function mousePressed() {
    s.total += 1;
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
        }
    });
    devils = devils.filter(d => d.alive);
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
    } 
    
}