import Query from "../Query";
import { generateQueryList } from "../../DatabaseUtils";

export default class Replace extends Query {
    constructor(target) {
        super(target);

        this.queryType = Query.QUERY_POST;
        this.table = null;
        this.changes = null;
        this.conditions = null;
    }


    formatQuery(qfargs = null) {
        return `UPDATE ${this.table} SET ${generateQueryList(this.changes)} WHERE ${generateQueryList(this.conditions, " AND")};`;
    }
}
