import { makeReturnableError, makeReturnableSuccessful } from "./DatabaseUtils";
import Stock from "./entities/Stock";
import CodedStock from "./entities/CodedStock";
import CodedEntry from "./entities/CodedEntry";

const sqlite3 = window.require("better-sqlite3");

/**
 * This class is in direct communication with the database. It handles
 * the opening/closing of the database connection as well as fetching/
 * posting/deleting data from/to it. DatabaseController shouldn't be
 * directly exposed to the rest of the application, rather, it should
 * be accessed through an interface to maximize separation.
 * 
 * This class uses SQLite as the database solution and better-sqlite3
 * as the library to access the database synchronously and to avoid
 * issues with concurrency and dealing with asynchronicity and React-
 * states.
 */
export default class DatabaseController {
    constructor() {
        this.targetDatabase = null;
    }

    /**
     * Opens a connection to an SQLite database located at a given path,
     * and sets the database as the target database for later queries.
     * If the controller is already connected to another database, that
     * connection will first be closed before connecting to the given one.
     * @param {string} db Filepath to the database (.db) to connect to.
     */
    connect(db) {
        if( this.targetDatabase )
        this.closeConnection();

        this.targetDatabase = new sqlite3(db, sqlite3.OPEN_READWRITE, (err) => {
            if( err ) console.log("ERROR: Cannot open connection to database: " + db);

            return;
        });
    }

    /**
     * Closes the current connection to a database and resets the target
     * database.
     */
    closeConnection() {
        if( !this.targetDatabase ) return;

        this.targetDatabase.close();
        this.targetDatabase = null;
    }

    /**
     * Fetches data from the target database, and returns the result in a
     * 'returnable' that will contain, whether the query was successful, an
     * error message (if an error occurred, blank otherwise) and the result
     * array including all fetched content.
     * 
     * The input should be a JSON containing at least the 'type' of the
     * fetch-request, that will then be used to carry out the appropriate
     * query. Depending on the type, additional information may need to be
     * included in the input JSON.
     * @param {JSON} q JSON that includes the query instructions.
     * @returns A JSON including the results of the fetch-request.
     */
    fetch(q) {
        if( !q ) return makeReturnableError("ERROR: No entity input!");

        switch( q.type )
        {
                // Fetch the basic stock data of all the companies (id, name, ticker symbol, volume)
            case "stocks":
            {
                let res = makeReturnableSuccessful();
                let qres = this.query("get", `SELECT Company_ID, Company_name, Company_ticker, Company_volume FROM companies;`).rows;
                res.result = (new Stock()).form(qres);

                return res;
            }
            
                // Fetch the basic stock data of all the companies listed on a certain tab
                // as well as their color codes
                // (requires: tab)
            case "stocks-tab":
            {
                if( !q.tab ) return makeReturnableError("ERROR: No tab index provided!");

                let res = makeReturnableSuccessful();
                let qres = this.query("get",
                    `SELECT cs.Company_ID, cs.Company_name, cs.Company_ticker, cs.Company_volume, ccs.CCode_code_index 
                     FROM companies cs, colorcodes ccs 
                     WHERE cs.Company_ID=ccs.Company_ID 
                     AND ccs.CCode_tab=?`, [q.tab]
                ).rows;
                res.result = (new CodedStock()).form(qres);

                return res;
            }

                // Fetch the company IDs and color codes of all the companies listed on a certain
                // tab that have a set color code (not -1)
                // (requires: tab)
            case "coded-tab":
            {
                if( !q.tab ) return makeReturnableError("ERROR: No tab index provided!");

                let res = makeReturnableSuccessful();
                let qres = this.query("get", 
                    `SELECT Company_ID, CCode_code_index
                     FROM colorcodes
                     WHERE CCode_code_index != -1
                     AND CCode_tab=?`, [q.tab]
                ).rows;
                res.result = (new CodedEntry().form(qres));

                return res;
            }

                // Fetch the available color codes for the symbol list color picker
            case "color-codes":
            {
                let res = makeReturnableSuccessful() ;
                let qres = this.query("get", `SELECT Color_ID, Color_color FROM colors;`).rows;

                if( qres.length === 0 ) return res;

                let colors = new Array(qres.length);
                for( let col of qres )
                colors[col.Color_ID] = col.Color_color;

                res.result = colors;
                return res;
            }

            default: return makeReturnableError("ERROR: Invalid query type!");
        }
    }

    post(q) {
        if( !q ) return makeReturnableError("ERROR: No entity input!");

        switch( q.type )
        {
                // Make changes to the color code of a given stock on a given tab
                // (requires: id, tab, color code index)
            case "code-change":
            {
                let res = makeReturnableSuccessful();
                res.result = this.query("post",
                    `UPDATE colorcodes 
                     SET CCode_code_index=? 
                     WHERE Company_ID=?
                     AND CCode_tab=?`, [q.color, q.id, q.tab]
                );

                return res;
            }

                // Brings stocks from a given tab to another if they satisfy a given filter
                // (requires: source tab, destination tab, filters)
            case "bring-stocks":
            {
                let res = makeReturnableSuccessful();
                let qstr = 
                    `INSERT INTO colorcodes
                     SELECT cs.Company_ID, ${q.toTab}, 0
                     FROM companies cs, colorcodes css
                     WHERE css.Company_ID = cs.Company_ID
                     AND css.CCode_tab=?`;

                let inqms = "?";

                if( q.filters.length === 0 )
                {
                    res.result = this.query("post", qstr, [q.fromTab]);
                    return res;
                }

                for( let i = 1; i < q.filters.length; i++ )
                inqms += ",?";

                qstr += ` AND css.CCode_code_index in (${inqms});`;
                res.result = this.query("post", qstr, ([q.fromTab]).concat(q.filters));

                return res;
            }

            default: return makeReturnableError("ERROR: Invalid query type!");
        }
    }

    delete(q) {
        if( !q ) makeReturnableError("ERROR: No entity input!");

        switch( q.type )
        {
                // Removes all stocks from a given tab
                // (requires: tab)
            case "stocks-tab":
            {
                let res = makeReturnableSuccessful();
                res.result = this.query("delete",
                    `DELETE FROM colorcodes WHERE CCode_tab=?`,
                    [q.tab]
                );

                return res;
            }
        }
    }

    /**
     * Sends a query to the target database using prepared statements. This
     * method takes in the query type (get, modify), that will have an effect
     * on the type of information returned as well as a small effect on the
     * execution. The method also takes in the SQL-query in string format, and
     * the possible value-array that will be used to replace the question marks
     * in the prepared statement. When 'getting' information from the database,
     * the value-array may be left empty.
     * @param {string} type Type of the query ('get', 'modifiy').
     * @param {string} q SQL-statement as a string.
     * @param {Array} vals An array of values for the prepared statement.
     * @returns The result of the query (fetched rows, or change information).
     */
    query(type, q, vals = undefined) {
        if( !q ) return;
        if( !type ) return;

        if( type === "get" )
        {
            let stmt = this.targetDatabase.prepare(q);
            return {
                rows: (!vals) ? stmt.all() : stmt.all(vals)
            };
        }

        if( type === "post" || type === "delete" )
        {
            let stmt = this.targetDatabase.prepare(q);
            let res = stmt.run(vals);

            if( type === "post" )
            return {
                lastID: res.lastInsertRowid,
                changes: res.changes
            };
            
            return {
                removed: res.changes
            };
        }
    }
}