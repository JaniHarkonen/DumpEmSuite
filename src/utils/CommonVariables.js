/**
 * Path containing the DumpEm Suite opening configuration file.
 */
export const DUMP_EM_CONFIG = "D:\\javascript\\DumpEmSuite\\project\\dump-em-suite\\testfolder\\config.json";

/**
 * Contains the default configuration for analysis templates.
 */
const DEFAULT_ANALYSIS_TEMPLATES = {
    technical: "",
    fundamental: "",
    consensus: ""
}

/**
 * JSON-object containing the templates for all the analysis notes.
 */
export var ANALYSIS_TEMPLATES = DEFAULT_ANALYSIS_TEMPLATES;

/**
 * JSON-object containing all available color codes.
 */
export const COLOR_CODES = [
    "red",
    "blue",
    "black",
    "orange"
]

/**
 * Changes the analysis note templates to the given ones.
 * @param {*} newtmp New templates to be used.
 */
export const setAnalysisTemplates = (newtmp) => {
    if( !newtmp )
    ANALYSIS_TEMPLATES = DEFAULT_ANALYSIS_TEMPLATES;
    else
    ANALYSIS_TEMPLATES = newtmp;
};