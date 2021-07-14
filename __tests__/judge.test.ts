import * as judge from "../src/judge";
import * as tools from "../src/tools";

describe('test holes', () => {
    test('1 hole', () => {
        // Arrange
        let board = ["----",
                     "----",
                     "-rr-",
                     "rr--"]

        // Act
        let holes = judge.holes(tools.convertToBoard(board));

        // Assert
        expect(holes).toBe(1);
    });
    test('0 holes', () => {
        // Arrange
        let board = ["----",
                     "----",
                     "----",
                     "rrrr"]

        // Act
        let holes = judge.holes(tools.convertToBoard(board));

        // Assert
        expect(holes).toBe(0);
    });
    test('2 holes', () => {
        // Arrange
        let board = ["----",
                     "----",
                     "-rr-",
                     "r--r"]

        // Act
        let holes = judge.holes(tools.convertToBoard(board));

        // Assert
        expect(holes).toBe(2);
    });
    test('4 holes', () => {
        // Arrange
        let board = ["----",
                     "-rr-",
                     "-rr-",
                     "r--r"]

        // Act
        let holes = judge.holes(tools.convertToBoard(board));

        // Assert
        expect(holes).toBe(4);
    });
});

describe('testing filledRows', () => {
    test('2 rows', () => {
        // Arrange
        let board = ["----",
                     "aaaa",
                     "-bb-",
                     "rrrr"];

        // Act
        let filledRows = judge.filledRows(tools.convertToBoard(board));
        
        // Assert
        expect(filledRows).toBe(2);
    });
    test('1 row', () => {
        // Arrange
        let board = ["----",
                     "----",
                     "----",
                     "rrrr"];

        // Act
        let filledRows = judge.filledRows(tools.convertToBoard(board));
        
        // Assert
        expect(filledRows).toBe(1);
    });
    test('almost 1 row', () => {
        // Arrange
        let board = ["----",
                     "----",
                     "----",
                     "-rrr"];

        // Act
        let filledRows = judge.filledRows(tools.convertToBoard(board));
        
        // Assert
        expect(filledRows).toBe(0);
    });
    test('0 rows', () => {
        // Arrange
        let board = ["----",
                     "----",
                     "----",
                     "----"];

        // Act
        let filledRows = judge.filledRows(tools.convertToBoard(board));
        
        // Assert
        expect(filledRows).toBe(0);
    });
});

describe('testing test tools', () => {
    test('assuring that convertion works both ways', () => {
        // Arrange
        let board1 = ["----",
                      "----",
                      "-rr-",
                      "rr--"];

        // Act
        let board2 = tools.convertToStringArray(tools.convertToBoard(board1));
        
        // Assert
        expect(tools.sameBoard(board1, board2)).toBeTruthy();
    });
});
