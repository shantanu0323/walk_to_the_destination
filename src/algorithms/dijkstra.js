import NodeState from "../components/Node/node_state";
import Position, { isEqual, getNeighbours } from "../helper/position";

class Node {
    constructor(
        position,
        distance = Infinity,
        nodeState = NodeState.NODE_UNVISITED
    ) {
        this.position = position;
        this.distance = distance;
        this.nodeState = nodeState;
    }
}

const mesh = [];
let unvisitedNodes = [];

const initialiseMesh = (rows, columns, source, target, walls) => {
    window.rows = rows;
    window.columns = columns;
    mesh.length = 0;
    unvisitedNodes.length = 0;
    for (let i = 1; i <= window.rows; i++) {
        const row = [];
        for (let j = 1; j <= window.columns; j++) {
            const node = new Node(new Position(i, j));
            if (isEqual(node.position, source)) {
                node.nodeState = NodeState.NODE_IS_SOURCE;
                node.distance = 0;
            } else if (isEqual(node.position, target)) {
                node.nodeState = NodeState.NODE_IS_TARGET;
            }
            unvisitedNodes.push(node);
            row[j] = node;
        }
        mesh[i] = row;
    }
    walls.forEach((position) => {
        mesh[position.x][position.y].nodeState = NodeState.NODE_IS_WALL;
    });
};

const getNonWallNeighbours = (node) => {
    const neighbourPositions = getNeighbours(
        node.position,
        window.rows,
        window.columns
    );
    const neighbours = [];
    neighbourPositions.map((position) => {
        const node = mesh[position.x][position.y];
        if (node.nodeState !== NodeState.NODE_IS_WALL) {
            neighbours.push(node);
            return true;
        }
        return false;
    });

    return neighbours;
};

const getPreviousNodeInPath = (currNode) => {
    const neighbours = getNonWallNeighbours(currNode).filter(
        (node) =>
            mesh[node.position.x][node.position.y].nodeState ===
            NodeState.NODE_VISITED
    );
    let min = Infinity;
    let prevNode;
    for (let i = 0; i < neighbours.length; i++) {
        const node = neighbours[i];
        if (node.distance < min) {
            min = node.distance;
            prevNode = node;
        }
    }
    return prevNode;
};

const getNodesInPath = (visitedNodes) => {
    const path = [];
    let currNode = visitedNodes[visitedNodes.length - 1]; // target
    while (currNode.distance > 1) {
        currNode = getPreviousNodeInPath(currNode);
        path.unshift(currNode);
    }
    return path;
};

const getVisitedNodes = (target) => {
    const visitedNodes = [];

    while (unvisitedNodes.length > 0) {
        let minDist = Infinity;
        let currNode = undefined;
        for (let i = 0; i < unvisitedNodes.length; i++) {
            if (unvisitedNodes[i].distance < minDist) {
                minDist = unvisitedNodes[i].distance;
                currNode = unvisitedNodes[i];
            }
        }
        if (currNode === undefined) {
            // console.log("Target NOT Reachable");
            break;
        }

        visitedNodes.push(currNode);
        unvisitedNodes = unvisitedNodes.filter(
            (node) => !isEqual(node.position, currNode.position)
        );
        if (isEqual(currNode.position, target)) {
            console.log("TARGET REACHED");
            break;
        }
        currNode.nodeState =
            currNode.nodeState === NodeState.NODE_IS_SOURCE
                ? NodeState.NODE_IS_SOURCE
                : NodeState.NODE_VISITED;

        getNonWallNeighbours(currNode).forEach((node) => {
            const alt = currNode.distance + 1;
            node.distance = alt < node.distance ? alt : node.distance;
        });
    }

    return visitedNodes;
};

const performDijkstra = async (rows, columns, source, target, walls) => {
    // initialise and fetch the graph
    initialiseMesh(rows, columns, source, target, walls);

    // perform dijkstra(graph, source, target) on the graph and get the visited nodes in order
    const visitedNodesObjects = getVisitedNodes(target);
    const pathObjects = getNodesInPath(visitedNodesObjects);
    const visitedNodes = [];
    const path = [];
    visitedNodesObjects.map((node) => visitedNodes.push(node.position));
    pathObjects.map((node) => path.push(node.position));
    return { visitedNodes, path };
};

export default performDijkstra;
