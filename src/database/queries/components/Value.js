import Column from "./Column";

export default class Value extends Column {
    constructor(value) {
        super();
        
        this.name = value;
    }
}
