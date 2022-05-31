import Insert from "./Insert";
import Fetch from "../fetches/Fetch";
import Table from "../components/Table";
import Column from "../components/Column";
import Value from "../components/Value";
import Equation from "../components/Equation";
import Placeholder from "../components/Placeholder";

export default class InsertBroughtStocksToTab extends Insert {
    constructor(target, toTab) {
        super(target);

        this.valueType = "query";
        this.table = "colorcodes";

        let q = new Fetch(null);
        q.tables = [
            new Table("companies", "cs"),
            new Table("colorcodes", "css")
        ];
        q.columns = [
            new Column("Company_ID", "cs"),
            new Value(toTab),
            new Value(0)
        ];
        q.conditions = [
            new Equation(new Column("Company_ID", "css"), q.columns[0], "="),
            new Equation(new Column("CCode_tab", "css"), new Placeholder(), "=")
        ]

        this.values = q;
    }


    formatQuery(qfargs) {
        let q = super.formatQuery();

        if( qfargs.filters.length === 0 )
        return q;

        q = q.substring(0, q.length - 1);
        let inqms = "?";

        for( let i = 1; i < qfargs.filters.length; i++ )
        inqms += ",?";

        q += ` AND css.CCode_code_index in (${inqms});`;
        return q;
    }
}
