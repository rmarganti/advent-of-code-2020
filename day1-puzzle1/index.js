import { readFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);

const GOAL_SUM = 2020;

async function main() {
    const content = await readFileAsync("input.txt", { encoding: "utf8" });
    const numbers = content
        .split("\n")
        .filter(Boolean)
        .map((i) => parseInt(i));

    const firstNumber = numbers.find((possibleFirstNumber) => {
        return numbers.some(
            (possibleSecondNumber) =>
                possibleFirstNumber + possibleSecondNumber === GOAL_SUM
        );
    });

    const secondNumber = GOAL_SUM - firstNumber;

    console.log(`Solution: ${firstNumber * secondNumber}`);
}

main();
