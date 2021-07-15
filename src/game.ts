import * as tools from "./tools"
import { Drawer } from "./drawing"
import { Board } from "./board";
import { Block, MoveDirection } from "./block"
import { Controller } from "./controller";

// board size
const width = 10;
const height = 20;
const squareSize = 24;

// timer
let count = 0;
let cycles = 10;

// score
// let score = 0;
let firstLoop = 0;


type InscreaseScoreReason =  "lockedBlock" | "deletedRows";

export class Game {
    //input: string = "";
    drawer: Drawer;
    currentBlock: Block = this.setNewBlock();
    nextBlock: Block = this.setNewBlock();
    gameMap = Board.new(width, height);

    score: number = 0;
    highestScore: number = 0;

    constructor(ctx: CanvasRenderingContext2D, private controller: Controller) {
        this.drawer = new Drawer(ctx);
        this.initialize();
    }

    private initialize() {
        if (firstLoop != 0) {
            return;
        }
        this.drawer.drawNextBlock(this.nextBlock);
        this.drawer.drawScore(this.score);
        this.drawer.drawHighestScore(this.highestScore);
        this.controller.whereToMove(this.gameMap, this.currentBlock, this.nextBlock);
        firstLoop++;
    }

    public loop() {
        this.move(this.currentBlock, this.controller.nextMove());
        if (this.wait()) {
            return;
        }
        this.currentBlock.moveBlock();
        let [hit, hitX, hitY] = tools.hit(this.gameMap, this.currentBlock);
        if (hit) {
            if (this.lost(hitX, hitY)) {
                this.gameMap = Board.new(width, height);
                this.setHighestScore();
                this.score = 0;
                return;
            }
            this.currentBlock.unmoveBlock();
            tools.insertBlock(this.gameMap, this.currentBlock);
            this.removeFilledRows(this.gameMap, hitY);
            this.increaseScore("lockedBlock", hitY);
            this.currentBlock = this.nextBlock;
            this.nextBlock = this.setNewBlock();
            this.drawer.drawNextBlock(this.nextBlock);
            this.drawer.drawScore(this.score);
            this.controller.whereToMove(this.gameMap, this.currentBlock, this.nextBlock);
        }
        let clonedMap = this.gameMap.clone();
        tools.insertBlock(clonedMap, this.currentBlock);
        this.drawer.drawMap(clonedMap, width, height, squareSize);
    }
    
    private setHighestScore(): void {
        if (this.score > this.highestScore) {
            this.highestScore = this.score;
        }
        this.drawer.drawHighestScore(this.highestScore);
    }

    private move(block: Block, direction: MoveDirection) {
        if (direction == undefined) {
            return;
        }
    
        if (direction == "clockwise" || direction == "counterClockwise") {
            block.spin(direction);
        }
    
        if (direction == "left") {
            block.moveLeft(this.gameMap);
        }
    
        if (direction == "down") {
            block.moveDown(this.gameMap);
        }
    
        if (direction == "right") {
            block.moveRight(this.gameMap);
        }
    
        let clonedMap = this.gameMap.clone();
        tools.insertBlock(clonedMap, block);
        this.drawer.drawMap(clonedMap, width, height, squareSize);
    }

    private increaseScore(reason: InscreaseScoreReason, hitY: number, count?: number): void {
        switch (reason) {
            case "lockedBlock":
                this.score += height - hitY;
                break;
            case "deletedRows":
                switch (count) {
                    case 1: this.score += 40;   break;
                    case 2: this.score += 100;  break;
                    case 3: this.score += 300;  break;
                    case 4: this.score += 1200; break;
                    default:               break;
                }
                break;
            default:
                break;
        }
    }
    
    private removeFilledRows(map: Board, hitY: number): void {
        let rowsFilledCount = 0;
        for (let i = 0; i < height - 1; i++) {
            if (tools.isRowFilled(map, i)) {
                this.shiftRows(map, i + 1, height - 1)
                rowsFilledCount++;
                i--;
            }
        }
        if (rowsFilledCount > 0) {
            this.increaseScore("deletedRows", hitY, rowsFilledCount);
        }
    }
    
    private shiftRows(map: Board, startRow: number, endRow: Number): void {
        for (let y = startRow; y < endRow; y++) {
            for (let x = 0; x < width; x++) {
                map.setSquare(x, y - 1, map.getSquare(x, y));
            }
        }
    }
    
    private lost(hitX: number, hitY: number): Boolean {
        return hitY > height - 2;
    }

    private setNewBlock(): Block {
        let block = Block.random();
        block.y = height;
        block.x = Math.floor(width / 2) - 2;
        return block;
    }
    
    private wait(): boolean {
        if (count == 0) {
            count++
            return false;
        }
    
        if (count > cycles) {
            count = 0;
            return true;
        }
    
        count++
        return true;
    }
}
