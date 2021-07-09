function calculatePoints(map) {
    let ho = holes(map);
    let he = heightness(map);
    let bu = bumpiness(map);
    let fi = filledRows(map);

    return (- Math.pow(ho, 3) - (2 * he) - (Math.pow(bu, 2)) + (Math.pow(fi, 4)));
}

// do not trust this function
function holes(map) {
    let count = 0;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (map[x][y].empty) {
                for (let up = y + 1; up < height; up++) {
                    if (!map[x][up].empty) {
                        count++;
                    }
                }
            }
        }
    }
    return count;
}

function heightness(map) {
    let count = 0;
    for (let x = 0; x < width; x++) {
        count += highestSquare(map, x);
    }
    return count;
}

function bumpiness(map) {
    let count = 0;
    let lastSquareHeight = 0;
    for (let x = 0; x < width; x++) {
        let currentSquareHeight = highestSquare(map, x);
        let diff = currentSquareHeight - lastSquareHeight;
        if (diff < 0) {
            diff *= -1;
        }
        count += diff;
        lastSquareHeight = currentSquareHeight;
    }
    return count;
}

function highestSquare(map, x) {
    for (let y = height - 1; y > 0; y--) {
        if (!map[x][y].empty) {
            return y;
        }   
    }
    return 0;
}

function filledRows(map) {
    let rowsFilledCount = 0;
    for (let i = 0; i < height; i++) {
        if (isRowFilled(map, i)) {
            rowsFilledCount++;
        }
    }
    return rowsFilledCount;
}
