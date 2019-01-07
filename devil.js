class Devil {
    constructor(x, y, spawn) {
        this.x = x;
        this.y = y;
        this.speed = 4;
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
                this.spawn = this.x < width ? 0 : 2;
                break;
            case 1:
                this.spawn = this.y < height ? 1 : 3;
                break;
            case 2:
                this.spawn = this.x > 0 ? 2 : 0;
                break;
            case 3:
                this.spawn = this.y > 0 ? 3 : 1;
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