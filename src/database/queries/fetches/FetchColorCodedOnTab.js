import Fetch from "./Fetch";
import Column from "../components/Column";
import Table from "../components/Table";
import Equation from "../components/Equation";
import Placeholder from "../components/Placeholder";
import Value from "../components/Value";
import CodedEntry from "../../entities/CodedEntry";

export default class FetchColorCodedOnTab extends Fetch {
    constructor(target) {
        super(target);

        this.tables = [
            new Table("colorcodes", "c")
        ];

        this.columns = [
            new Column("Company_ID", "c"),
            new Column("CCode_code_index", "c")
        ];

        this.conditions = [
            new Equation(this.columns[1], new Value("-1"), "!="),
            new Equation(new Column("CCode_tab", "c"), new Placeholder(), "=")
        ];
    }

    
    formatResult(result, rfargs = null) {
        return this.getEntityForm(CodedEntry, super.formatResult(result));
    }
}
