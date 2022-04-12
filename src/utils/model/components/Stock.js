import WorkspaceModel from "../WorkspaceModel";
import ModelComponent from "./ModelComponent";

export default class Stock extends ModelComponent {
    static DEFAULT_COLOR = 0;
    static FILTERED_COLOR = -1;

    constructor(host = null, id, name, ticker, volume) {
        super(host);
        this.id     = id;
        this.name   = name;
        this.ticker = ticker;
        this.volume = volume;
    
        this.colorCodes = [];
    }

    
    jsonify() {
        super.jsonify();

        return {
            name: this.name,
            ticker: this.ticker,
            volume: this.volume,
            colorCodes: this.colorCodes
        };
    }

    /**
     * Returns the index of the stock in the stock array of the Workspace Model.
     * @returns Stock index in the stock array.
     */
    getId() {
        return this.id;
    }

    /**
     * Returns the name of the company whose stock is being represented.
     * @returns Name of the company.
     */
    getName() {
        return this.name;
    }

    /**
     * Returns the TradingView sticker symbol of the stock of the company.
     * @returns TradingView ticker symbol of the company.
     */
    getTicker() {
        return this.ticker;
    }

    /**
     * Returns the euro-volume of the stock as listed on Kauppalehti.
     * @returns Volume as indicated on Kauppalehti.
     */
    getVolume() {
        return this.volume;
    }

    setColorCodes(ccodes) {
        this.colorCodes= ccodes;
    }

    /**
     * Sets the color code of the stock in a given tab. This method will NOT
     * inform the hosting Workspace Model. changeColorCode-method is the more
     * sophisticated counterpart to this method.
     * @param {Tab} tab Tab whose color code to set.
     * @param {*} ccode Color code to set.
     */
    setColorCode(tab, ccode) {
        if( !this.isTabValid ) return;

        this.colorCodes[tab] = ccode;
    }

    changeColorCode(tab, ccode) {
        if( !this.isTabValid(tab) ) return;

        this.colorCodes[tab] = ccode;

        if( tab < WorkspaceModel.TAB_FUNDAMENTAL )
        {
                /**
                 * If the next tab's filters accept this stock, set the color code on
                 * the next tab to the default one.
                 * 
                 * Otherwise, remove the stock from all the tabs after the given one.
                 */
            let next_filters = this.hostWorkspace.getTabById(tab + 1).getFilters();
            if( next_filters.length === 0 || next_filters.includes(ccode) )
            {
                //this.colorCodes[tab + 1] = Stock.DEFAULT_COLOR;
            }
            else
            {
                /*for( var i = tab + 1; i < this.colorCodes.length; i++ )
                this.colorCodes[i] = Stock.FILTERED_COLOR;*/
                this.resetColorCodes(tab);
            }
        }
        
            // Report change to the hosting workspace
        // TO BE IMPLEMENTED
    }

    resetColorCodes(tab = 0, value = Stock.FILTERED_COLOR) {
        if( !this.isTabValid(tab) )
        return;

        for( var i = tab; i < this.colorCodes.length; i++ )
        this.colorCodes[i] = value;
    }

    getColorCode(tab) {
        if( !this.isTabValid(tab) )
        return -1;

        return this.colorCodes[tab];
    }

    getColorCodes() {
        return this.colorCodes;
    }

    isTabValid(tab) {
        return !( tab < 0 || tab >= this.colorCodes.length );
    }
}