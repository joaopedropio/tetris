import * as tools from "./tools.js"
import { Board } from "./board.js"
import { Block, MoveDirection } from "./block.js"
import * as judge from "./judge.js"

export class Bot {
    job: MoveJob | null;
    currentBlockId: tools.uuid | null;

    constructor() {
        this.job = null;
        this.currentBlockId = null;
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
        return this.job.nextMove();
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
        for (let j = 0; j < turns.length; j++) {
            let currentX = this.mostLeftPossible(this.currentBlock, this.map);
            let spinnedBlock = this.currentBlock.clone();
            let rotations = Array<MoveDirection>();
            this.rotate(turns[j], spinnedBlock, rotations)
            for (let i = 0; i < width; i++) {
                let moviments = Array<MoveDirection>();
                for (let k = 0; k < rotations.length; k++) {
                    moviments.push(rotations[k]);
                }
                let currentMap = this.map.clone();
                let block = spinnedBlock.clone();

                if (block.x > currentX) {
                    while(block.x > currentX) {
                        if(block.moveLeft(currentMap)) {
                            moviments.push("left");
                        } else {
                            break;
                        }
                    }
                } else if (block.x < currentX) {
                    while(block.x < currentX) {
                        if (block.moveRight(currentMap)) {
                            moviments.push("right");
                        } else {
                            break;
                        }
                    }
                }
                currentX++;
        
                while(block.moveDown(currentMap)) {
                    moviments.push("down");
                }

                tools.insertBlock(currentMap, block);

                let points = judge.calculatePoints(currentMap);
                plays.push({
                    score: points,
                    moviments: moviments 
                });
            }
        }
        return plays;
    }

    rotate(direction: string, block: Block, rotations: MoveDirection[]) {
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
        while(clonedBlock.moveLeft(clonedMap)) {
            if (clonedBlock.x < -5) {
                break;
            }
        }
        return clonedBlock.x;
    }
}
