import { useState } from "react";
import SymbolListFundamentalWrapper from "./SymbolListFundamentalWrapper";
import View from "../layouts/View/View";
import Analysis from "../layouts/Analysis/Analysis";

export default function ViewFundamentalWrapper(props) {
    const tab = props.tab;

    const [selectedSymbol, setSelectedSymbol] = useState({});

    return(
        <View
            firstHalf={{
                element: SymbolListFundamentalWrapper,
                context: {
                    tab: tab,
                    enableBring: true,
                    onItemClick: (symbol) => {
                        setSelectedSymbol(symbol);
                    }
                }
            }}

            secondHalf={{
                element: Analysis,
                context: {
                    selectedSymbol: selectedSymbol
                }
            }}
        />
    );
};
