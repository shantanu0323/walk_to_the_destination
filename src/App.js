import React, { Component } from "react";
import NavBar from "./components/NavBar/navbar";
import Legend from "./components/Legend/legend";
import Grid from "./components/Grid/grid";
import Position from "./components/Node/position.jsx";
import Insights from "./components/Insights/insights";
import Copyright from "./components/Copyright/copyright";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import performDijkstra from "./algorithms/dijkstra";

class App extends Component {
    componentDidMount() {
        // Include the FontAwesome Library
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.crossOrigin = "anonymous";
        s.src = "https://kit.fontawesome.com/f7fe82406d.js";
        document.body.appendChild(s);

        const gridHeight = window.innerHeight - 190;
        const gridWidth = window.innerWidth;

        const rows = parseInt((gridHeight - 40) / 20);

        const columns = parseInt((gridWidth - 40) / 20);
        const source = new Position(
            parseInt(0.5 * rows),
            parseInt(0.25 * columns)
        );
        const target = new Position(
            parseInt(0.5 * rows),
            parseInt(0.75 * columns)
        );
        this.setState({ rows, columns, source, target });
    }

    state = {
        selectedAlgorithmId: "algo-dijkstra",
        selectedSpeedId: "speed-fast",
        speed: 15,
        rows: 0,
        columns: 0,
        source: new Position(-1, -1),
        target: new Position(-1, -1),
        walls: [],
        visitedNodes: [],
    };

    setAlgorithmId = (selectedAlgorithmId) => {
        this.setState({ selectedAlgorithmId });
        const dom = document.querySelector(".algorithm-options-container");
        dom.classList.remove("show");
    };

    setSpeedId = (selectedSpeedId, speed) => {
        this.setState({ selectedSpeedId, speed });
        const dom = document.querySelector(".speed-options-container");
        dom.classList.remove("show");
    };

    setNodeAsSource = (position) => {
        // console.log(`SOURCE: ${position}`);
        if (
            !(
                position.x === this.state.target.x &&
                position.y === this.state.target.y
            )
        ) {
            let walls = this.state.walls;
            if (
                walls.some(
                    (node) => node.x === position.x && node.y === position.y
                )
            ) {
                walls = this.state.walls.filter(
                    (node) => !(node.x === position.x && node.y === position.y)
                );
            }
            this.setState({ source: position, walls });
        }
    };

    setNodeAsTarget = (position) => {
        // console.log(`TARGET: ${position}`);
        if (
            !(
                position.x === this.state.source.x &&
                position.y === this.state.source.y
            )
        ) {
            let walls = this.state.walls;
            if (
                walls.some(
                    (node) => node.x === position.x && node.y === position.y
                )
            ) {
                walls = this.state.walls.filter(
                    (node) => !(node.x === position.x && node.y === position.y)
                );
            }
            this.setState({ target: position, walls });
        }
    };

    toggleWall = (position) => {
        // console.log(position);
        let walls = this.state.walls;
        if (
            walls.some((node) => node.x === position.x && node.y === position.y)
        ) {
            // Node is a wall -> change to unvisited
            walls = walls.filter(
                (node) => !(node.x === position.x && node.y === position.y)
            );
        } else {
            walls.push(position);
        }
        this.setState({ walls });
    };

    startWalking = () => {
        for (let i = 1; i <= this.state.rows; i++) {
            for (let j = 1; j <= this.state.columns; j++) {
                const nodeDom = document.querySelector(`#node-${i}-${j}`);
                if (
                    nodeDom.classList.contains("node-visited") ||
                    nodeDom.classList.contains("node-path")
                ) {
                    nodeDom.classList.remove("node-visited");
                    nodeDom.classList.remove("node-path");
                    nodeDom.classList.add("node-unvisited");
                }
            }
        }
        setTimeout(() => {
            console.log("START WALKING");
            const { visitedNodes, path } = performDijkstra(
                this.state.rows,
                this.state.columns,
                this.state.source,
                this.state.target,
                this.state.walls
            );
            for (let i = 0; i < visitedNodes.length; i++) {
                setTimeout(() => {
                    const nodeDom = document.querySelector(
                        `#node-${visitedNodes[i].position.x}-${visitedNodes[i].position.y}`
                    );
                    if (nodeDom.classList.contains("node-unvisited")) {
                        nodeDom.classList.remove("node-unvisited");
                        nodeDom.classList.add("node-visited");
                    }
                    if (i === visitedNodes.length - 1)
                        setTimeout(() => {
                            if (
                                visitedNodes[i].position.x ===
                                    this.state.target.x &&
                                visitedNodes[i].position.y ===
                                    this.state.target.y
                            ) {
                                for (let k = 0; k < path.length; k++) {
                                    setTimeout(() => {
                                        const node = path[k];
                                        const nodeDom = document.querySelector(
                                            `#node-${node.position.x}-${node.position.y}`
                                        );
                                        nodeDom.classList.remove(
                                            "node-visited"
                                        );
                                        nodeDom.classList.add("node-path");
                                    }, this.state.speed * k);
                                }
                            } else {
                                alert("Target NOT Reachable");
                            }
                        }, this.state.speed + 500);
                }, this.state.speed * i);
            }
        }, 500);
    };

    updateMaze = (walls, visitedNodes) => {
        this.setState({ walls, visitedNodes });
    };

    render() {
        return (
            <React.Fragment>
                <NavBar
                    selectedAlgorithmId={this.state.selectedAlgorithmId}
                    selectedSpeedId={this.state.selectedSpeedId}
                    onAlgorithmChanged={this.setAlgorithmId}
                    onSpeedChanged={this.setSpeedId}
                    startWalking={this.startWalking}
                    rows={this.state.rows}
                    columns={this.state.columns}
                    source={this.state.source}
                    target={this.state.target}
                    speed={this.state.speed}
                    onMazeCreated={this.updateMaze}
                />
                <Legend />
                <Grid
                    rows={this.state.rows}
                    columns={this.state.columns}
                    source={this.state.source}
                    target={this.state.target}
                    walls={this.state.walls}
                    visitedNodes={this.state.visitedNodes}
                    setNodeAsSource={this.setNodeAsSource}
                    setNodeAsTarget={this.setNodeAsTarget}
                    toggleWall={this.toggleWall}
                />
                <Insights insights="Insights" />
                <Copyright />
            </React.Fragment>
        );
    }
}

export default App;
