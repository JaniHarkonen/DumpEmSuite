import Replace from "./Replace";
import Equation from "../components/Equation";
import Column from "../components/Column";
import Placeholder from "../components/Placeholder";
import Value from "../components/Value";

export default class ReplaceUpdatedMacroAnalysis extends Replace {
    constructor(target, atype) {
        super(target);

        this.table = "singular";
        this.changes = [
            new Equation(new Column("Singular_data"), new Placeholder(), "=")
        ];
        this.conditions = [
            new Equation(new Column("Singular_ID"), new Value("'MACRO_THESIS'"), "=")
        ];
    }
}
