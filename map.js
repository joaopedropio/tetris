// square border
const border = 2;

// map square
const borderWidth = 10;

// offsets to place game a little down
const yOffset = 80;
const xOffset = 0 + borderWidth;

function createMap(value, x, y) {
    var map = Array(x);
    for (let i = 0; i < x; i++) {
        map[i] = Array(y);
        for (let j = 0; j < y; j++) {
            map[i][j] = value;
        }
    }
    return map;
}
