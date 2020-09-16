import React, { Component } from "react";
import "./interact.css";
import { ltow, lengthOfWord } from "../../helper/letters";
import Position from "../../helper/position";
const Align = {
    TOP_LEFT: 0,
    TOP_CENTER: 1,
    TOP_RIGHT: 2,
    MIDDLE_LEFT: 3,
    MIDDLE_CENTER: 4,
    MIDDLE_RIGHT: 5,
    BOTTOM_LEFT: 6,
    BOTTOM_CENTER: 7,
    BOTTOM_RIGHT: 8,
    CUSTOM: 9,
};
let currIndex = 1;
class Interact extends Component {
    state = {
        transition: 7,
    };

    componentDidMount() {
        this.startIntro();
        const skipDom = document.getElementById(
            `node-${this.props.rows - 4}-${this.props.columns - 4}`
        );
        document.getElementById(
            `btn-skip-interaction`
        ).style.top = `${skipDom.offsetTop}px`;
        document.getElementById(
            `btn-skip-interaction`
        ).style.left = `${skipDom.offsetLeft}px`;
        const nextDom = document.getElementById(
            `node-${this.props.rows - 4}-${this.props.columns - 14}`
        );
        document.getElementById(
            `btn-next-interaction`
        ).style.top = `${nextDom.offsetTop}px`;
        document.getElementById(
            `btn-next-interaction`
        ).style.left = `${nextDom.offsetLeft}px`;
    }

    getCenter(total, len) {
        return parseInt((total - len + 1) / 2) + 1;
    }

    getStartPosition(
        word,
        row,
        lines,
        alignment = Align.TOP_CENTER,
        position = new Position(1, 1)
    ) {
        const len = lengthOfWord(word);
        let start = new Position(1, 1);
        switch (alignment) {
            case Align.TOP_LEFT:
                start.x = 1 + row * 7;
                break;
            case Align.TOP_CENTER:
                start.x = 1 + row * 7;
                start.y = this.getCenter(this.props.columns, len);
                break;
            case Align.TOP_RIGHT:
                start.x = 1 + row * 7;
                start.y = this.props.columns - len + 1;
                break;
            case Align.MIDDLE_LEFT:
                start.x =
                    this.getCenter(this.props.rows, lines * 6 - 1) +
                    row * 7 -
                    1;
                break;
            case Align.MIDDLE_CENTER:
                start.x =
                    this.getCenter(this.props.rows, lines * 6 - 1) +
                    row * 7 -
                    1;
                start.y = this.getCenter(this.props.columns, len);
                break;
            case Align.MIDDLE_RIGHT:
                start.x =
                    this.getCenter(this.props.rows, lines * 6 - 1) +
                    row * 7 -
                    1;
                start.y = this.props.columns - len + 1;
                break;
            case Align.BOTTOM_LEFT:
                start.x = this.props.rows - lines * 6 + row * 7 + 1;
                break;
            case Align.BOTTOM_CENTER:
                start.x = this.props.rows - lines * 6 + row * 7 + 1;
                start.y = this.getCenter(this.props.columns, len);
                break;
            case Align.BOTTOM_RIGHT:
                start.x = this.props.rows - lines * 6 + row * 7 + 1;
                start.y = this.props.columns - len + 1;
                break;
            case Align.CUSTOM:
                start.x = position.x;
                start.y = position.y;
                break;
            default:
                break;
        }
        return start;
        // return new Position(1, 1);
    }

