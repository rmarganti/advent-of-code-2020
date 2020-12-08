import { readFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);

const MOVEMENT_RIGHT = 3;
const MOVEMENT_DOWN = 1;

async function main() {
    const content = await readFileAsync("input.txt", { encoding: "utf8" });
    const grid = content
        .split("\n")
        .filter(Boolean)
        .map((l) => l.split(""));

    const trees = countTrees(grid, MOVEMENT_RIGHT, MOVEMENT_DOWN);

    console.log(`Result: ${trees}`);
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
