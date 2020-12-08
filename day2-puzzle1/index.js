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

    const [_, charMin, charMax, char, password] = result;

    const charCount = password.split("").filter((c) => c === char).length;

    console.table({
        char,
        charMin,
        charMax,
        password,
        charCount,
        isValid: charCount >= +charMin && charCount <= +charMax ? "Yes" : "No",
    });

    return charCount >= +charMin && charCount <= +charMax;
}

main();
