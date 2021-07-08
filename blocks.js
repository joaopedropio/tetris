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
        createBlock(up,    "aqua", mapSize),
        createBlock(right, "aqua", mapSize),
        createBlock(down,  "aqua", mapSize),
        createBlock(left,  "aqua", mapSize)
    ]
    return new Block(spins, mapSize)
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
        createBlock(up,    "blue", mapSize),
        createBlock(right, "blue", mapSize),
        createBlock(down,  "blue", mapSize),
        createBlock(left,  "blue", mapSize)
    ]
    return new Block(spins, mapSize)
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
        createBlock(up,    "orange", mapSize),
        createBlock(right, "orange", mapSize),
        createBlock(down,  "orange", mapSize),
        createBlock(left,  "orange", mapSize)
    ]
    return new Block(spins, mapSize)
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
        createBlock(up,    "yellow", mapSize),
        createBlock(right, "yellow", mapSize),
        createBlock(down,  "yellow", mapSize),
        createBlock(left,  "yellow", mapSize)
    ]
    return new Block(spins, mapSize)
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
        createBlock(up,    "lime", mapSize),
        createBlock(right, "lime", mapSize),
        createBlock(down,  "lime", mapSize),
        createBlock(left,  "lime", mapSize)
    ]
    return new Block(spins, mapSize)
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
        createBlock(up,    "fuchsia", mapSize),
        createBlock(right, "fuchsia", mapSize),
        createBlock(down,  "fuchsia", mapSize),
        createBlock(left,  "fuchsia", mapSize)
    ]
    return new Block(spins, mapSize)
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
        createBlock(up,    "red", mapSize),
        createBlock(right, "red", mapSize),
        createBlock(down,  "red", mapSize),
        createBlock(left,  "red", mapSize)
    ]
    return new Block(spins, mapSize)
}

function createBlock(squares, color, mapSize) {
    map = createMap(emptySquare(), mapSize, mapSize);
    squares.forEach(square => {
        map[square.x][square.y] = createSquare(color);
    });
    return map;
}

class Block {
    constructor(spins, mapSize) {
        this.id = uuidv4();
        this.mapSize = mapSize;
        this.spins = spins;
        this.currentMap = 0;
        this.x = 0;
        this.y = 0;
    }

    map() {
        return cloneMap(this.spins[this.currentMap]);
    }

    mapSize() {
        return this.mapSize;
    }

    spin(direction) {
        if (direction == "clockwise") {
            if (this.currentMap == 3) {
                this.currentMap = 0;
                return;
            }
            this.currentMap++;
        }
        if (direction == "counterClockwise") {
            if (this.currentMap == 0) {
                this.currentMap = 3
                return;
            }
            this.currentMap--;
        }
    }
}