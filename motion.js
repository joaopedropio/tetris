function moveDown() {
    if ((currentBlock.y) > 0) {
        currentBlock.y--;
        if (hit(gameMap, currentBlock)) {
            currentBlock.y++;
        }
    }
}

function moveRight() {
    originalX = currentBlock.x;

    currentBlock.x++;
    for (let i = 0; i < 4; i++) {
        if (hit(gameMap, currentBlock)) {
            currentBlock.x--;
        } else {
            break;
        }
    }
}

function moveLeft() {
    currentBlock.x--;
    if (hit(gameMap, currentBlock)) {
        currentBlock.x++;
    }
}

function unmoveBlock() {
    currentBlock.y++;
}

function moveBlock() {
    currentBlock.y--;
}