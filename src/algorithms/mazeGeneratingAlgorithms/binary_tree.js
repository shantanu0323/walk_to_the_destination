import Position from "../../components/Node/position";

const generateBinaryTreeMaze = (rows, columns, source, target) => {
    const walls = [];
    for (let i = 1; i <= rows; i++) {
        walls.push(new Position(i, 1));
        walls.push(new Position(i, columns));
    }

    for (let j = 2; j < columns; j++) {
        walls.push(new Position(1, j));
        walls.push(new Position(rows, j));
    }

    for (let i = 3; i < rows; i += 2) {
        for (let j = 3; j < columns; j += 2) {
            walls.push(new Position(i, j));
            if (Math.round(Math.random())) {
                walls.push(new Position(i - 1, j));
            } else {
                walls.push(new Position(i, j - 1));
            }
        }
    }
    return walls;
};

export default generateBinaryTreeMaze;
