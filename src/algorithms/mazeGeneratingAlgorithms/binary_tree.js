import Position, { isEqual, getNeighbours } from "../../helper/position";

const isOnEdge = (position, rows, columns) => {
    return (
        position.x === 1 ||
        position.x === rows ||
        position.y === 1 ||
        position.y === columns
    );
};

const generateBinaryTreeMaze = (rows, columns, source, target) => {
    const walls = [];
    for (let i = 1; i <= rows; i++) {
        walls.push(new Position(i, 1));
        walls.push(new Position(i, columns));
    }

    for (let j = 2; j < columns; j++) {
        walls.push(new Position(1, j));
        walls.push(new Position(rows, j));
    }

    for (let i = 3; i < rows - 1; i += 2) {
        for (let j = 3; j < columns - 1; j += 2) {
            walls.push(new Position(i, j));
            if (Math.round(Math.random())) {
                walls.push(new Position(i - 1, j));
            } else {
                walls.push(new Position(i, j - 1));
            }
        }
    }
    const sourceNeighbours = isOnEdge(source, rows, columns)
        ? getNeighbours(source, rows, columns)
        : [];
    const targetNeighbours = isOnEdge(target, rows, columns)
        ? getNeighbours(target, rows, columns)
        : [];
    console.log(isOnEdge(target));
    console.log({ sourceNeighbours, targetNeighbours });
    return walls.filter(
        (wall) =>
            !isEqual(wall, source) &&
            !isEqual(wall, target) &&
            !(
                columns % 2 === 0 &&
                wall.y === columns - 1 &&
                wall.x > 1 &&
                wall.x < rows
            ) &&
            !(
                rows % 2 === 0 &&
                wall.x === rows - 1 &&
                wall.y > 1 &&
                wall.y < columns
            ) &&
            !sourceNeighbours.some((node) => isEqual(node, wall)) &&
            !targetNeighbours.some((node) => isEqual(node, wall))
    );
};

export default generateBinaryTreeMaze;
