let count = 0;
let speed = 0.25;

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
        this.canPoop = true;
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
        console.log('game over');
        bodyGrow = this.tail.length - 1;
        this.total = 0;
        this.tail = [];
        this.alive = false;
    }

    death() {
        for (let i = 0; i < this.tail.length; i++) {
            const pos = this.tail[i];
            const d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                // this.end();
            }
        }
    }

    poop() {
        if (this.tail.length > 1 && this.canPoop) {
            const back = this.tail[0];
            this.poops.push(new Poop(back.x, back.y));
            this.tail.pop();
            this.total--;
        }
    }

    update() {
        for (var i = 0; i < this.tail.length - 1; i++) {
            const cur = this.tail[i];
            const next = this.tail[i + 1];
            cur.x = next.x - this.xspeed * scl;
            cur.y = next.y - this.yspeed * scl;
        }
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }

        this.x = floor(this.x + this.xspeed * scl);
        this.y = floor(this.y + this.yspeed * scl);

        // this.x = constrain(this.x, 0, width - scl);
        // this.y = constrain(this.y, 0, height - scl);

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }

    show() {
        fill(255);
        for (var i = 0; i < this.tail.length; i++) {
            if (i === 0) {
                image(snakeHead, this.tail[i].x + 4, this.tail[i].y + 4, 16, 16);
            }
            else {
                image(snakeBody, this.tail[i].x, this.tail[i].y, scl, scl);
            }
        }
        image(snakeHead, this.x - 4, this.y - 4, 32, 32);
    }
}