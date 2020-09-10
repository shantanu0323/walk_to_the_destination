import React, { Component } from "react";
import "./node.css";
import NodeState from "./node_state";
class Node extends Component {
    render() {
        const {
            nodeState,
            position,
            onMouseDown,
            onMouseUp,
            onMouseEnter,
            onMouseLeave,
        } = this.props;
        if (onMouseEnter === undefined) {
            return (
                <div className={this.getNodeStateClass(nodeState)}>
                    {/* <div></div> */}
                </div>
            );
        } else {
            return (
                <div
                    className={this.getNodeStateClass(nodeState)}
                    id={`node-${position.x}-${position.y}`}
                    data-x={position.x}
                    data-y={position.y}
                    onMouseDown={() => onMouseDown(nodeState, position)}
                    onMouseUp={() => onMouseUp(nodeState, position)}
                    onMouseEnter={() => onMouseEnter(nodeState, position)}
                    onMouseLeave={() => onMouseLeave(nodeState, position)}
                >
                    {/* <div></div> */}
                </div>
            );
        }
    }

    getNodeStateClass(nodeState) {
        let classes = "node node-circle node-";
        switch (nodeState) {
            case NodeState.NODE_UNVISITED:
                classes += "unvisited";
                break;
            case NodeState.NODE_VISITED:
                classes += "visited";
                break;
            case NodeState.NODE_IS_WALL:
                classes += "wall";
                break;
            case NodeState.NODE_IS_SOURCE:
                classes += "source";
                break;
            case NodeState.NODE_IS_TARGET:
                classes += "target";
                break;
            default:
                classes += "unvisited";
                break;
        }
        return classes;
    }
}

export default Node;
