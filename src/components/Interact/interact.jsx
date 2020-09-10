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
class Interact extends Component {
    state = {
        transition: 10,
    };

    componentDidMount() {
        this.startIntro();
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

    writeOnCanvas(statement, alignment = Align.TOP_CENTER) {
        // Find the lines
        const lines = this.getLines(statement);
        //Iterate the lines and print the same
        let covered = "";
        for (let x = 0; x < lines.length; x++) {
            const line = lines[x];
            console.log(line);
            covered += line;
            setTimeout(() => {
                const start = this.getStartPosition(
                    line,
                    x,
                    lines.length,
                    alignment
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
        return (
            this.state.transition *
                10 *
                (statement.length + lines.length + 10) +
            1000
        );
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
        setTimeout(() => {
            setTimeout(() => {
                this.props.stopLoading();
            }, this.writeOnCanvas(statement, alignment));
        }, this.initialAnimation(start));
    }
    render() {
        return <React.Fragment></React.Fragment>;
    }
}

export default Interact;
