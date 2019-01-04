class Poop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = true;

        setTimeout(() => this.alive = false, 5000);
    }
}