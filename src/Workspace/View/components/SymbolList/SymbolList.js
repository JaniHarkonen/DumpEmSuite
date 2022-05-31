import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SymbolListItem from "./SymbolListItem";
import { getKey } from "../../../../utils/KeyManager";
import FilterOptionsPanel from "./FilterOptions/FilterOptionsPanel";


export default function SymbolList(props) {
    const enableBring = props.enableBring;
    const disableFilterPanel = props.disableFilterPanel;
    const actions = props.actions;
    const onBring = actions.onBring;
    const onClear = actions.onClear;
    const onColorCodeChange = actions.onColorCodeChange;

    const [displayFilters, setDisplayFilters] = useState([]);
    const [tabStocks, setTabStocks] = useState([]);


    console.log("render: symbol list");

    useEffect(() => {
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
        onBring(filters);
        refresh();
    };

    const handleClearClick = () => {
        onClear();
        refresh();
    };

    const renderSymbols = (stocks, filters) => {
        if( !stocks ) return <></>;

        return filterStocks(stocks, filters).map((stock) => {
            return(
                <SymbolContainer key={"symbol-" + getKey()}>
                    <SymbolListItem
                        stock={stock}
                        onColorCodeChange={onColorCodeChange}
                    />
                </SymbolContainer>
            );
        });
    };

    return(
        <Content>
            {
                !disableFilterPanel &&
                (
                    <FilterContainer>
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
                    </FilterContainer>
                )
            }

            <ListAlignWrapper>
                <ScrollableList>
                    <ListContainer>
                        {renderSymbols(tabStocks, displayFilters)}
                    </ListContainer>
                </ScrollableList>
            </ListAlignWrapper>
        </Content>
    );
}

const Content = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;

    background-color: #C0C0E5;

    overflow: hidden;
`;

const ListAlignWrapper = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 32px);

    display: flex;
    justify-content: center;
`;

const ScrollableList = styled.div`
    position: relative;
    width: 90%;
    height: 100%%;

    overflow-x: hidden;
    overflow-y: auto;
`;

const ListContainer = styled.div`
    position: relative;
    width: 100%;
    height: auto;
`;

const SymbolContainer = styled.div`
    position: relative;
    width: 100%;
    height: 128px;

    margin-top: 8px;
    margin-bottom: 8px;
`;

const FilterContainer = styled.div`
    position: relative;
    width: 100%;
    height: 128px;
`;
