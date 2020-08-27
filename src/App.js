import React, { Component } from "react";
import NavBar from "./components/NavBar/navbar";
import Legend from "./components/Legend/legend";
import Grid from "./components/Grid/grid";
// import Node from "./components/Node/node.jsx";
// import NodeState from "./components/Node/node_state.jsx";
import Position from "./components/Node/position.jsx";
import Insights from "./components/Insights/insights";
import Copyright from "./components/Copyright/copyright";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

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
            parseInt(0.1 * rows),
            parseInt(0.1 * columns)
        );
        const target = new Position(
            parseInt(0.9 * rows),
            parseInt(0.9 * columns)
        );
        this.setState({ rows, columns, source, target });
    }

    state = {
        selectedAlgorithmId: "algo-dijkstra",
        selectedMazeId: "maze-recursive-division",
        selectedSpeedId: "speed-fast",
        speed: 20,
        rows: 0,
        columns: 0,
        source: new Position(-1, -1),
        target: new Position(-1, -1),
        walls: [],
    };

    setAlgorithmId = (selectedAlgorithmId) => {
        this.setState({ selectedAlgorithmId });
        const dom = document.querySelector(".algorithm-options-container");
        dom.classList.remove("show");
    };

    setMazeId = (selectedMazeId) => {
        this.setState({ selectedMazeId });
        const dom = document.querySelector(".maze-options-container");
        dom.classList.remove("show");
    };

    setSpeedId = (selectedSpeedId, speed) => {
        this.setState({ selectedSpeedId, speed });
        const dom = document.querySelector(".speed-options-container");
        dom.classList.remove("show");
    };

    setNodeAsSource = (position) => {
        console.log(`SOURCE: ${position}`);
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
        console.log(`TARGET: ${position}`);
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
        console.log(position);
        let walls = this.state.walls;
        if (
            walls.some((node) => node.x === position.x && node.y === position.y)
        ) {
            // Node is a wall -> change to unvisited
            console.log("check");
            walls = walls.filter(
                (node) => !(node.x === position.x && node.y === position.y)
            );
        } else {
            walls.push(position);
        }
        this.setState({ walls });
    };

    render() {
        return (
            <React.Fragment>
                <NavBar
                    selectedAlgorithmId={this.state.selectedAlgorithmId}
                    selectedMazeId={this.state.selectedMazeId}
                    selectedSpeedId={this.state.selectedSpeedId}
                    onAlgorithmChanged={this.setAlgorithmId}
                    onMazeChanged={this.setMazeId}
                    onSpeedChanged={this.setSpeedId}
                />
                <Legend />
                <Grid
                    rows={this.state.rows}
                    columns={this.state.columns}
                    source={this.state.source}
                    target={this.state.target}
                    walls={this.state.walls}
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
