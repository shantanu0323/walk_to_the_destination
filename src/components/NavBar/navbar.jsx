import React, { Component } from "react";
import "./navbar.css";
import logo from "../../logo.svg";
import NavItem from "./NavItem/navitem";
import generateBinaryTreeMaze from "../../algorithms/mazeGeneratingAlgorithms/binary_tree";
import generateDFSMaze from "../../algorithms/mazeGeneratingAlgorithms/dfs";
import generateRecursiveDivisionMaze from "../../algorithms/mazeGeneratingAlgorithms/recursive_division";
import generateRandomMaze from "../../algorithms/mazeGeneratingAlgorithms/random";
import generateSpiralMaze from "../../algorithms/mazeGeneratingAlgorithms/spiral";

class NavBar extends Component {
    state = {
        algorithms: [
            {
                id: "algo-dijkstra",
                name: "Dijkstra's",
                description: (
                    <div>
                        <p>
                            <b>Initialisation</b>
                            <br />
                            Put all nodes except <i>source</i> into{" "}
                            <i>unvisitedNodes</i> list
                            <br />
                            Create another list <i>distances</i> and initialize
                            all values to <i>Infinity</i>
                            <br />
                            Set the <i>distances[source] = 0</i>
                        </p>
                        <ol>
                            <li>
                                For the current node, consider all of its
                                unvisited neighbours and calculate their
                                <i>tentative</i>
                                distances through the current node.{" "}
                            </li>
                            <li>
                                Compare the newly calculated
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
                                <i>unvisitedNodes</i>. A visited node will never
                                be checked again.
                            </li>
                            <li>
                                If the destination node has been marked visited
                                (when planning a route between two specific
                                nodes) or if the smallest tentative distance
                                among the nodes in the
                                <i>unvisitedNodes</i>
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
                            We create two lists – <i>openList</i> and{" "}
                            <i>Closed List</i>
                            (just like Dijkstra Algorithm)
                        </p>
                        <ol>
                            <li>
                                Initialize the <i>openList</i> and put the
                                starting node on the <i>openList</i> (you can
                                leave its <strong>f</strong> at zero)
                            </li>
                            <li>Initialize the closed list as empty list</li>
                            <li>
                                while the <i>openList</i> is not empty{" "}
                            </li>
                            <ol>
                                <li>
                                    find the node with the least{" "}
                                    <strong>f</strong> on the <i>openList</i>,
                                    call it "q"{" "}
                                </li>
                                <li>
                                    pop q off the <i>openList</i>{" "}
                                </li>
                                <li>
                                    generate q's 4 neighbours and set their
                                    parents to q{" "}
                                </li>
                                <li>for each successor </li>
                                <ol>
                                    <li>
                                        if successor is the goal, stop search
                                        successor.
                                        <strong>g</strong> = q.
                                        <strong>g</strong> + distance between
                                        successor and q successor.
                                        <strong>h</strong> = distance from goal
                                        to successor (This can be done using
                                        many ways, we will discuss three
                                        heuristics- Manhattan, Diagonal and
                                        Euclidean Heuristics) successor.
                                        <strong>f</strong> = successor.
                                        <strong>g</strong> + successor.
                                        <strong>h</strong>
                                    </li>
                                    <li>
                                        if a node with the same position as
                                        successor is in the <i>openList</i>{" "}
                                        which has a lower <strong>f</strong>{" "}
                                        than successor, skip this successor{" "}
                                    </li>
                                    <li>
                                        if a node with the same position as
                                        successor is in the CLOSED list which
                                        has a lower <strong>f</strong> than
                                        successor, skip this successor
                                        otherwise, add the node to the{" "}
                                        <i>openList</i>
                                        end (for loop) e. push q on the closed
                                        list end (while loop){" "}
                                    </li>
                                </ol>
                            </ol>
                        </ol>
                    </div>
                ),
            },
            {
                id: "algo-greedy",
                name: "Greedy",
                description: (
                    <div>
                        <p>
                            Same as A* except this time we will only look at the{" "}
                            <b>h</b> cost <br />
                            We create two lists – <i>openList</i> and{" "}
                            <i>Closed List</i>
                            (just like Dijkstra Algorithm)
                        </p>
                        <ol>
                            <li>
                                Initialize the <i>openList</i> and put the
                                starting node on the <i>openList</i> (you can
                                leave its <strong>h</strong> at zero)
                            </li>
                            <li>Initialize the closed list as empty list</li>
                            <li>
                                while the <i>openList</i> is not empty{" "}
                            </li>
                            <ol>
                                <li>
                                    find the node with the least{" "}
                                    <strong>h</strong> on the <i>openList</i>,
                                    call it "<strong>q</strong>"{" "}
                                </li>
                                <li>
                                    pop q off the <i>openList</i>{" "}
                                </li>
                                <li>
                                    generate q's 4 neighbours and set their
                                    parents to q{" "}
                                </li>
                                <li>for each successor </li>
                                <ol>
                                    <li>
                                        if successor is the goal, stop search
                                        successor.<strong>h</strong> = distance
                                        from goal to successor (This can be done
                                        using many ways, we will discuss three
                                        heuristics- Manhattan, Diagonal and
                                        Euclidean Heuristics)
                                    </li>
                                    <li>
                                        if a node with the same position as
                                        successor is in the <i>openList</i>{" "}
                                        which has a lower <strong>h</strong>{" "}
                                        than successor, skip this successor{" "}
                                    </li>
                                    <li>
                                        if a node with the same position as
                                        successor is in the CLOSED list which
                                        has a lower <strong>h</strong> than
                                        successor, skip this successor
                                        otherwise, add the node to the{" "}
                                        <i>openList</i>
                                        end (for loop) e. push q on the closed
                                        list end (while loop){" "}
                                    </li>
                                </ol>
                            </ol>
                        </ol>
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
                            <br />
                            <b>Initialisation</b>
                            <br />
                            set up a <b>queue</b> and put the <i>source</i> into
                            it. set up a <b>parents</b> map and set the parent
                            of <i>source</i> as NULL
                        </p>
                        <ol>
                            <li>loop until target is found</li>
                            <ol>
                                <li>
                                    <b>currNode</b> = <i>queue[0]</i>
                                </li>
                                <li>
                                    push the <i>currNode</i> to the{" "}
                                    <i>visitedNodes</i> list
                                </li>
                                <li>
                                    if <i>currNode</i> is the target then{" "}
                                    <i>break</i>
                                </li>
                                <li>
                                    else, remove <i>currNode</i> from the{" "}
                                    <i>queue</i>
                                </li>
                                <li>
                                    set the parent of the <i>neighbours</i> as
                                    the <i>currNode</i>
                                </li>
                                <li>
                                    push the <b>neighbours</b> of the{" "}
                                    <i>currNode</i> into the <i>queue</i>
                                </li>
                            </ol>
                        </ol>
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
                            <br />
                            <b>Initialisation</b>
                            <br />
                            set up an empty <b>visitedNodes</b>
                            <br />
                            set up a <b>parents</b> map and set the parent of{" "}
                            <i>source</i> as NULL
                            <b>currNode</b> = <i>source</i>
                        </p>
                        <ol>
                            <li>
                                if <b>targetFound</b> flag is true, then return
                            </li>
                            <li>
                                if <b>currNode</b> = <i>target</i>
                                <ol>
                                    <li>
                                        push the <i>currNode</i> into the{" "}
                                        <i>visitedNodes</i>
                                    </li>
                                    <li>
                                        set the <b>targetFound</b> flag to true
                                        and <i>return</i>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                push the <i>currNode</i> to the{" "}
                                <i>visitedNodes</i> list
                            </li>
                            <li>
                                set the parent of the <i>neighbours</i> as the{" "}
                                <i>currNode</i>
                            </li>
                            <li>
                                loop through the <i>neighbours</i> unless the{" "}
                                <i>targetFound</i> flag is false
                                <ol>
                                    <li>recurse from step 1</li>
                                    <li>
                                        remove the <i>neighbour</i> from{" "}
                                        <i>neighbours</i> list
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </div>
                ),
            },
        ],
        mazes: [
            { id: "maze-none", name: "Create" },
            { id: "maze-binary-tree", name: "Binary Tree" },
            { id: "maze-dfs", name: "Depth First Search" },
            { id: "maze-recursive-division", name: "Recursive Division" },
            { id: "maze-spiral", name: "Spiral" },
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
            case "maze-spiral":
                return generateSpiralMaze;
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
                <div className="option-container algorithm-options-container">
                    <NavItem
                        options={this.state.algorithms}
                        selectedOption={selectedAlgorithmId}
                        onChanged={onAlgorithmChanged}
                    />
                </div>
                <div className="option-container maze-options-container">
                    <NavItem
                        options={this.state.mazes}
                        selectedOption={this.state.selectedMazeId}
                        onChanged={this.setMazeId}
                    />
                </div>
                <div className="option-container speed-options-container">
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
