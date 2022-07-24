import Fetch from "./Fetch";
import Column from "../components/Column";
import Table from "../components/Table";
import Equation from "../components/Equation";
import Placeholder from "../components/Placeholder";

export default class FetchStockAnalysis extends Fetch {
    constructor(target, atype) {
        super(target);
        this.tables = [
            new Table("companies")
        ];

        let acol;
        switch( atype )
        {
            case "technical": acol = "Company_analysis_technical"; break;
            case "fundamental": acol = "Company_analysis_fundamental"; break;
            case "consensus": acol = "Company_analysis_consensus"; break;

            default: return;
        }

        this.columns = [
            new Column(acol)
        ];

        this.conditions = [
            new Equation(new Column("Company_ID"), new Placeholder(), "=")
        ];
    }

    formatResult(result, rfargs = null) {
        let row = super.formatResult(result)[0];

        return {
            analysis: row?.Company_analysis_technical || row?.Company_analysis_fundamental || row?.Company_analysis_consensus
        };
    }
}
