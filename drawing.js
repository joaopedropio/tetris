function drawNextBlock(block) {
    context.fillStyle = "black";
    context.fillRect(420, 0, 100, 200);
    drawString(context, " Next", 425, 190);

    context.fillStyle = "black";
    context.fillRect(420, 210, 100, 60);

    const map = block.map();
    let offsetY = 170;
    let offsetX = 420;
    if (map.length == 3) {
        offsetX += 10
    }
    let ln = map.length;
    for (let y = 1; y <= ln; y++) {
        for (let x = 0; x <= ln; x++) {
            let color = ""
            if (x == ln || y == ln) {
                color = "black"
            } else {
                color = map[x][ln - y].color;
            }
            let pixels = calculateSquarePixelsWithOffset(x, y, squareSize, offsetX, offsetY, ln);
            drawSquare(context, pixels, color);
        }
    }

}

function drawScore() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 200, 10);
    drawString(context, "Score:" + score, 0, 0);
}

function drawMap(context, map, width, height, squareSize) {
    drawSquares(context, map, width, height, squareSize);
    drawMapBorder(context, width, height, squareSize);
}

function drawMapBorder(context, width, height, squareSize) {
    const halfBorder = borderWidth / 2;
    context.strokeStyle = "white";
    context.lineWidth = borderWidth;
    context.strokeRect(xOffset + border - halfBorder, yOffset - halfBorder, (width * squareSize) + xOffset, ((height - 1) * squareSize) + yOffset - 30);

    context.strokeStyle = "black";
    context.lineWidth = border;
    context.strokeRect(xOffset + border, yOffset, (width * squareSize) + xOffset - borderWidth , ((height - 1) * squareSize) + yOffset - 40);

    // fix "leaking squares to the right"
    context.strokeStyle = "black";
    context.lineWidth = borderWidth;
    context.beginPath();
    context.moveTo((width * squareSize) + xOffset + borderWidth + halfBorder, yOffset);
    context.lineTo((width * squareSize) + xOffset + borderWidth + halfBorder, (height * squareSize) + yOffset + borderWidth);
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
