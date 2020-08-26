import React, { Component } from "react";
import Node from "../Node/node";
import NodeState from "../Node/node_state";
import Position from "../Node/position";
import "./grid.css";
class Grid extends Component {
    state = {
        gridRows: this.props.gridRows,
        gridColumns: this.props.gridColumns,
        paddingX: this.props.paddingX,
        paddingY: this.props.paddingY,
        source: new Position(-1, -1),
        target: new Position(-1, -1),
    };

    componentDidMount() {
        console.log("mounted");
        const gridHeight = document.querySelector(".grid-container")
            .offsetHeight;
        const gridWidth = document.querySelector(".grid-container").offsetWidth;

        const gridRows = parseInt((gridHeight - 40) / 20);
        const paddingY = (gridHeight - gridRows * 20) / 2;

        const gridColumns = parseInt((gridWidth - 40) / 20);
        const paddingX = (gridWidth - gridColumns * 20) / 2;
        const source = new Position(
            parseInt(0.1 * gridRows),
            parseInt(0.1 * gridColumns)
        );
        const target = new Position(
            parseInt(0.9 * gridRows),
            parseInt(0.9 * gridColumns)
        );

        this.setState({
            gridRows,
            gridColumns,
            paddingX,
            paddingY,
            source,
            target,
        });
        this.props.onNodeCreated(gridRows, gridColumns, source, target);
    }

    render() {
        console.log("render");
        const nodes = [];
        for (var x = 1; x <= this.state.gridRows; x++) {
            for (var y = 1; y <= this.state.gridColumns; y++) {
                const key = "node-" + x + "-" + y;
                const nodeState =
                    x === this.state.source.x && y === this.state.source.y
                        ? NodeState.NODE_IS_SOURCE
                        : x === this.state.target.x && y === this.state.target.y
                        ? NodeState.NODE_IS_TARGET
                        : NodeState.NODE_UNVISITED;
                nodes.push(
                    <Node
                        key={key}
                        position={new Position(x, y)}
                        id={key}
                        nodeState={nodeState}
                    />
                );
            }
        }
        return (
            <section
                className="grid-container"
                style={{
                    paddingTop: this.state.paddingY,
                    paddingRight: this.state.paddingX,
                    paddingBottom: this.state.paddingY,
                    paddingLeft: this.state.paddingX,
                }}
            >
                {nodes}
            </section>
        );
    }
}

export default Grid;
