function cloneSquare(square) {
    return {
        empty: square.empty,
        color: square.color
    }
}

function createSquare(color) {
    return {
        empty: false,
        color: color
    }
}

function emptySquare() {
    return {
        empty: true,
        color: "black"
    }
}

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

function drawMap(context, map, width, height, squareSize) {
    const backGroundColor = "black";
    drawBackground(context, width, height, squareSize, backGroundColor);
    drawSquares(context, map, width, height, squareSize);
}

function drawSquares(context, map, width, height, squareSize) {
    for (let y = height - 1; y >= 0; y--) {
        for (let x = 0; x < width; x++) {
            const current = map[x][y];
            if (current == undefined)
                console.log("fudeu");
            pixels = calculateSquarePixels(x, y, width, height, squareSize);
            drawSquare(context, pixels, current.color);
        }
    }
}

function calculateSquarePixels(x, y, width, height, squareSize) {
    return {
        startX: x * squareSize,
        startY: (height - y - 1) * squareSize,
        endX: squareSize,
        endY: squareSize
    }
}

function drawBackground(context, width, height, squareSize, color) {
    context.fillStyle = color;
    context.fillRect(0, 0, width * squareSize, height * squareSize);
}

function drawSquare(context, squarePixels, color) {
    const startX = squarePixels.startX;
    const startY = squarePixels.startY;
    const endX = squarePixels.endX;
    const endY = squarePixels.endY;

    context.fillStyle = "black";
    context.fillRect(startX, startY, endX, endY);
    context.fillStyle = color;
    context.fillRect(startX + 2, startY + 2, endX + 2, endY + 2);
}
