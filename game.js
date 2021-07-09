// board size
const width = 10;
const height = 20;
const squareSize = 40;
const backGroundColor = "black";

//
let currentBlock = setNewBlock();
let nextBlock = setNewBlock();

//
let gameMap = createMap(emptySquare(), width, height);

// timer
let count = 0;
let cycles = 10;

// input
// let inputInterface = "human";
let inputInterface = "bot";
let input = "";

// curent hit
let currentHitX = 0;
let currentHitY = 0;

// score
let score = 0;
let firstLoop = 0;

// bot
const bot = new Bot();

function initialize() {
    if (firstLoop != 0) {
        return;
    }
    drawNextBlock(nextBlock);
    drawScore();
    bot.whereToMove(gameMap, currentBlock, nextBlock);
    firstLoop++;
}

function gameLoop(context) {
    initialize();
    handleInput();
    if (wait()) {
        return;
    }
    currentBlock.moveBlock();
    if (hit(gameMap, currentBlock)) {
        if (lost()) {
            gameMap = createMap(emptySquare(), width, height);
            score = 0;
            return;
        }
        currentBlock.unmoveBlock();
        insertBlock(gameMap, currentBlock);
        removeFilledRows(gameMap);
        increaseScore("lockedBlock");
        currentBlock = nextBlock;
        nextBlock = setNewBlock();
        drawNextBlock(nextBlock);
        drawScore();
        bot.whereToMove(gameMap, currentBlock, nextBlock);
    }
    let clonedMap = cloneMap(gameMap);
    insertBlock(clonedMap, currentBlock);
    drawMap(context, clonedMap, width, height, squareSize);
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
            if (block.y + y >= height && ((block.x + x) >= 0 && (block.x + x) < width)) {
                mapSquare = emptySquare();
            } else if (block.y + y < 0 || block.y + y >= height ||
                       block.x + x < 0 || block.x + x >= width) {
                mapSquare = createSquare("black");
            } else {
                mapSquare = map[block.x + x][block.y + y];
            }

            const blockSquare = block.map()[x][y];

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

function setNewBlock() {
    let block = randomBlock();
    block.y = height;
    block.x = Math.floor(width / 2) - 2;
    return block;
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
    const index = getRandomInt(0, 7);
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