import { isEqual, getNeighbours } from "../helper/position";

let visitedNodes = [];
let parents = {};
let targetFound = false;

const getKey = (position) => {
    return `node-${position.x}-${position.y}`;
};

const initialiseMesh = (rows, columns, source, target) => {
    window.rows = rows;
    window.columns = columns;
    window.source = source;
    window.target = target;
    visitedNodes.length = 0;
    parents = {};
    targetFound = false;
    parents[getKey(source)] = null;
};

const getNonWallUnvisitedNeighbours = (node, walls) => {
    const neighbourPositions = getNeighbours(node, window.rows, window.columns);
    const neighbours = [];
    neighbourPositions
        .filter(
            (neighbour) =>
                !walls.some((wall) => isEqual(wall, neighbour)) &&
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

const runDFS = (currNode, walls) => {
    if (targetFound) return;
    if (isEqual(currNode, window.target)) {
        visitedNodes.push(currNode);
        targetFound = true;
        return;
    }
    visitedNodes.push(currNode);
    const neighbours = getNonWallUnvisitedNeighbours(currNode, walls);
    while (neighbours.length > 0 && !targetFound) {
        runDFS(neighbours[0], walls);
        neighbours.shift();
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

const performDFS = (rows, columns, source, target, walls) => {
    // initialise and fetch the graph
    initialiseMesh(rows, columns, source, target, walls);

    runDFS(source, walls);
    const path = getPath();
    return { visitedNodes, path };
};

export default performDFS;
