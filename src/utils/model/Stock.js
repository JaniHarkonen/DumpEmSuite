export default class {
    constructor(id, name, ticker, volume) {
        this.id     = id;
        this.name   = name;
        this.ticker = ticker;
        this.volume = volume;
    
        this.colorCodes = [];
    }

    addColorCode(ccode) {
        if( !ccode ) return;

        this.colorCodes.push(ccode);
    }
}