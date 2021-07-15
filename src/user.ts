import { Controller } from "./controller";
import { Board } from "./board"
import { Block, MoveDirection } from "./block"


export class SingleUser implements Controller {
    private input: MoveDirection = undefined;

    constructor() {}
    
    public keyPush(evt: KeyboardEvent): void {
        switch (evt.keyCode) {
            case 68: this.input = "right";            return; // d
            case 65: this.input = "left";             return; // a
            case 83: this.input = "down";             return; // s
            case 74: this.input = "counterClockwise"; return; // j
            case 75: this.input = "clockwise";        return; // k
            default: this.input = undefined;          return;
        }
    }

    nextMove(): MoveDirection {
        if (this.input != undefined) {
            console.log("not undefined");
        }
        var move =  this.input;
        this.input = undefined;
        return move;
    }

    whereToMove(board: Board, current: Block, next: Block): void {}
    currentState(board: Board): void { }
}

export class WebSocketUser implements Controller {
    private input: MoveDirection = undefined;

    constructor() {}
    
    public keyPush(evt: KeyboardEvent): void {
        switch (evt.keyCode) {
            case 68: this.input = "right";            return; // d
            case 65: this.input = "left";             return; // a
            case 83: this.input = "down";             return; // s
            case 74: this.input = "counterClockwise"; return; // j
            case 75: this.input = "clockwise";        return; // k
            default: this.input = undefined;          return;
        }
    }

    nextMove(): MoveDirection {
        if (this.input != undefined) {
            console.log("not undefined");
        }
        var move =  this.input;
        this.input = undefined;
        return move;
    }

    whereToMove(board: Board, current: Block, next: Block): void {}
    currentState(board: Board): void { }
}

