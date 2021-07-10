function handleInput(context: CanvasRenderingContext2D) {
    if (inputInterface == "human") {
        if (input != "" || input != undefined) {
            move(context, currentBlock, input);
        }
    }

    if (inputInterface == "bot") {
        let direction = bot.nextMove();
        if (direction != undefined && direction != "down") {
            move(context, currentBlock, direction);
        }
    }
    input = "";
}

function move(context: CanvasRenderingContext2D, block: Block, direction: MoveDirection) {
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

    let clonedMap = cloneBoard(gameMap);
    insertBlock(clonedMap, block);
    drawMap(context, clonedMap, width, height, squareSize);
}
