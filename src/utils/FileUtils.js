/**
 * This file contains file I/O utilitiy functions.
 */

const fs = window.require("fs");

/**
 * Reads a JSON-file and returns the contents in a matching JSON-object.
 * @param {string} path JSON-file to read.
 * @returns JSON-object representing the one in the given file.
 */
export const readJson = (path) => {
    if( path == null || path === "" ) return {};

    const file = fs.readFileSync(path);
    return JSON.parse(file);
}