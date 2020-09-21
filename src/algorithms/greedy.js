import Position, { isEqual, getNeighbours } from "../helper/position";

class Node {
    constructor(position) {
        this.position = position;
        this.parent = null;
        this.f = Infinity;
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
    sourceNode.f = distance(source, target);
    openList.push(sourceNode);
};

const getTraversableNeighbours = (node, walls) => {
    const neighbourPositions = getNeighbours(node, window.rows, window.columns);
    const neighbours = [];
    neighbourPositions
        .filter(
            (position) =>
                !walls.some((wall) => isEqual(wall, position)) &&
                !closedList.some((node) => isEqual(node.position, position))
        )
        .map((position) => {
            neighbours.push(new Node(new Position(position.x, position.y)));
            return true;
        });

    return neighbours;
};

const nodeWithLeastF = () => {
    openList.sort((a, b) => {
        return a.f > b.f;
    });
    return openList[0];
};

const performGreedy = async (rows, columns, source, target, walls) => {
    // initialise and fetch the graph
    // add source to the openList
    initialiseMesh(rows, columns, source, target, walls);
    // START LOOP
    while (
        openList.length > 0 &&
        closedList.length < rows * columns - walls.length
    ) {
        const currNode = nodeWithLeastF();
        // remove current from the openList
        openList.shift();
        // add current to the closedList
        closedList.push(currNode);

        if (isEqual(currNode.position, target)) break;

        // FOREACH neighbour of the CURRENT
        getTraversableNeighbours(currNode.position, walls).map((neighbour) => {
            // if neighbour is not traversable or neighbour in the closedList then skip to the next neighbour
            // else set the f_cost of the neighbour
            neighbour.f = distance(neighbour.position, target);
            // set parent of the neighbour to the current
            neighbour.parent = currNode;
            // if new path to neighbour is shorter or if the neighbour is NOT in openList
            let found = false;
            for (let i = 0; i < openList.length; i++) {
                if (
                    isEqual(openList[i].position, neighbour.position) &&
                    neighbour.f <= openList[i].f
                ) {
                    openList[i] = neighbour;
                    found = true;
                    break;
                }
            }
            // if neighbour is not in openlist then add it to openList
            if (!found) {
                openList.push(neighbour);
            }
            return true;
        });

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

export default performGreedy;
