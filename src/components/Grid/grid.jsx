import React, { Component } from "react";
import Node from "../Node/node";
import NodeState from "../Node/node_state";
import Position from "../../helper/position";
import "./grid.css";

class Grid extends Component {
    state = {
        isMousePressed: false,
        movingSource: false,
        movingTarget: false,
    };

    constructor() {
        super();
        this.prevPos = null;
    }

    toggleWall(position) {
        const nodeDom = document.getElementById(
            `node-${position.x}-${position.y}`
        );
        if (
            nodeDom.classList.contains("node-source") ||
            nodeDom.classList.contains("node-target")
        )
            return;
        nodeDom.classList.toggle("node-unvisited");
        nodeDom.classList.toggle("node-wall");
    }

    setNodeAsSource(position, set = true) {
        const nodeDom = document.getElementById(
            `node-${position.x}-${position.y}`
        );
        if (set && nodeDom.classList.contains("node-target"))
            return this.setNodeAsSource(this.prevPos);

        if (set) nodeDom.classList.add("node-source");
        else nodeDom.classList.remove("node-source");
    }

    setNodeAsTarget(position, set = true) {
        const nodeDom = document.getElementById(
            `node-${position.x}-${position.y}`
        );
        if (set && nodeDom.classList.contains("node-source"))
            return this.setNodeAsTarget(this.prevPos);
        if (set) nodeDom.classList.add("node-target");
        else nodeDom.classList.remove("node-target");
    }

    getSourcePosition() {
        const sourceDom = document.querySelector(
            ".grid-container .node.node-source"
        );
        if (sourceDom === null) return this.prevPos;
        return new Position(sourceDom.dataset.x, sourceDom.dataset.y);
    }

    getTargetPosition() {
        const targetDom = document.querySelector(
            ".grid-container .node.node-target"
        );
        if (targetDom === null) return this.prevPos;
        return new Position(targetDom.dataset.x, targetDom.dataset.y);
    }

    handleMouseLeavingGrid() {
        this.setState({ isMousePressed: false });
    }

    handleMouseUp(nodeState, position) {
        this.setState({ isMousePressed: false });
        if (this.state.movingSource) {
            this.setState({ movingSource: false });
            this.props.setNodeAsSource(this.getSourcePosition());
        } else if (this.state.movingTarget) {
            this.setState({ movingTarget: false });
            this.props.setNodeAsTarget(this.getTargetPosition());
        } else {
            this.props.updateWalls();
        }
    }

    handleMouseDown(nodeState, position) {
        this.setState({ isMousePressed: true });
        if (nodeState === NodeState.NODE_IS_SOURCE) {
            this.setState({ movingSource: true });
        } else if (nodeState === NodeState.NODE_IS_TARGET) {
            this.setState({ movingTarget: true });
        } else {
            this.toggleWall(position);
        }
    }
    handleMouseEnter(nodeState, position) {
        if (this.state.isMousePressed) {
            if (this.state.movingSource) {
                // TODO: change nodeState to source
                this.setNodeAsSource(position);
            } else if (this.state.movingTarget) {
                // TODO: change nodeState to target
                this.setNodeAsTarget(position);
            } else {
                // TODO: toggleWall()
                this.toggleWall(position);
            }
        }
    }
    handleMouseLeave(nodeState, position) {
        if (this.state.isMousePressed) {
            const nodeDom = document.getElementById(
                `node-${position.x}-${position.y}`
            );
            if (this.state.movingSource) {
                // TODO: change nodeState to unvisited
                if (!nodeDom.classList.contains("node-target"))
                    this.prevPos = position;
                else this.setNodeAsSource(this.prevPos, false);
                this.setNodeAsSource(position, false);
            } else if (this.state.movingTarget) {
                // TODO: change nodeState to unvisited
                if (!nodeDom.classList.contains("node-source"))
                    this.prevPos = position;
                else this.setNodeAsTarget(this.prevPos, false);
                this.setNodeAsTarget(position, false);
            } else {
                // do nothing
            }
        }
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
