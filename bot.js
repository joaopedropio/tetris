class Bot {
    constructor() {
        this.job = undefined;
        this.currentBlockId = undefined;
    }

    whereToMove(board, current, next) {
        if (this.currentBlockId == undefined) {
            this.currentBlockId = current.id;
        }

        if (this.job == undefined) {
            this.job = new MoveJob(cloneMap(board), cloneBlock(current), cloneBlock(next));
            this.job.calculate();
        }

        if (this.currentBlockId != current.id) {
            if (!this.job.isDone) {
                this.job.cancel();
            }
            this.currentBlockId = current.id;
            this.job = new MoveJob(cloneMap(board), cloneBlock(current), cloneBlock(next));
            this.job.calculate();
        }
    }

    nextMove() {
        return this.job.nextMove();
    }
}

class MoveJob {
    constructor(board, current, next) {
        this.currentBlock = current;
        this.nextBlock = next;
        this.map = board;
        this.moviments = [];
        this.stopWorking = false;
        this.done = false;
    }

    isDone() {
        return this.done;
    }

    cancel() {
        this.stopWorking = true;
    }

    nextMove() {
        return this.moviments.shift();
    }

    async calculate() {
        let plays = this.calculatePlays();
        let bestPlay = this.pickBestPlay(plays);
        this.moviments = bestPlay.moviments;
        this.done = true;
    }

    pickBestPlay(plays) {
        let bestPlay = plays[0];
        for (let i = 1; i < plays.length; i++) {
            if (plays[i].score > bestPlay.score) {
                bestPlay = plays[i];
            }
        }
        return bestPlay;
    }

    calculatePlays() {
        const width = 10;
        let plays = [];
        let currentX = this.mostLeftPossible(this.currentBlock, this.map);

        const turns = ["nothing", "clockwise", "doubleClockwise", "counterClockwise"]
        for (let j = 0; j < turns.length; j++) {
            let spinnedBlock = cloneBlock(this.currentBlock);
            let rotations = [];
            switch (turns[j]) {
                case "clockwise":
                    spinnedBlock.spin("clockwise");
                    rotations.push("clockwise");
                    break;
                case "doubleClockwise":
                    spinnedBlock.spin("clockwise");
                    rotations.push("clockwise");
                    spinnedBlock.spin("clockwise");
                    rotations.push("clockwise");
                    break;
                case "counterClockwise":
                    spinnedBlock.spin("counterClockwise");
                    rotations.push("counterClockwise");
                    break;
                case "nothing":
                default:
                    break;
            }
            for (let i = 0; i < width; i++) {
                let moviments = [];
                for (let k = 0; k < rotations.length; k++) {
                    moviments.push(rotations[k]);
                }
                let currentMap = cloneMap(this.map);
                let block = cloneBlock(spinnedBlock);

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

                insertBlock(currentMap, block);

                let points = calculatePoints(currentMap);
                plays.push({
                    score: points,
                    moviments: moviments 
                });
            }
        }
        return plays;
    }

    mostLeftPossible(block, map) {
        let clonedBlock = cloneBlock(block);
        let clonedMap = cloneMap(map);
        while(clonedBlock.moveLeft(clonedMap)) {
            if (clonedBlock.x < -5) {
                break;
            }
        }
        return clonedBlock.x;
    }
}
