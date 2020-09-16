import React, { Component } from "react";
import "./navbar.css";
import logo from "../../logo.svg";
import NavItem from "./NavItem/navitem";
import generateBinaryTreeMaze from "../../algorithms/mazeGeneratingAlgorithms/binary_tree";
import generateDFSMaze from "../../algorithms/mazeGeneratingAlgorithms/dfs";
import generateRecursiveDivisionMaze from "../../algorithms/mazeGeneratingAlgorithms/recursive_division";
import generateRandomMaze from "../../algorithms/mazeGeneratingAlgorithms/random";

class NavBar extends Component {
    state = {
        algorithms: [
            {
                id: "algo-dijkstra",
                name: "Dijkstra's",
                description: (
                    <div>
                        <p>
                            Let the node at which we are starting be called the
                            <b>initial node</b>. Let the
                            <b>
                                distance of node
                                <i>Y</i>
                            </b>
                            be the distance from the <b> initial node</b>
                            to
                            <i>Y</i>. Dijkstra's algorithm will assign some
                            initial distance values and will try to improve them
                            step by step.
                        </p>
                        <ol>
                            <li>
                                Mark all nodes unvisited. Create a set of all
                                the unvisited nodes called the
                                <i>unvisited set</i>.
                            </li>
                            <li>
                                Assign to every node a tentative distance value:
                                set it to zero for our initial node and to
                                infinity for all other nodes. Set the initial
                                node as current.
                            </li>
                            <li>
                                For the current node, consider all of its
                                unvisited neighbours and calculate their
                                <i>tentative</i>
                                distances through the current node. Compare the
                                newly calculated
                                <i>tentative</i>
                                distance to the current assigned value and
                                assign the smaller one. For example, if the
                                current node
                                <i>A</i>
                                is marked with a distance of 6, and the edge
                                connecting it with a neighbour
                                <i>B</i>
                                has length 2, then the distance to
                                <i>B</i>
                                through
                                <i>A</i>
                                will be 6 + 2 = 8. If B was previously marked
                                with a distance greater than 8 then change it to
                                8. Otherwise, the current value will be kept.
                            </li>
                            <li>
                                When we are done considering all of the
                                unvisited neighbours of the current node, mark
                                the current node as visited and remove it from
                                the
                                <i>unvisited set</i>. A visited node will never
                                be checked again.
                            </li>
                            <li>
                                If the destination node has been marked visited
                                (when planning a route between two specific
                                nodes) or if the smallest tentative distance
                                among the nodes in the
                                <i>unvisited set</i>
                                is infinity (when planning a complete traversal;
                                occurs when there is no connection between the
                                initial node and remaining unvisited nodes),
                                then stop. The algorithm has finished.
                            </li>
                            <li>
                                Otherwise, select the unvisited node that is
                                marked with the smallest tentative distance, set
                                it as the new "current node", and go back to
                                step 3.
                            </li>
                        </ol>
                        <p>
                            When planning a route, it is actually not necessary
                            to wait until the destination node is "visited" as
                            above: the algorithm can stop once the destination
                            node has the smallest tentative distance among all
                            "unvisited" nodes (and thus could be selected as the
                            next "current").
                        </p>
                    </div>
                ),
            },
            {
                id: "algo-a*",
                name: "A*",
                description: (
                    <div>
                        <p>
                            We create two lists – <i>Open List</i> and{" "}
                            <i>Closed List</i>
                            (just like Dijkstra Algorithm)
                        </p>
                        <p>
                            1. Initialize the open list
                            <br />
                            2. Initialize the closed list put the starting node
                            on the open list (you can leave its{" "}
                            <strong>f</strong> at zero)
                            <br />
                            3. while the open list is not empty <br />
                            a. find the node with the least <strong>
                                f
                            </strong>{" "}
                            on the open list, call it "q" <br />
                            b. pop q off the open list <br />
                            c. generate q's 8 successors and set their parents
                            to q <br />
                            d. for each successor <br />
                            i. if successor is the goal, stop search successor.
                            <strong>g</strong> = q.<strong>g</strong> + distance
                            between successor and q successor.<strong>h</strong>{" "}
                            = distance from goal to successor (This can be done
                            using many ways, we will discuss three heuristics-
                            Manhattan, Diagonal and Euclidean Heuristics)
                            successor.<strong>f</strong> = successor.
                            <strong>g</strong> + successor.<strong>h</strong>
                            <br />
                            ii. if a node with the same position as successor is
                            in the OPEN list which has a lower{" "}
                            <strong>f</strong> than successor, skip this
                            successor <br />
                            iii. if a node with the same position as successor
                            is in the CLOSED list which has a lower{" "}
                            <strong>f</strong> than successor, skip this
                            successor otherwise, add the node to the open list
                            end (for loop) e. push q on the closed list end
                            (while loop){" "}
                        </p>
                    </div>
                ),
            },
            {
                id: "algo-greedy",
                name: "Greedy",
                description: (
                    <div>
                        <p>
                            A<b>greedy algorithm</b>
                            is any algorithm that follows the problem-solving
                            heuristic of making the locally optimal choice at
                            each stage. In many problems, a greedy strategy does
                            not usually produce an optimal solution, but
                            nonetheless a greedy heuristic may yield locally
                            optimal solutions that approximate a globally
                            optimal solution in a reasonable amount of time.
                        </p>
                        <p>
                            For example, a greedy strategy for the
                            <a
                                href="/wiki/Travelling_salesman_problem"
                                title="Travelling salesman problem"
                            >
                                travelling salesman problem
                            </a>
                            (which is of a high computational complexity) is the
                            following heuristic: "At each step of the journey,
                            visit the nearest unvisited city." This heuristic
                            does not intend to find a best solution, but it
                            terminates in a reasonable number of steps; finding
                            an optimal solution to such a complex problem
                            typically requires unreasonably many steps. In
                            mathematical optimization, greedy algorithms
                            optimally solve combinatorial problems having the
                            properties of
                            <a href="/wiki/Matroid" title="Matroid">
                                matroids
                            </a>
                            , and give constant-factor approximations to
                            optimization problems with submodular structure.
                        </p>
                    </div>
                ),
            },
            {
                id: "algo-bfs",
                name: "Breadth-First-Search",
                description: (
                    <div>
                        <p>
                            Visit all the siblings before exploring the children
                        </p>
                    </div>
                ),
            },
            {
                id: "algo-dfs",
                name: "Depth-First-Search",
                description: (
                    <div>
                        <p>
                            Visit all the children before exploring the siblings
                        </p>
                    </div>
                ),
            },
        ],
        mazes: [
            { id: "maze-none", name: "Create" },
            { id: "maze-binary-tree", name: "Binary Tree" },
            { id: "maze-dfs", name: "Depth First Search" },
            { id: "maze-recursive-division", name: "Recursive Division" },
            { id: "maze-random", name: "Random Maze" },
        ],
        speeds: [
            { id: "speed-faster", name: "Faster", speed: 10 },
            { id: "speed-fast", name: "Fast", speed: 15 },
            { id: "speed-normal", name: "Normal", speed: 20 },
            { id: "speed-slow", name: "Slow", speed: 200 },
            { id: "speed-slower", name: "Slower", speed: 500 },
        ],
        selectedMazeId: "maze-none",
    };

