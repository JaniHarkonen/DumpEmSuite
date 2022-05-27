export default class WorkspaceManager {
    constructor(ec) {
        this.externalController = ec;
    }

    /**
     * Returns whether a valid external storage has been assigned.
     * @returns Whether external storage is valid.
     */
    controllerIsValid() {
        return this.externalController != null;
    }

    returnResultOrError(res) {
        if( res.success ) return res.result;

        console.log(res.error);
        return null;
    }

    request(req) {
        if( !this.controllerIsValid ) return null;

        return this.returnResultOrError(req());
    }

    /**
     * A simple method that can be used to check if a variable
     * stores a WorkspaceManager object.
     */
    test() {
        console.log("Called WorkspaceManager!");
    }

    /**
     * Opens a connection to a database at a given filepath, while
     * closing the currently open one.
     * @param {string} ws Filepath to the database to connect to.
     */
    openWorkspace(ws) {
        if( !ws ) return;

        this.externalController.connect(ws);
    }

    getColorCodes() {
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
    getStocks() {
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
    getStocksOnTab(tab) {
        return this.request(() => {
            return this.externalController.fetch({
                type: "stocks-tab",
                tab: tab
            });
        });
    }

    changeColorCode(id, tab, color) {
        return this.request(() => {
            return this.externalController.post({
                type: "code-change",
                id: id,
                tab: tab,
                color: color
            });
        });
    }

    tabHasColorCodedStocks = (tab) => {
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
    clearTabStocks(tab) {
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
    bringStocksFromTab(fromtab, totab, filters) {
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
};
