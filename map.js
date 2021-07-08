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

function cloneMap(map) {
    if (map == undefined || map.length == 0)
        return undefined;

    const x = map.length;
    const y = map[0].length;
    let clone = createMap(null, x, y)

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            let square = map[i][j];
            clone[i][j] = cloneSquare(square);
        }   
    }
    return clone;
}
