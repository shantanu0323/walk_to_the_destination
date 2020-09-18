import React, { Component } from "react";
import NavBar from "./components/NavBar/navbar";
import Legend from "./components/Legend/legend";
import Grid from "./components/Grid/grid";
import Position, { isEqual } from "./helper/position";
import Insights from "./components/Insights/insights";
import Copyright from "./components/Copyright/copyright";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import resetSourceAndTarget from "./helper/initialise";
import Loader from "./components/Loader/loader";
import performDijkstra from "./algorithms/dijkstra";
import performAstar from "./algorithms/a_star";
import performGreedy from "./algorithms/greedy";
import performBFS from "./algorithms/bfs";
import performDFS from "./algorithms/dfs";
import Interact from "./components/Interact/interact";

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
            parseInt(0.3 * columns)
        );
        // const source = new Position(2, 2);
        const target = new Position(
            parseInt(0.5 * rows),
            parseInt(0.7 * columns)
        );
        // const target = new Position(6, 8);
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
        loading: false,
        numberOfVisitedNodes: null,
        pathLength: null,
        timeTaken: null,
        targetReached: true,
        interactionDone: false,
    };

    startLoading = () => {
        document
            .querySelectorAll(".node")
            .forEach((nodeDom) => (nodeDom.style.animationDuration = `4s`));
        this.setState({ loading: true });
    };

    stopLoading = (delay = 4, changeInteraction = true) => {
        document
            .querySelectorAll(".node.node-path")
            .forEach(
                (nodeDom) =>
                    (nodeDom.style.animationDuration = `${delay / 1000 + 4}s`)
            );
        this.setState({ loading: false, interactionDone: changeInteraction });
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

    putNodeInPath = (position, node) => {
        if (isEqual(position, new Position(node.x - 1, node.y))) return "top";
        if (isEqual(position, new Position(node.x, node.y + 1))) return "right";
        if (isEqual(position, new Position(node.x + 1, node.y)))
            return "bottom";
        if (isEqual(position, new Position(node.x, node.y - 1))) return "left";
        return "null";
    };

    resetInsights = () => {
        this.setState({
            numberOfVisitedNodes: null,
            pathLength: null,
            timeTaken: null,
            targetReached: true,
        });
    };

    clearPath = async () => {
        document
            .querySelectorAll(
                ".grid-container .node.node-path, .grid-container .node.node-visited"
            )
            .forEach((nodeDom) => {
                nodeDom.classList.add("node-unvisited");
                nodeDom.classList.remove("node-visited");
                nodeDom.classList.remove("node-path");
            });
        this.setState({
            visitedNodes: [],
            numberOfVisitedNodes: null,
            pathLength: null,
            timeTaken: null,
        });
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
        resetSourceAndTarget();
        this.resetInsights();
    };

    destructWalls = () => {
        document
            .querySelectorAll(".grid-container .node.node-wall")
            .forEach((nodeDom) => {
                nodeDom.classList.add("node-unvisited");
                nodeDom.classList.remove("node-wall");
            });
        this.setState({ walls: [] });
    };

    resetMesh = () => {
        this.clearPath();
        this.destructWalls();
    };

    getSelectedAlgorithmFunction = () => {
        switch (this.state.selectedAlgorithmId) {
            case "algo-dijkstra":
                return performDijkstra;
            case "algo-a*":
                return performAstar;
            case "algo-greedy":
                return performGreedy;
            case "algo-bfs":
                return performBFS;
            case "algo-dfs":
                return performDFS;
            default:
                return null;
        }
    };

    updateWalls = () => {
        const walls = [];
        document
            .querySelectorAll(".grid-container .node.node-wall")
            .forEach((node) =>
                walls.push(new Position(node.dataset.x, node.dataset.y))
            );
        this.setState({ walls });
    };

    startWalking = async () => {
        this.startLoading();
        this.clearPath();
        this.updateWalls();
        setTimeout(() => {
            console.log("START WALKING");
            const algorithm = this.getSelectedAlgorithmFunction();
            if (algorithm === null) {
                alert("Coming Soon !!!");
                return;
            }
            resetSourceAndTarget();
            const startTime = new Date().getTime();
            const { visitedNodes, path } = algorithm(
                this.state.rows,
                this.state.columns,
                this.state.source,
                this.state.target,
                this.state.walls
            );
            const endTime = new Date().getTime();
            this.setState({
                numberOfVisitedNodes: visitedNodes.length,
                pathLength:
                    visitedNodes[visitedNodes.length - 1].x ===
                        this.state.target.x &&
                    visitedNodes[visitedNodes.length - 1].y ===
                        this.state.target.y
                        ? path.length + 1
                        : null,
                timeTaken: endTime - startTime,
                targetReached:
                    visitedNodes[visitedNodes.length - 1].x ===
                        this.state.target.x &&
                    visitedNodes[visitedNodes.length - 1].y ===
                        this.state.target.y
                        ? true
                        : false,
            });
            // this.stopLoading();
            // return;
            for (let i = 0; i < visitedNodes.length; i++) {
                setTimeout(() => {
                    const nodeDom = document.querySelector(
                        `#node-${visitedNodes[i].x}-${visitedNodes[i].y}`
                    );
                    if (nodeDom.classList.contains("node-unvisited")) {
                        nodeDom.classList.remove("node-unvisited");
                        nodeDom.classList.add("node-visited");
                    }
                    if (i === visitedNodes.length - 1)
                        setTimeout(() => {
                            if (
                                visitedNodes[i].x === this.state.target.x &&
                                visitedNodes[i].y === this.state.target.y
                            ) {
                                this.setState({ targetReached: true });
                                document
                                    .querySelector(".node.node-source")
                                    .classList.add(
                                        `path-to-${this.putNodeInPath(
                                            path[0],
                                            this.state.source
                                        )}`
                                    );
                                for (let k = 0; k < path.length; k++) {
                                    setTimeout(() => {
                                        const node = path[k];
                                        const nodeDom = document.querySelector(
                                            `#node-${node.x}-${node.y}`
                                        );
                                        nodeDom.classList.remove(
                                            "node-visited"
                                        );
                                        nodeDom.classList.add("node-path");
                                        if (k === path.length - 1) {
                                            document
                                                .querySelector(
                                                    ".node.node-target"
                                                )
                                                .classList.add(
                                                    `path-to-${this.putNodeInPath(
                                                        path[path.length - 1],
                                                        this.state.target
                                                    )}`
                                                );
                                            this.stopLoading(
                                                this.state.speed * k * 2
                                            );
                                        }
                                    }, this.state.speed * k * 2);
                                }
                            } else {
                                this.setState({ targetReached: false });
                                console.log("Target NOT Reachable");
                                this.stopLoading();
                            }
                        }, this.state.speed + 500);
                }, this.state.speed * i);
            }
        }, 100);
    };

    updateMaze = (walls, visitedNodes) => {
        this.setState({ walls, visitedNodes });
    };

    render() {
        return (
            <React.Fragment>
                <Loader
                    loading={this.state.loading}
                    interactionDone={this.state.interactionDone}
                />
                <NavBar
                    selectedAlgorithmId={this.state.selectedAlgorithmId}
                    selectedSpeedId={this.state.selectedSpeedId}
                    onAlgorithmChanged={this.setAlgorithmId}
                    onSpeedChanged={this.setSpeedId}
                    startWalking={this.startWalking}
                    clearPath={this.clearPath}
                    destructWalls={this.destructWalls}
                    resetMesh={this.resetMesh}
                    rows={this.state.rows}
                    columns={this.state.columns}
                    source={this.state.source}
                    target={this.state.target}
                    speed={this.state.speed}
                    onMazeCreated={this.updateMaze}
                    startLoading={this.startLoading}
                    stopLoading={this.stopLoading}
                />

                <Grid
                    rows={this.state.rows}
                    columns={this.state.columns}
                    source={this.state.source}
                    target={this.state.target}
                    walls={this.state.walls}
                    visitedNodes={this.state.visitedNodes}
                    interactionDone={this.state.interactionDone}
                    setNodeAsSource={this.setNodeAsSource}
                    setNodeAsTarget={this.setNodeAsTarget}
                />
                <Legend />
                <Insights
                    totalNodes={this.state.rows * this.state.columns}
                    walls={this.state.walls.length}
                    numberOfVisitedNodes={this.state.numberOfVisitedNodes}
                    pathLength={this.state.pathLength}
                    timeTaken={this.state.timeTaken}
                    targetReached={this.state.targetReached}
                />
                <Copyright />
                {this.state.rows !== 0 && this.state.columns !== 0 ? (
                    window.innerWidth > 950 && !this.state.interactionDone ? (
                        <Interact
                            startLoading={this.startLoading}
                            stopLoading={this.stopLoading}
                            rows={this.state.rows}
                            columns={this.state.columns}
                        />
                    ) : null
                ) : null}
            </React.Fragment>
        );
    }
}

export default App;
