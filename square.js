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
