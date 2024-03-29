import SymbolListItem from "./SymbolListItem";
import FilterOptionsPanel from "../FilterOptions/FilterOptionsPanel";
import ModalAPI from "../../apis/ModalAPI";
import ClearTabPrompt from "../../modals/prompts/ClearTabPrompt";
import BringStocksPrompt from "../../modals/prompts/BringStocksPrompt";

import { useState, useLayoutEffect } from "react";
import { useContext } from "react";
import SymbolListStyles from "./SymbolList.styles";
import { ThemeContext } from "../../contexts/ThemeContext";


export default function SymbolList(props) {
    const enableBring = props.enableBring;
    const disableFilterPanel = props.disableFilterPanel;
    const actions = props;
    const onBring = actions.onBring;
    const onClear = actions.onClear;
    const onItemClick = actions.onItemClick;
    const onColorCodeChange = actions.onColorCodeChange;
    const onBackground = actions.onBackground || function() {};
    const selectedSymbol = props.selectedSymbol;

    const [displayFilters, setDisplayFilters] = useState([]);
    const [tabStocks, setTabStocks] = useState([]);
    const { theme } = useContext(ThemeContext);
    
    const Styles = SymbolListStyles[theme];

    useLayoutEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        setTabStocks(actions.refresh());
    };

    const filterStocks = (stocks, filters) => {
        if( filters.length > 0 )
        return stocks.filter((stock) => filters.includes(stock.colorCode));

        return stocks;
    };

    const handleBringClick = (filters) => {
        if( tabStocks.length > 0 )
        {
            ModalAPI.popup(
                <BringStocksPrompt onYes={() => {
                    onBring(filters);
                    refresh();
                }} />
            );
        }
        else
        {
            onBring(filters);
            refresh();
        }
    };

    const handleClearClick = () => {
        if( tabStocks.length > 0 )
        {
            ModalAPI.popup(
                <ClearTabPrompt onYes={() => {
                    onClear();
                    refresh();
                }} />
            );
        }
    };

    const renderSymbols = (stocks, filters) => {
        if( !stocks ) return <></>;

        return filterStocks(stocks, filters).map((stock) => {
            return (
                <Styles.SymbolContainer key={"symbol-list-symbol-" + stock.id}>
                    <SymbolListItem
                        stock={stock}
                        onColorCodeChange={onColorCodeChange}
                        onItemClick={onItemClick}
                        isSelected={selectedSymbol ? stock.id === selectedSymbol.id : false}
                    />
                </Styles.SymbolContainer>
            );
        });
    };

    return (
        <Styles.Content onClick={onBackground}>
            {
                !disableFilterPanel &&
                (
                    <Styles.FilterContainer>
                        <FilterOptionsPanel 
                            onDisplayFilterChange={setDisplayFilters}
                            onBring={handleBringClick}
                            onClear={handleClearClick}
                            enableBring={enableBring}
                            enableClear={true}
                            stats={{
                                stocksDisplayed: filterStocks(tabStocks, displayFilters).length,
                                stocksCount: tabStocks.length
                            }}
                        />
                    </Styles.FilterContainer>
                )
            }

            <Styles.ListAlignWrapper>
                <Styles.ScrollableList>
                    <Styles.ListContainer>
                        {renderSymbols(tabStocks, displayFilters)}
                    </Styles.ListContainer>
                </Styles.ScrollableList>
            </Styles.ListAlignWrapper>
        </Styles.Content>
    );
}
