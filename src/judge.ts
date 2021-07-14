import * as tools from "./tools"
import { Board } from "./board"


export function calculatePoints(board: Board): number {
    let ho = holes(board);
    let he = heightness(board);
    let bu = bumpiness(board);
    let fi = filledRows(board);

    return (Math.pow(fi + 100, 3)) - Math.pow(ho + 10, 3) - (2 * he) - (bu * 10);
}

export function holes(board: Board): number {
    let count = 0;
    for (let x = 0; x < board.width; x++) {
        for (let y = 0; y < board.height; y++) {
            if (board.getSquare(x, y).empty) {
                for (let up = y + 1; up < board.height; up++) {
                    if (!board.getSquare(x, up).empty) {
                        count++;
                    }
                }
            }
        }
    }
    return count;
}

function heightness(board: Board): number {
    let count = 0;
    for (let x = 0; x < board.width; x++) {
        count += highestSquare(board, x);
    }
    return count;
}

function bumpiness(board: Board): number {
    let count = 0;
    let lastSquareHeight = 0;
    for (let x = 0; x < board.width; x++) {
        let currentSquareHeight = highestSquare(board, x);
        let diff = currentSquareHeight - lastSquareHeight;
        if (diff < 0) {
            diff *= -1;
        }
        count += diff;
        lastSquareHeight = currentSquareHeight;
    }
    return count;
}

function highestSquare(board: Board, x: number): number {
    for (let y = board.height - 1; y > 0; y--) {
        if (!board.getSquare(x, y).empty) {
            return y;
        }   
    }
    return 0;
}

export function filledRows(board: Board): number {
    let rowsFilledCount = 0;
    for (let i = 0; i < board.height; i++) {
        if (tools.isRowFilled(board, i)) {
            rowsFilledCount++;
        }
    }
    return rowsFilledCount;
}
