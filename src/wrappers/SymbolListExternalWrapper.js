import React from "react";
import ExternalStorageAPI from "../apis/ExternalStorageAPI";
import SymbolList from "../components/SymbolList/SymbolList";


export default function SymbolListExternalWrapper(props) {
    const tab = props.context.tab;
    const enableBring = props.context.enableBring;

    return(
        <SymbolList
            enableBring={enableBring}
            disableFilterPanel={false}
            refresh={() => {
                return ExternalStorageAPI.getStocksOnTab(tab);
            }}
            onBring={(filters) => {
                ExternalStorageAPI.bringStocksFromTab(tab - 1, tab, filters);
            }}
            onClear={() => {
                ExternalStorageAPI.clearTabStocks(tab);
            }}
            onColorCodeChange={(id, newcol) => {
                ExternalStorageAPI.changeColorCode(id, tab, newcol);
            }}
        />
    );
};
