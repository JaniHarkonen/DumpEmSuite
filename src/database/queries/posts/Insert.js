import Query from "../Query";
import { generateQueryList } from "../../DatabaseUtils";

export default class Insert extends Query {
    constructor(target) {
        super(target);

        this.queryType = Query.QUERY_POST;
        this.values = null;
        this.valueType = "value";
        this.table = null;
    }


    formatQuery(qfargs = null) {
        let qstr = `INSERT INTO ${this.table} `;

        switch( this.valueType )
        {
            case "value": qstr += `VALUES (${generateQueryList(this.values)});`; break;
            case "query": qstr += this.values.formatQuery(); break;
        }

        return qstr;
    }
}
