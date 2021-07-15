import * as tools from "./tools"
import { Board } from "./board"
import { Block, MoveDirection } from "./block"
import { Controller } from "./controller"
import * as judge from "./judge"

export class Bot implements Controller {
    job: MoveJob | null;
    currentBlockId: tools.uuid | null;

    constructor() {
        this.job = null;
        this.currentBlockId = null;
    }

    currentState(board: Board): void {

    }

    whereToMove(board: Board, current: Block, next: Block): void {
        if (this.currentBlockId == null) {
            this.currentBlockId = current.id;
        }

        if (this.job == null) {
            this.job = new MoveJob(board.clone(), current.clone(), next.clone());
            this.job.calculate();
        }

        if (this.currentBlockId != current.id) {
            if (!this.job.isDone) {
                this.job.cancel();
            }
            this.currentBlockId = current.id;
            this.job = new MoveJob(board.clone(), current.clone(), next.clone());
            this.job.calculate();
        }
    }

    nextMove(): MoveDirection | undefined {
        if (this.job == null) {
            return undefined;
        }
        let move = this.job.nextMove();
        if (move == "down" || move == undefined) {
            return undefined;
        }
        return move;
    }
}

interface Play {
    score: number;
    moviments: MoveDirection[];
}

class MoveJob {
    currentBlock: Block;
    nextBlock: Block;
    map: Board;
    moviments: MoveDirection[];
    stopWorking: Boolean;
    done: Boolean;

    constructor(board: Board, current: Block, next: Block) {
        this.currentBlock = current;
        this.nextBlock = next;
        this.map = board;
        this.moviments = [];
        this.stopWorking = false;
        this.done = false;
    }

    isDone(): Boolean {
        return this.done;
    }

    cancel(): void {
        this.stopWorking = true;
    }

    nextMove(): MoveDirection | undefined {
        return this.moviments.shift();
    }

    async calculate(): Promise<void> {
        let plays = this.calculatePlays();
        let bestPlay = this.pickBestPlay(plays);
        this.moviments = bestPlay.moviments;
        this.done = true;
    }

    pickBestPlay(plays: Play[]) {
        let bestPlay = plays[0];
        for (let i = 1; i < plays.length; i++) {
            if (plays[i].score > bestPlay.score) {
                bestPlay = plays[i];
            }
        }
        return bestPlay;
    }

    calculatePlays(): Play[] {
        const width = 10;
        let plays = Array<Play>();
        const turns = ["nothing", "clockwise", "doubleClockwise", "counterClockwise"]
        for (let rotation = 0; rotation < turns.length; rotation++) {
            let currentX = this.mostLeftPossible(this.currentBlock, this.map);
            for (let i = 0; i < width; i++) {
                let currentMap = this.map.clone();
                let block = this.currentBlock.clone();
                let moviments = Array<MoveDirection>();
                this.rotate(turns[rotation], block, moviments)
                this.moveThroughBoard(currentMap, block, moviments, currentX);
                currentX++;
                plays.push({
                    score: judge.calculatePoints(currentMap),
                    moviments: moviments 
                });
            }
        }
        return plays;
    }

    moveThroughBoard(board: Board, block: Block, moviments: MoveDirection[], currentX: number): void {
        if (block.x > currentX) {
            while(block.x > currentX) {
                if(block.moveLeft(board)) {
                    moviments.push("left");
                } else {
                    break;
                }
            }
        } else if (block.x < currentX) {
            while(block.x < currentX) {
                if (block.moveRight(board)) {
                    moviments.push("right");
                } else {
                    break;
                }
            }
        }

        while(block.moveDown(board)) {
            moviments.push("down");
        }

        tools.insertBlock(board, block);
    }

    rotate(direction: string, block: Block, rotations: MoveDirection[]): void {
        switch (direction) {
            case "clockwise":
                block.spin("clockwise");
                rotations.push("clockwise");
                break;
            case "doubleClockwise":
                block.spin("clockwise");
                rotations.push("clockwise");
                block.spin("clockwise");
                rotations.push("clockwise");
                break;
            case "counterClockwise":
                block.spin("counterClockwise");
                rotations.push("counterClockwise");
                break;
            case "nothing":
            default:
                break;
        }
    }

    mostLeftPossible(block: Block, map: Board) {
        let clonedBlock = block.clone();
        let clonedMap = map.clone();
        while(clonedBlock.moveLeft(clonedMap));
        return clonedBlock.x - 2;
    }
}
