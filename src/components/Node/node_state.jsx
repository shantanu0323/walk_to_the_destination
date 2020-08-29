const NodeState = {
    NODE_UNVISITED: 0,
    NODE_VISITED: 1,
    NODE_IS_WALL: -1,
    NODE_IS_SOURCE: 10,
    NODE_IS_TARGET: 100,
    NODE_FALLS_IN_PATH: 50,
    NODE_IS_VISITING: 2,
};
export default NodeState;
