import Entity from "./Entity";

export default class CodedEntry extends Entity {
    constructor() {
        super();
        
        this.setModel({
            Company_ID: "id",
            CCode_code_index: "colorCode"
        });
    }
}