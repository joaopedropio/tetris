import * as tools from "./tools"
import { Board, Color, Square } from "./board"

function IBlock(): Block {
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

function JBlock(): Block {
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

function LBlock(): Block {
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

function OBlock(): Block {
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

function SBlock(): Block {
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

function TBlock(): Block {
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
    ];
    return new Block(spins, mapSize, "T-Block");
}

function ZBlock(): Block {
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
    ];
    return new Block(spins, mapSize, "Z-Block");
}

interface Coordinate {
    x: number;
    y: number;
}

interface Spin {
    board: Board;
    orientation: string;
}

function createSpin(squares: Coordinate[], color: Color, mapSize: number, orientation: string): Spin {
    let map = Board.new(mapSize, mapSize);
    squares.forEach(square => {
        map.setSquare(square.x, square.y, Square.new(color));
    });
    return {
        board: map,
        orientation: orientation
    };
}

export class Block {
    id: tools.uuid = tools.uuidv4();
    x: number = 0;
    y: number = 0;
    currentSpin: number = 0;
    constructor(readonly spins: Spin[], readonly mapSize: number, readonly name: string) { }

    static random(): Block {
        const blocks = [
            IBlock(),
            JBlock(),
            LBlock(),
            OBlock(),
            SBlock(),
            TBlock(),
            ZBlock()
        ]
        const index = tools.getRandomInt(0, 7);
        return blocks[index];
    }

    clone(): Block {
        let clonedBlock = new Block(this.spins, this.mapSize, this.name);
        clonedBlock.id = this.id;
        clonedBlock.currentSpin = this.currentSpin;
        clonedBlock.x = this.x;
        clonedBlock.y = this.y;
    
        return clonedBlock;
    }

    map(): Board {
        return this.spins[this.currentSpin].board.clone();
    }

    orientation() {
        return this.spins[this.currentSpin].orientation;
    }

    spin(direction: SpinDirection) {
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

    moveDown(map: Board) {
        this.y--;
        if (tools.hit(map, this)[0]) {
            this.y++;
            return false;
        }
        return true;
    }

    moveRight(map: Board) {
        this.x++;
        if (tools.hit(map, this)[0]) {
            this.x--;
            return false;
        }
        return true;
    }
    
    moveLeft(map: Board) {
        this.x--;
        if (tools.hit(map, this)[0]) {
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

export type SpinDirection = "clockwise" | "counterClockwise";
export type MoveDirection = "clockwise" | "counterClockwise" | "left" | "right" | "down" | undefined;
