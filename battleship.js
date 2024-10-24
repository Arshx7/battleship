class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits++;
        return this.hits
    }

    isSunk() {
        return this.hits >= this.length;
    }
}

class Gameboard {
    constructor() {
        this.shipList = [];
        this.trackMissed = [];
    }
    
    placeShip(ship, coordinate, orientation) {
        let shipSize = [];
        
        if(orientation === "vertical") {
            for(let i = 0; i < ship.length; i++) {

                let newCoordinate = [coordinate[0], coordinate[1] + i];
                shipSize.push(newCoordinate)
            }
            
        } else {
            for(let i = 0; i < ship.length; i++) {
                
                let newCoordinate = [coordinate[0] + i, coordinate[1]];
                shipSize.push(newCoordinate)
            }

        }
        this.shipList.push({ ship, coordinates: shipSize });
    }

    receiveAttack(coordinate) {
        let hit = false;
        this.shipList.forEach(item => {
            if(item.coordinates.some(pos => pos[0] === coordinate[0] && pos[1] === coordinate[1])) {
                item.ship.hit();
                hit = true;
                
            } 
        });
        if(!hit) {
            this.trackMissed.push(coordinate);
        }
        
    }

    allShipSunk() {
        return this.shipList.every(item => item.ship.isSunk());
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard()
    }

    placeShip(ship, coordinate, orientation) {
        this.gameboard.placeShip(ship, coordinate, orientation);
    }

    attack(opponent, coordinate) {
        opponent.gameboard.receiveAttack(coordinate);
    }
}


module.exports = { Ship, Gameboard, Player };
