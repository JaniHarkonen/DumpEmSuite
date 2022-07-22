import Insert from "./Insert";
import Placeholder from "../components/Placeholder";

export default class InsertNewStock extends Insert {
    constructor(target) {
        super(target);

        this.valueType = "value";
        this.table = "colorcodes";

        this.values = [
            new Placeholder(),
            new Placeholder(),
            new Placeholder()
        ];
    }
}
