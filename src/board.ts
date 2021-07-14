export type Color = "aqua" | "blue" | "orange" | "yellow" | "lime" | "fuchsia" | "red" | "black" | "white";

export class Square {
    private constructor(public empty: boolean, public color: Color) { }

    static new(color: Color) {
        return new Square(false, color);
    }

    clone(): Square {
        return new Square(this.empty, this.color);
    }

    static empty() {
        return new Square(true, "black");
    }
}

export class Board {
    map: Square[][];

    private constructor(value: Square, readonly width: number, readonly height: number) {
        var map = Array(width);
        for (let i = 0; i < width; i++) {
            map[i] = Array(height);
            for (let j = 0; j < height; j++) {
                map[i][j] = value;
            }
        }
        this.map = map;
    }

    static new(width: number, height: number) {
        return new Board(Square.empty(), width, height);
    }

    static empty() {
        return this.new(0, 0);
    }

    clone() {
        if (this.width == 0 || this.height == 0)
            return Board.empty();

        let clone = Board.new(this.width, this.height); 
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let square = this.getSquare(i, j);
                clone.setSquare(i, j, square.clone());
            }   
        }
        return clone;
    }

    getSquare(x: number, y: number): Square {
        if (x < 0 || x >= this.width || y < 0) {
            return Square.new("black");
        }

        if (y >= this.height) {
            return Square.empty();
        }
        
        return this.map[x][y];
    }

    setSquare(x: number, y: number, square: Square): void {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return;
        }

        this.map[x][y] = square;
    }
}
