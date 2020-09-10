import React from "react";
import "./legend.css";
import Node from "../Node/node";
import Position from "../../helper/position";
import NodeState from "../Node/node_state";

const Legend = () => {
    return (
        <section className="legend-container">
            <ul>
                <li>
                    <div>
                        <Node
                            nodeState={NodeState.NODE_UNVISITED}
                            position={new Position(-1, -1)}
                            legend={true}
                            disabled
                        />
                        <span className="ml-1">Unvisited</span>
                    </div>
                </li>
                <li>
                    <div>
                        <Node
                            nodeState={NodeState.NODE_VISITED}
                            position={new Position(-1, -1)}
                            legend={true}
                        />
                        <span className="ml-1">Visited</span>
                    </div>
                </li>
                <li>
                    <div>
                        <Node
                            nodeState={NodeState.NODE_IS_WALL}
                            position={new Position(-1, -1)}
                            legend={true}
                        />
                        <span className="ml-1">Wall</span>
                    </div>
                </li>
                <li>
                    <div>
                        <Node
                            nodeState={NodeState.NODE_IS_SOURCE}
                            position={new Position(-1, -1)}
                            legend={true}
                        />
                        <span className="ml-1">Source</span>
                    </div>
                </li>
                <li>
                    <div>
                        <Node
                            nodeState={NodeState.NODE_IS_TARGET}
                            position={new Position(-1, -1)}
                            legend={true}
                        />
                        <span className="ml-1">Target</span>
                    </div>
                </li>
            </ul>
        </section>
    );
};

export default Legend;
