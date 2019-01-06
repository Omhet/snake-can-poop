let count = 0;
let speed = 0.7;

class Snake {
    constructor() {
        this.y = 0;
        this.x = 0;
        this.xspeed = speed;
        this.yspeed = 0;
        this.alive = true;
        this.total = 0;
        this.tail = [];
        this.poops = [];
    }

    eat(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < scl) {
            this.total += growRate;
            return true;
        } else {
            return false;
        }
    }

    dir(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    end() {
        console.log('starting over');
        bodyGrow = this.tail.length;
        this.total = 0;
        this.tail = [];
        this.alive = false;
    }

    death() {
        for (let i = 0; i < this.tail.length; i++) {
            const pos = this.tail[i];
            const d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.end();
            }
        }
    }

    poop() {
        if (this.tail.length > 0) {
            const back = this.tail[0];
            this.poops.push(new Poop(back.x, back.y));
            this.tail.pop();
            this.total--;
        }
    }

    update() {
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }

        this.x = floor(this.x + this.xspeed * scl);
        this.y = floor(this.y + this.yspeed * scl);

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    show() {
        fill(255);
        for (var i = 0; i < this.tail.length; i++) {
            if (i === 0) 
                image(snakeHead, this.tail[i].x + 4, this.tail[i].y + 4, 16, 16);
            else 
                image(snakeBody, this.tail[i].x, this.tail[i].y, scl, scl);
        }
        image(snakeHead, this.x - 4, this.y - 4, 32, 32);
    }
}