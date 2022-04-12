export default class {
    constructor() {
        this.stocks = [];
    }

    addStock(stock) {
        if( !stock ) return;

        this.stocks.push(stock);
    }
}