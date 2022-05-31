import Query from "../Query";
import { generateQueryList } from "../../DatabaseUtils";

export default class Fetch extends Query {
    constructor(target) {
        super(target);

        this.queryType = Query.QUERY_FETCH;
        this.columns = null;
        this.tables = null;
        this.conditions = null;
    }


    getEntityForm(Ent, res) {
        if( !Ent ) return null;

        return (new Ent()).form(res);
    }

    formatQuery(qfargs = null) {
        let qstr = `SELECT ${generateQueryList(this.columns)} FROM ${generateQueryList(this.tables)}`;

        if( this.conditions )
        qstr += ` WHERE ${generateQueryList(this.conditions, " AND")}`;

        return qstr + ";";
    }

    formatResult(result, frargs = null) {
        return result.rows;
    }
}
