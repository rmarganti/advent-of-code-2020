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

    /** @type [number,number,number] | undefined */
    let solution = undefined;

    numbers.find((possibleFirstNumber) => {
        return numbers.some((possibleSecondNumber) => {
            return numbers.some((possibleThirdNumber) => {
                if (
                    possibleFirstNumber +
                        possibleSecondNumber +
                        possibleThirdNumber ===
                    GOAL_SUM
                ) {
                    solution = [
                        possibleFirstNumber,
                        possibleSecondNumber,
                        possibleThirdNumber,
                    ];
                    return true;
                }

                return false;
            });
        });
    });

    if (solution === undefined) {
        console.log("No solution found");
    } else {
        console.log(`Solution: ${solution[0] * solution[1] * solution[2]}`);
    }
}

main();
