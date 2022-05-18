import React, { useState } from "react";
import styled from "styled-components";
import SymbolList_Item from "./SymbolListItem";
import { getKey } from "../../../../utils/KeyManager";  
import WorkspaceModel from "../../../../utils/model/WorkspaceModel";
import Stock from "../../../../utils/model/components/Stock";

export default function SymbolList(props) {
    const [ filters, setFilters ] = useState(props.filters);

    const COLOR_OPTIONS = [
        "red",
        "green",
        "blue",
        "orange",
        "#0094FF",
        "#C0C0E5"
    ];

    const filterStocks = (filter) => {
        let tabid = props.tab.getId();

        if( tabid === WorkspaceModel.TAB_VOLUME ) return props.stocks;

        tabid -= 1;

        return props.stocks.filter((stock) => {
            let ccode = stock.getColorCode(tabid);

            return ( ccode !== Stock.FILTERED_COLOR && (filter.length === 0 || filter.includes(ccode)) );
        });
    };

    const handleFilterSelection = (filter) => {
        let new_filters = filters.map((f) => f);

        if( filters.includes(filter) )
        new_filters = filters.filter((f) => f !== filter);
        else
        new_filters.push(filter);

        props.tab.changeFilters(new_filters);

        setFilters(new_filters);
    };

    const renderSymbols = (stocks) => {
        if( !stocks ) return <></>;

        return stocks.map((stock) => {
            return(
                <SymbolContainer key={"symbol-" + getKey()}>
                    <SymbolList_Item
                        stock={stock}
                        tabId={props.tab.getId()}
                        itemClickHook={props.itemSelectionHook}

                        disableColorPicker={props.disableColorPicker}
                        disableChart={props.disableChart}
                    />
                </SymbolContainer>
            );
        });
    };

    const renderFilterOptions = () => {
        return(COLOR_OPTIONS.map((col, ind) => {
            return(
                <FilterOption
                    style={{
                        backgroundColor: col,
                        borderWidth: (filters.includes(ind)) ? "2px" : "1px"
                    }}
                    onClick={() => { handleFilterSelection(ind); }}
                />
            );
        }));
    };

    return(
        <Content>
            {
                !props.disableFilters &&
                (
                    <FilterContainer>
                        <FilterPanel>
                            <FilterCaption>
                                Filters:
                            </FilterCaption>
                            <FiltersContainer>
                                <OptionContainer>
                                    {renderFilterOptions()}
                                </OptionContainer>
                            </FiltersContainer>
                        </FilterPanel>
                    </FilterContainer>
                )
            }

            <ListAlignWrapper>
                <ScrollableList>
                    <ListContainer>
                        {renderSymbols(filterStocks(filters))}
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

    display: flex;
    align-items: center;
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