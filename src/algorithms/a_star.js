import Position, { isEqual, getNeighbours } from "../helper/position";

class Node {
    constructor(position) {
        this.position = position;
        this.parent = null;
        this.f = Infinity;
        this.g = Infinity;
        this.h = Infinity;
    }
}

let openList = [];
const closedList = [];

const distance = (a, b) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const initialiseMesh = (rows, columns, source, target, walls) => {
    openList.length = 0;
    closedList.length = 0;
    window.rows = rows;
    window.columns = columns;

    const sourceNode = new Node(source);
    sourceNode.g = 0;
    sourceNode.h = 0;
    sourceNode.f = 0; //sourceNode.g + sourceNode.h;
    openList.push(sourceNode);
};

const getTraversableNeighbours = (node, walls) => {
    const neighbourPositions = getNeighbours(node, window.rows, window.columns);
    const neighbours = [];
    neighbourPositions
        .filter(
            (position) => !walls.some((wall) => isEqual(wall, position))
            // !closedList.some((node) => isEqual(node.position, position))
        )
        .map((position) => {
            neighbours.push(new Node(new Position(position.x, position.y)));
            return true;
        });

    return neighbours;
};

const nodeWithLeastF = () => {
    openList.sort((a, b) => {
        // return a.f > b.f;
        return a.f <= b.f ? a.h > b.h : a.f > b.f;
    });
    return openList[0];
};

const performAstar = async (rows, columns, source, target, walls) => {
    // initialise and fetch the graph
    // add source to the openList
    initialiseMesh(rows, columns, source, target, walls);
    let found = undefined;
    // START LOOP
    while (
        found === undefined &&
        openList.length > 0 &&
        closedList.length < rows * columns - walls.length
    ) {
        // CURRENT = node in the openList with the least f_cost
        const currNode = nodeWithLeastF();

        // remove current from the openList
        // while (openList[0] !== undefined && openList[0].f === currNode.f)
        openList.shift();

        // FOREACH neighbour of the CURRENT
        const neighbours = getTraversableNeighbours(currNode.position, walls);
        for (let i = 0; i < neighbours.length; i++) {
            const neighbour = neighbours[i];

            // set parent of the neighbour to the current
            neighbour.parent = currNode;

            // if neighbour = target then return
            if (isEqual(neighbour.position, target)) {
                found = neighbour;
                break;
            }

            // if neighbour is not traversable or neighbour in the closedList then skip to the next neighbour
            // set the f_cost of the neighbour
            neighbour.g = currNode.g + 1; //distance(source, neighbour.position);
            neighbour.h = distance(neighbour.position, target);
            neighbour.f = neighbour.g + neighbour.h;

            if (
                openList.some(
                    (node) =>
                        isEqual(node.position, neighbour.position) &&
                        node.f <= neighbour.f
                )
            )
                continue;
            if (
                closedList.some(
                    (node) =>
                        isEqual(node.position, neighbour.position) &&
                        node.f <= neighbour.f
                )
            )
                continue;

            openList.push(neighbour);
            // }
        }

        // add current to the closedList
        if (
            !closedList.some((node) =>
                isEqual(node.position, currNode.position)
            )
        )
            closedList.push(currNode);
        if (found) closedList.push(found);
        // END LOOP
    }
    const visitedNodes = [];
    closedList.map((node) => visitedNodes.push(node.position));
    const path = [];
    let node = closedList[closedList.length - 1];
    while (node !== null) {
        if (!isEqual(node.position, source) && !isEqual(node.position, target))
            path.unshift(node.position);
        node = node.parent;
    }
    return { visitedNodes, path };
};

export default performAstar;
