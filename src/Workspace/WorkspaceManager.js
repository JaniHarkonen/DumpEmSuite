export default class WorkspaceManager {
    constructor(dbc) {
        this.databaseController = dbc;
    }

    openWorkspace(ws) {
        if( !this.databaseController ) return;
        if( !ws ) return;

        this.databaseController.connect(ws);
    }

    getStocks() {
        if( !this.databaseController ) return null;
        
        let res = this.databaseController.fetch({
            type: "stocks"
        });

        if( res.success )
        return res.result;
        
        console.log(res.error);
        return null;
    }

    getStocksOnTab(tab) {
        if( !this.databaseController ) return null;
        if( tab < 0 ) return null;

        let res = this.databaseController.fetch({
            type: "stocks-tab",
            tab: tab
        });

        if( res.success )
        return res.result;

        console.log(res.error);
        return null;
    }

    changeColorCode(id, color) {
        if( !this.databaseController ) return null;
        
        let res = this.databaseController.post({
            type: "code-change",
            id: id,
            color: color
        });

        if( res.success )
        return res.result;

        console.log(res.error);
        return null;
    }
}