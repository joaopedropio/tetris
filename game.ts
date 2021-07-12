import * as tools from "./tools.js"
import { Drawer } from "./drawing.js"
import { Board } from "./board.js";
import { Block, MoveDirection } from "./block.js"
import { Bot } from "./bot.js"


// board size
const width = 10;
const height = 20;
const squareSize = 24;
const backGroundColor = "black";

//


//

// timer
let count = 0;
let cycles = 10;

// input
// let inputInterface = "human";
let inputInterface = "bot";
let input: MoveDirection = "";

// curent hit
let currentHitX = 0;
let currentHitY = 0;

// score
// let score = 0;
let firstLoop = 0;

// bot
const bot = new Bot();



type InscreaseScoreReason =  "lockedBlock" | "deletedRows";

export class Game {
    input: string = "";
    drawer: Drawer;
    currentBlock: Block = this.setNewBlock();
    nextBlock: Block = this.setNewBlock();
    gameMap = Board.new(width, height);

    score: number = 0;

    constructor(ctx: CanvasRenderingContext2D) {
        this.drawer = new Drawer(ctx);
        this.initialize();
    }

    private initialize() {
        if (firstLoop != 0) {
            return;
        }
        this.drawer.drawNextBlock(this.nextBlock);
        this.drawer.drawScore(this.score);
        bot.whereToMove(this.gameMap, this.currentBlock, this.nextBlock);
        firstLoop++;
    }

    public keyPush(evt: KeyboardEvent): void {
        switch (evt.keyCode) {
            case 68: this.input = "right";            break; // d
            case 65: this.input = "left";             break; // a
            case 83: this.input = "down";             break; // s
            case 74: this.input = "counterClockwise"; break; // j
            case 75: this.input = "clockwise";        break; // k
            default: this.input = "";                 break;
        }
    }

    public loop() {
        this.handleInput();
        if (this.wait()) {
            return;
        }
        this.currentBlock.moveBlock();
        if (tools.hit(this.gameMap, this.currentBlock)[0]) {
            if (this.lost()) {
                this.gameMap = Board.new(width, height);
                this.score = 0;
                return;
            }
            this.currentBlock.unmoveBlock();
            tools.insertBlock(this.gameMap, this.currentBlock);
            this.removeFilledRows(this.gameMap);
            this.increaseScore("lockedBlock");
            this.currentBlock = this.nextBlock;
            this.nextBlock = this.setNewBlock();
            this.drawer.drawNextBlock(this.nextBlock);
            this.drawer.drawScore(this.score);
            bot.whereToMove(this.gameMap, this.currentBlock, this.nextBlock);
        }
        let clonedMap = this.gameMap.clone();
        tools.insertBlock(clonedMap, this.currentBlock);
        this.drawer.drawMap(clonedMap, width, height, squareSize);
    }

    private handleInput() {
        if (inputInterface == "human") {
            if (input != "" || input != undefined) {
                this.move(this.currentBlock, input);
            }
        }
    
        if (inputInterface == "bot") {
            let direction = bot.nextMove();
            if (direction != undefined && direction != "down") {
                this.move(this.currentBlock, direction);
            }
        }
        input = "";
    }
    
    private move(block: Block, direction: MoveDirection) {
        if (direction == "" || direction == undefined) {
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

    private increaseScore(reason: InscreaseScoreReason, count?: number): void {
        switch (reason) {
            case "lockedBlock":
                this.score += height - currentHitY;
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
    
    private removeFilledRows(map: Board): void {
        let rowsFilledCount = 0;
        for (let i = 0; i < height - 1; i++) {
            if (tools.isRowFilled(map, i)) {
                this.shiftRows(map, i + 1, height - 1)
                rowsFilledCount++;
                i--;
            }
        }
        if (rowsFilledCount > 0) {
            this.increaseScore("deletedRows", rowsFilledCount);
        }
    }
    
    private shiftRows(map: Board, startRow: number, endRow: Number): void {
        for (let y = startRow; y < endRow; y++) {
            for (let x = 0; x < width; x++) {
                map.setSquare(x, y - 1, map.getSquare(x, y));
            }
        }
    }
    
    private lost(): Boolean {
        return currentHitY > height - 2;
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
