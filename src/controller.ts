import { Block, MoveDirection } from "./block"
import { Board } from "./board"

export interface Controller {
    nextMove(): MoveDirection | undefined;
    whereToMove(board: Board, current: Block, next: Block): void;
    currentState(board: Board): void;
}

