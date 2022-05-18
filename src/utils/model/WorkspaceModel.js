import ViewFundamental from "../../Workspace/View/views/ViewFundamental";
import ViewMacro from "../../Workspace/View/views/ViewMacro";
import ViewPriceAction from "../../Workspace/View/views/ViewPriceAction";
import ViewTa1 from "../../Workspace/View/views/ViewTa1";
import ViewVolume from "../../Workspace/View/views/ViewVolume";
import Stock from "./components/Stock";
import Tab from "./components/Tab";
import TabDefault from "./components/tabs/TabDefault";
import TabFundamental from "./components/tabs/TabFundamental";

export default class WorkspaceModel {
    static TAB_VOLUME       = 0;
    static TAB_PRICE_ACTION = 1;
    static TAB_TA1          = 2;
    static TAB_FUNDAMENTAL  = 3;
    static TAB_MACRO        = 4;

    constructor(manager = null) {
        this.manager = manager;
        this.name = "";
        this.tabs = [
            new TabDefault      (this, WorkspaceModel.TAB_VOLUME,       "Volume"        , ViewVolume),
            new TabDefault      (this, WorkspaceModel.TAB_PRICE_ACTION, "Price action"  , ViewPriceAction),
            new TabDefault      (this, WorkspaceModel.TAB_TA1,          "TA #1"         , ViewTa1),
            new TabFundamental  (this, WorkspaceModel.TAB_FUNDAMENTAL,  "Fundamental"   , ViewFundamental),
            new Tab             (this, WorkspaceModel.TAB_MACRO,        "MACRO"         , ViewMacro)
        ];

        this.stocks = [];
        this.modelJson = {};
        this.path = "";
    }

    load(json) {
        if( !json ) return;

            // Load workspace name
        this.name = json.name;

            // Load stocks being operated on
        this.stocks = json.stocks.map((stock, ind) => {
            let nstock = new Stock(this, ind, stock.name, stock.ticker, stock.volume);
            nstock.hostWorkspace = this;
            nstock.setColorCodes(stock.colorCodes);

            return nstock;
        });

            // Load tab filters
        json.tabs.forEach((tab) => {
            let inst = this.tabs[tab.id];
            inst.hostWorkspace = this;
            inst.setFilters(tab.filters);
        });

        this.modelJson = json;
    }

    registerComponentChange(comp, save = true) {
        if( !comp ) return;

        let cjson = comp.jsonify();

            // Handle changes to a tab
        if( comp instanceof Tab )
        {
            let prev = this.modelJson.tabs[comp.id];
            this.modelJson.tabs[comp.id] = {
                ...prev,
                cjson
            }
        }

            // Handle changes to a stock
        if( comp instanceof Stock )
        {
            let prev = this.modelJson.stocks[comp.id];
            this.modelJson.stocks[comp.id] = {
                ...prev,
                cjson
            };
        }

            // Saving can be toggled OFF
        if( save === true )
        this.manager.requestSave(this);
    }

    /**
     * In case of a large change to the Workspace Model, this method can be utilized
     * to perform a full update to the JSON-model. Each model component will be
     * iterated through and their JSON will be requested using the
     * registerComponentChange-method.
     */
    updateJsonModel() {
        for( let i = 0; i < this.tabs.length; i++ )
        this.registerComponentChange(this.tabs[i], false);

        for( let i = 0; i < this.stocks.length; i++ )
        this.registerComponentChange(this.stocks[i], false);

        this.manager.requestSave(this);
    }

    setPath(path) {
        this.path = path;
    }

    /**
     * Returns the JSON-object containing the state of the Workspace Model.
     * @returns JSON-object representing this workspace.
     */
    getModelJson() {
        return this.modelJson;
    }

    getStockById(id) {
        if( id < 0 || id >= this.stocks.length ) return null;
        
        return this.stocks[id];
    }

    getStocks() {
        return this.stocks;
    }

    getTabById(id) {
        if( id < 0 || id >= this.tabs.length ) return null;

        return this.tabs[id];
    }

    getTabs() {
        return this.tabs;
    }

    getPath() {
        return this.path;
    }
}