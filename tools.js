// square border
const border = 2;

// map square
const borderWidth = 10;

// offsets to place game a little down
const yOffset = 80;
const xOffset = 0 + borderWidth;

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
    drawSquares(context, map, width, height, squareSize);
    drawMapBorder(context, width, height, squareSize);
}

function drawMapBorder(context, width, height, squareSize) {
    const halfBorder = borderWidth / 2;
    context.strokeStyle = "white";
    context.lineWidth = borderWidth;
    context.strokeRect(xOffset + border - halfBorder, yOffset - halfBorder, (width * squareSize) + xOffset, ((height - 1) * squareSize) + yOffset - 45);

    context.strokeStyle = "black";
    context.lineWidth = border;
    context.strokeRect(xOffset + border, yOffset, (width * squareSize) + xOffset - borderWidth , ((height - 1) * squareSize) + yOffset - 55);

    // fix "leaking squares to the right"
    context.strokeStyle = "black";
    context.lineWidth = borderWidth;
    context.beginPath();
    context.moveTo((width * squareSize) + xOffset + borderWidth + halfBorder + 2, yOffset);
    context.lineTo((width * squareSize) + xOffset + borderWidth + halfBorder + 2, (height * squareSize) + yOffset + borderWidth);
    context.closePath();
    context.stroke();

    // fix "leaking squares to the bottom"
    context.strokeStyle = "black";
    context.lineWidth = borderWidth * 2;
    context.beginPath();
    context.moveTo(xOffset , (height * squareSize) + yOffset + (borderWidth * 2));
    context.lineTo((width * (squareSize + 2)) + xOffset , (height * squareSize) + yOffset + (borderWidth * 2));
    context.closePath();
    context.stroke();
}

function drawSquares(context, map, width, height, squareSize) {
    for (let y = height - 1; y >= 0; y--) {
        for (let x = 0; x < width; x++) {
            const current = map[x][y];
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

function calculateSquarePixelsWithOffset(x, y, squareSize, offsetX, offsetY, blockSize) {
    return {
        startX: (x * squareSize) + offsetX,
        startY: (y * squareSize) + offsetY,
        endX: squareSize,
        endY: squareSize
    }
}

function drawSquare(context, squarePixels, color) {
    const startX = squarePixels.startX;
    const startY = squarePixels.startY;
    const endX = squarePixels.endX;
    const endY = squarePixels.endY;

    context.fillStyle = "black";
    context.fillRect(startX + xOffset, startY + yOffset, endX + xOffset, endY + yOffset);
    context.fillStyle = color;
    context.fillRect(startX + border + xOffset, startY + border + yOffset, endX + border + xOffset, endY + border + yOffset);
}
