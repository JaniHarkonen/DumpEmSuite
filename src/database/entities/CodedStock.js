import Entity from "./Entity";

export default class CodedStock extends Entity {
    constructor() {
        super();
        
        this.setModel({
            Company_ID: "id",
            Company_name: "name",
            Company_ticker: "ticker",
            Company_volume: "volume",
            CCode_code_index: "colorCode"
        });
    }
}
