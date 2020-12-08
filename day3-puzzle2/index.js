import { readFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);

const movements = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
];

async function main() {
    const content = await readFileAsync("input.txt", { encoding: "utf8" });
    const grid = content
        .split("\n")
        .filter(Boolean)
        .map((l) => l.split(""));

    const counts = movements.map((m) => countTrees(grid, m.right, m.down));
    const result = counts.reduce((carrier, cnt) => carrier * cnt, 1);

    console.log(`Result: ${result}`);
}

function countTrees(grid, movementRight, movementDown) {
    const width = grid[0].length;
    const height = grid.length;

    let xPosition = 0;
    let yPosition = 0;

    let trees = 0;

    do {
        const tile = grid[yPosition][xPosition];

        if (tile === "#") {
            trees = trees + 1;
        }

        xPosition = (xPosition + movementRight) % width;
        yPosition = yPosition + movementDown;
    } while (yPosition + 1 < height);

    return trees;
}

main();