    constructMaze = (walls) => {
        for (let i = 0; i < walls.length; i++) {
            const wall = walls[i];
            setTimeout(() => {
                const nodeDom = document.querySelector(
                    `#node-${wall.x}-${wall.y}`
                );
                nodeDom.classList.remove("node-unvisited");
                nodeDom.classList.add("node-wall");
                if (i === walls.length - 1) {
                    setTimeout(() => {
                        this.props.stopLoading();
                        this.props.onMazeCreated(walls, []);
                    }, this.props.speed);
                }
            }, (this.props.speed * i) / 2);
        }
    };

    getSelectedMazeFunction = (mazeId) => {
        switch (mazeId) {
            case "maze-binary-tree":
                return generateBinaryTreeMaze;
            case "maze-dfs":
                return generateDFSMaze;
            case "maze-recursive-division":
                return generateRecursiveDivisionMaze;
            case "maze-random":
                return generateRandomMaze;
            case "maze-none":
                return -1;
            default:
                return null;
        }
    };

    setMazeId = (selectedMazeId) => {
        const generateMaze = this.getSelectedMazeFunction(selectedMazeId);
        if (generateMaze === null) {
            alert("Coming Soon !!!");
            return;
        }
        const dom = document.querySelector(".maze-options-container");
        dom.classList.remove("show");
        this.props.resetMesh(); // clear the maze
        this.setState({ selectedMazeId });
        if (generateMaze === -1) return;
        this.props.startLoading();
        console.log("Generate Maze : ", selectedMazeId);
        const wallsInOrder = generateMaze(
            this.props.rows,
            this.props.columns,
            this.props.source,
            this.props.target
        );
        this.constructMaze(wallsInOrder);
    };

