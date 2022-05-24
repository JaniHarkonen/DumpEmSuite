import React, { useState } from "react";
import styled from "styled-components";
import SymbolList_Item from "./SymbolListItem";
import { getKey } from "../../../../utils/KeyManager";
import FilterOptionsPanel from "./FilterOptions/FilterOptionsPanel";

export default function SymbolList(props) {
    const tabStocks = props.context.stocks;
    const [displayFilters, setDisplayFilters] = useState([]);

    const handleDisplayFilterChange = (newfils) => {
        if( !newfils ) return;

        setDisplayFilters(newfils);
    }

    const renderSymbols = (stocks) => {
        if( !stocks ) return <></>;

        let flstocks = stocks;
        if( displayFilters.length > 0 )
        flstocks = stocks.filter((stock) => displayFilters.includes(stock.colorCode));

        return flstocks.map((stock) => {
            return(
                <SymbolContainer key={"symbol-" + getKey()}>
                    <SymbolList_Item
                        stock={stock}
                    />
                </SymbolContainer>
            );
        });
    };

    return(
        <Content>
            {
                !props.disableFilterPanel &&
                (
                    <FilterContainer>
                        <FilterOptionsPanel onDisplayFilterChange={handleDisplayFilterChange} />
                    </FilterContainer>
                )
            }

            <ListAlignWrapper>
                <ScrollableList>
                    <ListContainer>
                        {renderSymbols(tabStocks)}
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
    height: 48px;
`;

const FilterPanel = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
`;

const FilterCaption = styled.div`
    position: relative;
    margin-left: 48px;
`;

const FiltersContainer = styled.div`
    position: relative;
    height: 100%;
    margin-left: 16px;

    display: inline-block;
`;

const OptionContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
`;

const FilterOption = styled.div`
    position: relative;
    width: 16px;
    height: 16px;

    display: inline-block;
    margin-right: 8px;

    border-style: solid;
    border-width: 1px;
`;