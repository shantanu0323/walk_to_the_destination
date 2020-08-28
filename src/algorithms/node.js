import NodeState from "../components/Node/node_state";

export default class Node {
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
