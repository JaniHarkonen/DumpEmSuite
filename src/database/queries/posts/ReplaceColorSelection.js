import Replace from "./Replace";
import Equation from "../components/Equation";
import Column from "../components/Column";
import Placeholder from "../components/Placeholder";

export default class ReplaceColorSelection extends Replace {
    constructor(target) {
        super(target);

        this.table = "colorcodes";
        this.changes = [
            new Equation(new Column("CCode_code_index"), new Placeholder(), "=")
        ];
        this.conditions = [
            new Equation(new Column("Company_ID"), new Placeholder(), "="),
            new Equation(new Column("CCode_tab"), new Placeholder(), "=")
        ];
    }
}
