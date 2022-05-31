import Fetch from "./Fetch";
import Column from "../components/Column";
import Table from "../components/Table";
import Equation from "../components/Equation";
import Placeholder from "../components/Placeholder";
import CodedStock from "../../entities/CodedStock";

export default class FetchStocksOnTab extends Fetch {
    constructor(target) {
        super(target);

        this.tables = [
            new Table("companies", "cs"),
            new Table("colorcodes", "ccs")
        ];

        this.columns = [
            new Column("Company_ID", "cs"),
            new Column("Company_name", "cs"),
            new Column("Company_ticker", "cs"),
            new Column("Company_volume", "cs"),
            new Column("CCode_code_index", "ccs")
        ];

        this.conditions = [
            new Equation(this.columns[0], new Column("Company_ID", "ccs"), "="),
            new Equation(new Column("CCode_tab", "ccs"), new Placeholder(), "=")
        ];
    }


    formatResult(result, rfargs = null) {
        return this.getEntityForm(CodedStock, super.formatResult(result));
    }
}
