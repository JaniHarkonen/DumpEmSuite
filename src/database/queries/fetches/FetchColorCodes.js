import Fetch from "./Fetch";
import Column from "../components/Column";
import Table from "../components/Table";

export default class FetchColorCodes extends Fetch {
    constructor(target) {
        super(target);
        this.tables = [
            new Table("colors", "c")
        ];

        this.columns = [
            new Column("Color_ID", "c"),
            new Column("Color_color", "c")
        ];
    }

    formatResult(result, rfargs = null) {
        let rows = super.formatResult(result);

        if( rows.length === 0 ) return rows;

        let colors = new Array(rows.length);
        for( let col of rows )
        colors[col.Color_ID] = col.Color_color;

        rows = colors;
        return rows;
    }
}
