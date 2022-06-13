/**
 * The KeyManager gives and keeps track of unique integers that can be used as
 * identifiers or keys, for example, when rendering a variable number of
 * elements with React.
 */

/**
 * Holds the next key that will be returned upon request.
 */
let nextKey = 1;


/**
 * Returns a new unique integer.
 * @returns A unique integer.
 */
export function getKey() {
    return nextKey++;
}

/**
 * Returns the last integer that was returned by getKey().
 * @returns Last unique integer.
 */
export function getLastKey() {
    return nextKey;
}
