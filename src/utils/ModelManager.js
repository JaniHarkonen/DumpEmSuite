import { readJson } from "./FileUtils";
import WorkspaceModel from "./model/WorkspaceModel";
import Stock from "./model/Stock";

export default class ModelManager {
    constructor() {
        this.models = [];
    }

    createStock(id, name, ticker, volume) {
        if( !name || name === "" )      return null;
        if( !ticker || ticker === "" )  return null;
        if( !volume || volume === "" )  return null;

        let stock = new Stock();

        stock.id        = id;
        stock.name      = name;
        stock.ticker    = ticker;
        stock.volume    = volume;

        return stock;
    }

    /**
     * Opens a model stored in a given JSON-file.
     * @param {string} path JSON-file containing the model.
     */
    openModel(path) {
        if( !path || path === "" ) return;

        let mjson = readJson(path);
        let model = new WorkspaceModel();

            // Get workspace name
        model.name = mjson.name;

            // Get workspace stocks
        model.stocks = mjson.stocks.map((stock, ind) => {
            return this.createStock(ind, stock.name, stock.ticker, stock.volume);
        });

            // Get workspace tabs
        mjson.tabs.forEach((tab) => {
            model.tabs[tab.id].data = tab.data;
        });

        this.models.push(model);
    }

    /**
     * Initializes the model manager by loading the previous state of the manager.
     */
    initialize() {
        let config = readJson("D:\\javascript\\DumpEmSuite\\project\\dump-em-suite\\testfolder\\config.json");
        for( var i = 0; i < config.openWorkspaces.length; i++ )
        this.openModel(config.openWorkspaces[i]);

        console.log("ModelManager: called initialize");
    }
}