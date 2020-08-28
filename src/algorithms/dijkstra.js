import Node from "./node";
import NodeState from "../components/Node/node_state";
import Position from "../components/Node/position";

const mesh = [];
let unvisitedNodes = [];

const isEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

const initialiseMesh = (rows, columns, source, target, walls) => {
    window.rows = rows;
    window.columns = columns;
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

const getNeighbours = (node) => {
    const neighbours = [];
    if (
        node.position.x >= 1 &&
        node.position.x <= window.rows &&
        node.position.y >= 1 &&
        node.position.y + 1 <= window.columns
    ) {
        neighbours.push(mesh[node.position.x][node.position.y + 1]);
    }
    if (
        node.position.x >= 1 &&
        node.position.x + 1 <= window.rows &&
        node.position.y >= 1 &&
        node.position.y <= window.columns
    ) {
        neighbours.push(mesh[node.position.x + 1][node.position.y]);
    }
    if (
        node.position.x >= 1 &&
        node.position.x <= window.rows &&
        node.position.y - 1 >= 1 &&
        node.position.y <= window.columns
    ) {
        neighbours.push(mesh[node.position.x][node.position.y - 1]);
    }
    if (
        node.position.x - 1 >= 1 &&
        node.position.x <= window.rows &&
        node.position.y >= 1 &&
        node.position.y <= window.columns
    ) {
        neighbours.push(mesh[node.position.x - 1][node.position.y]);
    }

    return neighbours.filter(
        (node) => node.nodeState !== NodeState.NODE_IS_WALL
    );
};

const getPreviousNodeInPath = (currNode) => {
    const neighbours = getNeighbours(currNode).filter(
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
            console.log("Target NOT Reachable");
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

        getNeighbours(currNode).forEach((node) => {
            const alt = currNode.distance + 1;
            node.distance = alt < node.distance ? alt : node.distance;
        });
    }

    return visitedNodes;
};

const performDijkstra = (rows, columns, source, target, walls) => {
    // initialise and fetch the graph
    initialiseMesh(rows, columns, source, target, walls);

    // perform dijkstra(graph, source, target) on the graph and get the visited nodes in order
    const visitedNodes = getVisitedNodes(target);
    const path = getNodesInPath(visitedNodes);
    return { visitedNodes, path };
};

export default performDijkstra;
