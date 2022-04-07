import ViewFundamental from "../../Workspace/View/views/ViewFundamental";
import ViewMacro from "../../Workspace/View/views/ViewMacro";
import ViewPriceAction from "../../Workspace/View/views/ViewPriceAction";
import ViewTa1 from "../../Workspace/View/views/ViewTa1";
import ViewVolume from "../../Workspace/View/views/ViewVolume";
import Tab from "./Tab";

export default class WorkspaceModel {
    static TAB_VOLUME       = 0;
    static TAB_PRICE_ACTION = 1;
    static TAB_TA1          = 2;
    static TAB_FUNDAMENTAL  = 3;
    static TAB_MACRO        = 4;

    constructor() {
        this.name = "";
        this.tabs = [
            new Tab("Volume"        , ViewVolume),
            new Tab("Price action"  , ViewPriceAction),
            new Tab("TA #1"         , ViewTa1),
            new Tab("Fundamental"   , ViewFundamental),
            new Tab("MACRO"         , ViewMacro)
        ];

        this.stocks = [];
    }

    getStockById(id) {
        if( id < 0 || id >= this.stocks.length ) return null;
        
        return this.stocks[id];
    }
}