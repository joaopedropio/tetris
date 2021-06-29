// board size
const width = 10;
const height = 20;
const squareSize = 20;
const backGroundColor = "black";

//
let currentBlock = setNewBlock();
//
let gameMap = createMap(emptySquare(), width, height);

// timer
let count = 0;
let cycles = 100;

// input
let input = ""

// curent hit
let currentHitX = 0;
let currentHitY = 0;

// score
let score = 0;

function gameLoop(context) {
    handleInput();
    if (wait()) {
        return;
    }
    moveBlock();
    if (hit(gameMap, currentBlock)) {
        if (lost()) {
            gameMap = createMap(emptySquare(), width, height);
            score = 0;
            return;
        }
        unmoveBlock();
        insertBlock(gameMap, currentBlock);
        removeFilledRows(gameMap);
        increaseScore("lockedBlock");
        currentBlock = setNewBlock();
    }
    let clonedMap = cloneMap(gameMap);
    insertBlock(clonedMap, currentBlock);
    drawMap(context, clonedMap, width, height, squareSize);
    drawScore();
}

function drawScore() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 200, 10);
    drawString(context, "Score:" + score);
}

function increaseScore(reason, count) {
    switch (reason) {
        case "lockedBlock":
            score += height - currentHitY;
            break;
        case "deletedRows":
            switch (count) {
                case 1: score += 40;   break;
                case 2: score += 100;  break;
                case 3: score += 300;  break;
                case 4: score += 1200; break;
                default:               break;
            }
            break;
        default:
            break;
    }
}

function removeFilledRows(map) {
    let rowsFilledCount = 0;
    for (let i = 0; i < height - 1; i++) {
        if (isRowFilled(map, i)) {
            shiftRows(map, i + 1, height - 1)
            rowsFilledCount++;
            i--;
        }
    }
    if (rowsFilledCount > 0) {
        increaseScore("deletedRows", rowsFilledCount);
    }
}

function shiftRows(map, startRow, endRow) {
    for (let y = startRow; y < endRow; y++) {
        for (let x = 0; x < width; x++) {
            map[x][y - 1] = map[x][y]
        }
    }
}

function isRowFilled(map, row) {
    for (let i = 0; i < width; i++) {
       if (map[i][row].empty) {
           return false;
       }
    }
    return true;
}

function lost() {
    return currentHitY > height - 2;
}

function hit(map, block) {
    for (let x = 0; x < block.mapSize; x++) {
        for (let y = 0; y < block.mapSize; y++) {
            let mapSquare;
            if (block.y + y >= height) {
                mapSquare = emptySquare();
            } else if (block.y + y < 0 || block.y + y >= height ||
                       block.x + x < 0 || block.x + x >= width) {
                mapSquare = createSquare("black");
            } else {
                mapSquare = map[block.x + x][block.y + y];
            }

            const blockSquare = block.map()[x][y];

            if (block.y + y >= height) {
                break;
            }

            if (mapSquare == undefined || blockSquare == undefined)
                console.log("fudeu");

            if (mapSquare.empty == false && blockSquare.empty == false) {
                currentHitX = block.x + x;
                currentHitY = block.y + y;
                return true;
            }
        }
    }
    return false;
}

function handleInput() {
    if (input == "") {
        return;
    }

    if (input == "clockwise" || input == "counterClockwise") {
        currentBlock.spin(input);
    }

    if (input == "left") {
        moveLeft();
    }

    if (input == "down") {
        moveDown();
    }

    if (input == "right") {
        moveRight();
    }
    let clonedMap = cloneMap(gameMap);
    insertBlock(clonedMap, currentBlock);
    drawMap(context, clonedMap, width, height, squareSize);
    input = "";
}

function setNewBlock() {
    let block = randomBlock();
    block.y = height;
    block.x = Math.floor(width / 2) - 2;
    return block;
}

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

function insertBlock(map, block) {
    for (let i = 0; i < block.mapSize; i++) {
        for (let j = 0; j < block.mapSize; j++) {
            let currentSquare = block.map()[i][j];
            if (!currentSquare.empty) {
                map[block.x + i][block.y + j] = currentSquare;
            }
        }
    }
}

function randomBlock() {
    const blocks = [
        IBlock(),
        JBlock(),
        LBlock(),
        OBlock(),
        SBlock(),
        TBlock(),
        ZBlock()
    ]
    const index = Math.floor(Math.random() * 10) % 7;
    return blocks[index];
}

function wait() {
    if (count == 0) {
        count++
        return false;
    }

    if (count > cycles) {
        count = 0;
        return true;
    }

    count++
    return true;
}

function keyPush(evt) {
    switch (evt.keyCode) {
        case 68: input = "right";            break; // d
        case 65: input = "left";             break; // a
        case 83: input = "down";             break; // s
        case 74: input = "counterClockwise"; break; // j
        case 75: input = "clockwise";        break; // k
        default: input = "";                 break;
    }
}