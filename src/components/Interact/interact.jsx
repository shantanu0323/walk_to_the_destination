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
        lines.push(currentLine.trim());
        return lines;
    }

    writeOnCanvas(statement, alignment = Align.TOP_CENTER) {
        // Find the lines
        const lines = this.getLines(statement);
        console.log({ lines });
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
                        console.log({ walls });
                        for (let k = 0; k < walls.length; k++) {
                            const wall = walls[k];
                            setTimeout(() => {
                                const nodeDom = document.getElementById(
                                    `node-${wall.x}-${wall.y}`
                                );
                                if (nodeDom === null) return;
                                nodeDom.classList.add("node-wall");
                                if (
                                    i === line.length - 1 &&
                                    k === walls.length - 1 &&
                                    x === lines.length - 1
                                )
                                    this.props.stopLoading();
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
    }
    startIntro() {
        this.props.startLoading();
        const statement = "Welcome Walk to Destination";
        setTimeout(() => {
            this.writeOnCanvas(statement, Align.MIDDLE_CENTER);
        }, 0);
        // this.props.stopLoading();
    }
    render() {
        return <React.Fragment></React.Fragment>;
    }
}

export default Interact;
