import Query from "../Query";
import { generateQueryList } from "../../DatabaseUtils";

export default class Delete extends Query {
    constructor(target) {
        super(target);

        this.queryType = Query.QUERY_DELETE;
        this.table = null;
        this.conditions = null;
    }


    formatQuery(qfargs = null) {
        if( this.conditions )
        return `DELETE FROM ${this.table} WHERE ${generateQueryList(this.conditions)}`;

        return `DELETE FROM ${this.table}`;
    }
}
