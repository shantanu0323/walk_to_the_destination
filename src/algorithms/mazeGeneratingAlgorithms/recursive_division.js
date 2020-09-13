import Position, { isEqual, getNeighbours } from "../../helper/position";

const walls = [];
const visitedNodes = [];
const isOnEdge = (position, rows, columns) => {
    return (
        position.x === 1 ||
        position.x === rows ||
        position.y === 1 ||
        position.y === columns
    );
};

let orientation;
const buildWalls = (startRow, endRow, startColumn, endColumn) => {
    orientation = !orientation;
    if (orientation) {
        if (startColumn >= endColumn) return;
        const wallIndex =
            2 *
                (Math.floor((Math.random() * (endColumn - startColumn)) / 2) +
                    startColumn / 2) +
            1;
        const pathIndex =
            Math.floor(Math.random() * (endRow - startRow + 1)) + startRow;
        getNeighbours(
            new Position(pathIndex, wallIndex),
            window.rows,
            window.columns
        )
            .filter((node) => node.x === pathIndex)
            .map((node) => visitedNodes.push(node));
        for (let index = startRow; index <= endRow; index++) {
            if (
                index === pathIndex ||
                visitedNodes.some((node) =>
                    isEqual(node, new Position(index, wallIndex))
                )
            )
                continue;
            walls.push(new Position(index, wallIndex));
        }
        buildWalls(startRow, endRow, startColumn, wallIndex - 1);
        buildWalls(startRow, endRow, wallIndex + 1, endColumn);
    } else {
        if (startRow >= endRow) return;
        const wallIndex =
            2 *
                (Math.floor((Math.random() * (endRow - startRow)) / 2) +
                    startRow / 2) +
            1;
        const pathIndex =
            Math.floor(Math.random() * (endColumn - startColumn + 1)) +
            startColumn;
        getNeighbours(
            new Position(wallIndex, pathIndex),
            window.rows,
            window.columns
        )
            .filter((node) => node.y === pathIndex)
            .map((node) => visitedNodes.push(node));
        for (let index = startColumn; index <= endColumn; index++) {
            if (
                index === pathIndex ||
                visitedNodes.some((node) =>
                    isEqual(node, new Position(wallIndex, index))
                )
            )
                continue;
            walls.push(new Position(wallIndex, index));
        }
        buildWalls(startRow, wallIndex - 1, startColumn, endColumn);
        buildWalls(wallIndex + 1, endRow, startColumn, endColumn);
    }
};

const generateRecursiveDivisionMaze = (rows, columns, source, target) => {
    walls.length = 0;
    visitedNodes.length = 0;
    window.rows = rows;
    window.columns = columns;
    orientation = Math.random() >= 0.5;
    for (let i = 1; i <= rows; i++) {
        walls.push(new Position(i, 1));
        walls.push(new Position(i, columns));
    }

    for (let j = 2; j < columns; j++) {
        walls.push(new Position(1, j));
        walls.push(new Position(rows, j));
    }

    buildWalls(2, rows - 1, 2, columns - 1);

    const sourceNeighbours = isOnEdge(source, rows, columns)
        ? getNeighbours(source, rows, columns)
        : [];
    const targetNeighbours = isOnEdge(target, rows, columns)
        ? getNeighbours(target, rows, columns)
        : [];
    return walls.filter(
        (wall) =>
            !isEqual(wall, source) &&
            !isEqual(wall, target) &&
            (wall.y !== columns - 1 || wall.x === 1 || wall.x === rows) &&
            !sourceNeighbours.some((node) => isEqual(node, wall)) &&
            !targetNeighbours.some((node) => isEqual(node, wall))
    );
};

export default generateRecursiveDivisionMaze;
