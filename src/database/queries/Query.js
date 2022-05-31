import { makeReturnableSuccessful } from "../DatabaseUtils";

export default class Query {
    static QUERY_NONE = 0;
    static QUERY_FETCH = 1;
    static QUERY_POST = 2;
    static QUERY_DELETE = 3;

    constructor(target) {
        this.targetDatabase = target;
        this.queryType = Query.QUERY_NONE;
    }


    execute(args) {
        let res = makeReturnableSuccessful();
        let q = this.formatQuery(args?.queryFormatArguments);
        res.result = this.query(this.queryType, q, args?.preparedArguments);
        res.result = this.formatResult(res.result, args?.resultFormatArguments);
    
        return res;
    }

        // TO BE OVERRIDDEN
    formatQuery(qfargs) {
        return "";
    }

        // TO BE OVERRIDDEN
    formatResult(result, rfargs) {
        return result;
    }

    query(type, q, vals = undefined) {
        if( !q ) return;
        if( !type ) return;

        switch( type )
        {
            case Query.QUERY_FETCH:
            {
                let stmt = this.targetDatabase.prepare(q);
                return {
                    rows: (!vals) ? stmt.all() : stmt.all(vals)
                };
            }
            
            case Query.QUERY_POST:
            case Query.QUERY_DELETE:
            {
                let stmt = this.targetDatabase.prepare(q);
                let res = stmt.run(vals);

                if( type === Query.QUERY_POST )
                return {
                    lastID: res.lastInsertRowid,
                    changes: res.changes
                };
                
                return {
                    removed: res.changes
                };
            }

            default: return {};
        }
    }
}
