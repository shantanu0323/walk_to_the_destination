import React, { Component } from "react";
import Node from "../Node/node";
import NodeState from "../Node/node_state";
import Position from "../../helper/position";
import "./grid.css";
import { removeData } from "jquery";

class Grid extends Component {
    state = {
        isMousePressed: false,
        movingSource: false,
        movingTarget: false,
    };

    handleMouseLeavingGrid() {
        this.setState({ isMousePressed: false });
    }

    handleMouseUp(nodeState, position) {
        this.setState({ isMousePressed: false });
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
        if (nodeState === NodeState.NODE_IS_SOURCE) {
            this.setState({ movingSource: true });
        } else if (nodeState === NodeState.NODE_IS_TARGET) {
            this.setState({ movingTarget: true });
        } else {
            this.props.toggleWall(position);
        }
    }
    handleMouseEnter(nodeState, position) {
        if (this.state.isMousePressed) {
            if (this.state.movingSource) {
                // TODO: change nodeState to source
                this.props.setNodeAsSource(position);
            } else if (this.state.movingTarget) {
                // TODO: change nodeState to target
                this.props.setNodeAsTarget(position);
            } else {
                // TODO: toggleWall()
                this.props.toggleWall(position);
            }
        }
    }
    handleMouseLeave(nodeState, position) {
        // if (this.state.isMousePressed) {
        //     console.log(
        //         `(${position.x}, ${position.y}) : mouseLeave | pressed=${this.state.isMousePressed}`
        //     );
        //     if (nodeState === NodeState.NODE_IS_SOURCE) {
        //         // TODO: change nodeState to unvisited
        //     } else if (nodeState === NodeState.NODE_IS_TARGET) {
        //         // TODO: change nodestate to unvisited
        //     } else {
        //         // do nothing
        //     }
        // }
    }

    decideNodeState(x, y, source, target, walls, visitedNodes) {
        if (x === source.x && y === source.y) {
            return NodeState.NODE_IS_SOURCE;
        } else if (x === target.x && y === target.y) {
            return NodeState.NODE_IS_TARGET;
        } else if (
            walls.some((position) => position.x === x && position.y === y)
        ) {
            return NodeState.NODE_IS_WALL;
        } else if (
            visitedNodes.some(
                (position) => position.x === x && position.y === y
            )
        ) {
            return NodeState.NODE_VISITED;
        }
        return NodeState.NODE_UNVISITED;
    }

    render() {
        const {
            rows,
            columns,
            source,
            target,
            walls,
            visitedNodes,
            interactionDone,
        } = this.props;
        const paddingX = (window.innerWidth - columns * 20) / 2;
        const paddingY = (window.innerHeight - 190 - rows * 20) / 2;
        const nodes = [];

        for (var x = 1; x <= rows; x++) {
            for (var y = 1; y <= columns; y++) {
                const key = "node-" + x + "-" + y;
                const nodeState = this.decideNodeState(
                    x,
                    y,
                    source,
                    target,
                    walls,
                    visitedNodes
                );

                nodes.push(
                    <Node
                        key={key}
                        position={new Position(x, y)}
                        id={key}
                        nodeState={nodeState}
                        interactionDone={interactionDone}
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
                onMouseLeave={() => this.handleMouseLeavingGrid()}
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
