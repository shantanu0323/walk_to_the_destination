import React, { Component } from "react";
import Node from "../Node/node";

class Grid extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Node />
                <Node />
                <Node />
            </React.Fragment>
        );
    }
}

export default Grid;
