import { Board, Square } from "./board.js"
import { Block } from "./block.js"
export type uuid = string;

export function uuidv4(): uuid {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function insertBlock(board: Board, block: Block): void {
    for (let i = 0; i < block.mapSize; i++) {
        for (let j = 0; j < block.mapSize; j++) {
            let currentSquare = block.map().getSquare(i, j);
            if (!currentSquare.empty) {
                board.setSquare(block.x + i, block.y + j, currentSquare);
            }
        }
    }
}

export function printMapDebbug(board: Board): void {
    let mapWidth = board.width;
    let mapHeight = board.height;

    for (let y = mapHeight - 1; y >= 0; y--) {
        let row = "";
        for (let x = 0; x < mapWidth; x++) {
            if (board.getSquare(x, y).color == "black") {
                row += "-";
            } else {
                row += board.getSquare(x, y).color[0];
            }
        }
        console.log(row);
    }
}

export function isRowFilled(board: Board, row: number): Boolean {
    for (let i = 0; i < board.width; i++) {
       if (board.getSquare(i, row).empty) {
           return false;
       }
    }
    return true;
}
export function hit(board: Board, block: Block): [Boolean, number, number] {
    for (let x = 0; x < block.mapSize; x++) {
        for (let y = 0; y < block.mapSize; y++) {
            let mapSquare;
            if (block.y + y >= board.height && ((block.x + x) >= 0 && (block.x + x) < board.width)) {
                mapSquare = Square.empty();
            } else if (block.y + y < 0 || block.y + y >= board.height ||
                       block.x + x < 0 || block.x + x >= board.width) {
                mapSquare = Square.new("black");
            } else {
                mapSquare = board.getSquare(block.x + x, block.y + y);
            }

            const blockSquare = block.map().getSquare(x, y);
            if (mapSquare.empty == false && blockSquare.empty == false) {
                return [true, block.x + x, block.y + y]
            }
        }
    }
    return [false, 0, 0];
}