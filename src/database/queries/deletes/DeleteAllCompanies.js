import Delete from "./Delete";

export default class DeleteAllCompanies extends Delete {
    constructor(target) {
        super(target)

        this.table = "companies";
    }
}