    showAlgorithmOptionsContainer() {
        // $(".navbar-collapse").collapse("hide");
        const dom = document.querySelector(".algorithm-options-container");
        dom.classList.add("show");
    }

    showMazeOptionsContainer() {
        // $(".navbar-collapse").collapse("hide");
        const dom = document.querySelector(".maze-options-container");
        dom.classList.add("show");
    }

    showSpeedOptionsContainer() {
        // $(".navbar-collapse").collapse("hide");
        const dom = document.querySelector(".speed-options-container");
        dom.classList.add("show");
    }

    getSelectedAlgorithm(selectedAlgorithmId) {
        const algorithm = this.state.algorithms.filter(
            (algorithm) => algorithm.id === selectedAlgorithmId
        );
        return algorithm[0];
    }

    getSelectedMaze(selectedMazeId) {
        const maze = this.state.mazes.filter(
            (maze) => maze.id === selectedMazeId
        );
        return maze[0];
    }

    getSelectedSpeed(selectedSpeedId) {
        const speed = this.state.speeds.filter(
            (speed) => speed.id === selectedSpeedId
        );
        return speed[0];
    }

    render() {
        const {
            selectedAlgorithmId,
            selectedSpeedId,
            onAlgorithmChanged,
            onSpeedChanged,
            startWalking,
            clearPath,
            destructWalls,
            resetMesh,
        } = this.props;
        return (
            <React.Fragment>
                <nav className="navbar-custom">
                    <span className="brand">
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="logo"
                        />
                        <span className="my-auto">Walk to the Destination</span>
                    </span>
                    <div className="actions-container">
                        <button id="btn-clear-path" onClick={() => clearPath()}>
                            <span>Clear Path</span>
                            <i className="fas fa-eraser"></i>
                        </button>
                        <button
                            id="btn-desctruct-walls"
                            onClick={() => destructWalls()}
                        >
                            <span>Destruct Walls</span>
                            <i className="fas fa-snowplow"></i>
                        </button>
                        <button id="btn-reset-mesh" onClick={() => resetMesh()}>
                            <span>Reset Mesh</span>
                            <i className="fas fa-trash-restore"></i>
                        </button>
                        <button
                            id="btn-start-walking"
                            onClick={() => startWalking()}
                        >
                            <span>Start Walking</span>
                            <i className="fas fa-play-circle"></i>
                        </button>
                    </div>
                    <div className="walking-options">
                        <ul>
                            <li>
                                <button
                                    className="btn-algorithm"
                                    onClick={this.showAlgorithmOptionsContainer}
                                >
                                    <span>
                                        {
                                            this.getSelectedAlgorithm(
                                                selectedAlgorithmId
                                            ).name
                                        }
                                    </span>{" "}
                                    Algorithm
                                    <i className="fas fa-check-double ml-1"></i>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="btn-maze"
                                    onClick={this.showMazeOptionsContainer}
                                >
                                    <span>
                                        {
                                            this.getSelectedMaze(
                                                this.state.selectedMazeId
                                            ).name
                                        }
                                    </span>{" "}
                                    Maze
                                    <i className="fab fa-magento ml-1"></i>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="btn-speed"
                                    onClick={this.showSpeedOptionsContainer}
                                >
                                    Speed :{" "}
                                    <span>
                                        {
                                            this.getSelectedSpeed(
                                                selectedSpeedId
                                            ).name
                                        }
                                    </span>{" "}
                                    <i className="fas fa-tachometer-alt"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="algorithm-options-container">
                    <NavItem
                        options={this.state.algorithms}
                        selectedOption={selectedAlgorithmId}
                        onChanged={onAlgorithmChanged}
                    />
                </div>
                <div className="maze-options-container">
                    <NavItem
                        options={this.state.mazes}
                        selectedOption={this.state.selectedMazeId}
                        onChanged={this.setMazeId}
                    />
                </div>
                <div className="speed-options-container">
                    <NavItem
                        options={this.state.speeds}
                        selectedOption={selectedSpeedId}
                        onChanged={onSpeedChanged}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default NavBar;
