import Delete from "./Delete";
import Equation from "../components/Equation";
import Column from "../components/Column";
import Placeholder from "../components/Placeholder";

export default class DeleteAllStocksOnTab extends Delete {
    constructor(target) {
        super(target)

        this.table = "colorcodes";
        this.conditions = [
            new Equation(new Column("CCode_tab"), new Placeholder(), "=")
        ];
    }
}
