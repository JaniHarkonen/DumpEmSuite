import { useState } from "react";
import View, { makeViewElement } from "../View";
import SymbolListFundamentalWrapper from "./SymbolListFundamentalWrapper";
import Analysis from "../../Analysis/Analysis";
import AnalysisDisplay from "../../AnalysisDisplay/AnalysisDisplay";
import ExternalStorageAPI from "../../../apis/ExternalStorageAPI";

export default function FundamentalView(props) {
    const tab = props.tab;
    const [selectedSymbol, setSelectedSymbol] = useState(null);

    const elements = [
        makeViewElement(
            { x: 1, y: 1 },
            { width: 1, height: 2 },
            <SymbolListFundamentalWrapper
                tab={tab}
                enableBring={true}
                onItemClick={(symbol) => {
                    setSelectedSymbol(symbol);
                }}
            />
        ),
        makeViewElement(
            { x: 2, y: 1 },
            { width: 1, height: 1 },
            <Analysis
                selectedSymbolID={selectedSymbol?.id || -1}
            />
        ),
        makeViewElement(
            { x: 2, y: 2 },
            { width: 1, height: 1 },
            <AnalysisDisplay
                onAnalysisUpdate={(atype, updatedText) => {
                    if( !selectedSymbol ) return;

                    ExternalStorageAPI.updateAnalysisOfStock(selectedSymbol.id, atype, updatedText);
                }}
                fetchAnalysis={(atype) => {
                    if( !selectedSymbol ) return { isSuccessful: false };

                    return {
                        isSuccessful: true,
                        analysis: ExternalStorageAPI.getAnalysisOfStock(selectedSymbol.id, atype).analysis
                    };
                }}
            />
        )
    ];

    return (
        <View
            elements={elements}
        />
    );
}
