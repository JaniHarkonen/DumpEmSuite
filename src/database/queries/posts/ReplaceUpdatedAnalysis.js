import Replace from "./Replace";
import Equation from "../components/Equation";
import Column from "../components/Column";
import Placeholder from "../components/Placeholder";

export default class ReplaceUpdatedAnalysis extends Replace {
    constructor(target, atype) {
        super(target);

        let acol;
        switch( atype )
        {
            case "technical": acol = "Company_analysis_technical"; break;
            case "fundamental": acol = "Company_analysis_fundamental"; break;
            case "consensus": acol = "Company_analysis_consensus"; break;

            default: return;
        }

        this.table = "companies";
        this.changes = [
            new Equation(new Column(acol), new Placeholder(), "=")
        ];
        this.conditions = [
            new Equation(new Column("Company_ID"), new Placeholder(), "=")
        ];
    }
}
