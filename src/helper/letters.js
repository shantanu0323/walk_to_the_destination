import Position from "./position";
const letterWidth = {
    A: 5,
    B: 5,
    C: 4,
    D: 5,
    E: 4,
    F: 4,
    G: 5,
    H: 5,
    I: 4,
    J: 5,
    K: 5,
    L: 4,
    M: 6,
    N: 6,
    O: 5,
    P: 5,
    Q: 6,
    R: 5,
    S: 5,
    T: 4,
    U: 5,
    V: 6,
    W: 6,
    X: 6,
    Y: 6,
    Z: 5,
    " ": 3,
    "": 0,
    "^": 4,
    "!": 4,
    "-": 8,
    "+": 11,
    "|": 31,
};

const lengthOfWord = (word) => {
    let len = 0;
    Array.from(word).forEach((ch) => {
        len += letterWidth[ch.toUpperCase()];
    });
    len--;
    return len;
};

const ltow = (ch, start = new Position(1, 1)) => {
    const walls = [];
    walls.length = 0;
    let i;
    let nextStart = start;
    switch (ch) {
        case "A":
            for (i = 4; i > 0; i--)
                walls.push(new Position(start.x + i, start.y));
            walls.push(new Position(start.x, start.y + 1));
            walls.push(new Position(start.x, start.y + 2));
            for (i = 1; i < 5; i++)
                walls.push(new Position(start.x + i, start.y + 3));
            walls.push(new Position(start.x + 2, start.y + 1));
            walls.push(new Position(start.x + 2, start.y + 2));
            nextStart.y = start.y + letterWidth["A"];
            break;
        case "B":
            for (i = 0; i < 5; i++)
                walls.push(new Position(start.x + i, start.y));
            for (i = 1; i < 3; i++)
                walls.push(new Position(start.x, start.y + i));
            walls.push(new Position(start.x + 1, start.y + 3));
            for (i = 2; i > 0; i--)
                walls.push(new Position(start.x + 2, start.y + i));
            walls.push(new Position(start.x + 3, start.y + 3));
            for (i = 2; i > 0; i--)
                walls.push(new Position(start.x + 4, start.y + i));
            nextStart.y = start.y + letterWidth["B"];
            break;
        case "C":
            walls.push(new Position(start.x, start.y + 1));
            walls.push(new Position(start.x, start.y + 2));
            for (i = 1; i < 4; i++)
                walls.push(new Position(start.x + i, start.y));
            walls.push(new Position(start.x + i, start.y + 1));
            walls.push(new Position(start.x + i, start.y + 2));
            nextStart.y = start.y + letterWidth["C"];
            break;
        case "D":
            for (i = 0; i < 5; i++)
                walls.push(new Position(start.x + i, start.y));
            for (i = 1; i < 3; i++)
                walls.push(new Position(start.x, start.y + i));
            for (i = 1; i < 4; i++)
                walls.push(new Position(start.x + i, start.y + 3));
            for (i = 2; i > 0; i--)
                walls.push(new Position(start.x + 4, start.y + i));
            nextStart.y = start.y + letterWidth["D"];
            break;
        case "E":
            for (i = 0; i < 5; i++)
                walls.push(new Position(start.x + i, start.y));
            for (i = 1; i < 3; i++)
                walls.push(new Position(start.x, start.y + i));
            walls.push(new Position(start.x + 2, start.y + 1));
            for (i = 1; i < 3; i++)
                walls.push(new Position(start.x + 4, start.y + i));
            nextStart.y = start.y + letterWidth["E"];
            break;
        case "F":
            for (i = 0; i < 5; i++)
                walls.push(new Position(start.x + i, start.y));
            for (i = 1; i < 3; i++)
                walls.push(new Position(start.x, start.y + i));
            walls.push(new Position(start.x + 2, start.y + 1));
            nextStart.y = start.y + letterWidth["F"];
            break;
        case "G":
            for (i = 2; i > 0; i--)
                walls.push(new Position(start.x, start.y + i));
            for (i = 1; i < 4; i++)
                walls.push(new Position(start.x + i, start.y));
            for (i = 1; i < 3; i++)
                walls.push(new Position(start.x + 4, start.y + i));
            for (i = 3; i > 1; i--)
                walls.push(new Position(start.x + i, start.y + 3));
            walls.push(new Position(start.x + 2, start.y + 2));
            nextStart.y = start.y + letterWidth["G"];
            break;
        case "H":
            for (i = 0; i < 5; i++)
                walls.push(new Position(start.x + i, start.y));
            for (i = 1; i < 3; i++)
                walls.push(new Position(start.x + 2, start.y + i));
            for (i = 0; i < 5; i++)
                walls.push(new Position(start.x + i, start.y + 3));
            nextStart.y = start.y + letterWidth["H"];
            break;
        case "I":
            for (i = 0; i < 3; i++)
                walls.push(new Position(start.x, start.y + i));
            for (i = 1; i < 4; i++)
                walls.push(new Position(start.x + i, start.y + 1));
            for (i = 0; i < 3; i++)
                walls.push(new Position(start.x + 4, start.y + i));
            nextStart.y = start.y + letterWidth["I"];
            break;
        case "J":
            for (i = 1; i < 4; i++)
                walls.push(new Position(start.x, start.y + i));
            for (i = 1; i < 4; i++)
                walls.push(new Position(start.x + i, start.y + 3));
            for (i = 2; i > 0; i--)
                walls.push(new Position(start.x + 4, start.y + i));
            walls.push(new Position(start.x + 3, start.y));
            nextStart.y = start.y + letterWidth["J"];
            break;
        case "K":
            for (i = 0; i < 5; i++)
                walls.push(new Position(start.x + i, start.y));
            for (i = 0; i < 3; i++) {
                walls.push(new Position(start.x + 2 + i, start.y + 1 + i));
                walls.push(new Position(start.x + 2 - i, start.y + 1 + i));
            }
            nextStart.y = start.y + letterWidth["K"];
            break;
        case "L":
            for (i = 0; i < 5; i++)
                walls.push(new Position(start.x + i, start.y));
            i--;
            walls.push(new Position(start.x + i, start.y + 1));
            walls.push(new Position(start.x + i, start.y + 2));
            nextStart.y = start.y + letterWidth["L"];
            break;
        case "M":
            for (i = 4; i > 0; i--)
                walls.push(new Position(start.x + i, start.y));
            walls.push(new Position(start.x, start.y + 1));
            walls.push(new Position(start.x + 1, start.y + 2));
            walls.push(new Position(start.x + 2, start.y + 2));
            walls.push(new Position(start.x, start.y + 3));
            for (i = 1; i < 5; i++)
                walls.push(new Position(start.x + i, start.y + 4));
            nextStart.y = start.y + letterWidth["M"];
            break;
        case "N":
            for (i = 4; i >= 0; i--)
                walls.push(new Position(start.x + i, start.y));
            for (i = 1; i < 4; i++)
                walls.push(new Position(start.x + i, start.y + i));
            for (i = 4; i >= 0; i--)
                walls.push(new Position(start.x + i, start.y + 4));
            nextStart.y = start.y + letterWidth["N"];
            break;
        case "O":
            walls.push(new Position(start.x, start.y + 2));
            walls.push(new Position(start.x, start.y + 1));
            for (i = 1; i < 4; i++)
                walls.push(new Position(start.x + i, start.y));
            walls.push(new Position(start.x + i, start.y + 1));
            walls.push(new Position(start.x + i, start.y + 2));
            for (i = 3; i > 0; i--)
                walls.push(new Position(start.x + i, start.y + 3));
            nextStart.y = start.y + letterWidth["O"];
            break;
        case "P":
            for (i = 4; i >= 0; i--)
                walls.push(new Position(start.x + i, start.y));
            for (i = 1; i < 3; i++)
                walls.push(new Position(start.x, start.y + i));
            walls.push(new Position(start.x + 1, start.y + 3));
            for (i = 2; i > 0; i--)
                walls.push(new Position(start.x + 2, start.y + i));
            nextStart.y = start.y + letterWidth["P"];
            break;
        case "Q":
            for (i = 2; i > 0; i--)
                walls.push(new Position(start.x + i, start.y + 4));
            for (i = 3; i > 0; i--)
                walls.push(new Position(start.x, start.y + i));
            for (i = 1; i < 4; i++)
                walls.push(new Position(start.x + i, start.y));
            walls.push(new Position(start.x + i, start.y + 1));
            walls.push(new Position(start.x + i, start.y + 2));
            for (i = 2; i < 5; i++)
                walls.push(new Position(start.x + i, start.y + i));
            nextStart.y = start.y + letterWidth["Q"];
            break;
        case "R":
            for (i = 4; i >= 0; i--)
                walls.push(new Position(start.x + i, start.y));
            for (i = 1; i < 3; i++)
                walls.push(new Position(start.x, start.y + i));
            walls.push(new Position(start.x + 1, start.y + 3));
            for (i = 2; i > 0; i--)
                walls.push(new Position(start.x + 2, start.y + i));
            for (i = 0; i < 3; i++)
                walls.push(new Position(start.x + 2 + i, start.y + 1 + i));
            nextStart.y = start.y + letterWidth["R"];
            break;
        case "S":
            for (i = 3; i > 0; i--)
                walls.push(new Position(start.x, start.y + i));
            walls.push(new Position(start.x + 1, start.y));
            for (i = 1; i < 3; i++)
                walls.push(new Position(start.x + 2, start.y + i));
            walls.push(new Position(start.x + 3, start.y + 3));
            for (i = 2; i >= 0; i--)
                walls.push(new Position(start.x + 4, start.y + i));
            nextStart.y = start.y + letterWidth["S"];
            break;
        case "T":
            for (i = 0; i < 3; i++)
                walls.push(new Position(start.x, start.y + i));
            for (i = 1; i < 5; i++)
                walls.push(new Position(start.x + i, start.y + 1));
            nextStart.y = start.y + letterWidth["T"];
            break;
        case "U":
            for (i = 0; i < 4; i++)
                walls.push(new Position(start.x + i, start.y));
            for (i = 1; i < 3; i++)
                walls.push(new Position(start.x + 4, start.y + i));
            for (i = 3; i >= 0; i--)
                walls.push(new Position(start.x + i, start.y + 3));
            nextStart.y = start.y + letterWidth["U"];
            break;
        case "V":
            for (i = 0; i < 3; i++)
                walls.push(new Position(start.x + i, start.y));
            for (i = 1; i < 3; i++) {
                walls.push(new Position(start.x + 2 + i, start.y + i));
                walls.push(new Position(start.x + 2 + i, start.y + 4 - i));
            }
            for (i = 2; i >= 0; i--)
                walls.push(new Position(start.x + i, start.y + 4));
            nextStart.y = start.y + letterWidth["V"];
            break;
        case "W":
            for (i = 0; i < 4; i++)
                walls.push(new Position(start.x + i, start.y));
            walls.push(new Position(start.x + i, start.y + 1));
            walls.push(new Position(start.x + i - 1, start.y + 2));
            walls.push(new Position(start.x + i - 2, start.y + 2));
            walls.push(new Position(start.x + i, start.y + 3));
            for (i = 3; i >= 0; i--)
                walls.push(new Position(start.x + i, start.y + 4));
            nextStart.y = start.y + letterWidth["W"];
            break;
        case "X":
            for (i = 0; i < 5; i++)
                walls.push(new Position(start.x + i, start.y + i));
            for (i = 0; i < 5; i++)
                walls.push(new Position(start.x + i, start.y + 4 - i));
            nextStart.y = start.y + letterWidth["X"];
            break;
        case "Y":
            for (i = 0; i < 3; i++) {
                walls.push(new Position(start.x + i, start.y + i));
                walls.push(new Position(start.x + i, start.y + 4 - i));
            }
            for (i = 3; i < 5; i++)
                walls.push(new Position(start.x + i, start.y + 2));
            nextStart.y = start.y + letterWidth["Y"];
            break;
        case "Z":
            for (i = 0; i < 4; i++)
                walls.push(new Position(start.x, start.y + i));
            for (i = 1; i < 5; i++)
                walls.push(new Position(start.x + i, start.y + 4 - i));
            for (i = 1; i < 4; i++)
                walls.push(new Position(start.x + 4, start.y + i));
            nextStart.y = start.y + letterWidth["Z"];
            break;
        case " ":
            nextStart.y = start.y + letterWidth[" "];
            break;
        case "^":
            for (i = start.x + 6; i > 1; i--)
                walls.push(new Position(i, start.y));
            for (i = 1; i <= start.x + 2; i++) {
                walls.push(new Position(i, start.y - i + 1));
                walls.push(new Position(i, start.y + i - 1));
            }
            nextStart.y = start.y + letterWidth["^"];
            break;
        case "-":
            for (i = 0; i < 7; i++) {
                walls.push(new Position(start.x, start.y + i));
                walls.push(new Position(start.x + i, start.y + 6));
                walls.push(new Position(start.x + 6, start.y + i));
                walls.push(new Position(start.x + i, start.y));
            }
            for (i = 1; i < 6; i++) {
                for (let j = 1; j < 6; j++) {
                    if (i === j || i + j === 6) continue;
                    walls.push(new Position(start.x + i, start.y + j));
                }
            }
            nextStart.y = start.y + letterWidth["-"];
            break;
        case "+":
            for (i = 0; i < 10; i++) {
                walls.push(new Position(start.x, start.y + i));
                walls.push(new Position(start.x + i, start.y + 9));
                walls.push(new Position(start.x + 6, start.y + i));
                walls.push(new Position(start.x + i, start.y));
            }
            for (i = 1; i < 6; i++) {
                for (let j = 1; j < 9; j++) {
                    if (i === 3 || j === 6 || ((i === 2 || i === 4) && j === 7))
                        continue;
                    walls.push(new Position(start.x + i, start.y + j));
                }
            }
            nextStart.y = start.y + letterWidth["+"];
            break;
        case "!":
            for (i = 6; i > 0; i--)
                walls.push(new Position(start.x - i, start.y));
            for (i = 3; i > 0; i--) {
                walls.push(new Position(start.x - i + 1, start.y - i + 1));
                walls.push(new Position(start.x - i + 1, start.y + i - 1));
            }
            nextStart.y = start.y + letterWidth["!"];
            break;
        case "|":
            for (i = 0; i < 30; i++)
                walls.push(new Position(start.x, start.y + i));
            for (i = 0; i < 30; i += 3) {
                for (let j = 1; j < 4; j++) {
                    if (i % 2)
                        walls.push(new Position(start.x + j, start.y + i));
                    else walls.push(new Position(start.x - j, start.y + i));
                }
            }
            nextStart.y = start.y + letterWidth["!"];
            break;
        default:
            break;
    }
    return { walls, nextStart };
};

export { ltow, lengthOfWord };
