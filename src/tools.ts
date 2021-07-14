import { Board, Square } from "./board"
import { Block } from "./block"
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

export function sameBoard(board1: string[], board2: string[]): boolean {
    if (board1.length != board2.length) {
        return false;
    }
    for (let i = 0; i < board1.length; i++) {
        if (board1[i] != board2[i]) {
            return false;
        }
    }
    return true;
}

export function convertToStringArray(board: Board): string[] {
    let boardString: string[] = [];
    for (let y = board.height - 1; y >= 0; y--) {
        let row = "";
        for (let x = 0; x < board.width; x++) {
            if (board.getSquare(x, y).color == "black") {
                row += "-";
            } else {
                row += board.getSquare(x, y).color[0];
            }
        }
        boardString.push(row);
    }
    return boardString;
}

export function convertToBoard(map: string[]): Board {
    let height = map.length;
    let width = map[0].length;
    let board = Board.new(width, height);

    for (let y = 0; y < map.length; y++) {
        let rowIndex = map.length - y - 1;
        let row = map[rowIndex];
        for (let x = 0; x < row.length; x++) {
            let square = letterToSquare(row[x]);
            board.setSquare(x, y, square);
        }
    }
    return board;
}

function letterToSquare(letter: string): Square {
    switch (letter) {
        case "r": return Square.new("red");
        case "b": return Square.new("blue");
        case "a": return Square.new("aqua");
        case "o": return Square.new("orange");
        case "y": return Square.new("yellow");
        case "l": return Square.new("lime");
        case "f": return Square.new("fuchsia");
        case "-":
        default : return Square.empty(); 
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