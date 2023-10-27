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
        this.board = createBoard()
    }

    createBoard() {
        newBoard = []
        for (let i=0; i < 9; i++) {
            let row=[]
            for (let j=0; j < 9; j++) {
                let square = new Square(i, j)
                row.push(square)
            }
            newBoard.push(row)
        }
        return newBoard
    }
}

class Square {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

module.exports = { Ship, Gameboard };