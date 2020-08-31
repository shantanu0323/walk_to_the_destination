class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const isEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

const getNeighbours = (position, rows, columns, step = 1) => {
    const neighbours = [];
    if (
        position.x >= 1 &&
        position.x <= rows &&
        position.y >= 1 &&
        position.y + step <= columns
    ) {
        neighbours.push(new Position(position.x, position.y + step));
    }
    if (
        position.x >= 1 &&
        position.x + step <= rows &&
        position.y >= 1 &&
        position.y <= columns
    ) {
        neighbours.push(new Position(position.x + step, position.y));
    }
    if (
        position.x >= 1 &&
        position.x <= rows &&
        position.y - step >= 1 &&
        position.y <= columns
    ) {
        neighbours.push(new Position(position.x, position.y - step));
    }
    if (
        position.x - step >= 1 &&
        position.x <= rows &&
        position.y >= 1 &&
        position.y <= columns
    ) {
        neighbours.push(new Position(position.x - step, position.y));
    }
    return neighbours;
};

export { isEqual, getNeighbours };
export default Position;
