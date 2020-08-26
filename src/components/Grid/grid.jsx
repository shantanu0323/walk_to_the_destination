import React, { Component } from "react";
import Node from "../Node/node";
import NodeState from "../Node/node_state";
import Position from "../Node/position";
import "./grid.css";

class Grid extends Component {
    state = {
        isMousePressed: false,
        movingSource: false,
        movingTarget: true,
    };

    handleMouseUp(nodeState, position) {
        this.setState({ isMousePressed: false });
        console.log(
            `(${position.x}, ${position.y}) : mouseUp | pressed=${this.state.isMousePressed}`
        );
        if (nodeState === NodeState.NODE_IS_SOURCE) {
            this.setState({ movingSource: false });
        } else if (nodeState === NodeState.NODE_IS_TARGET) {
            this.setState({ movingTarget: false });
        } else {
            // do nothing
        }
    }
    handleMouseDown(nodeState, position) {
        this.setState({ isMousePressed: true });
        console.log(
            `(${position.x}, ${position.y}) : mouseDown | pressed=${this.state.isMousePressed}`
        );
        if (nodeState === NodeState.NODE_IS_SOURCE) {
            this.setState({ movingSource: true });
        } else if (nodeState === NodeState.NODE_IS_TARGET) {
            this.setState({ movingTarget: true });
        } else {
            // TODO: toggleWall()
        }
    }
    handleMouseEnter(nodeState, position) {
        console.log(
            `(${position.x}, ${position.y}) : mouseEnter | pressed=${this.state.isMousePressed}`
        );
        if (this.state.isMousePressed) {
            if (this.state.movingSource) {
                // TODO: change nodeState to source
            } else if (this.state.movingTarget) {
                // TODO: change nodeState to target
            } else {
                // TODO: toggleWall()
            }
        }
    }
    handleMouseLeave(nodeState, position) {
        console.log(
            `(${position.x}, ${position.y}) : mouseLeave | pressed=${this.state.isMousePressed}`
        );
        if (this.state.isMousePressed) {
            if (nodeState === NodeState.NODE_IS_SOURCE) {
                // TODO: change nodeState to unvisited
            } else if (nodeState === NodeState.NODE_IS_TARGET) {
                // TODO: change nodestate to unvisited
            } else {
                // do nothing
            }
        }
    }

    render() {
        const { rows, columns, source, target } = this.props;
        const paddingX = (window.innerWidth - columns * 20) / 2;
        const paddingY = (window.innerHeight - 190 - rows * 20) / 2;
        const nodes = [];
        for (var x = 1; x <= rows; x++) {
            for (var y = 1; y <= columns; y++) {
                const key = "node-" + x + "-" + y;
                const nodeState =
                    x === source.x && y === source.y
                        ? NodeState.NODE_IS_SOURCE
                        : x === target.x && y === target.y
                        ? NodeState.NODE_IS_TARGET
                        : NodeState.NODE_UNVISITED;
                nodes.push(
                    <Node
                        key={key}
                        position={new Position(x, y)}
                        id={key}
                        nodeState={nodeState}
                        onMouseDown={(nodeState, position) =>
                            this.handleMouseDown(nodeState, position)
                        }
                        onMouseUp={(nodeState, position) =>
                            this.handleMouseUp(nodeState, position)
                        }
                        onMouseEnter={(nodeState, position) =>
                            this.handleMouseEnter(nodeState, position)
                        }
                        onMouseLeave={(nodeState, position) =>
                            this.handleMouseLeave(nodeState, position)
                        }
                    />
                );
            }
        }
        return (
            <section
                className="grid-container"
                style={{
                    paddingTop: paddingY,
                    paddingRight: paddingX,
                    paddingBottom: paddingY,
                    paddingLeft: paddingX,
                }}
            >
                {nodes}
            </section>
        );
    }
}

export default Grid;
