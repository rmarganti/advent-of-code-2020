import { readFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);

const REGEX = /^(\d{1,2})-(\d{1,2}) ([a-z]): (.+)$/;

async function main() {
    const content = await readFileAsync("input.txt", { encoding: "utf8" });
    const passwords = content.split("\n").filter(Boolean);

    const validPasswords = passwords.filter(validatePassword);
    console.log(`Valid passwords: ${validPasswords.length}`);
}

/**
 * @param {string} passwordEntry
 * @returns {string}
 */
function validatePassword(passwordEntry) {
    const result = passwordEntry.match(REGEX);

    if (result === null) {
        return false;
    }

    const [_, positionOne, positionTwo, char, password] = result;

    const inPosition1 = password[+positionOne - 1] === char;
    const inPosition2 = password[+positionTwo - 1] === char;

    console.table({
        password,
        char,
        positionOne,
        inPosition1,
        positionTwo,
        inPosition2,
    });

    return inPosition1 !== inPosition2;
}

main();
