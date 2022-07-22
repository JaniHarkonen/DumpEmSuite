import Insert from "./Insert";
import Value from "../components/Value";
import Placeholder from "../components/Placeholder";

export default class InsertCompany extends Insert {
    constructor(target) {
        super(target);

        this.valueType = "value";
        this.table = "companies";

        this.values = [
            new Value("null"),
            new Placeholder(),
            new Placeholder(),
            new Placeholder(),
            new Value("null"),
            new Value("null"),
            new Value("null"),
        ];
    }
}
