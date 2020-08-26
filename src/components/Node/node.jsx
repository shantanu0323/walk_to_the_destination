import React, { Component } from "react";
import "./node.css";
import Position from "./position";

const NodeState = require("./node_state");
class Node extends Component {
    static defaultProps = {
        nodeState: NodeState.NODE_UNVISITED,
        position: new Position(-1, -1),
    };
    state = {
        nodeState: this.props.nodeState,
        position: this.props.position,
    };
    render() {
        const { nodeState } = this.props;
        return (
            <div className={this.getNodeStateClass(nodeState)}>
                <div></div>
            </div>
        );
    }

    getNodeStateClass(nodeState) {
        let classes = "node node-";
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
