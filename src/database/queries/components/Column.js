import QueryComponent from "./QueryComponent";

export default class Column extends QueryComponent {
    constructor(name, ref) {
        super();
        this.tableRef = ref;
        this.name = name;
    }

    getJSON() {
        if( !this.tableRef )
        return { columnName: this.name };

        return {
            tableRef: this.tableRef,
            columnName: this.name
        };
    }

    getString() {
        if( !this.tableRef )
        return this.name;

        return this.tableRef + "." + this.name;
    }
}
