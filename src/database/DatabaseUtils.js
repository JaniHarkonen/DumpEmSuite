/**
 * This file contains utility functions used by the DatabaseController
 * in order to avoid cluttering methods.
 */


/**
 * Default structure of a JSON returned by the database controller.
 */
const DEFAULT_RETURNABLE = {
    success: false,
    error: "",
    result: []
};

/**
 * Creates a copy of the default returnable and returns it.
 * @returns Default-structured returnable.
 */
export const makeReturnable = () => {
    return {
        ...DEFAULT_RETURNABLE
    };
};

/**
 * Creates a returnable that indicates a successful database query
 * that may contain more results than the empty result array.
 * @returns Returnable to a successful query.
 */
export const makeReturnableSuccessful = () => {
    return {
        ...makeReturnable(),
        success: true
    };
};

/**
 * Creates a returnable that indicates a failed database query
 * that contains an empty result array. The error field of the
 * returnable will contain an error message.
 * @param {string} err 
 * @returns Returnable to a failed query.
 */
export const makeReturnableError = (err) => {
    return {
        ...makeReturnable(),
        success: false,
        error: err
    };
};

export const generateQueryList = (items, separator = ",") => {
    if( !items || items.length === 0 )
    return "";

    let str = items[0].getString();

    for( let i = 1; i < items.length; i++ )
    str += separator + " " + items[i].getString();

    return str;
};
