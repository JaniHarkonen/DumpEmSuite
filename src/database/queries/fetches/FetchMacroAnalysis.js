import Fetch from "./Fetch";
import Column from "../components/Column";
import Table from "../components/Table";
import Equation from "../components/Equation";
import Value from "../components/Value";

export default class FetchMacroAnalysis extends Fetch {
    constructor(target) {
        super(target);
        this.tables = [
            new Table("singular", "s")
        ];

        this.columns = [
            new Column("Singular_data", "s")
        ];

        this.conditions = [
            new Equation(new Column("Singular_ID", "s"), new Value("'MACRO_THESIS'"), "="),
        ];
    }

    formatResult(result, rfargs = null) {
        return super.formatResult(result)[0].Singular_data;
    }
}
