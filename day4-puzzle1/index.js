import { readFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);

const expected = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
    // 'cid',
];

async function main() {
    const content = await readFileAsync("input.txt", { encoding: "utf8" });
    const passports = content.split("\n\n").map(parsePassport);
    const validPassports = passports.filter(isValidPassport);

    console.log(`Total passports: ${passports.length}`);
    console.log(`Valid passports: ${validPassports.length}`);
}

/**
 * @param {string} input
 */
function parsePassport(input) {
    const result = input.split("\n").reduce((carrier, line) => {
        return [...carrier, ...line.split(" ")];
    }, []);

    return result.reduce((carrier, field) => {
        const [name, val] = field.split(":");
        return {
            ...carrier,
            [name]: val,
        };
    }, {});
}

function isValidPassport(group) {
    const includedFields = Object.keys(group);

    return expected.every((e) => includedFields.includes(e));
}

main();
