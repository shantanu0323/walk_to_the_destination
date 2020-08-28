import NodeState from "../components/Node/node_state";
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

const getNodeKey = (node, where, mesh) => {
    let [i, j] = node.split("-");
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
    if (i < 1 || j < 1 || mesh[i][j] === NodeState.NODE_IS_WALL) {
        return null;
    }
    return `${i}-${j}`;
};

const getVisitedNodes = (mesh, source, target, walls, unvisitedNodes, dist) => {
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
        if (
            mesh[currNode.split("-")[0]][currNode.split("-")[1]] ===
            NodeState.NODE_IS_TARGET
        ) {
            console.log("TARGET REACHED");
            break;
        }
        visitedNodes.push(
            new Position(
                parseInt(currNode.split("-")[0]),
                parseInt(currNode.split("-")[1])
            )
        );
        unvisitedNodes = unvisitedNodes.filter((node) => node !== currNode);

        ["above", "right", "below", "left"].forEach((where) => {
            let u = getNodeKey(currNode, where, mesh);
            if (u !== null) {
                const alt = dist[currNode] + 1;
                dist[u] = alt < dist[u] ? alt : dist[u];
            }
        });
    }

    return { visitedNodes };
};

const performDijkstra = (rows, columns, source, target, walls) => {
    console.log("Performing Dijkstra");
    console.log({ rows, columns, source, target, walls });

    // initialise and fetch the graph
    const { mesh, dist, unvisitedNodes } = initialiseMesh(
        rows,
        columns,
        source,
        target,
        walls
    );

    // perform dijkstra(graph, source, target) on the graph and get the visited nodes in order
    const { visitedNodes } = getVisitedNodes(
        mesh,
        source,
        target,
        walls,
        unvisitedNodes,
        dist
    );

    return visitedNodes;
};

export default performDijkstra;
