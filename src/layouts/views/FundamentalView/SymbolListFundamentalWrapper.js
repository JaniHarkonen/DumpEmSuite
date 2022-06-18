import ExternalStorageAPI from "../../../apis/ExternalStorageAPI";
import SymbolList from "../../../components/SymbolList/SymbolList";


export default function SymbolListFundamentalWrapper(props) {
    const tab = props.tab;
    const enableBring = props.enableBring;
    const onItemClick = props.onItemClick;

    return (
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
            onItemClick={(symbol) => {
                onItemClick(symbol);
            }}
            onBackground={() => {
                onItemClick(null);
            }}
        />
    );
}
