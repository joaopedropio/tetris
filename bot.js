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

        if (this.currentBlockId != current.id && !this.job.isDone) {
            this.job.cancel();
            this.job = new MoveJob(cloneMap(board), cloneBlock(current), cloneBlock(next));
            this.job.calculate();
        }

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

    calculate() {
        // logic here


        this.done = true;
    }
}
