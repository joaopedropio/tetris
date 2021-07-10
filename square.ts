function createSquare(color: Color):Square {
    return {
        empty: false,
        color: color
    }
}

function emptySquare():Square {
    return {
        empty: true,
        color: "black"
    }
}

interface Square {
    empty: boolean;
    color: Color;
}
