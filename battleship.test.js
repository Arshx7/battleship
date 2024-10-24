const { Ship, Gameboard, Player } = require("./battleship");
describe("Player", () => {
    let player1, player2, ship;

    beforeEach(() => {
        player1 = new Player("player1");
        player2 = new Player("player2");
        ship = new Ship(3);
    })

    test("player initialization", () => {
        expect(player1.name).toBe("player1");
    })
    
    test("place ship", () => {
        player1.placeShip(ship, [0,0], "horizontal");
        expect(player1.gameboard.shipList.length).toBe(1);
        expect(player1.gameboard.shipList[0].coordinates).toEqual([[0,0], [1,0], [2, 0]])
    })

    test("Player1 attack Player2", () => {
        player2.placeShip(ship, [0, 0], "horizontal");
        player1.attack(player2, [0, 0]);
        expect(ship.hits).toBe(1);

        player1.attack(player2, [2, 0]);
        expect(ship.hits).toBe(2);

    });

    test("Player2 attack Player1", () => {
        player1.placeShip(ship, [2, 1], "vertical");
        player2.attack(player1, [2, 3]);
        expect(ship.hits).toBe(1);
    })

    test("player attack missed", () => {
        player1.placeShip(ship, [2, 1], "vertical");
        player2.attack(player1, [5, 5]);

        expect(player1.gameboard.trackMissed).toEqual([[5,5]])

    })
    
})

describe("Ship", () => {
    
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
})

describe("Gameboard", () => {
    let gameboard;
    let ship;

    beforeEach(() => {
        gameboard = new Gameboard();
        ship = new Ship(3);
    });
    test("check initialization", () => {
        expect(gameboard.shipList).toEqual([])
    } )


      test("ship placement in vertical orientation", () => {
        gameboard.placeShip(ship, [0, 0], "vertical");
        expect(gameboard.shipList.length).toBe(1); 
        expect(gameboard.shipList[0].coordinates).toEqual([[0, 0], [0, 1], [0, 2]]); 
    });

    test("ship placement in horizontal orientation", () => {
        gameboard.placeShip(ship, [0, 0], "horizontal");
        expect(gameboard.shipList.length).toBe(1); 
        expect(gameboard.shipList[0].coordinates).toEqual([[0, 0], [1, 0], [2, 0]]); 
    });
    test("receives attack and record missed", () => {
        gameboard.placeShip(ship, [0, 0], "vertical");
        gameboard.receiveAttack([0, 1]); 
        expect(gameboard.trackMissed).toEqual([]); 
    });

    test("recieve attack and record missed", () => {
        gameboard.receiveAttack([6, 6])
        expect(gameboard.trackMissed).toEqual([[6,6]])
    })

    test("checks if all ships are sunk", () => {
        gameboard.placeShip(ship, [0, 0], "vertical");
        ship.hit(); 
        ship.hit();
        ship.hit(); 
        expect(gameboard.allShipSunk()).toBe(true); 
    });


    test("checks if not all ships are sunk", () => {
        gameboard.placeShip(ship, [0, 0], "vertical");
        ship.hit(); 
        expect(gameboard.allShipSunk()).toBe(false); 
    });
})
