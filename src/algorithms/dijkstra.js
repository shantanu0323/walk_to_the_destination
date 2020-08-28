import NodeState, { NODE_IS_SOURCE } from "../components/Node/node_state";
import Position from "../components/Node/position";

const INFINITY = 1000000;
const initialiseMesh = (rows, columns, source, target, walls) => {
    const mesh = new Array(rows);
    const dist = {};
    const unvisitedNodes = [];
    for (let i = 1; i <= rows; i++) {
        const col = new Array(columns);
        for (let j = 1; j <= columns; j++) {
            col[j] = NodeState.NODE_UNVISITED;
            if (i === source.x && j === source.y) {
                col[j] = NodeState.NODE_IS_SOURCE;
                dist[`${i}-${j}`] = 0;
            } else {
                if (i === target.x && j === target.y) {
                    col[j] = NodeState.NODE_IS_TARGET;
                }
                dist[`${i}-${j}`] = INFINITY;
            }
            unvisitedNodes.push(`${i}-${j}`);
        }
        mesh[i] = col;
    }
    walls.forEach((position) => {
        mesh[position.x][position.y] = NodeState.NODE_IS_WALL;
    });

    return { mesh, dist, unvisitedNodes };
};

const getNodeKey = (node, where, mesh, rows, columns) => {
    let [i, j] = node.split("-");
    i = parseInt(i);
    j = parseInt(j);
    switch (where) {
        case "above":
            i--;
            break;
        case "right":
            j++;
            break;
        case "below":
            i++;
            break;
        case "left":
            j--;
            break;

        default:
            i = j = -1;
            break;
    }
    if (
        i < 1 ||
        i > rows ||
        j < 1 ||
        j > columns ||
        mesh[parseInt(i)][parseInt(j)] === NodeState.NODE_IS_WALL
    ) {
        return null;
    }
    return `${i}-${j}`;
};

const getNeighbours = (position, rows, columns) => {
    // let [i, j] = node.split("-");
    // const position = new Position(parseInt(i), parseInt(j));
    const neighbours = [];

    neighbours.push(new Position(position.x - 1, position.y));
    neighbours.push(new Position(position.x, position.y + 1));
    neighbours.push(new Position(position.x + 1, position.y));
    neighbours.push(new Position(position.x, position.y - 1));

    return neighbours.filter(
        (node) =>
            node.x >= 1 && node.x <= rows && node.y >= 1 && node.y <= columns
    );
};

const getPreviousNodeInPath = (mesh, dist, currNode, rows, columns) => {
    const neighbours = getNeighbours(currNode, rows, columns).filter(
        (node) => mesh[node.x][node.y] === 1
    );
    let min = INFINITY;
    let prevNode;
    for (let i = 0; i < neighbours.length; i++) {
        const node = neighbours[i];
        if (dist[`${node.x}-${node.y}`] < min) {
            min = dist[`${node.x}-${node.y}`];
            prevNode = node;
        }
    }
    return prevNode;
};

const getNodesInPath = (mesh, dist, target, rows, columns) => {
    const path = [];
    let currNode = target;
    let k = 30;
    while (k--) {
        currNode = getPreviousNodeInPath(mesh, dist, currNode, rows, columns);
        path.unshift(currNode);
        if (dist[`${currNode.x}-${currNode.y}`] === 1) {
            // path.unshift(currNode);
            break;
        }
    }
    return path;
};

const getVisitedNodes = (mesh, rows, columns, unvisitedNodes, dist) => {
    const visitedNodes = [];

    while (unvisitedNodes.length > 0) {
        let minDist = INFINITY;
        let currNode;
        for (let i = 0; i < unvisitedNodes.length; i++) {
            if (dist[unvisitedNodes[i]] < minDist) {
                minDist = dist[unvisitedNodes[i]];
                currNode = unvisitedNodes[i];
            }
        }
        if (currNode === undefined) {
            // alert("Target Not Reachable");
            break;
        }

        visitedNodes.push(
            new Position(
                parseInt(currNode.split("-")[0]),
                parseInt(currNode.split("-")[1])
            )
        );
        unvisitedNodes = unvisitedNodes.filter((node) => node !== currNode);
        if (
            mesh[currNode.split("-")[0]][currNode.split("-")[1]] ===
            NodeState.NODE_IS_TARGET
        ) {
            console.log("TARGET REACHED");
            break;
        }
        mesh[parseInt(currNode.split("-")[0])][
            parseInt(currNode.split("-")[1])
        ] =
            mesh[parseInt(currNode.split("-")[0])][
                parseInt(currNode.split("-")[1])
            ] === NodeState.NODE_IS_SOURCE
                ? NODE_IS_SOURCE
                : NodeState.NODE_VISITED;

        ["above", "right", "below", "left"].forEach((where) => {
            let u = getNodeKey(currNode, where, mesh, rows, columns);
            if (u !== null) {
                const alt = dist[currNode] + 1;
                dist[u] = alt < dist[u] ? alt : dist[u];
            }
        });
    }

    const path = getNodesInPath(
        mesh,
        dist,
        visitedNodes[visitedNodes.length - 1],
        rows,
        columns
    );
    return { visitedNodes, path };
};

const performDijkstra = (rows, columns, source, target, walls) => {
    console.log("Performing Dijkstra");

    // initialise and fetch the graph
    const { mesh, dist, unvisitedNodes } = initialiseMesh(
        rows,
        columns,
        source,
        target,
        walls
    );

    // perform dijkstra(graph, source, target) on the graph and get the visited nodes in order
    const { visitedNodes, path } = getVisitedNodes(
        mesh,
        rows,
        columns,
        unvisitedNodes,
        dist
    );

    return { visitedNodes, path };
};

export default performDijkstra;
