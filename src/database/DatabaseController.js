import { makeReturnableError } from "./DatabaseUtils";
import FetchColorCodes from "./queries/fetches/FetchColorCodes";
import FetchColorCodedOnTab from "./queries/fetches/FetchColorCodedOnTab";
import FetchStocksOnTab from "./queries/fetches/FetchStocksOnTab";
import FetchStockAnalysis from "./queries/fetches/FetchStockAnalysis";
import FetchMacroAnalysis from "./queries/fetches/FetchMacroAnalysis";
import InsertBroughtStocksToTab from "./queries/posts/InsertBroughtStocksToTab";
import InsertCompany from "./queries/posts/InsertCompany";
import InsertNewStock from "./queries/posts/InsertNewStock";
import ReplaceColorSelection from "./queries/posts/ReplaceColorSelection";
import ReplaceUpdatedAnalysis from "./queries/posts/ReplaceUpdatedAnalysis";
import ReplaceUpdatedMacroAnalysis from "./queries/posts/ReplaceUpdatedMacroAnalysis";
import DeleteAllStocksOnTab from "./queries/deletes/DeleteAllStocksOnTab";
import DeleteAllCompanies from "./queries/deletes/DeleteAllCompanies";

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
     * Begins a transaction block. All queries following this one will be 
     * inserted into a transaction that will be carried out when endTransaction
     * is called.
     * 
     * Normally, each query is placed into its own transaction. This becomes an
     * issue when performing multiple queries in a succession, such as, when
     * inserting new scraped companies into the database. A transaction will take
     * some time to complete, thus multiple queries have to be bundled into a 
     * single transaction to improve performance.
     */
    beginTransaction() {
        if( !this.targetDatabase ) return;

        this.targetDatabase.exec("BEGIN TRANSACTION");
    }

    /**
     * Ends a transaction block and executes all the queries inside the
     * transaction.
     */
    endTransaction() {
        if( !this.targetDatabase ) return;

        this.targetDatabase.exec("COMMIT");
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
                // Fetch the basic stock data of all the companies listed on a certain tab
                // as well as their color codes
                // (requires: tab)
            case "stocks-tab":
                return (new FetchStocksOnTab(this.targetDatabase)).execute({
                    preparedArguments: [q.tab]
                });

                // Fetch the company IDs and color codes of all the companies listed on a certain
                // tab that have a set color code (not -1)
                // (requires: tab)
            case "coded-tab":
                return (new FetchColorCodedOnTab(this.targetDatabase)).execute({
                    preparedArguments: [q.tab]
                });

                // Fetch the available color codes for the symbol list color picker
            case "color-codes":
                return (new FetchColorCodes(this.targetDatabase)).execute();

                // Fetch a certain type of analysis of a stock
                // (requires: id, analysis type)
            case "stock-analysis":
                return (new FetchStockAnalysis(this.targetDatabase, q.analysisType)).execute({
                    preparedArguments: [q.id]
                });

                // Fetch the macro analysis note text content
            case "macro-analysis":
                return (new FetchMacroAnalysis(this.targetDatabase)).execute();

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
                return (new ReplaceColorSelection(this.targetDatabase)).execute({
                    preparedArguments: [q.color, q.id, q.tab]
                });

                // Brings stocks from a given tab to another if they satisfy a given filter
                // (requires: source tab, destination tab, filters)
            case "bring-stocks":
                return (new InsertBroughtStocksToTab(this.targetDatabase, q.toTab)).execute({
                    queryFormatArguments: {
                        filters: q.filters
                    },
                    preparedArguments: ([q.fromTab]).concat(q.filters)
                });
            
                // Updates the technical, fundamental or consensus analysis of a stock
                // (requires: id, analysis type, updated analysis text)
            case "stock-analysis":
                return (new ReplaceUpdatedAnalysis(this.targetDatabase, q.analysisType)).execute({
                    preparedArguments: [q.analysisText, q.id]
                });
            
                // Updates the macroeconomic analysis
                // (requires: updated analysis text)
            case "macro-analysis":
                return (new ReplaceUpdatedMacroAnalysis(this.targetDatabase)).execute({
                    preparedArguments: [q.analysisText]
                });
            
                // Sets the collection of available companies
                // (requires: company name, company ticker, company volume)
            case "company":
                return (new InsertCompany(this.targetDatabase)).execute({
                    preparedArguments: [q.companyName, q.companyTicker, q.companyVolume]
                });
            
                // Adds a new stock to the first tab
                // (requires: company id, tab index, color code index)
            case "stock":
                return (new InsertNewStock(this.targetDatabase)).execute({
                    preparedArguments: [q.id, q.tab, q.codeIndex]
                });

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
                return (new DeleteAllStocksOnTab(this.targetDatabase)).execute({
                    preparedArguments: [q.tab]
                });
            
                // Removes all companies from the company records
            case "companies":
                return (new DeleteAllCompanies(this.targetDatabase)).execute({
                    preparedArguments: []
                });
        }
    }
}
