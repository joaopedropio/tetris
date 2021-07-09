function handleInput() {
    if (inputInterface == "human") {
        move(currentBlock, input);
    }

    if (inputInterface == "bot") {
        let direction = bot.nextMove();
        if (direction != undefined && direction != "down") {
            move(currentBlock, direction);
        }
    }
    input = "";
}

function move(block, direction) {
    if (direction == "" || direction == undefined) {
        return;
    }

    if (direction == "clockwise" || direction == "counterClockwise") {
        block.spin(direction);
    }

    if (direction == "left") {
        block.moveLeft(gameMap);
    }

    if (direction == "down") {
        block.moveDown(gameMap);
    }

    if (direction == "right") {
        block.moveRight(gameMap);
    }

    let clonedMap = cloneMap(gameMap);
    insertBlock(clonedMap, block);
    drawMap(context, clonedMap, width, height, squareSize);
}
