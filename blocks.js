function IBlock() {
    const up = [
        {x: 0, y: 2},
        {x: 1, y: 2},
        {x: 2, y: 2},
        {x: 3, y: 2},
    ];
    const right = [
        {x: 2, y: 0},
        {x: 2, y: 1},
        {x: 2, y: 2},
        {x: 2, y: 3},
    ];
    const down = [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1},
    ];
    const left = [
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 1, y: 2},
        {x: 1, y: 3},
    ];
    const mapSize = 4;
    const spins = [
        createSpin(up,    "aqua", mapSize, "up"),
        createSpin(right, "aqua", mapSize, "right"),
        createSpin(down,  "aqua", mapSize, "down"),
        createSpin(left,  "aqua", mapSize, "left")
    ]
    return new Block(spins, mapSize, "I-Block")
}

function JBlock() {
    const up = [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 0, y: 2},
    ];
    const right = [
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 1, y: 2},
        {x: 2, y: 2},
    ];
    const down = [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 2, y: 0},
    ];
    const left = [
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 1, y: 2},
        {x: 0, y: 0},
    ];
    const mapSize = 3;
    const spins = [
        createSpin(up,    "blue", mapSize, "up"),
        createSpin(right, "blue", mapSize, "right"),
        createSpin(down,  "blue", mapSize, "down"),
        createSpin(left,  "blue", mapSize, "left")
    ]
    return new Block(spins, mapSize, "J-Block")
}

function LBlock() {
    const up = [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 2, y: 2},
    ];
    const right = [
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 1, y: 2},
        {x: 2, y: 0},
    ];
    const down = [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 0, y: 0},
    ];
    const left = [
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 1, y: 2},
        {x: 0, y: 2},
    ];
    const mapSize = 3;
    const spins = [
        createSpin(up,    "orange", mapSize, "up"),
        createSpin(right, "orange", mapSize, "right"),
        createSpin(down,  "orange", mapSize, "down"),
        createSpin(left,  "orange", mapSize, "left")
    ]
    return new Block(spins, mapSize, "L-Block")
}

function OBlock() {
    const up = [
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 1, y: 2},
        {x: 2, y: 2},
    ];
    const right = [
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 1, y: 2},
        {x: 2, y: 2},
    ];
    const down = [
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 1, y: 2},
        {x: 2, y: 2},
    ];
    const left = [
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 1, y: 2},
        {x: 2, y: 2},
    ];
    const mapSize = 4;
    const spins = [
        createSpin(up,    "yellow", mapSize, "up"),
        createSpin(right, "yellow", mapSize, "right"),
        createSpin(down,  "yellow", mapSize, "down"),
        createSpin(left,  "yellow", mapSize, "left")
    ]
    return new Block(spins, mapSize, "O-Block")
}

function SBlock() {
    const up = [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 1, y: 2},
        {x: 2, y: 2},
    ];
    const right = [
        {x: 1, y: 1},
        {x: 1, y: 2},
        {x: 2, y: 0},
        {x: 2, y: 1},
    ];
    const down = [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 1},
    ];
    const left = [
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 0, y: 1},
        {x: 0, y: 2},
    ];
    const mapSize = 3;
    const spins = [
        createSpin(up,    "lime", mapSize, "up"),
        createSpin(right, "lime", mapSize, "right"),
        createSpin(down,  "lime", mapSize, "down"),
        createSpin(left,  "lime", mapSize, "left")
    ]
    return new Block(spins, mapSize, "S-Block")
}

function TBlock() {
    const up = [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 1, y: 2},
    ];
    const right = [
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 1, y: 2},
        {x: 2, y: 1},
    ];
    const down = [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 1, y: 0},
    ];
    const left = [
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 1, y: 2},
        {x: 0, y: 1},
    ];
    const mapSize = 3;
    const spins = [
        createSpin(up,    "fuchsia", mapSize, "up"),
        createSpin(right, "fuchsia", mapSize, "right"),
        createSpin(down,  "fuchsia", mapSize, "down"),
        createSpin(left,  "fuchsia", mapSize, "left")
    ]
    return new Block(spins, mapSize, "T-Block")
}

function ZBlock() {
    const up = [
        {x: 0, y: 2},
        {x: 1, y: 2},
        {x: 1, y: 1},
        {x: 2, y: 1},
    ];
    const right = [
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 2, y: 2},
    ];
    const down = [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 1, y: 0},
        {x: 2, y: 0},
    ];
    const left = [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 1, y: 2},
    ];
    const mapSize = 3;
    const spins = [
        createSpin(up,    "red", mapSize, "up"),
        createSpin(right, "red", mapSize, "right"),
        createSpin(down,  "red", mapSize, "down"),
        createSpin(left,  "red", mapSize, "left")
    ]
    return new Block(spins, mapSize, "Z-Block")
}

function createSpin(squares, color, mapSize, orientation) {
    map = createMap(emptySquare(), mapSize, mapSize);
    squares.forEach(square => {
        map[square.x][square.y] = createSquare(color);
    });
    return {
        map: map,
        orientation: orientation
    };
}

class Block {
    constructor(spins, mapSize, name) {
        this.name = name;
        this.id = uuidv4();
        this.mapSize = mapSize;
        this.spins = spins;
        this.currentSpin = 0;
        this.x = 0;
        this.y = 0;
    }

    map() {
        return cloneMap(this.spins[this.currentSpin].map);
    }

    orientation() {
        return this.spins[this.currentSpin].orientation;
    }

    mapSize() {
        return this.mapSize;
    }

    spin(direction) {
        if (direction == "clockwise") {
            if (this.currentSpin == 3) {
                this.currentSpin = 0;
                return;
            }
            this.currentSpin++;
        }
        if (direction == "counterClockwise") {
            if (this.currentSpin == 0) {
                this.currentSpin = 3
                return;
            }
            this.currentSpin--;
        }
    }

    moveDown(map) {
        this.y--;
        if (hit(map, this)) {
            this.y++;
            return false;
        }
        return true;
    }

    moveRight(map) {
        this.x++;
        if (hit(map, this)) {
            this.x--;
            return false;
        }
        return true;
    }
    
    moveLeft(map) {
        this.x--;
        if (hit(map, this)) {
            this.x++;
            return false;
        }
        return true;
    }
    
    unmoveBlock() {
        this.y++;
    }
    
    moveBlock() {
        this.y--;
    }
}