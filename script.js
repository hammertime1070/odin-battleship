class Ship {
    constructor(length) {
        this.length = length
        this.timesHit = 0
        this.sunk = false
    }

    hit() {
        this.timesHit += 1
        this.sunk = this.isSunk()
    }

    isSunk() {
        return this.timesHit >= this.length
    }
}

class Gameboard {
    constructor() {
        this.board = this.createBoard()
        this.missedShots = []
        this.ships = []
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
        if(this.board[x] && this.board[x][y]) {
            return this.board[x][y]
        } else {
            return null
        }
    }

    placeShipVertically(x, y, length) {
        // Get Squares for each place a ship should be placed
        let shipPositions = []
        for (let i=0; i < length; i++) {
            let square = this.getSquare(x,y+i)
            shipPositions.push(square)
        }
        // Make sure all of the Ship Positions are valid
        if (!shipPositions.every(element => element != null && !element.occupied)) {
            console.log("There is not enough space to place a ship here")
            return null
        }
        // create the new Ship object and log it in ships array
        const ship = new Ship(length)
        this.ships.push(ship)
        // set the occupant of each square to the ship and make it as occupied
        for (let square of shipPositions) {
            square.occupant = ship
            square.occupied = true
        }
    }

    getShip(square) {
        return square.occupant
    }

    allShipsSunk() {
        console.log(`The ships in the array are ${JSON.stringify(this.ships, null, 2)}`)
        for (let ship of this.ships) {
            console.log(`Ship Length: ${ship.length}, Times Hit: ${ship.timesHit}, Is Sunk: ${ship.sunk}`);
        }
        return this.ships.every(ship => ship.sunk)
    }

    missedShot(x, y) {
        this.missedShots.push([x, y])
    }

    receiveAttack(x, y) {
     let ship = this.getShip(this.getSquare(x, y))
     if (ship) {
        ship.hit()
     }   else {
        this.missedShot(x, y)
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

class Player {
    constructor() {
        this.previouslyPlayed = []
        this.ai = false
        this.selectedSquare = null
    }

    attack(square, targetBoard) {

    }
    doTurnAction(board) {
        if (this.ai = true) {
            doAITurnAction(board)
        } else {
            doPlayerAction(board)
        }
    }
    doAITurnAction(board) {
        let options = board.board
        options.flat().filter(square => !this.previouslyPlayed.includes(square))
        const randomIndex = Math.floor(Math.random() * options.length)
        let selectedSquare = options[randomIndex]
        this.previouslyPlayed.push(selectedSquare)
        return selectedSquare
    }

    doPlayerTurnAction(board) {
        this.attack(selectedSquare, board)
    }

}

class Game {
    constructor() {

    }
}


module.exports = { Ship, Gameboard, Square, Player, Game };