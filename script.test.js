const { Ship } = require('./script')

test('Ship hit function', () => {
    const ship = new Ship(2)
    ship.hit()
    expect(ship.timesHit).toBe(1)
})