    getLines(statement) {
        const words = statement.split(" ");
        const lines = [];
        let currentLine = "";
        while (words.length > 0) {
            const word = words[0];
            if (lengthOfWord(currentLine + " " + word) < this.props.columns) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine.trim());
                currentLine = word;
            }
            words.shift();
        }
        let start = 0;
        let k = 0;
        while (k < currentLine.length) {
            while (
                lengthOfWord(currentLine.slice(start, k)) <
                    this.props.columns &&
                k < currentLine.length
            ) {
                k++;
            }
            lines.push(currentLine.slice(start, k - 1).trim());
            start = k - 1;
        }
        lines[lines.length - 1] += currentLine[currentLine.length - 1];
        return lines;
    }

    writeOnCanvasDelay(statement, lines) {
        return (
            this.state.transition *
                10 *
                (statement.length + lines.length + 10) +
            1000
        );
    }

    writeOnCanvas(
        statement,
        alignment = Align.TOP_CENTER,
        position = new Position(1, 1)
    ) {
        // Find the lines
        const lines = this.getLines(statement);
        //Iterate the lines and print the same
        let covered = "";
        for (let x = 0; x < lines.length; x++) {
            const line = lines[x];
            covered += line;
            setTimeout(() => {
                const start = this.getStartPosition(
                    line,
                    x,
                    lines.length,
                    alignment,
                    position
                );
                for (let i = 0; i < line.length; i++) {
                    setTimeout(() => {
                        const ch = line[i].toUpperCase();
                        const { walls, nextStart } = ltow(ch, start);
                        for (let k = 0; k < walls.length; k++) {
                            const wall = walls[k];
                            setTimeout(() => {
                                const nodeDom = document.getElementById(
                                    `node-${wall.x}-${wall.y}`
                                );
                                if (nodeDom === null) return;
                                nodeDom.classList.add("node-wall");
                                // if (
                                //     i === line.length - 1 &&
                                //     k === walls.length - 1 &&
                                //     x === lines.length - 1
                                // )
                                // this.props.stopLoading();
                            }, this.state.transition * k);
                        }
                        if (walls.length !== 0) {
                            start.x = nextStart.x;
                            start.y = nextStart.y;
                        }
                    }, this.state.transition * i * 10);
                }
            }, this.state.transition * covered.length * 10);
        }
        return { statement, lines };
    }

    initialAnimation(start) {
        let delay = 0;
        for (let i = start.y + 1; i <= this.props.columns; i++) {
            setTimeout(() => {
                const nodeDom = document.getElementById(`node-${1}-${i}`);
                if (nodeDom !== null) {
                    nodeDom.classList.add("node-wall");
                    setTimeout(() => {
                        nodeDom.classList.remove("node-wall");
                    }, this.state.transition * this.props.columns);
                }
            }, delay + i * this.state.transition);
        }
        delay += this.props.columns * this.state.transition;
        for (let i = 2; i <= this.props.rows; i++) {
            setTimeout(() => {
                const nodeDom = document.getElementById(
                    `node-${i}-${this.props.columns}`
                );
                if (nodeDom !== null) {
                    nodeDom.classList.add("node-wall");
                    setTimeout(() => {
                        nodeDom.classList.remove("node-wall");
                    }, this.state.transition * this.props.columns);
                }
            }, delay + i * this.state.transition);
        }
        delay += this.props.rows * this.state.transition;
        for (let i = this.props.columns - 1; i >= 0; i--) {
            setTimeout(() => {
                const nodeDom = document.getElementById(
                    `node-${this.props.rows}-${i}`
                );
                if (nodeDom !== null) {
                    nodeDom.classList.add("node-wall");
                    setTimeout(() => {
                        nodeDom.classList.remove("node-wall");
                    }, this.state.transition * this.props.columns);
                }
            }, delay + (this.props.columns - i) * this.state.transition);
        }
        delay += this.props.columns * this.state.transition;
        for (let i = this.props.rows - 1; i >= 0; i--) {
            setTimeout(() => {
                const nodeDom = document.getElementById(`node-${i}-${1}`);
                if (nodeDom !== null) {
                    nodeDom.classList.add("node-wall");
                    setTimeout(() => {
                        nodeDom.classList.remove("node-wall");
                    }, this.state.transition * this.props.columns);
                }
            }, delay + (this.props.rows - i) * this.state.transition);
        }
        delay += this.props.rows * this.state.transition;
        for (let i = 2; i <= start.y; i++) {
            setTimeout(() => {
                const nodeDom = document.getElementById(`node-${1}-${i}`);
                if (nodeDom !== null) {
                    nodeDom.classList.add("node-wall");
                    setTimeout(() => {
                        nodeDom.classList.remove("node-wall");
                    }, this.state.transition * this.props.columns);
                }
            }, delay + i * this.state.transition);
        }
        delay += start.y * this.state.transition;
        for (let i = 2; i < start.x; i++) {
            setTimeout(() => {
                const nodeDom = document.getElementById(`node-${i}-${start.y}`);
                if (nodeDom !== null) {
                    nodeDom.classList.add("node-wall");
                    setTimeout(() => {
                        nodeDom.classList.remove("node-wall");
                    }, this.state.transition * this.props.columns);
                }
            }, delay + i * this.state.transition);
        }
        delay -= start.y * this.state.transition;
        delay -= start.y * this.state.transition;
        return delay;
    }

    clearBoard() {
        document.querySelectorAll(".node").forEach((nodeDom) => {
            nodeDom.classList.remove("node-wall");
        });
    }

    enableSkip(timeout) {
        setTimeout(() => {
            document.getElementById(
                `btn-skip-interaction`
            ).style.display = `block`;
            document.getElementById(
                `btn-skip-interaction`
            ).style.zIndex = `600`;
            document.getElementById(
                `btn-skip-interaction`
            ).style.animationName = `anim-skip`;
        }, timeout - 1500);
    }

    enableNext(timeout) {
        setTimeout(() => {
            document.getElementById(
                `btn-next-interaction`
            ).style.display = `block`;
            document.getElementById(
                `btn-next-interaction`
            ).style.zIndex = `600`;
            document.getElementById(
                `btn-next-interaction`
            ).style.animationName = `anim-next`;
        }, timeout - 1500);
    }

    writeSkipButton(statement, lines) {
        this.writeOnCanvas(
            "-",
            Align.CUSTOM,
            new Position(this.props.rows - 4, this.props.columns - 4)
        );
        this.enableSkip(this.writeOnCanvasDelay(statement, lines));
    }

    writeNextButton(statement, lines) {
        this.writeOnCanvas(
            "+",
            Align.CUSTOM,
            new Position(this.props.rows - 4, this.props.columns - 14)
        );
        this.enableNext(this.writeOnCanvasDelay(statement, lines));
    }

    showInteractions(index) {
        this.clearBoard();
        document.getElementById(`btn-next-interaction`).style.display = `none`;
        document.getElementById(`btn-skip-interaction`).style.display = `none`;
        let statement = null;
        let lines = null;
        let data = null;
        switch (index) {
            case 2:
                this.writeOnCanvas("^", Align.CUSTOM, new Position(1, 21));
                data = this.writeOnCanvas(
                    "Try Creating a Maze",
                    Align.MIDDLE_CENTER
                );
                statement = data.statement;
                lines = data.lines;
                this.writeSkipButton(statement, lines);
                this.writeNextButton(statement, lines);
                break;
            case 3:
                this.writeOnCanvas("^", Align.CUSTOM, new Position(1, 28));
                data = this.writeOnCanvas(
                    "Choose the Speed",
                    Align.MIDDLE_CENTER
                );
                statement = data.statement;
                lines = data.lines;
                this.writeSkipButton(statement, lines);
                this.writeNextButton(statement, lines);
                break;
            case 4:
                this.writeOnCanvas(
                    "^",
                    Align.CUSTOM,
                    new Position(1, this.props.columns - 3)
                );
                data = this.writeOnCanvas("Start Walking", Align.MIDDLE_CENTER);
                statement = data.statement;
                lines = data.lines;
                this.writeSkipButton(statement, lines);
                this.writeNextButton(statement, lines);
                break;
            case 5:
                // this.writeOnCanvas(
                //     "|",
                //     Align.CUSTOM,
                //     new Position(4, parseInt((this.props.columns - 30) / 2))
                // );
                data = this.writeOnCanvas(
                    "Drag to Construct Walls",
                    Align.MIDDLE_CENTER
                );
                statement = data.statement;
                lines = data.lines;
                this.writeSkipButton(statement, lines);
                this.writeNextButton(statement, lines);
                break;

            case 6:
                this.writeOnCanvas(
                    "!",
                    Align.CUSTOM,
                    new Position(
                        this.props.rows,
                        parseInt(this.props.columns / 2) + 1
                    )
                );
                data = this.writeOnCanvas(
                    "Insights Available Below",
                    Align.MIDDLE_CENTER
                );
                statement = data.statement;
                lines = data.lines;
                this.writeSkipButton(statement, lines);
                this.writeNextButton(statement, lines);
                break;
            case 7:
                data = this.writeOnCanvas(
                    "Lets Get Started",
                    Align.MIDDLE_CENTER
                );
                statement = data.statement;
                lines = data.lines;
                this.writeSkipButton(statement, lines);
                break;
            case 8:
                this.skipInteraction();
                break;
            case 1:
            default:
                this.writeOnCanvas("^", Align.CUSTOM, new Position(1, 14));
                data = this.writeOnCanvas(
                    "Select the Algorithm",
                    Align.MIDDLE_CENTER
                );
                statement = data.statement;
                lines = data.lines;
                this.writeSkipButton(statement, lines);
                this.writeNextButton(statement, lines);
                break;
        }
    }

    startIntro() {
        this.props.startLoading();
        const statement = "Walk to Destination";
        const alignment = Align.MIDDLE_CENTER;
        const lines = this.getLines(statement);
        const start = this.getStartPosition(
            lines[0],
            0,
            lines.length,
            alignment
        );
        const initialAnimationDelay = this.initialAnimation(start);
        const writeOnCanvasDelay =
            initialAnimationDelay + this.writeOnCanvasDelay(statement, lines);
        setTimeout(() => {
            this.writeOnCanvas(statement, alignment);
        }, initialAnimationDelay);
        setTimeout(() => {
            this.showInteractions(currIndex);
        }, writeOnCanvasDelay);
    }

    skipInteraction = () => {
        document.getElementById(`btn-next-interaction`).style.display = `none`;
        document.getElementById(`btn-skip-interaction`).style.display = `none`;
        this.props.stopLoading();
    };

    nextInteraction = () => {
        this.showInteractions(++currIndex);
    };

    render() {
        return (
            <div className="interaction-container">
                <button
                    id="btn-next-interaction"
                    onClick={this.nextInteraction}
                ></button>
                <button
                    id="btn-skip-interaction"
                    onClick={this.skipInteraction}
                ></button>
            </div>
        );
    }
}

export default Interact;
