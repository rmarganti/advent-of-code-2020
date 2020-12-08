import { readFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);

const validators = {
    byr: validateBirthYear,
    iyr: validateIssueYear,
    eyr: validateExpirationYear,
    hgt: validateHeight,
    hcl: validateHairColor,
    ecl: validateEyeColor,
    pid: validatePassportID,
    // 'cid',
};

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

        if (name.length === 0 || val === undefined) {
            return carrier;
        }

        return {
            ...carrier,
            [name]: val,
        };
    }, {});
}

function isValidPassport(group) {
    return Object.keys(validators).every((v) => {
        const value = group[v];
        const validator = validators[v];

        return value !== undefined && validator(value);
    });
}

/**
 * @param {string} birthYear
 */
function validateBirthYear(birthYear) {
    return birthYear.length === 4 && +birthYear >= 1920 && +birthYear <= 2002;
}

/**
 * @param {string} issueYear
 */
function validateIssueYear(issueYear) {
    return issueYear.length === 4 && +issueYear >= 2010 && +issueYear <= 2020;
}

/**
 * @param {string} expirationYear
 */
function validateExpirationYear(expirationYear) {
    return (
        expirationYear.length === 4 &&
        +expirationYear >= 2020 &&
        +expirationYear <= 2030
    );
}

const HEIGHT_REGEX = /^(\d+)(in|cm)$/;

/**
 * @param {string} height
 */
function validateHeight(height) {
    const result = height.match(HEIGHT_REGEX);

    if (result === null) {
        return false;
    }

    const [_, value, unit] = result;

    return unit === "cm"
        ? +value >= 150 && +value <= 193
        : +value >= 59 && +value <= 76;
}

const HAIR_COLOR_REGEX = /^#[0-9a-f]{6}$/;

/**
 * @param {string} hairColor
 */
function validateHairColor(hairColor) {
    return HAIR_COLOR_REGEX.test(hairColor);
}

const VALID_EYE_COLORS = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

/**
 * @param {string} eyeColor
 */
function validateEyeColor(eyeColor) {
    return VALID_EYE_COLORS.includes(eyeColor);
}

const PASSPORT_REGEX = /^[0-9]{9}$/;

/**
 * @param {string} passportID
 */
function validatePassportID(passportID) {
    return PASSPORT_REGEX.test(passportID);
}

main();
