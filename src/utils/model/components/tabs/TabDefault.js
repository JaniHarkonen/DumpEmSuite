import WorkspaceModel from "../../WorkspaceModel";
import Stock from "../Stock";
import Tab from "../Tab";

export default class TabDefault extends Tab {
    constructor(host = null, id = -1, name = "", jsx = <></>) {
        super(host, id, name, jsx);

        this.filters = [];
    }

    jsonify() {
        super.jsonify();

        return {
            id: this.id,
            filters: this.filters
        };
    }

    getFilters() {
        return this.filters;
    }

    /**
     * Raw-method for setting the active filters on this tab. There are no error
     * checks, nor will the hosting Workspace Model be notified of the change.
     * See changeFilters for a more sophisticated version of this method.
     * @param {*} filters 
     */
    setFilters(filters) {
        this.filters = filters;
    }

    changeFilters(filters) {
        if( !filters ) return;

        if( this.id === WorkspaceModel.TAB_VOLUME ) return;

        if( filters.length > 0 )
        {
            this.hostWorkspace.getStocks().forEach((stock) => {

                if( !filters.includes(stock.getColorCode(this.id - 1)) )
                stock.resetColorCodes(this.id);
            });
        }

        this.setFilters(filters);

        // IMPLEMENT REPORTING THE CHANGE TO THE HOSTING WORKSPACE
        
        // ONLY REPORT A TOTAL CHANGE IF STOCKS IN SUBSEQUENT TABS WERE FILTERED
        // OTHERWISE, REPORT A REGULAR CHANGE TO THE FILTERS
    }
}