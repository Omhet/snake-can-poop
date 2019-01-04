let count = 0;

class Snake {
    constructor() {
        this.y = 0;
        this.x = 0;
        this.xspeed = 1;
        this.yspeed = 0;
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
        this.total = 0;
        this.tail = [];
    }

    death() {
        for (let i = 0; i < this.tail.length; i++) {
            const pos = this.tail[i];
            const d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.end();
            }
        }
        // this.poops.forEach(p => {
        //     const d = dist(this.x, this.y, p.x, p.y);
        //     if (d < scl / 5) {
        //         this.end();
        //     }
        // })
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

        // count++;
        // if (count % 50 === 0) {
        //     // console.log(this.tail);
        // }

        this.x = floor(this.x + this.xspeed * scl / 5);
        this.y = floor(this.y + this.yspeed * scl / 5);

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    show() {
        fill(255);
        for (var i = 0; i < this.tail.length; i++) {
            image(snakeBody, this.tail[i].x, this.tail[i].y);
        }
        image(snakeBody, this.x, this.y);

    }
}