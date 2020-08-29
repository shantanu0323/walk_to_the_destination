class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const isEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

const getNeighbours = (position, rows, columns) => {
    const neighbours = [];
    if (
        position.x >= 1 &&
        position.x <= rows &&
        position.y >= 1 &&
        position.y + 1 <= columns
    ) {
        neighbours.push(new Position(position.x, position.y + 1));
    }
    if (
        position.x >= 1 &&
        position.x + 1 <= rows &&
        position.y >= 1 &&
        position.y <= columns
    ) {
        neighbours.push(new Position(position.x + 1, position.y));
    }
    if (
        position.x >= 1 &&
        position.x <= rows &&
        position.y - 1 >= 1 &&
        position.y <= columns
    ) {
        neighbours.push(new Position(position.x, position.y - 1));
    }
    if (
        position.x - 1 >= 1 &&
        position.x <= rows &&
        position.y >= 1 &&
        position.y <= columns
    ) {
        neighbours.push(new Position(position.x - 1, position.y));
    }
    return neighbours;
};

export { isEqual, getNeighbours };
export default Position;
