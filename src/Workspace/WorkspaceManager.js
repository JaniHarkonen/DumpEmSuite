export default class WorkspaceManager {
    constructor(ec) {
        this.externalController = ec;
    }

    controllerIsValid() {
        return this.externalController != null;
    }

    openWorkspace(ws) {
        if( !ws ) return;

        this.externalController.connect(ws);
    }

    getStocks() {
        let res = this.externalController.fetch({
            type: "stocks"
        });

        if( res.success )
        return res.result;
        
        console.log(res.error);
        return null;
    }

    getStocksOnTab(tab) {
        if( tab < 0 ) return null;

        let res = this.externalController.fetch({
            type: "stocks-tab",
            tab: tab
        });

        if( res.success )
        return res.result;

        console.log(res.error);
        return null;
    }

    changeColorCode(id, color) {
        let res = this.externalController.post({
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