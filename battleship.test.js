const { Ship } = require("./battleship");

let ship;
beforeEach(() => {
     ship = new Ship(3);
  });
  


test("check for hit", () => {

    expect(ship.hit()).toBe(1)
})

test("check for sunk", () => {

    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true)
})

