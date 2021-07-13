import { Color, Board } from "./board.js"
import { Block } from "./block.js"
import * as Charset from "./charset.js"

interface SquarePixels {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export class Drawer {
    private readonly width = 10;
    private readonly height = 20;

    // square border
    private readonly squareBorder = 3;

    // map square
    private readonly boardBorder = 10;
    private readonly halfBoardBorder = this.boardBorder / 2;

    // offsets to place game a little down
    private readonly yOffset = 20;
    private readonly xOffset = 0;

    private readonly squareSize = 24;

    constructor(
        // width: number,
        // height: number,
        // squareSize: number,
        // squareBorder: number,
        // boardBorder: number,
        // xOffset: number,
        // yOffset: number
        private ctx: CanvasRenderingContext2D
        ) {

    }

    public drawNextBlock(block: Block): void {
        let offsetY = 0;
        let offsetX = (this.width * this.squareSize) + (this.boardBorder * 3); // 420
    
        this.drawString(this.ctx, " Next", offsetX, offsetY);
    
    
        this.ctx.fillStyle = "block";
        this.ctx.fillRect(
            offsetX + (this.squareSize / 2),
            this.squareBorder + this.yOffset + this.squareSize,
            this.squareSize * 4,
            this.squareSize * 2);
        
        
        const map = block.map();
        if (map.width == 3) {
            offsetX += this.squareSize / 2;
        }
    
        for (let y = 1; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                let color = map.getSquare(x, map.height - y).color;
                if (block.name == "O-Block") {
                    color = map.getSquare(x, map.height - y - 1).color;
                }
                let pixels = this.calculateSquarePixelsForNextBlock(x, y, this.squareSize, offsetX, offsetY);
                this.drawSquareForNextBlock(pixels, color);
            }
        }
    }

    public drawHighestScore(highestScore: number): void {
        let offsetY = 150;
        let offsetX = (this.width * this.squareSize) + (this.boardBorder * 3); // 420

        this.drawString(this.ctx, "Highest: " + highestScore.toString(), offsetX, offsetY);
    }

    public drawMap(map: Board, width: number, height: number, squareSize: number) {
        this.drawSquares(map, width, height, squareSize);
        this.drawMapBorder(width, height, squareSize);
    }

    public drawScore(score: number) {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 200, 10);
        this.drawString(this.ctx, "Score:" + score, 0, 0);
    }

    private drawString(context: CanvasRenderingContext2D, n: string, offsetX: number, offsetY: number) {
        const chars = n.split('');
        const offsetNextChar = 6;
        const size = 2;
        for (let i = 0; i < chars.length; i++) {
            this.drawChar(context, chars[i], i * offsetNextChar, size, offsetX, offsetY);
        }
    }
    
    private drawChar(context: CanvasRenderingContext2D, c: string, offsetNextChar: number, size: number, offsetX: number, offsetY: number) {
        const ch = Charset.matrix(c);
        for (let x = 1; x < 7; x++) {
            for (let y = 1; y < 9; y++) {
                let pixel = ch[y][x];
                if (pixel == 1) {
                    context.fillStyle = "white";
                } else {
                    context.fillStyle = "black";
                }
                context.fillRect(((x + offsetNextChar) * size) + offsetX, (y * size) + offsetY, ((x + offsetNextChar) * size) + offsetX, (y * size) + offsetY);
            }
        }
    }
    
    private drawMapBorder(width: number, height: number, squareSize: number) {
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = this.boardBorder;
        this.ctx.strokeRect(
            this.xOffset + this.halfBoardBorder,
            this.yOffset + this.halfBoardBorder,
            (this.width * this.squareSize) + this.boardBorder + this.squareBorder,
            (this.height * this.squareSize) + this.boardBorder + this.squareBorder);
    }

    private drawSquares(map: Board, width: number, height: number, squareSize: number) {
        for (let y = this.height - 1; y >= 0; y--) {
            for (let x = 0; x < this.width; x++) {
                const current = map.getSquare(x, y);
                const pixels = this.calculateSquarePixels(x, y, this.width, this.height, this.squareSize);
                this.drawSquare(pixels, current.color);
            }
        }
    }

    private calculateSquarePixels(x: number, y: number, width: number, height: number, squareSize: number): SquarePixels {
        return {
            startX: x * this.squareSize,
            startY: (this.height - y - 1) * this.squareSize,
            endX: squareSize,
            endY: squareSize
        }
    }
    
    private calculateSquarePixelsForNextBlock(x: number, y: number, squareSize: number, offsetX: number, offsetY: number) {
        return {
            startX: (x * this.squareSize) + offsetX,
            startY: (y * this.squareSize) + offsetY,
            endX: squareSize,
            endY: squareSize
        }
    }

    private drawSquare(squarePixels: SquarePixels, color: Color) {
        const startX = squarePixels.startX;
        const startY = squarePixels.startY;
        const endX = squarePixels.endX;
        const endY = squarePixels.endY;
    
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            this.boardBorder + startX + this.squareBorder + this.xOffset,
            this.boardBorder + startY + this.squareBorder + this.yOffset,
            endX - this.squareBorder,
            endY - this.squareBorder);
    }
    
    private drawSquareForNextBlock(squarePixels: SquarePixels, color: Color) {
        const startX = squarePixels.startX;
        const startY = squarePixels.startY;
        const endX = squarePixels.endX;
        const endY = squarePixels.endY;
    
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            this.boardBorder + startX + this.squareBorder + this.xOffset,
            startY + this.squareBorder + this.yOffset,
            endX - this.squareBorder,
            endY - this.squareBorder);
    }
}
