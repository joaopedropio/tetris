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
            if (plays[i].points > bestPlay.points) {
                bestPlay = plays[i];
            }
        }
        return bestPlay;
    }

    calculatePlays() {
        const width = 10;
        let plays = [];
        let currentX = -10;
        for (let i = 0; i < width; i++) {
            let currentMap = cloneMap(this.map);
            let moviments = [];
            let block = cloneBlock(this.currentBlock);

            block.moveDown(currentMap);
            block.moveDown(currentMap);
            moviments.push("down");
            moviments.push("down");

            if (block.x > currentX) {
                while(block.moveLeft(currentMap)) {
                    if (block.x < -5) {
                        return plays;
                    }
                    moviments.push("left");
                }
            } else if (currentX > block.x) {
                if (block.moveRight(currentMap)) {
                    moviments.push("right");
                } else {
                    return plays;
                }
            }
            currentX = block.x + 1;
    
            while(block.moveDown(currentMap)) {
                if (block.y < -5) {
                    return plays;
                }
                moviments.push("down");
            }

            insertBlock(currentMap, block);

            score = this.calculatePoints(currentMap);
            plays.push({
                score: score,
                moviments: moviments 
            });
        }

        return plays;
    }

    calculatePoints(map) {
        return getRandomInt(0, 1000);
    }
}
