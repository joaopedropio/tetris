function handleInput() {
    if (inputInterface == "human") {
        move(input);
    }

    if (inputInterface == "bot") {
        let direction = bot.whereToMove(gameMap, currentBlock, nextBlock)
        move(direction);
    }
}

function move(direction) {
    if (direction == "" || direction == undefined) {
        return;
    }

    if (direction == "clockwise" || direction == "counterClockwise") {
        currentBlock.spin(direction);
    }

    if (direction == "left") {
        moveLeft();
    }

    if (direction == "down") {
        moveDown();
    }

    if (direction == "right") {
        moveRight();
    }
    let clonedMap = cloneMap(gameMap);
    insertBlock(clonedMap, currentBlock);
    drawMap(context, clonedMap, width, height, squareSize);
    input = "";
}