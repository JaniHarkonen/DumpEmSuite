const pathModule = window.require("path");


export default class ExternalStorageAPI {
    static externalController;
    static openWorkspacePath;

    static initialize(ec) {
        if( !ec ) return;

        ExternalStorageAPI.externalController = ec;
    }

    /**
     * Returns whether a valid external storage has been assigned.
     * @returns Whether external storage is valid.
     */
    static controllerIsValid() {
        return ExternalStorageAPI.externalController != null;
    }

    /**
     * Returns the path of the directory constituting the workspace.
     * @returns Workspace path.
     */
    static getOpenWorkspaceDirectory() {
        return pathModule.dirname(this.openWorkspacePath);
    }

    /**
     * Returns the query result JSON and console.logs the error
     * message, if the query failed.
     * @param {JSON} res Result JSON to check and return.
     * @returns Given query result JSON.
     */
    static returnResultOrError(res) {
        if( res.success ) return res.result;

        console.log(res.error);
        return null;
    }

    /**
     * Checks the validity of the database controller object and
     * requests the contoller to perform a query passed in the
     * given function.
     * 
     * This is the standard template for a request and should be
     * used instead of creating a completely new request-method.
     * 
     * *Notice* that the function provided should return the
     * result of the query.
     * @param {function} req 
     * @returns 
     */
    static request(req) {
        if( !this.controllerIsValid ) return null;

        return this.returnResultOrError(req());
    }

    /**
     * Opens a connection to a database at a given filepath, while
     * closing the currently open one.
     * @param {string} ws Filepath to the database to connect to.
     */
    static openWorkspace(ws) {
        if( !ws ) return;

        this.externalController.connect(ws);
        this.openWorkspacePath = ws;
    }

    /**
     * Returns color codes available for the symbol color picker.
     * @returns An array of color codes indexed according to their IDs.
     */
    static getColorCodes() {
        return this.request(() => {
            return this.externalController.fetch({
                type: "color-codes"
            });
        });
    }

    /**
     * Returns a list of all stocks stored in the database as an
     * array of JSONs.
     * @returns An array of the stocks in JSON-format.
     */
    static getStocks() {
        return this.request(() => {
            return this.externalController.fetch({
                type: "stocks"
            });
        });
    }

    /**
     * Returns a list of all stocks listed on a given tab including
     * their color codes as an array of JSONs.
     * @param {integer} tab Tab index.
     * @returns An array of the stocks in JSON-format.
     */
    static getStocksOnTab(tab) {
        return this.request(() => {
            return this.externalController.fetch({
                type: "stocks-tab",
                tab: tab
            });
        });
    }

    /**
     * Changes the color code of a given stock on a given tab to
     * another color. The color ID should be used instead of an
     * integer representing the color.
     * @param {integer} id Company ID.
     * @param {integer} tab Tab index.
     * @param {integer} color Color ID.
     * @returns Whether the code change was successful.
     */
    static changeColorCode(id, tab, color) {
        return this.request(() => {
            return this.externalController.post({
                type: "code-change",
                id: id,
                tab: tab,
                color: color
            });
        });
    }

    /**
     * Returns whether a given tab contains any color coded
     * stocks.
     * @param {integer} tab Index of the tab to check.
     * @returns Boolean indicating whether color coded stocks
     * were found.
     */
    static tabHasColorCodedStocks = (tab) => {
        let res = this.request(() => {
            return this.externalController.fetch({
                type: "coded-tab",
                tab: tab
            });
        });

        if( res )
        return (res.length > 0);
    }

    /**
     * Removes all stocks from a given tab.
     * @param {integer} tab Tab index to remove the stocks from.
     * @returns A response indicating if the query was successful.
     */
    static clearTabStocks(tab) {
        return this.request(() => {
            return this.externalController.delete({
                type: "stocks-tab",
                tab: tab
            });
        });
    }

    /**
     * Brings the stocks of a given tab to another containing only
     * the stocks that satisfy the given color code filter.
     * 
     * An empty filter array will bring all of the stocks from the
     * given tab.
     * @param {integer} fromtab Index of the tab to bring from.
     * @param {integer} totab Index of the tab to bring to.
     * @param {Array} filters Array of color codes acting as the filter.
     * @returns A response indicating if the query was successful.
     */
    static bringStocksFromTab(fromtab, totab, filters) {
        return this.request(() => {
            if( !filters ) return null;

            this.clearTabStocks(totab);
            
            return this.externalController.post({
                type: "bring-stocks",
                fromTab: fromtab,
                toTab: totab,
                filters: filters
            });
        });
    }

    static updateAnalysisOfStock(id, type, updatedAnalysis) {
        return this.request(() => {
            return this.externalController.post({
                type: "stock-analysis",
                id: id,
                analysisType: type,
                analysisText: updatedAnalysis
            });
        });
    }

    static getAnalysisOfStock(id, type) {
        if( id <= 0 ) return null;
        
        return this.request(() => {
            return this.externalController.fetch({
                type: "stock-analysis",
                id: id,
                analysisType: type
            });
        });
    }

    static getMacroAnalysis() {
        return this.request(() => {
            return this.externalController.fetch({
                type: "macro-analysis"
            });
        });
    }

    static updateMacroAnalysis(updatedAnalysis) {
        return this.request(() => {
            return this.externalController.post({
                type: "macro-analysis",
                analysisText: updatedAnalysis
            });
        });
    }

    static setCompanyCollection(companies) {

            // Transactions have to be utilized to improve performance
        this.externalController.beginTransaction();

            // Insert a new collection of companies into the database
        for( let company of companies )
        {
                // Insert company
            let result = this.request(() => {
                return this.externalController.post({
                    type: "company",
                    companyName: company.name,
                    companyTicker: company.ticker,
                    companyVolume: company.volume
                });
            });

            // Insert stock to first tab
            this.request(() => {
                return this.externalController.post({
                    type: "stock",
                    id: result.lastID,
                    tab: 1,
                    codeIndex: company.colorCode
                });
            });
        }

        this.externalController.endTransaction();

        return {
            success: true
        };
    }

    static clearCompanies() {
        return this.request(() => {
            return this.externalController.delete({
                type: "companies"
            });
        });
    }
};
