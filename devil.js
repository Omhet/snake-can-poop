class Devil {
    constructor(x, y, spawn) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.spawn = spawn;
        this.alive = true;
    }

    death(ob) {
        const d = dist(this.x, this.y, ob.x, ob.y);
        if (d < scl) {
            this.alive = false;
            return true;
        }
        return false;
    }

    far() {
        switch (this.spawn) {
            case 0:
                this.alive = this.x < width;
                break;
            case 1:
                this.alive = this.y < height;
                break;
            case 2:
                this.alive = this.x > 0;
                break;
            case 3:
                this.alive = this.y > 0;
                break;
        }
    }

    move() {
        switch (this.spawn) {
            case 0:
                this.x += this.speed;
                break;
            case 1:
                this.y += this.speed;
                break;
            case 2:
                this.x -= this.speed;
                break;
            case 3:
                this.y -= this.speed;
                break;
        }
    }
}