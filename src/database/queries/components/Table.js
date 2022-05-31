import QueryComponent from "./QueryComponent";

export default class Table extends QueryComponent {
    constructor(name, ref) {
        super();
        this.tableRef = ref;
        this.name = name;
    }

    getJSON() {
        if( !this.tableRef )
        return { tableName: this.name };

        return {
            tableRef: this.tableRef,
            tableName: this.name
        };
    }

    getString() {
        if( !this.tableRef )
        return this.name;

        return this.name + " " + this.tableRef;
    }
}
