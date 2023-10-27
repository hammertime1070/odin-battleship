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
        this.board = this.createBoard()
    }

    createBoard() {
        let newBoard = []
        for (let i=0; i < 10; i++) {
            let row=[]
            for (let j=0; j < 10; j++) {
                let square = new Square(i, j)
                row.push(square)
            }
            newBoard.push(row)
        }
        return newBoard
    }

    getSquare(x, y) {
        return this.board[x][y]
    }

    placeShipVertically(x, y, length) {
        // Get Squares for each place a ship should be placed
        let shipPositions = []
        for (let i=0; i < length; i++) {
            let square = this.getSquare(x,y-i)
            shipPositions.push(square)
        }
        // Make sure all of the Ship Positions are valid
        if (!shipPositions.every(element => element != null && !element.occupied)) {
            console.log("There is not enough space to place a ship here")
            return false
        }
        // create the new Ship object
        const ship = new Ship(length)
        // set the occupant of each square to the ship and make it as occupied
        for (square of shipPositions) {
            square.occupant = ship
            square.occupied = true
        }
    }
}

class Square {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.occupied = false
        this.occupant = null
    }
}

module.exports = { Ship, Gameboard, Square };