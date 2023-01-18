/**
 * Contains common folder paths and file names.
 * - Folders are listed under 'folders'-key
 * - Files are listed under 'files'-key
 */
export const COMMON_PATHS = {
    folders: {
        materialsSub: "\\materials",
        config: "\\config"
    },
    files: {
        defaultDb: "default.db"
    }
};

/**
 * JSON-object containing all available color codes.
 */
export var COLOR_CODES = [];

/**
 * JSON-object containing the color codes for the automatic
 * volume filter.
 */
export const VOLUME_FILTER_COLOR_CODES = {
    rejected: 6,
    accepted: 5
};

/**
 * Sets the available color codes in the order where their array
 * index indicates their ID in the workspace database that is currently open.
 * @param {Array} codes Array containing the color codes.
 */
export const setColorCodes = (codes) => {
    COLOR_CODES = codes;
};

/**
 * Returns a color code in RRRGGGBBB-integer format based on the color code
 * array index.
 * @param {integer} ind Color index.
 * @returns RRRGGGBBB-integer format of the color.
 */
export const getColorCode = (ind) => {
    return COLOR_CODES[ind];
};

/**
 * Converts an integer of format RRRGGGBBB (where R = red, G = green, B = blue,
 * all 8bit values) into a "rgba"-color string that can be used as a CSS-property.
 * Alternatively, the color can be returned as a JSON-object.
 * 
 * Negative integers will *always* be assigned an alpha of 0.
 * @param {integer} int Integer in RRRGGGBBB format to convert.
 * @param {integer} alpha Alpha value to assign to the color (default: 1).
 * @param {boolean} json Whether to return a JSON or a color string (default: color
 * string).
 * @returns An "rgba(red, green, blue, alpha)"-type string.
 */
 export const integerToRGBA = (int, alpha = 1, json = false) => {
    if(int === -1) alpha = 0;

    let r = ~~(int / 1000000);
    int -= r * 1000000;
    let g = ~~(int / 1000);
    int -= g * 1000;

        // Return a JSON
    if( json )
    {
        return {
            red: r,
            green: g,
            blue: int,
            alpha: alpha
        };
    }

        // Return an rgba-color string
    return `rgba(${r}, ${g}, ${int}, ${alpha})`;
};

/**
 * Capitalizes the first character of a given string and returns the result or
 * NULL if no string was passed.
 * @param {String} string The string whose first character to capitalize.
 * 
 * @returns The string with the first character capitalized.
 */
export const capitalizeFirstLetter = (string) => {
    if( !string )
    return null;

    if( string.length === 0 )
    return "";

    let firstChar = string[0].toUpperCase();

    if( string.length < 2 )
    return firstChar;

    return firstChar + string.substring(1);
};