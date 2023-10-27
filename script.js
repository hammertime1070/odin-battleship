class Ship {
    constructor(length) {
        this.length = length
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

class Gameboard {
    constructor() {

    }
}

module.exports = { Ship, Gameboard };