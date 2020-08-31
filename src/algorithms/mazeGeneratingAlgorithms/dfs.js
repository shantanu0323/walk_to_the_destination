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

const connectAndMarkAsVisited = (node, neighbours, rows, columns) => {
    neighbours.forEach((neighbour) => {
        const position = new Position(node.x, node.y);
        if (neighbour.x === node.x) {
            if (neighbour.y > node.y) position.y++;
            else position.y--;
        } else {
            if (neighbour.x > node.x) position.x++;
            else position.x--;
        }
        visitedNodes.push(neighbour);
        walls.push(position);
    });
};

const findNextNode = (currNode, rows, columns) => {
    walls.push(currNode);
    let neighbours = getNeighbours(currNode, rows, columns, 2).filter(
        (node) => {
            return (
                !walls.some((wall) => isEqual(wall, node)) &&
                !visitedNodes.some((visitedNode) => isEqual(visitedNode, node))
            );
        }
    );
    connectAndMarkAsVisited(currNode, neighbours, rows, columns);
    while (neighbours.length > 0) {
        const currNode =
            neighbours[Math.floor(Math.random() * neighbours.length)];
        findNextNode(currNode, rows, columns);
        neighbours = neighbours.filter((node) => !isEqual(node, currNode));
    }
};

const generateDFSMaze = (rows, columns, source, target) => {
    for (let i = 1; i <= rows; i++) {
        walls.push(new Position(i, 1));
        walls.push(new Position(i, columns));
    }

    for (let j = 2; j < columns; j++) {
        walls.push(new Position(1, j));
        walls.push(new Position(rows, j));
    }

    findNextNode(new Position(3, 3), rows, columns);

    const sourceNeighbours = isOnEdge(source)
        ? getNeighbours(source, rows, columns)
        : [];
    const targetNeighbours = isOnEdge(target)
        ? getNeighbours(target, rows, columns)
        : [];
    return walls.filter(
        (wall) =>
            !isEqual(wall, source) &&
            !isEqual(wall, target) &&
            !sourceNeighbours.some((node) => isEqual(node, wall)) &&
            !targetNeighbours.some((node) => isEqual(node, wall))
    );
};

export default generateDFSMaze;
