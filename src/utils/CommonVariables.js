/**
 * Path containing the DumpEm Suite opening configuration file.
 */
//export const DUMP_EM_CONFIG = "D:\\javascript\\DumpEmSuite\\project\\dump-em-suite\\config\\config.json";

/**
 * Path within the Workspace folder where external materials (PDFs and images) are stored.
 */
export const MATERIALS_SUBPATH = "\\materials\\";

/**
 * Contains the default configuration for analysis templates.
 */
/*const DEFAULT_ANALYSIS_TEMPLATES = {
    technical: "",
    fundamental: "",
    consensus: ""
};*/

/**
 * JSON-object containing the templates for all the analysis notes.
 */
//export var ANALYSIS_TEMPLATES = DEFAULT_ANALYSIS_TEMPLATES;

/**
 * JSON-object containing all available color codes.
 */
export var COLOR_CODES = [];

/**
 * Changes the analysis note templates to the given ones.
 * @param {String} newtmp New templates to be used.
 */
/*export const setAnalysisTemplates = (newtmp) => {
    if( !newtmp )
    ANALYSIS_TEMPLATES = DEFAULT_ANALYSIS_TEMPLATES;
    else
    ANALYSIS_TEMPLATES = newtmp;
};*/

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
