const { Ship, Gameboard, Square } = require('./script')

test('Ship hit function', () => {
    const ship = new Ship(2)
    ship.hit()
    expect(ship.timesHit).toBe(1)
})

describe('Gameboard', () => {
    test('should create a 10x10 board', () => {
        const gameboard = new Gameboard()
        const board = gameboard.board

        expect(board.length).toBe(10)
        for (const row of board) {
            expect(row.length).toBe(10)
        }
    })

    test('should populate the board with Square objects', () => {
        const gameboard = new Gameboard()
        const board = gameboard.board

        for (const row of board) {
            for (const square of row) {
                expect(square).toBeInstanceOf(Square)
            }
        }
    })
    test('should initialize each square with the correct coordinates', () => {
        const gameboard = new Gameboard()
        const board = gameboard.board

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                expect(board[i][j].x).toBe(i)
                expect(board[i][j].y).toBe(j)
            }
        }
    })
})

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('should place a ship vertically successfully', () => {
        const x = 2;
        const y = 5;
        const length = 3;
        gameboard.placeShipVertically(x, y, length);

        for (let i = 0; i < length; i++) {
            const square = gameboard.getSquare(x, y + i);
            expect(square.occupant).toBeInstanceOf(Ship);
            expect(square.occupied).toBe(true);
        }
    });

    test('should not place a ship if not enough space vertically', () => {
        const x = 2;
        const y = 7;
        const length = 4;
        const result = gameboard.placeShipVertically(x, y, length);

        expect(result).toBe(null);
        for (let i = 0; i < gameboard.board.length; i++) {
            for (let j = 0; j < gameboard.board[i].length; j++) {
                expect(gameboard.board[i][j].occupant).toBe(null);
                expect(gameboard.board[i][j].occupied).toBe(false);
            }
        }
    });

    test('should not place a ship if starting coordinates are out of bounds', () => {
        const x = -1;
        const y = 5;
        const length = 3;
        const result = gameboard.placeShipVertically(x, y, length);

        expect(result).toBe(null);
        for (let i = 0; i < gameboard.board.length; i++) {
            for (let j = 0; j < gameboard.board[i].length; j++) {
                expect(gameboard.board[i][j].occupant).toBe(null);
                expect(gameboard.board[i][j].occupied).toBe(false);
            }
        }
    });
});

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    describe('receiveAttack function', () => {
        it('should record the coordinates of a missed shot', () => {
            const x = 3;
            const y = 4;
            gameboard.receiveAttack(x, y);
            expect(gameboard.missedShots).toContainEqual([x, y]);
        });

        it('should send the hit function to the correct ship on a successful hit', () => {
            // Assuming that placeShipVertically is a function that places a ship on the board
            const x = 5;
            const y = 5;
            const shipLength = 3;
            gameboard.placeShipVertically(x, y, shipLength);

            // Mock the hit function of the ship
            const ship = gameboard.getSquare(x, y).occupant;
            jest.spyOn(ship, 'hit');

            gameboard.receiveAttack(x, y);
            expect(ship.hit).toHaveBeenCalled();
        });

        it('should not record coordinates of a missed shot if it hits a ship', () => {
            const x = 2;
            const y = 2;
            const shipLength = 4;
            gameboard.placeShipVertically(x, y, shipLength);

            gameboard.receiveAttack(x, y);
            expect(gameboard.missedShots).not.toContainEqual([x, y]);
        });
    });
});

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    it('should report whether all ships have been sunk', () => {
        // Add two ships to the gameboard
        const ship1 = new Ship(2);
        const ship2 = new Ship(3);
        gameboard.ships.push(ship1, ship2);

        // Initially, no ships should be sunk
        expect(gameboard.allShipsSunk()).toBe(false);

        // Sink the first ship
        ship1.hit();
        ship1.hit();
        expect(gameboard.allShipsSunk()).toBe(false);

        // Sink the second ship
        ship2.hit();
        ship2.hit();
        ship2.hit();
        expect(gameboard.allShipsSunk()).toBe(true);
    });
});






