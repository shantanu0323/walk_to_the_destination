import { isEqual, getNeighbours } from "../helper/position";

let visitedNodes = [];
const queue = [];
const parents = {};

const getKey = (position) => {
    return `node-${position.x}-${position.y}`;
};

const initialiseMesh = (rows, columns, source, target, walls) => {
    window.rows = rows;
    window.columns = columns;
    window.source = source;
    window.target = target;
    visitedNodes.length = 0;
    queue.length = 0;
    queue.push(source);
    parents[getKey(source)] = null;
};

const getNonWallUnvisitedNeighbours = (node, walls) => {
    const neighbourPositions = getNeighbours(node, window.rows, window.columns);
    const neighbours = [];
    neighbourPositions
        .filter(
            (neighbour) =>
                !walls.some((wall) => isEqual(wall, neighbour)) &&
                !queue.some((queue) => isEqual(queue, neighbour)) &&
                !visitedNodes.some((visitedNode) =>
                    isEqual(visitedNode, neighbour)
                ) &&
                !isEqual(neighbour, window.source)
        )
        .map((neighbour) => {
            parents[getKey(neighbour)] = node;
            neighbours.push(neighbour);
            return true;
        });

    return neighbours;
};

const runBFS = (target, walls) => {
    while (queue.length > 0) {
        const currNode = queue[0];
        visitedNodes.push(currNode);

        if (isEqual(currNode, target)) return;

        queue.shift();
        getNonWallUnvisitedNeighbours(currNode, walls).map((neighbour) =>
            queue.push(neighbour)
        );
    }
};

const getPath = () => {
    const path = [];
    let currNode = window.target;
    if (!isEqual(visitedNodes[visitedNodes.length - 1], currNode)) return [];
    while (parents[getKey(currNode)] !== null) {
        path.unshift(parents[getKey(currNode)]);
        currNode = parents[getKey(currNode)];
    }
    path.shift(); // to remove source
    return path;
};

const performBFS = async (rows, columns, source, target, walls) => {
    // initialise and fetch the graph
    initialiseMesh(rows, columns, source, target, walls);

    runBFS(target, walls);
    const path = getPath();
    return { visitedNodes, path };
};

export default performBFS;
