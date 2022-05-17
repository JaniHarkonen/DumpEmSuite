/**
 * This file contains file I/O utilitiy functions.
 */

const fs = window.require("fs");
const pathModule = window.require("path");

/**
 * An array of characters that are forbidden in a filename.
 */
const ILLEGAL_CHARACTERS = [
    "%",
    "\\",
    "/",
    ":",
    "*",
    "?",
    "\"",
    "<",
    ">",
    "|"
];

/**
 * Reads a JSON-file and returns the contents in a matching JSON-object.
 * @param {string} path JSON-file to read.
 * @returns JSON-object representing the one in the given file.
 */
export const readJson = (path) => {
    if( path == null || path === "" ) return {};

    const file = fs.readFileSync(path);
    return JSON.parse(file);
};

/**
 * Takes a filename or filepath and removes all forbidden characters from it
 * returning the result.
 * @param {string} path Filepath to remove the illegal characters from.
 * @returns Filepath without illegal characters.
 */
export const removeIllegals = (path) => {
    if( path == null || path === "" ) return "";

    for( let i = 0; i < ILLEGAL_CHARACTERS.length; i++ )
    path.replace(ILLEGAL_CHARACTERS[i], "");

    return path;
};

/**
 * Returns only the directory of a given filepath.
 * @param {string} path Filepath whose directory to resolve.
 * @returns Directory of a filepath.
 */
export const getDirectoryFromPath = (path) => {
    if( path == null || path === "" ) return "";

    return pathModule.dirname(path);
};

/**
 * Returns whether a given path exists. The path may be a filename
 * or a directory.
 * @param {string} path Path to check.
 * @returns Whether the path exists.
 */
export const pathExists = (path) => {
    return fs.existsSync(path);
};