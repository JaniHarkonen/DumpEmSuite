import { readJson } from "./FileUtils";
import WorkspaceModel from "./model/WorkspaceModel";
import Stock from "./model/components/Stock";

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

       /* let mjson = readJson(path);
        let model = new WorkspaceModel();

            // Get workspace name
        model.name = mjson.name;

            // Get workspace stocks
        model.stocks = mjson.stocks.map((stock, ind) => {
            let nstock = this.createStock(ind, stock.name, stock.ticker, stock.volume);
            nstock.setColorCodes(stock.colorCodes);

            return nstock;
        });

            // Get workspace tabs
        mjson.tabs.forEach((tab) => {
            model.tabs[tab.id].data = tab.data;
        });

        this.models.push(model);*/

        let mjson = readJson(path);
        let model = new WorkspaceModel();
        model.load(mjson);

        this.models.push(model);
    }

    /**
     * Requests the manager to save the state of a workspace in an external
     * destination.
     * @param {WorkspaceModel} model Workspace whose state to save.
     */
    requestSave(model) {
        if( !model ) return;

        this.saveModel(model.getModelJson());
    }

    /**
     * Writes a JSON-object representing a workspace to a given file.
     * @param {string} path Destination file to write to.
     * @param {JSON} json JSON-object representing the workspace.
     */
    saveModel(path, json) {
        if( !path || path === "" ) return;
        if( !json ) return;
    }

    getModels() {
        return this.models;
    }

    getModelByIndex(ind) {
        if( ind < 0 || ind >= this.models.length )
        return null;

        return this.models[ind];
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