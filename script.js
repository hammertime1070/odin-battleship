class Ship {
    constructor() {
        this.length = 1
        this.timesHit = 0
        this.sunk = false
    }

    hit() {
        this.timesHit += 1
    }

    isSunk() {
        if (this.timesHit >= this.length) {
            this.sunk = true
        }
    }
}